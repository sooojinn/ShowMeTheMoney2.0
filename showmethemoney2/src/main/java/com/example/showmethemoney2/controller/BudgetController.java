package com.example.showmethemoney2.controller;


import com.example.showmethemoney2.dao.dto.BudgetDTO;
import com.example.showmethemoney2.entity.Budget;
import com.example.showmethemoney2.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;



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
        Integer budgetData = budgetService.getBudget(username, year, month);

        if (budgetData == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("null");
        }

        return ResponseEntity.ok(String.valueOf(budgetData));

    }


    //예산 저장
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

    //예산 수정
    @PutMapping("/budget")
    public ResponseEntity<Budget> updateBudget(@RequestBody BudgetDTO budgetDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Budget updatedBudget = budgetService.updateBudget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getBudget());

        return ResponseEntity.ok(updatedBudget);
    }
}

