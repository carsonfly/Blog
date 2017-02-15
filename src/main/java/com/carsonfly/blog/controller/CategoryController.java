package com.carsonfly.blog.controller;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.Category;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/31.
 */
@Controller
@RequestMapping("/category")
public class CategoryController {


    @RequestMapping("/all")
    @ResponseBody
    public Map getAllCategory() {
        Map<String, Object> result = new HashMap<String, Object>();
        CommDao<Category> dao = CommDao.getInstance();
        List<Category> categorys = dao.HQLQuery("from Category category", null);
        result.put("rows", categorys);
        return result;
    }

    @RequestMapping("/save")
    @ResponseBody
    public Map saveArticle(@RequestParam String value,
                           @RequestParam(required = false) String id
    ) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            Category category = new Category();
            try {
                category.setId(Integer.parseInt(id));
            } catch (Exception e) {
                category.setId(null);
            }

            category.setValue(value);


            System.out.println(category);
            CommDao<Category> dao = CommDao.getInstance();
            dao.SaveOrUpdate(category);
            result.put("success", "true");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "false");
        }

        return result;

    }

    @RequestMapping("/delete")
    @ResponseBody
    public Map deleteArticle(@RequestParam String id) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {

            CommDao<Category> dao = CommDao.getInstance();
            dao.HQLExcute("delete from Category where id =" + id);
            result.put("success", "true");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "false");
        }

        return result;

    }
}
