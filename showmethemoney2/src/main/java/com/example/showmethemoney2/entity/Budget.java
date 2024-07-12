package com.example.showmethemoney2.entity;

//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.math.BigDecimal;
//
//@Entity
//@Getter
//@Setter
//public class Budget {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

//    private String username;
//    private int year;
//    private int month;
//    private int income;
//    private int expense;
//    private double budget;
//
//    public Budget() {}
//
//    public Budget(String username, int year, int month, double budget) {
//        this.username = username;
//        this.year = year;
//        this.month = month;
//        this.budget = budget;
//    }
//}


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

    @Entity
    @Getter
    @Setter
    @NoArgsConstructor
    public class Budget {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String username;
        private int year;
        private int month;
        private Integer budget;

        public Budget(String username, int year, int month, Integer budget) {
            this.username = username;
            this.year = year;
            this.month = month;
            this.budget = budget;
        }
    }
