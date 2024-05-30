package com.example.showmethemoney2.dao;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BudgetDTO {
//    private int id;
    private int year;
    private int month;
    private String division;
    private int money;
    private double budget;

}
