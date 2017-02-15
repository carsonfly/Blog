package com.carsonfly.blog.service.eve;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVEPlayer;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/31.
 */
public class EVEUserService {
    private EVEUserService() {
    }

    private static EVEUserService eveUserService;

    public static EVEUserService getInstance() {
        if (eveUserService == null) {
            eveUserService = new EVEUserService();
        }
        return eveUserService;
    }

    public Map<String, Object> EVELogin(HttpSession session, String name, String password) throws UnsupportedEncodingException {
        CommDao<EVEPlayer> dao = CommDao.getInstance();
        Map<String, Object> result = new HashMap<String, Object>();
        List<EVEPlayer> users =
                dao.HQLQuery
                        ("from EVEPlayer  EVEPlayer where name=? and password=?", new String[]{name, password});
        System.out.println(users);
        Date now = new Date();
        if (users != null && users.size() == 1) {
            users.get(0).setPlayer(URLDecoder.decode(users.get(0).getPlayer(), "utf8"));
            result.put("user", users.get(0));
            result.put("success", "true");
            result.put("hashCode", now.hashCode() + users.get(0).hashCode());
            session.setAttribute(users.get(0).getName(), now.hashCode() + users.get(0).hashCode());
            System.out.println(session.getAttribute(users.get(0).getName()));
        } else {
            result.put("success", "false");
        }

        return result;
    }

    public Map<String, Object> register(String name, String password) {
        Map<String, Object> result = new HashMap<String, Object>();

        CommDao<EVEPlayer> dao = CommDao.getInstance();
        List<EVEPlayer> users =
                dao.HQLQuery
                        ("from EVEPlayer  EVEPlayer where name=?", new String[]{name});
        if (users.size() == 0 && password != null && !password.equals("")) {
            dao.SaveOrUpdate(new EVEPlayer(name, password));
            result.put("success", "true");
        } else if (users.size() != 0) {
            result.put("success", "false");
            result.put("msg", "该用户名已存在");
        } else {
            result.put("success", "false");
            result.put("msg", "密码不为空");
        }


        return result;
    }

    public List<EVEPlayer> getAllUsers() throws UnsupportedEncodingException {
        CommDao<EVEPlayer> dao = CommDao.getInstance();
        List<EVEPlayer> users = dao.HQLQuery
                ("from EVEPlayer  EVEPlayer ", null);
        for (EVEPlayer player : users) {
            player.setPlayer(URLDecoder.decode(player.getPlayer(), "utf8"));
        }
        return users;
    }
}
