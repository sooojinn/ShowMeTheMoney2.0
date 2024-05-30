package com.example.showmethemoney2.controller;


import com.example.showmethemoney2.dao.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;

@Slf4j
@RestController
public class LoginController {

    @PostMapping("/loginProc")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {



        return ResponseEntity.ok("Login successful");
    }
//    @PostMapping(value="/loginPage")
//    public String login() {
//        log.info("test");
//        return "hello";
//    }



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



