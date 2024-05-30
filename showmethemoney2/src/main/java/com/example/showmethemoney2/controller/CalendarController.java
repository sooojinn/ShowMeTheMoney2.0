package com.example.showmethemoney2.controller;

import com.example.showmethemoney2.dao.CalendarDTO;
import com.example.showmethemoney2.entity.Calendar;
import com.example.showmethemoney2.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
public class CalendarController {
    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }


    //해당 월 데이터 조회
    @GetMapping("/transactions")
    public ResponseEntity<List<CalendarDTO>> loadUserTransactions(@RequestParam("year") int year,
                                                                  @RequestParam("month")int month) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
        List<CalendarDTO> caldto = calendarService.getUserTransactionsForMonth("currentUsername",year,month);
        return new ResponseEntity<>(caldto,HttpStatus.OK);
    }


    //저장
    @PostMapping("/transactions")
    public ResponseEntity<String> saveCalendar(@RequestBody CalendarDTO calendardto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUsername = authentication.getName();
        try {
            calendarService.saveCal("currentUsername", calendardto);
            return new
                    ResponseEntity<>("저장되었습니다.", HttpStatus.OK);
        } catch (HttpMessageNotReadableException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    //삭제
    @DeleteMapping("/transactions/{calid}")
    public ResponseEntity<String> deleteCalendar(@PathVariable("calid") int calid) {
        calendarService.deleteCal(calid);
        return new ResponseEntity<>("삭제되었습니다", HttpStatus.OK);
    }


    //조회
    @GetMapping("/transactions/{calid}")
    public ResponseEntity<CalendarDTO> viewCalendar(
            @PathVariable("calid") int calid) {
        Calendar calendar = calendarService.viewCal(calid);
        CalendarDTO dto = calendarService.toDTO(calendar);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //수정
    @PutMapping("/transactions/{calid}")
    public ResponseEntity<String> modifyCalendar(@RequestBody CalendarDTO calendarDTO,
                                                 @PathVariable("calid") int calid) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUsername = authentication.getName();
        try {
            calendarService.modifyCal(calid, calendarDTO, "currentUsername");
            return new ResponseEntity<>("수정되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("해당 내역을 찾을 수 없습니다", HttpStatus.NOT_FOUND);
        }
    }


    //한 유저의 월별 총 수입/지출 통계
    @GetMapping("/statics/total")
    public Map<String, Object> monthlytotal(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUsername = authentication.getName();

        int[] total = calendarService.monthlyTotal("currentUsername", year, month);

        Map<String, Object> response = new HashMap<>();
        response.put("year", year);
        response.put("month", month);
        response.put("expense-total", total[1]); //지출 총계
        response.put("income-total", total[0]); //수입 총계

        return response;
    }

    //한 유저의 해당 월의 카테코리별 총 수입/지출 통계
    @GetMapping("/statics/category")
    public Map<String, Number> monthlyCategoryTotal(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @RequestParam("division") String division) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUsername = authentication.getName();
        return calendarService.categoryMonthlyTotal("currentUsername", year, month, division);

    }
}





