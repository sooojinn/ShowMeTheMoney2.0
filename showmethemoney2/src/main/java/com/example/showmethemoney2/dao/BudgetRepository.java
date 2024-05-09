package com.example.showmethemoney2.dao;

import com.example.showmethemoney2.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget findByUsernameAndYearAndMonth(String username, int year, int month);
}
