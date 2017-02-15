package com.carsonfly.blog.controller.eve;


import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVETask;
import com.carsonfly.blog.pojo.eve.EVEVote;
import com.carsonfly.blog.service.eve.EVETaskAndAccountService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by carson on 2016/5/27.
 */
@Controller
@RequestMapping("eve")
public class EVEVoteTaskController {


    @RequestMapping("/NowTask/all.do")
    public
    @ResponseBody
    Map getAll() {
        CommDao<EVETask> dao = CommDao.getInstance();
        List<EVETask> tasks = dao.HQLQuery("from EVETask task where done=0", null);
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).getEndTime().before(new Date())) {
                tasks.remove(tasks.get(i));
                i++;
            }

        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", tasks);
        return map;
    }

    @RequestMapping("/DoneTask/all.do")
    public
    @ResponseBody
    Map getAllDone() {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", EVETaskAndAccountService.getInstance().getHasDoneTasks());
        return map;
    }

    @RequestMapping("/WinnerVote/all.do")
    public
    @ResponseBody
    Map getAllWinner(@RequestParam(required = true) int taskId) {

        Map<String, Object> map = new HashMap<String, Object>();
        List<EVEVote> winVotes = new ArrayList<EVEVote>();
        List<EVEVote> votes = EVETaskAndAccountService.getInstance().getVoteByTaskId(taskId);
        for (EVEVote vote : votes) {
            if (vote.isWin()) {
                winVotes.add(vote);
            }
        }
        map.put("rows", winVotes);
        return map;
    }

    @RequestMapping("/Vote/vote.do")
    public
    @ResponseBody
    Map Vote(@RequestParam(required = true) int taskId,
             @RequestParam int userId,
             @RequestParam int voteNumber) throws UnsupportedEncodingException {

        Map<String, Object> map = new HashMap<String, Object>();

        return EVETaskAndAccountService.getInstance().Vote(taskId, userId, voteNumber);

    }
}
