package com.example.showmethemoney2.dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BudgetDTO {
    private int id;
    private String date;
    private String division;
    private int money;
    private double budget;

}
