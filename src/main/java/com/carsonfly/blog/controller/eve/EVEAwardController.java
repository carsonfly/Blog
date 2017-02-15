package com.carsonfly.blog.controller.eve;


import com.alibaba.fastjson.JSON;
import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVEAward;
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
public class EVEAwardController {


    @RequestMapping("/award/all.do")
    public
    @ResponseBody
    Map getAllAwards() {
        List<EVEAward> EVEAward = CommDao.getInstance().HQLQuery("from EVEAward EVEAward", null);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", EVEAward);
        return map;
    }

    @RequestMapping("/award/delete.do")
    public
    @ResponseBody
    Map deleteAward(@RequestParam(required = true) Integer id) {
        CommDao<EVEAward> dao = CommDao.getInstance();
        dao.SQLExcute("delete from EVEAward where id=" + id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }

    @RequestMapping("/award/update.do")
    public
    @ResponseBody
    Map updateAward(@RequestParam(required = true) Map<String, String> alterAwards) {
        CommDao<EVEAward> dao = CommDao.getInstance();
        System.out.println(alterAwards.get("alterAwards"));
        String userString = alterAwards.get("alterAwards");
        List<EVEAward> datas = JSON.parseArray(userString, EVEAward.class);
        for (EVEAward data : datas) {
            dao.SaveOrUpdate(data);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }
}
