package com.carsonfly.blog.service;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.UserInfo;
import com.carsonfly.blog.pojo.eve.EVEPlayer;

import java.util.List;

/**
 * Created by carson on 2016/5/31.
 */
public class UserService {
    public EVEPlayer EVELogin(String name, String password) {
        CommDao<EVEPlayer> dao = CommDao.getInstance();
        List<EVEPlayer> users =
                dao.HQLQuery
                        ("from EVEPlayer  EVEPlayer where name=? and password=?", new String[]{name, password});
        System.out.println(users);
        if (users != null && users.size() == 1)
            return users.get(0);
        else
            return null;
    }

    public UserInfo Login(String name, String password) {
        CommDao<UserInfo> dao = CommDao.getInstance();
        List<UserInfo> users =
                dao.HQLQuery
                        ("from UserInfo  userinfo where username=? and userpassword=?", new String[]{name, password});
        System.out.println(users);
        if (users != null && users.size() == 1)
            return users.get(0);
        else
            return null;
    }
}
