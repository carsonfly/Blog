package com.carsonfly.blog.controller.eve;


import com.alibaba.fastjson.JSON;
import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVEPlayer;
import com.carsonfly.blog.service.eve.EVEUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/27.
 */
@Controller
@RequestMapping("eve")
public class EVEUserController {


    @RequestMapping("manager")
    public ModelAndView manager() {
        return new ModelAndView("EVEManagerView");
    }

    @RequestMapping("/login.do")
    public
    @ResponseBody
    Map login(HttpSession session, HttpServletResponse response, @RequestParam String name, @RequestParam String password) throws UnsupportedEncodingException {
        EVEUserService service = EVEUserService.getInstance();


        Map<String, Object> map = service.EVELogin(session, name, password);

        return map;
    }

    @RequestMapping("/user/register.do")
    public
    @ResponseBody
    Map register(HttpSession session,
                 @RequestParam String name,
                 @RequestParam String password,
                 @RequestParam(required = false) String player,
                 @RequestParam(required = false) Integer id,
                 @RequestParam(required = false) Double isk,
                 @RequestParam(required = false) Integer hashCode
    ) {
        EVEUserService service = EVEUserService.getInstance();
        Integer validateHashCode = (Integer) session.getAttribute(name);
        System.out.println(validateHashCode);
        if (id == null || id == 0) {
            Map<String, Object> map = service.register(name, password);
            return map;
        } else {
            if (validateHashCode != null && hashCode != null && hashCode.equals(validateHashCode)) {

                EVEPlayer user = new EVEPlayer();
                user.setId(id);
                user.setName(name);
                user.setPassword(password);
                user.setPlayer(player);
                user.setIsk(isk);
                CommDao<EVEPlayer> dao = CommDao.getInstance();
                dao.SaveOrUpdate(user);
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("success", "true");
                return map;

            } else {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("msg", "验证失败,请重新登录");
                map.put("success", "false");
                return map;
            }
        }


    }

    @RequestMapping("/user/all.do")
    public
    @ResponseBody
    Map getAllUsers() throws UnsupportedEncodingException {
        EVEUserService service = EVEUserService.getInstance();
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("rows", service.getAllUsers());
        return map;
    }

    @RequestMapping("/user/delete.do")
    public
    @ResponseBody
    Map deleteUser(@RequestParam(required = true) Integer id) {
        CommDao<EVEPlayer> dao = CommDao.getInstance();
        dao.SQLExcute("delete from eveplayer where id=" + id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }

    @RequestMapping("/user/update.do")
    public
    @ResponseBody
    Map updateUser(@RequestParam(required = true) Map<String, String> alterUsers) throws UnsupportedEncodingException {
        CommDao<EVEPlayer> dao = CommDao.getInstance();
        //System.out.println(alterUsers.get("alterUsers"));
        String userString = alterUsers.get("alterUsers");
        List<EVEPlayer> players = JSON.parseArray(userString, EVEPlayer.class);
        for (EVEPlayer player : players) {
            player.setPlayer(URLEncoder.encode(player.getPlayer(), "utf8"));
            dao.SaveOrUpdate(player);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "true");
        return map;
    }
}
