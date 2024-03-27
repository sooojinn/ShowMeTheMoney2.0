package com.example.showmethemoney2.myexception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidUserAccessException.class)
    public String handleInvalidJoinProcException(InvalidUserAccessException e, Model model) {
        String errorMessage = e.getMessage();
        String redirectUrl = e.getRedirectUrl();
        model.addAttribute("errorMessage", errorMessage);
        model.addAttribute("redirectUrl",redirectUrl);
        return "error";
    }
}
