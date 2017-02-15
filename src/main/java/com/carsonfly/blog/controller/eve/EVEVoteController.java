package com.carsonfly.blog.controller.eve;


import com.alibaba.fastjson.JSON;
import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVEVote;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/27.
 */
@Controller
@RequestMapping("eve")
public class EVEVoteController {


    @RequestMapping("/vote/all.do")
    public
    @ResponseBody
    Map getAllAwards(@RequestParam(required = false) Integer userId) {
        List<EVEVote> EVEAward = null;
        if (userId != null) {
            EVEAward = CommDao.getInstance().HQLQuery("from EVEVote EVEVote where player=?", new String[]{userId.toString()});
        } else {
            EVEAward = CommDao.getInstance().HQLQuery("from EVEVote EVEVote", null);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", EVEAward);
        return map;
    }

    @RequestMapping("/vote/delete.do")
    public
    @ResponseBody
    Map deleteAward(@RequestParam(required = true) Integer id) {
        CommDao<EVEVote> dao = CommDao.getInstance();
        dao.SQLExcute("delete from EVEVote where id=" + id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }

    @RequestMapping("/vote/update.do")
    public
    @ResponseBody
    Map updateAward(@RequestParam(required = true) Map<String, String> alterVotes) {
        CommDao<EVEVote> dao = CommDao.getInstance();
        System.out.println(alterVotes.get("alterVotes"));
        String userString = alterVotes.get("alterVotes");
        List<EVEVote> datas = JSON.parseArray(userString, EVEVote.class);
        for (EVEVote data : datas) {
            dao.SaveOrUpdate(data);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }
}
