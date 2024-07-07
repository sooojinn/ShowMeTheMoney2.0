package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.dto.BudgetDTO;
import com.example.showmethemoney2.dao.BudgetRepository;
import com.example.showmethemoney2.entity.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;


    //예산 조회
    public String getBudgetDataAsString(String username, int year, int month) {
        List<Budget> budgets = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
        if (budgets.isEmpty()) {
            return "";
        }
        Budget budget = budgets.get(0);
        int budgetAmount = (int) budget.getBudget();
        return Integer.toString(budgetAmount);
    }


//    public String getBudgetDataAsString(String username, int year, int month) {
//        try {
//            List<Budget> budgets = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
//            if (budgets.isEmpty()) {
//                return "";
//            }
//            Budget budget = budgets.get(0);
//            return budget.toString();
////            return String.format("%.2f",
////                    budget.getBudget());
//        } catch (DataAccessException e) {
//            throw new RuntimeException("Database access error occurred", e);
//        }


    //예산 저장
    public BudgetDTO saveBudget(String username, BudgetDTO budgetDTO) {
        Budget budget = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getBudget());
        Budget saveBudget = budgetRepository.save(budget);
        return new BudgetDTO(saveBudget.getYear(), saveBudget.getMonth(), saveBudget.getBudget());
    }
}

//        try {
//            Budget budgetEntity = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getBudgetData(), budgetDTO.getBudget());
//            budgetRepository.save(budgetEntity);
//        } catch (DataAccessException e) {
//            throw new RuntimeException("Database access error occurred", e);
//        }


