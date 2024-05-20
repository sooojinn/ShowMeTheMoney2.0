package com.example.showmethemoney2.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;

@Controller
public class LoginController {

/*
    @GetMapping("/login")
    public String loginPage(Model model, HttpSession session) {
        String errorMessage = (String)session.getAttribute("errorMessage");
        model.addAttribute("errorMessage", errorMessage);

        // 에러 메시지 사용 후 세션에서 제거
        session.removeAttribute("errorMessage");
        return "login";
    }

 */

    //username에서 email로 수정
    @GetMapping("/calendar")
    public ResponseEntity<Void> userEmail(Principal principal) {
        String email = principal.getName();
        String encodedEmail = null;
        try {
            encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        String redirectUrl = "/calendar/users/" + encodedEmail;
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path(redirectUrl).build().toUri())
                .build();
    }

}

