package com.example.showmethemoney2.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MainController {
    @GetMapping("/")
    public String homePage() {
        return "home";
    }

    @GetMapping("/error")
    public String errorPage() {
        return "error";
    }

    @GetMapping("/write")
    public String writePage() {
        return "write";
    }

    @GetMapping("/statics/users/{username}")
    public String staticsPage(@PathVariable String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!username.equals(currentUsername)) {
            return "redirect:/error";
        }
        return "statics";
    }

    //수정작업을 수행하게 될 페이지로 리턴
    @GetMapping("/users/{username}/modify/transactions/{calid}")
    public String modifyPage() {

        return "modify";
    }


}

