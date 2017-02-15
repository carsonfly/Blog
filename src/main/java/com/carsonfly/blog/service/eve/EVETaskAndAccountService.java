package com.carsonfly.blog.service.eve;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;

/**
 * Created by carson on 2016/7/18.
 */
public class EVETaskAndAccountService implements Runnable {
    private List<EVETask> tasks = new ArrayList<EVETask>();
    private List<EVETask> nowTasks = new ArrayList<EVETask>();
    CommDao<EVEPlayer> playerCommDao = CommDao.getInstance();
    CommDao<EVEAward> awardCommDao = CommDao.getInstance();
    CommDao<EVETask> taskCommDao = CommDao.getInstance();
    CommDao<EVEVote> voteCommDao = CommDao.getInstance();
    CommDao<EVETransferAccount> transferAccountCommDao = CommDao.getInstance();
    //CommDao<EVETransferAccountJson> transferAccountJsonCommDao=CommDao.getInstance();
    CommDao<EVETransferAccountInformation> transferAccountInformationCommDao = CommDao.getInstance();


    public List<EVETask> getHasDoneTasks() {
        return hasDoneTasks;
    }

    public void setHasDoneTasks(List<EVETask> hasDoneTasks) {
        this.hasDoneTasks = hasDoneTasks;
    }

    private List<EVETask> hasDoneTasks = new ArrayList<EVETask>();
    private static EVETaskAndAccountService service;

    public static EVETaskAndAccountService getInstance() {
        if (service == null) {
            service = new EVETaskAndAccountService();
            //Thread thread=new Thread(service);
            //thread.start();
        }
        return service;
    }

    public List<EVETask> getTasks() {
        return tasks;
    }

    public List<EVEVote> getVoteByTaskId(int id) {

        return voteCommDao.HQLQuery("from EVEVote EVEVote where EVEVote.taskId=?", new String[]{String.valueOf(id)});
    }

    public Map<String, Object> Vote(int taskId, int userId, int voteNumber) throws UnsupportedEncodingException {
        List<EVETask> tasksNow = taskCommDao.HQLQuery("from EVETask EVETask where id=?", new String[]{String.valueOf(taskId)});
        List<EVEPlayer> players = playerCommDao.HQLQuery("from EVEPlayer EVEPlayer where id=?", new String[]{String.valueOf(userId)});
        //System.out.println(tasksNow+"\n"+players);
        Map<String, Object> result = new HashMap<String, Object>();
        if (tasksNow.size() == 1
                && players.size() == 1
                && tasksNow.get(0).getDone() == 0
                && players.get(0).getIsk() > tasksNow.get(0).getValue() / 100) {
            System.out.println("BeginVote");

            EVETask task = tasksNow.get(0);
            EVEPlayer player = players.get(0);
            EVEVote vote = new EVEVote();
            String note = task.getNote();
            if (note == null) {
                note = player.getName() + ":1%";
                task.setNote(note);
            } else if (!note.contains(player.getName())) {
                note = note + " " + player.getName() + ":1%";
                task.setNote(note);
            } else if (note.contains(player.getName())) {
                int nameStart = note.indexOf(player.getName());
                int nameEnd = nameStart + player.getName().length();
                int numberEnd = note.indexOf("%", nameEnd);
                String s1 = new String(note.toCharArray(), 0, nameEnd + 1);
                //System.out.println(s1);
                //System.out.println(new String(note.toCharArray(),nameEnd+1,numberEnd-nameEnd));
                Integer number = Integer.parseInt(new String(note.toCharArray(), nameEnd + 1, numberEnd - nameEnd - 1));
                //System.out.println(number);
                String s2 = new String(note.toCharArray(), numberEnd, note.toCharArray().length - numberEnd);
                //System.out.println(s2);
                number++;
                note = s1 + (number).toString() + s2;
                System.out.println(note);
                task.setNote(note);
            }
            vote.setIsk(task.getValue() / 100);
            vote.setPlayer(player.getId());
            vote.setTaskId(task.getId());
            vote.setTime(new Date());
            vote.setUserName(player.getName());
            vote.setTaskName(task.getItemName());
            vote.setVote(task.getRemainPart());

            player.setIsk(player.getIsk() - task.getValue() / 100);
            playerCommDao.SaveOrUpdate(player);
            voteCommDao.SaveOrUpdate(vote);
            EVETransferAccountInformation information = new EVETransferAccountInformation();
            information.setType("投注");
            information.setUserName(player.getName());
            information.setPlayerName(URLEncoder.encode(player.getPlayer(), "utf8"));
            information.setUserId(player.getId());
            information.setBalace(player.getIsk());
            information.setDate(new Date());
            information.setIsk(-task.getValue() / 100);
            task.setRemainPart(task.getRemainPart() - 1);
            transferAccountInformationCommDao.SaveOrUpdate(information);
            taskCommDao.SaveOrUpdate(task);
            System.out.println("vote:" + vote);
            result.put("success", true);
            result.put("vote", vote);
            return result;
        } else {
            result.put("success", false);
            result.put("msg", "账户余额不足,请充值..");
            return result;
        }
    }

