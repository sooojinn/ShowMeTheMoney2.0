package com.example.showmethemoney2.controller;


import com.example.showmethemoney2.dao.dto.BudgetDTO;
import com.example.showmethemoney2.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;

@RestController
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    //로그인한 유저의 해당 월의 예산조회

    @CrossOrigin(originPatterns ={ "*" })
    @GetMapping("/budget")
    public ResponseEntity<String> getBudget(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        var context = SecurityContextHolder.getContextHolderStrategy();
        var auth = context.getContext();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String budgetData = budgetService.getBudgetDataAsString(username, year, month);

        if (budgetData.isEmpty()) {
            return ResponseEntity.ok("\"\""); // 빈 문자열 반환
        }
        return ResponseEntity.ok("\"" + budgetData + "\""); // 문자열로 감싼 예산 데이터 반환
    }

//        if (budgetData.isEmpty()) {
//            return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
//        }




    @CrossOrigin(originPatterns ={ "*" })
    @PostMapping("/budget")
    public ResponseEntity<String> saveBudget(@RequestBody BudgetDTO budgetDTO) {
        var context = SecurityContextHolder.getContextHolderStrategy();
        var auth = context.getContext();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            budgetService.saveBudget(username, budgetDTO);
            return new ResponseEntity<>("성공적으로 저장되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("저장을 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

