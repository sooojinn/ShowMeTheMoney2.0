package com.example.showmethemoney2.controller;


import com.example.showmethemoney2.dao.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
public class LoginController {

    @PostMapping("/loginProc")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {

        return ResponseEntity.ok("Login successful");
    }

//    @GetMapping("/login2")
//    public ResponseEntity<?> oauthLogin() {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create("http://localhost:3000/accountbook/calendar"));
//        headers.setAccessControlAllowOrigin("http://localhost:3000");
//        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
//    }

//    @GetMapping("/login")
//    public ResponseEntity<?> oauthLoginSocial() {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create("http://localhost:3000/accountbook/calendar"));
//        headers.setAccessControlAllowOrigin("http://localhost");
//        headers.setAccessControlAllowHeaders(List.of("*"));
//        headers.setAccessControlAllowMethods(List.of(HttpMethod.GET, HttpMethod.DELETE,HttpMethod.POST , HttpMethod.PATCH, HttpMethod.PUT));
//        headers.setAccessControlAllowCredentials(true);
//        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
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



