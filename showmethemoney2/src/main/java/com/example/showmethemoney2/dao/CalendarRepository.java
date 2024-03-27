package com.example.showmethemoney2.dao;

import com.example.showmethemoney2.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar,Integer> {
    @Query(value = "SELECT c FROM Calendar c WHERE c.username = :username AND c.year = :year AND c.month = :month AND c.day = :day")
    List<Calendar> SearchUser(String username, int year, int month, int day);

    @Query(value = "SELECT c FROM Calendar c " +
            "WHERE c.username = :username AND c.year = :year AND c.month= :month")
    List<Calendar> MonthlyCal(String username, int year, int month);

    @Query(value = "SELECT c.category AS cate, SUM(c.money) AS total FROM Calendar c "
            + "WHERE c.username = :username AND c.division = :division AND c.year = :year AND c.month = :month"
            + " GROUP BY cate")
    List<Object[]> CategoryTotal(String username, String division, int year, int month);
}
