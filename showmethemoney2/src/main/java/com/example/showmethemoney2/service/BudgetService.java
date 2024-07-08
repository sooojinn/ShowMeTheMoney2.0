package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.dto.BudgetDTO;
import com.example.showmethemoney2.dao.BudgetRepository;
import com.example.showmethemoney2.entity.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;


    //예산 조회
    public int getBudget(String username, int year, int month) {
//        Optional<Budget> budget = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
//        return budget.map(Budget::getBudget).orElse(0);
//    }
//    public String getBudgetDataAsString(String username, int year, int month) {
        List<Budget> budgets = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
        if (budgets.isEmpty()) {
            return 0;
        }
        return budgets.get(0).getBudget();
    }
//        Budget budget = budgets.get(0);
//        int budgetAmount = (int) budget.getBudget();
//        return Integer.toString(budgetAmount);
//    }


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
    public Budget saveBudget(String username, BudgetDTO budgetDTO) {
        int budgetAmount = budgetDTO.getBudget();
        Budget budget = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetAmount);
        return budgetRepository.save(budget);
        //        double budgetValue = Double.parseDouble(budgetDTO.getBudget());
//        Budget budget = new Budget(username, Integer.parseInt(budgetDTO.getYear()), Integer.parseInt(budgetDTO.getMonth()), budgetValue);
//        Budget saveBudget = budgetRepository.save(budget);
//
//        return new BudgetDTO(String.valueOf(saveBudget.getYear()), String.valueOf(saveBudget.getMonth()), String.valueOf(saveBudget.getBudget()));
    }
//        Budget budget = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getBudget());
//        Budget saveBudget = budgetRepository.save(budget);
//        return new BudgetDTO(saveBudget.getYear(), saveBudget.getMonth(), saveBudget.getBudget());
//    }

    //예산 수정
    public Budget updateBudget(String username, int year, int month, int newBudget) {
        List<Budget> budgets = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
        if (budgets.isEmpty()) {
            throw new NoSuchElementException("해당 연도와 월에 대한 예산을 찾을 수 없습니다.");
        }
        Budget budget = budgets.get(0);
        budget.setBudget(newBudget);
        return budgetRepository.save(budget);
    }
}

//        try {
//            Budget budgetEntity = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getBudgetData(), budgetDTO.getBudget());
//            budgetRepository.save(budgetEntity);
//        } catch (DataAccessException e) {
//            throw new RuntimeException("Database access error occurred", e);
//        }


