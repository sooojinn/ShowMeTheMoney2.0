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
    public Integer getBudget(String username, int year, int month) {
        List<Budget> budgets = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
        if (budgets.isEmpty()) {
            return null; //예산 데이터가 없는 경우 null
        }
        Budget budget = budgets.get(0);
        return budget.getBudget();
    }


    //예산 저장
    public Budget saveBudget(String username, BudgetDTO budgetDTO) {
        int budgetAmount = budgetDTO.getBudget();
        Budget budget = new Budget(username, budgetDTO.getYear(), budgetDTO.getMonth(), budgetAmount);
        return budgetRepository.save(budget);

    }


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


