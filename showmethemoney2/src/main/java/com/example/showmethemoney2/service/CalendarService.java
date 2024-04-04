package com.example.showmethemoney2.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
public class CalendarService {
    private final StringRedisTemplate stringRedisTemplate;

    public CalendarService(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate=stringRedisTemplate;
    }

    public Set<String> monthlyCalendar(String username, int year,int month) {
        Set<String> calendars = stringRedisTemplate.keys(username+"*");

        Pattern pattern1 = Pattern.compile("year:\\s*" + year + ",\\s*month:\\s*" + month);
        Set<String> matchedStrings = new HashSet<>();
        for (String str : calendars) {
            Matcher matcher = pattern1.matcher(str);
            if (matcher.find()) {
                matchedStrings.add(str);
            }
        }
        return calendars;
    }
    //월별 총수입 or 총지출
    public int[] monthlyTotal(String username, int year, int month) {
        Set<String> calendars = monthlyCalendar(username,year,month);
        //total[0] = incometotal, total[1]=expensetotal
        int[] total = new int[2];
        Pattern pattern2 = Pattern.compile("money:\\s*(\\d+)");
        int money = 0;
        for(String s : calendars) {
            Matcher matcher2 = pattern2.matcher(s);
            if(matcher2.find()) {
                money=Integer.parseInt(matcher2.group(1));
            }
            int divisionIndex = s.indexOf("division: ");
            String divisionString = s.substring(divisionIndex,20);
            if(divisionString.startsWith("income")) {
                total[0]+=money;
            }else total[1]+=money;
        }
        return total;
    }

    //각각의 카테고리당 월별 지출/수입 합계
    public Map<String,Number> categoryMonthlyTotal(String username, int year, int month, String division) {
        Set<String> calendars = monthlyCalendar(username,year,month);
        Map<String, Number> categoryTotal = new HashMap<>();
        categoryTotal.put("year",year);
        categoryTotal.put("month",month);
        int[] monthlytotal = monthlyTotal(username, year, month);
        if(division.equals("income"))categoryTotal.put("total", monthlytotal[0]);
        else if(division.equals("expense"))categoryTotal.put("total",monthlytotal[1]);
        else throw new IllegalArgumentException("categoryMonthlyTotal : division이 유효하지 않습니다.");

        for(String s : calendars) {

        }
        /*
        //{food, income,3만} , {cafe, income, 2만} ...
        List<Object[]> afterGroupBy = calendarRepository.CategoryTotal(username,division,year,month);
        // 월별 총 수입/총 지출을 불러옴
        int[] monthlytotal = monthlyTotal(username, year, month);

        //{year: 2024, month: 3, total: 10000, food: 3000, cafe: 2000 ...}
        Map<String, Number> categoryTotal = new HashMap<>();
        categoryTotal.put("year",year);
        categoryTotal.put("month",month);

        if(division.equals("income"))categoryTotal.put("total", monthlytotal[0]);
        else if(division.equals("expense"))categoryTotal.put("total",monthlytotal[1]);
        else throw new IllegalArgumentException("categoryMonthlyTotal : division이 유효하지 않습니다.");

        for(Object[] obarr : afterGroupBy) {
            categoryTotal.put(obarr[0].toString(),(Long)obarr[1]);
        }
        return categoryTotal;

         */
    }

}

