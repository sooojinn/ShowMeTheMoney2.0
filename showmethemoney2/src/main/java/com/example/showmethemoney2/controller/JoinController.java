package com.example.showmethemoney2.controller;

import com.example.showmethemoney2.dao.dto.JoinDTO;
import com.example.showmethemoney2.service.JoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class JoinController {
    @Autowired
    private JoinService joinService;


    @PostMapping("/joinProc")
    public ResponseEntity<Void> joinProcess(@RequestBody JoinDTO joinDTO) {
        System.out.println(joinDTO.getEmail());
        joinService.joinProcess(joinDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //중복 회원인지 아닌지 보내줌
    @PostMapping("/join/username/duplication")
    public ResponseEntity<String> DuplicateCheck(@RequestBody JoinDTO dto) {
        //중복이라서 가입못함 -> true, 중복X 가입가능 -> false
        boolean res = joinService.isDuplicateUsername(dto.getEmail());
        return new ResponseEntity<>(String.valueOf(res), HttpStatus.OK);
    }
}


