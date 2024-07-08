package com.example.showmethemoney2.dao;

import com.example.showmethemoney2.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("SELECT b FROM Budget b WHERE b.username = :username AND b.year = :year AND b.month = :month")
    List<Budget> findByUsernameAndYearAndMonth(String username, int year, int month);
}
