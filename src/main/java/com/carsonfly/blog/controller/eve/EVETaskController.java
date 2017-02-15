package com.carsonfly.blog.controller.eve;


import com.alibaba.fastjson.JSON;
import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVEAward;
import com.carsonfly.blog.pojo.eve.EVETask;
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
public class EVETaskController {


    @RequestMapping("/task/all.do")
    public
    @ResponseBody
    Map getAllTasks() {
        List<EVETask> EVETasks = CommDao.getInstance().HQLQuery("from EVETask EVETask", null);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", EVETasks);
        System.out.println(EVETasks);
        return map;
    }

    @RequestMapping("/task/delete.do")
    public
    @ResponseBody
    Map deleteEVETask(@RequestParam(required = true) Integer id) {
        CommDao<EVEAward> dao = CommDao.getInstance();
        dao.SQLExcute("delete from EVETask where id=" + id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }

    @RequestMapping("/task/update.do")
    public
    @ResponseBody
    Map updateAward(@RequestParam(required = true) Map<String, String> alterTasks) {
        CommDao<EVETask> dao = CommDao.getInstance();
        System.out.println(alterTasks.get("alterTasks"));
        String userString = alterTasks.get("alterTasks");
        List<EVETask> datas = JSON.parseArray(userString, EVETask.class);
        for (EVETask data : datas) {
            dao.SaveOrUpdate(data);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }
}
