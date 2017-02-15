package com.carsonfly.blog.test;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.eve.EVETransferAccountJson;

/**
 * Created by carson on 2016/7/26.
 */
public class TestHibernate {
    static CommDao<EVETransferAccountJson> dao = CommDao.getInstance();

    public static void main(String[] args) {
        EVETransferAccountJson json = new EVETransferAccountJson();
        json.setItem("亖前夜亖 ");
        dao.SaveOrUpdate(json);
    }

}
