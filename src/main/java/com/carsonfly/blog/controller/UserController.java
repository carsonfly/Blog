package com.carsonfly.blog.controller;


import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.UserInfo;
import com.carsonfly.blog.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/27.
 */
@Controller
public class UserController {


    @RequestMapping("manager")
    public String hello() {
        return "login";
    }

    @RequestMapping("/login.do")
    public
    @ResponseBody
    Map login(HttpSession session, HttpServletResponse response, @RequestParam String name, @RequestParam String password) {
        UserService service = new UserService();
        UserInfo user = service.Login(name, password);
        Map<String, Object> map = new HashMap<String, Object>();
        if (user != null) {
            System.out.println("success");
            map.put("success", "true");

        } else {
            System.out.println("fail");
            map.put("success", "false");

        }
        return map;
    }

    @RequestMapping("mainView")
    public String mainView() {
        return "main_view";
    }

    @RequestMapping("/user/all")
    @ResponseBody
    public Map getAllUser() {
        Map<String, Object> result = new HashMap<String, Object>();
        CommDao<UserInfo> dao = CommDao.getInstance();
        List<UserInfo> users = dao.HQLQuery("from UserInfo UserInfo", null);
        result.put("rows", users);
        return result;
    }

    @RequestMapping("/user/save")
    @ResponseBody
    public Map saveArticle(@RequestParam String userName,
                           @RequestParam String userPassword,
                           @RequestParam(required = false) String id

    ) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            UserInfo userInfo = new UserInfo();
            try {
                userInfo.setId(Integer.parseInt(id));
            } catch (Exception e) {
            }

            userInfo.setUserName(userName);
            userInfo.setUserPassword(userPassword);
            System.out.println(userInfo);
            CommDao<UserInfo> dao = CommDao.getInstance();
            dao.SaveOrUpdate(userInfo);
            result.put("success", "true");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "false");
        }

        return result;

    }

    @RequestMapping("/user/delete")
    @ResponseBody
    public Map deleteUser(@RequestParam String id) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {

            CommDao<UserInfo> dao = CommDao.getInstance();
            dao.HQLExcute("delete from UserInfo where id =" + id);
            result.put("success", "true");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "false");
        }

        return result;

    }
}
