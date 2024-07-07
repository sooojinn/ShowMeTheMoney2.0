package com.example.showmethemoney2.controller;

import com.example.showmethemoney2.dao.dto.CalendarDTO;
import com.example.showmethemoney2.dao.dto.CategoryTotalDTO;
import com.example.showmethemoney2.dao.dto.MonthlyTotalDTO;
import com.example.showmethemoney2.entity.Calendar;
import com.example.showmethemoney2.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CalendarController {
    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }


    //해당 월 데이터 조회
    @CrossOrigin(origins ={ "http://localhost:3000" })
    @GetMapping("/transactions")
    public ResponseEntity<List<CalendarDTO>> loadUserTransactions(@RequestParam("year") int year,
                                                                  @RequestParam("month")int month) {

        var context = SecurityContextHolder.getContextHolderStrategy();
        var auth = context.getContext();
        String username = auth.getAuthentication().getName();


        List<CalendarDTO> caldto = calendarService.getUserTransactionsForMonth(username,year,month);
        return ResponseEntity.ok(caldto);
    }


    //저장
    @CrossOrigin(originPatterns ={ "*" })
    @PostMapping("/transactions")
    public ResponseEntity<String> saveCalendar(@RequestBody CalendarDTO calendardto) {
        var context = SecurityContextHolder.getContextHolderStrategy();
        var auth = context.getContext();
        String username = auth.getAuthentication().getName();
        try {
            calendarService.saveCal(username, calendardto);
            return new
                    ResponseEntity<>(HttpStatus.OK);
        } catch (HttpMessageNotReadableException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    //삭제
    @CrossOrigin(originPatterns ={ "*" })
    @DeleteMapping("/transactions/{calid}")
    public ResponseEntity<String> deleteCalendar(@PathVariable("calid") int calid) {
        calendarService.deleteCal(calid);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //조회
    @CrossOrigin(originPatterns ={ "*" })
    @GetMapping("/transactions/{calid}")
    public ResponseEntity<CalendarDTO> viewCalendar(
            @PathVariable("calid") int calid) {
        Calendar calendar = calendarService.viewCal(calid);
        CalendarDTO dto = calendarService.toDTO(calendar);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //수정
    @CrossOrigin(originPatterns ={ "*" })
    @PutMapping("/transactions/{calid}")
    public ResponseEntity<String> modifyCalendar(@RequestBody CalendarDTO calendarDTO,
                                                 @PathVariable("calid") int calid) {
        var context = SecurityContextHolder.getContextHolderStrategy();
        var auth = context.getContext();
        String username = auth.getAuthentication().getName();
        try {
            calendarService.modifyCal(calid, calendarDTO, username);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //로그인한 유저의 월별 수입/지출 총액 조회
    @CrossOrigin(originPatterns ={ "*" })
    @GetMapping("/statics/total")
    public ResponseEntity<Object> getMonthlyTotal(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        MonthlyTotalDTO result = calendarService.getMonthlyTotal(year, month);

        if (result == null) {
            Map<String, String> emptyResult = new HashMap<>();
            emptyResult.put("expense-total", "0");
            emptyResult.put("income-total", "0");
            return ResponseEntity.ok(emptyResult);
        }

        Map<String, String> response = new HashMap<>();
        response.put("year", String.valueOf(result.getYear()));
        response.put("month", String.valueOf(result.getMonth()));
        response.put("expense-total", String.valueOf(result.getExpenseTotal()));
        response.put("income-total", String.valueOf(result.getIncomeTotal()));

        return ResponseEntity.ok(response);
    }

    //한 유저의 해당 월의 카테코리별 총 수입/지출 통계
    @CrossOrigin(originPatterns ={ "*" })
    @GetMapping("/statics/category")
    public ResponseEntity<CategoryTotalDTO> getCategoryTotals(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        CategoryTotalDTO result = calendarService.getCategoryTotals(year, month);
        return ResponseEntity.ok(result);

    }
}





