package com.example.showmethemoney2.dao;

import com.example.showmethemoney2.dao.dto.CategoryTotalDTO;
import com.example.showmethemoney2.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar,Integer> {

    @Query(value = "SELECT c FROM Calendar c WHERE c.username = :username AND c.year = :year AND c.month = :month")
    List<Calendar> findByUserAndMonthYear(String username, int year, int month);

    @Query(value = "SELECT c FROM Calendar c WHERE c.username = :username AND c.year = :year AND c.month = :month AND c.day = :day")
    List<Calendar> SearchUser(String username, int year, int month, int day);


    @Query(value = "SELECT c FROM Calendar c " +
            "WHERE c.username = :username AND c.year = :year AND c.month= :month")
    List<Calendar> MonthlyCal(String username, int year, int month);

    @Query("SELECT SUM(c.money) FROM Calendar c WHERE c.username = :username AND c.division = 'EXPENSE' AND c.year = :year AND c.month = :month")
    Double findTotalExpense(@Param("username") String username, @Param("year") int year, @Param("month") int month);

    @Query("SELECT SUM(c.money) FROM Calendar c WHERE c.username = :username AND c.division = 'INCOME' AND c.year = :year AND c.month = :month")
    Double findTotalIncome(@Param("username") String username, @Param("year") int year, @Param("month") int month);

    @Query("SELECT c.category, SUM(c.money) FROM Calendar c WHERE c.username = :username AND c.division = :division AND c.year = :year AND c.month = :month GROUP BY c.category")
    List<Object[]> findCategoryTotals(@Param("username") String username, @Param("division") String division, @Param("year") int year, @Param("month") int month);

//    @Query(value = "SELECT c.category AS cate, SUM(c.money) AS total FROM Calendar c "
//            + "WHERE c.username = :username AND c.division = :division AND c.year = :year AND c.month = :month"
//            + " GROUP BY c.category")
//    List<CategoryTotalDTO> findCategoryTotals(@Param("username") String username,
//                                             @Param("division") String division,
//                                             @Param("year") int year,
//                                             @Param("month") int month);
}
