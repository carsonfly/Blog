package com.carsonfly.blog.controller;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.Article;
import com.carsonfly.blog.pojo.Category;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by carson on 2016/5/31.
 */
@Controller
@RequestMapping("/article")
public class ArticleController {
    @RequestMapping("/all")
    @ResponseBody
    public Map getAllArticle() {
        Map<String, Object> result = new HashMap<String, Object>();
        CommDao<Article> dao = CommDao.getInstance();
        List<Article> articles = dao.HQLQuery("from Article article", null);
        result.put("rows", articles);
        return result;
    }

    @RequestMapping("/select")
    @ResponseBody
    public Map selectArticle(@RequestParam String hql) {
        Map<String, Object> result = new HashMap<String, Object>();
        CommDao<Article> dao = CommDao.getInstance();
        List<Article> articles = dao.HQLQuery(hql, null);
        result.put("rows", articles);
        return result;
    }

    @RequestMapping("/selectDate")
    @ResponseBody
    public Map selectArticleByDate(@RequestParam String hql, @RequestParam long date1, @RequestParam long date2) {
        Map<String, Object> result = new HashMap<String, Object>();
        CommDao<Article> dao = CommDao.getInstance();
        List<Article> articles = dao.getSession().createQuery("from Article article where updateTime between ? and ?").setDate(0, new Date(date1)).setDate(1, new Date(date2)).list();

        result.put("rows", articles);
        return result;
    }

    @RequestMapping("/all/category")
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
    public Map saveArticle(@RequestParam(required = false) String title,
                           @RequestParam(required = false) String content,
                           @RequestParam(required = false) String writer,
                           @RequestParam(required = false) String id,
                           @RequestParam(required = false) String category
    ) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            Article article = new Article();
            try {
                article.setId(Integer.parseInt(id));
            } catch (Exception e) {
                article.setId(null);
            }

            article.setTitle(title);
            article.setContent(content);
            article.setWriter(writer);
            article.setCategory(category);
            article.setUpdateTime(new Date());
            System.out.println(article);
            CommDao<Article> dao = CommDao.getInstance();
            dao.SaveOrUpdate(article);
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

            CommDao<Article> dao = CommDao.getInstance();
            dao.HQLExcute("delete from Article where id =" + id);
            result.put("success", "true");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", "false");
        }

        return result;

    }
}