    @Override
    public void run() {
        while (true) {
            System.out.println("sleep 10s");
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("refresh account");
            List<EVETransferAccount> accountList = transferAccountCommDao.criteriaQuery(EVETransferAccount.class, null, null, null, null);
            if (accountList == null)
                System.out.println("EVETransferAccount:" + accountList);
            for (EVETransferAccount account : accountList) {
                if (account.isHasRead() == null || !account.isHasRead()) {
                    String name = null;

                    try {
                        name = URLDecoder.decode(account.getDescribe(), "utf8").split("将现金存入")[0].replace("[r] ", "");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }

                    //System.out.println("name:"+name);
                    Double isk = Double.parseDouble(account.getAmount().trim().replace("ISK", "").replace(",", ""));
                    //System.out.println("isk:"+isk);
                    Map<String, Object> queryMap = new HashMap<String, Object>();
                    try {
                        queryMap.put("player", URLEncoder.encode(name, "utf8"));
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    List<EVEPlayer> players = playerCommDao.criteriaQuery(EVEPlayer.class, queryMap, null, null, null);
                    if (players.size() == 1) {
                        EVEPlayer player = players.get(0);
                        Double balance = player.getIsk();
                        player.setIsk(balance + isk);
                        playerCommDao.SaveOrUpdate(player);
                        account.setHasRead(true);
                        transferAccountCommDao.SaveOrUpdate(account);
                        EVETransferAccountInformation information = new EVETransferAccountInformation();
                        information.setIsk(isk);
                        information.setBalace(balance + isk);
                        information.setDate(new Date());
                        information.setUserId(player.getId());
                        information.setType("转账");
                        information.setUserName(player.getName());
                        information.setPlayerName(player.getPlayer());

                        transferAccountInformationCommDao.SaveOrUpdate(information);
                    }
                }
            }
            System.out.println("refresh task");
            taskCommDao.getSession().clear();
            Map<String, Object> queryMap = new HashMap<String, Object>();
            queryMap.put("done", 0);
            List<EVETask> tasks = taskCommDao.criteriaQuery(EVETask.class, queryMap, null, null, null);
            System.out.println("all task" + tasks);
            for (int i = 0; i < tasks.size(); i++) {
                if (tasks.get(i).getEndTime().before(new Date())) {
                    tasks.remove(tasks.get(i));
                    i++;
                }

            }
            //nowTasks.clear();
            System.out.println("now task" + tasks);

            if (tasks.size() < 10) {
                System.out.println("Add Tasks");
                List<EVEAward> awards = awardCommDao.criteriaQuery(EVEAward.class, null, null, null, null);
                if (awards == null)
                    System.out.println("awards:" + awards);
                Collections.shuffle(awards);
                for (EVEAward award : awards) {
                    if (award.getAmount() > 0) {
                        EVETask task = new EVETask();
                        task.setItemName(award.getItemName());
                        task.setLevel(award.getLevel());
                        task.setPart(100);
                        task.setRemainPart(100);
                        task.setStartTime(new Date());
                        task.setEndTime(new Date(new Date().getTime() + award.getCycle() * 1000));
                        task.setValue(award.getValue());
                        task.setDone(0);
                        tasks.add(task);
                        taskCommDao.SaveOrUpdate(task);
                        award.setAmount(award.getAmount() - 1);
                        awardCommDao.SaveOrUpdate(award);
                    }
                }
            }
            System.out.println("check tasks if it end");
            for (int i = 0; i < tasks.size(); i++) {
                if (tasks.get(i).getEndTime().before(new Date()) || tasks.get(i).getRemainPart() <= 0) {
                    EVETask task = tasks.get(i);

                    //随机生成获奖号
                    int result = (int) (Math.random() * task.getPart()) + 1;
                    task.setWinNumber(result);
                    //获取抽奖项目

                    Map<String, Object> voteQueryMap = new HashMap<String, Object>();
                    queryMap.put("taskId", task.getId());
                    List<EVEVote> votes = voteCommDao.criteriaQuery(EVEVote.class, voteQueryMap, null, null, null);
                    for (EVEVote vote : votes) {
                        vote.setResult(result);
                        if (vote.getVote() != 0 && vote.getVote() == vote.getResult()) {
                            vote.setWin(true);
                        }
                    }

                    //将抽奖任务加入已完成序列
                    task.setDone(1);
                    tasks.remove(task);
                    hasDoneTasks.add(task);

                }

            }
        }

    }

    public List<EVETask> getNowTasks() {
        return nowTasks;
    }
}
