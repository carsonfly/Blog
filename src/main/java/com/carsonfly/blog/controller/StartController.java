package com.carsonfly.blog.controller;

import com.carsonfly.blog.service.eve.EVETaskAndAccountService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by carson on 2016/6/12.
 */
@Controller
public class StartController {
    @RequestMapping("/")
    public ModelAndView StartView() {

        EVETaskAndAccountService.getInstance();
        return new ModelAndView("BlogView");
    }

    @RequestMapping("/BlogView")
    public ModelAndView BlogView() {

        EVETaskAndAccountService.getInstance();
        return new ModelAndView("BlogView");
    }

    @RequestMapping("/ExamView")
    public ModelAndView ExamView() {

        EVETaskAndAccountService.getInstance();
        return new ModelAndView("ExamView");
    }
}
