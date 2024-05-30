package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.CalendarDTO;
import com.example.showmethemoney2.dao.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;
import java.util.stream.Collectors;

import com.example.showmethemoney2.entity.Calendar;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@Transactional
public class CalendarService {
    private final CalendarRepository calendarRepository;

    @Autowired
    public CalendarService(CalendarRepository calendarRepository)
    {this.calendarRepository = calendarRepository;
    }

    // #CREATE #UPDATE 내역 저장, 내역 변경
    //저장 수정
    public void saveCal(String username, CalendarDTO calendarDTO) {
        //    Calendar calendar = calendarRepository.findById(calendarDTO.getId()).orElseGet(Calendar::new);
        Calendar calendar = new Calendar();
        String[] dates = calendarDTO.getDate().split("-");

        calendar.setUsername(username);
        calendar.setYear(Integer.parseInt(dates[0]));
        calendar.setMonth(Integer.parseInt(dates[1]));
        calendar.setDay(Integer.parseInt(dates[2]));
        calendar.setDivision(calendarDTO.getDivision());
        calendar.setMemo(calendarDTO.getMemo());
        calendar.setMoney(calendarDTO.getMoney());
        calendar.setCategory(calendarDTO.getCategory());

        calendarRepository.save(calendar);
    }

    // #READ 내역 조회
    @Cacheable("calendar")
    public Calendar viewCal(int calid) {
        var test = calendarRepository.findById(calid)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 내역을 찾을 수 없습니다. :" + calid));
        return test;
    }

    public void modifyCal(int calid, CalendarDTO calendarDTO, String username) {
        Optional<Calendar> optionalCalendar = calendarRepository.findById(calid);

        if(optionalCalendar.isPresent()) {
            Calendar calendar = optionalCalendar.get();

            String[] dates = calendarDTO.getDate().split("-");

            calendar.setUsername(username);
            calendar.setYear(Integer.parseInt(dates[0]));
            calendar.setMonth(Integer.parseInt(dates[1]));
            calendar.setDay(Integer.parseInt(dates[2]));
            calendar.setDivision(calendarDTO.getDivision());
            calendar.setMemo(calendarDTO.getMemo());
            calendar.setMoney(calendarDTO.getMoney());
            calendar.setCategory(calendarDTO.getCategory());

            calendarRepository.save(calendar);
        } else {
            throw new NoSuchElementException("해당하는 내역을 찾을 수 없습니다: " + calid);
        }
    }

    // #DELETE 내역 삭제
    public void deleteCal(int calid) {
        calendarRepository.deleteById(calid);
    }

    //사용자의 모든 내역을 dto로 변환후 list에 담아 list를 반환
    public List<CalendarDTO> getUsersAllCal(String username, int year, int month, int day) {
        List<Calendar> beforeDTO = calendarRepository.SearchUser(username, year, month, day);
        List<CalendarDTO> afterDTO = new ArrayList<>();
        for (Calendar cal : beforeDTO) {
            afterDTO.add(toDTO(cal));
        }
        //id 역순(최신순)정렬
        afterDTO.sort(Comparator.comparingInt(CalendarDTO::getId).reversed());
        return afterDTO;
    }

    //엔티티를 DTO로 변환
    public CalendarDTO toDTO(Calendar calendar) {
        CalendarDTO dto = new CalendarDTO();
        dto.setId(calendar.getCalid());
        dto.setDate(String.format("%d-%d-%d",calendar.getYear(),calendar.getMonth(), calendar.getDay()));
        dto.setDivision(calendar.getDivision());
        dto.setMoney(calendar.getMoney());
        dto.setCategory(calendar.getCategory());
        dto.setMemo(calendar.getMemo());
        return dto;
    }

    //월별 총수입 or 총지출
    @Cacheable("monthlyTotal")
    public int[] monthlyTotal(String username, int year, int month) {
        List<Calendar> calendars = calendarRepository.MonthlyCal(username,year,month);
        //total[0] = incometotal, total[1]=expensetotal
        int[] total = {0,0};
        for(Calendar cal : calendars) {
            if(cal.getDivision().equals("income")) total[0]+=cal.getMoney();
            else if(cal.getDivision().equals("expense")) total[1]+=cal.getMoney();
            else throw new IllegalArgumentException("요청이 유효하지 않습니다.");
        }
        return total;
    }

    //로그인한 유저의 카테고리당 월별 총액 조회
    @Cacheable("categoryMonthlyTotal")
    public Map<String,Number> categoryMonthlyTotal(
            @RequestParam("username") String username,
        @RequestParam("year") int year,
        @RequestParam("month") int month,
        @RequestParam("division") String division) {

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
    }

    public List<CalendarDTO> getUserTransactionsForMonth(String username, int year, int month) {
        List<Calendar> calendars = calendarRepository.findByUserAndMonthYear(username, year, month);
        return calendars.stream()
                .map(calendar -> {
                    CalendarDTO calendarDTO = new CalendarDTO();
                    calendarDTO.setId(calendar.getCalid());
                    calendarDTO.setDate(String.format("%d-%d-%d",calendar.getYear(),calendar.getMonth(), calendar.getDay()));
                    calendarDTO.setDivision(calendar.getDivision());
                    calendarDTO.setMoney(calendar.getMoney());
                    calendarDTO.setCategory(calendar.getCategory());
                    calendarDTO.setMemo(calendar.getMemo());
                    return calendarDTO;
                })
                .collect(Collectors.toList());
    }
}

