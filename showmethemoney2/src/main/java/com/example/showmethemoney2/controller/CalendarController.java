package com.example.showmethemoney2.controller;

import com.example.showmethemoney2.dao.CalendarDTO;
import com.example.showmethemoney2.entity.Calendar;
import com.example.showmethemoney2.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
public class CalendarController {
    private final CalendarService calendarService;
    private final StringRedisTemplate stringRedisTemplate;
    @Autowired
    public CalendarController(CalendarService calendarService, StringRedisTemplate stringRedisTemplate) {
        this.calendarService = calendarService;
        this.stringRedisTemplate=stringRedisTemplate;
    }

    public String currentUsername() {
        //레디스에서 현재 사용자 이름을 확인
        return stringRedisTemplate.opsForValue().get("currentUser");
    }

    //Redis 서버에서 username 전달
    @GetMapping("/username")
    public ResponseEntity<String> ServeUsername() {
       String currentUsername = currentUsername();
        if (currentUsername != null) {
            // Redis에 사용자 이름이 존재하면 해당 이름을 반환
            String jsonData = "{\"username\": \"" + currentUsername + "\"}";
            return ResponseEntity.ok().body(jsonData);
        } else {
            // Redis에 사용자 이름이 존재하지 않으면 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in Redis.");
        }
    }
    //저장
    @PostMapping("/users/transactions")
    public ResponseEntity<Void> saveCalendar (@RequestBody String json) {
        String uuid = UUID.randomUUID().toString();
        stringRedisTemplate.opsForValue().set(currentUsername()+"_"+uuid,json);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/users/transactions/{calid}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable("calid") String calid) {
        try {
            stringRedisTemplate.opsForValue().getAndDelete(calid);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //조회
    @GetMapping("/users/transactions/{calid}")
    public ResponseEntity<String> viewCalendar(@PathVariable("calid") String calid) {
        try {
            String json = stringRedisTemplate.opsForValue().get(calid);
            return new ResponseEntity<>(json, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //수정
    @PutMapping("/users/transactions/{calid}")
    public ResponseEntity<Void> modifyCalendar(@PathVariable("calid") String calid,
                                               @RequestBody String json) {
        try {
           stringRedisTemplate.opsForValue().set(calid,json);
           return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //한 사용자의 모든 내역을 여러개의 제이슨데이터로 전송
    @GetMapping("/users/transactions")
    public ResponseEntity<Set<String>> loadUsersAllCal() {
        return new ResponseEntity<>(stringRedisTemplate.keys(currentUsername()+"*"),HttpStatus.OK);
    }

    //한 유저의 월별 총 수입/지출 통계
    @GetMapping("/users/statics/total")
    public Map<String, Object> monthlytotal(@RequestParam("year") int year,
                                            @RequestParam("month") int month) {
        int[] total = calendarService.monthlyTotal(currentUsername(),year,month);

        Map<String,Object> response = new HashMap<>();
        response.put("year", year);
        response.put("month", month);
        response.put("expense-total", total[1]); //지출 총계
        response.put("income-total",total[0]); //수입 총계

        return response;
    }

    //한 유저의 해당 월의 카테고리별 총 수입/지출 통계
    @GetMapping("/users/statics/category/{division}")
    public Map<String, Number> monthlyCategoryTotal(@PathVariable("username") String username,
                                                    @RequestParam("year") int year,
                                                    @RequestParam("month") int month,
                                                    @PathVariable("division") String division) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!currentUsername.equals(username)) throw new IllegalArgumentException("MonthlyCategorytotal : 접근 권한이 없습니다.");
        return calendarService.categoryMonthlyTotal(username, year, month, division);

    }
}

