package com.example.showmethemoney2.controller;


import com.example.showmethemoney2.dao.dto.BudgetDTO;
import com.example.showmethemoney2.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    //로그인한 유저의 해당 월의 예산조회

    @GetMapping("/budget")
    public ResponseEntity<String> getBudget(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || authentication.getName() == null) {
//            return new ResponseEntity<>("Unauthorized access", HttpStatus.UNAUTHORIZED);
//        }
//        String currentUsername = authentication.getName();

        String budgetData = budgetService.getBudgetDataAsString("currentUsername", year, month);

        if (budgetData.isEmpty()) {
            return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(budgetData, HttpStatus.OK);
    }

    @PostMapping("/budget")
    public ResponseEntity<String> saveBudget(@RequestBody BudgetDTO budgetDTO) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || authentication.getName() == null) {
//            return new ResponseEntity<>("인증되지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED);
//        }
//        String currentUsername = authentication.getName();

        try {
            budgetService.saveBudget("currentUsername", budgetDTO);
            return new ResponseEntity<>("성공적으로 저장되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("저장을 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

