package com.example.showmethemoney2.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.security.Principal;

@Controller
public class LoginController {


    @GetMapping("/login")
    public String loginPage(Model model, HttpSession session) {
        String errorMessage = (String)session.getAttribute("errorMessage");
        model.addAttribute("errorMessage", errorMessage);

        // 에러 메시지 사용 후 세션에서 제거
        session.removeAttribute("errorMessage");
        return "login";
    }

    @GetMapping("/calendar")
    public ResponseEntity<Void> UserName(Principal principal) {
        String username = principal.getName();
        String redirectUrl = "/calendar/users/" + username;
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path(redirectUrl).build().toUri())
                .build();
    }

    @GetMapping("/calendar/users/{username}")
    public String mainPage(@PathVariable String username) {
        //url 보안검증방식과 세션 관리 방식 중 url 보안검증 채택
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!username.equals(currentUsername)) {
            return "redirect:/error";
        }
        return "calendar";
    }


    @GetMapping("/username")
    public ResponseEntity<String> ServeUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        String jsonData = "{\"username\": \"" + currentUsername + "\"}";
        return ResponseEntity.ok().body(jsonData);
    }
}

