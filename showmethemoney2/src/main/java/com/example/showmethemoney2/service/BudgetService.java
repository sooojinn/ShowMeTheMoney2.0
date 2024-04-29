package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.BudgetRepository;
import com.example.showmethemoney2.entity.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;


@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;



    //예산 조회
    public String getBudgetDataAsString(String username, int year, int month) {
        try {
            Budget budget = budgetRepository.findByUsernameAndYearAndMonth(username, year, month);
            if (budget == null) {
                return "";
            }
            return String.format("User: %s, Year: %d, Month: %d, Budget: %.2f",
                    username, year, month, budget.getBudget());
        } catch (DataAccessException e) {
            throw new RuntimeException("Database access error occurred", e);
        }
    }

    //예산 저장
    public void saveBudget(String username, int year, int month, double budget) {
        try {
            Budget budgetEntity = new Budget(username, year, month, budget);
            budgetRepository.save(budgetEntity);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database access error occurred", e);
        }
    }
}

