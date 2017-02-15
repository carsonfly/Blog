package com.carsonfly.blog.controller.eve;


import com.alibaba.fastjson.JSON;
import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVETransferAccount;
import com.carsonfly.blog.pojo.eve.EVETransferAccountInformation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/27.
 */
@Controller
@RequestMapping("eve")
public class EVEIskController {


    @RequestMapping("/EVETransferAccountInformation/all.do")
    public
    @ResponseBody
    Map getEVETransferAccountInformation(@RequestParam(required = false) Integer userId) throws UnsupportedEncodingException {
        List<EVETransferAccountInformation> EVETransferAccountInformations;
        CommDao<EVETransferAccountInformation> dao = CommDao.getInstance();

        if (userId == null) {
            EVETransferAccountInformations = dao.
                    HQLQuery("from EVETransferAccountInformation EVETransferAccountInformation", null);
        } else {
            EVETransferAccountInformations = dao.
                    HQLQuery("from EVETransferAccountInformation EVETransferAccountInformation where userId=?", new String[]{userId.toString()});
        }
        for (EVETransferAccountInformation information : EVETransferAccountInformations) {
            if (information.getPlayerName() != null)
                information.setPlayerName(URLDecoder.decode(information.getPlayerName(), "utf8"));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rows", EVETransferAccountInformations);
        return map;
    }


    @RequestMapping("/isk/all.do")
    public
    @ResponseBody
    Map getAllISKs() {
        List<EVETransferAccount> EVETransferAccounts = CommDao.getInstance().HQLQuery("from EVETransferAccount EVETransferAccount", null);
        Map<String, Object> map = new HashMap<String, Object>();
        for (EVETransferAccount account : EVETransferAccounts) {
            try {
                account.setDescribe(URLDecoder.decode(account.getDescribe(), "utf8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        map.put("rows", EVETransferAccounts);
        return map;
    }

    @RequestMapping("/isk/delete.do")
    public
    @ResponseBody
    Map deleteISK(@RequestParam(required = true) Integer id) {
        CommDao<EVETransferAccount> dao = CommDao.getInstance();
        dao.SQLExcute("delete from EVETransferAccount where id=" + id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }

    @RequestMapping("/isk/update.do")
    public
    @ResponseBody
    Map updateISK(@RequestParam(required = true) Map<String, String> alterISKs) {
        CommDao<EVETransferAccount> dao = CommDao.getInstance();
        System.out.println(alterISKs.get("alterISKs"));
        String userString = alterISKs.get("alterISKs");
        List<EVETransferAccount> datas = JSON.parseArray(userString, EVETransferAccount.class);
        for (EVETransferAccount data : datas) {
            dao.SaveOrUpdate(data);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }
}
