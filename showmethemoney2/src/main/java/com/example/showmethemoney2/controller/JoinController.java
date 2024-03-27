package com.example.showmethemoney2.controller;

import com.example.showmethemoney2.dao.JoinDTO;
import com.example.showmethemoney2.service.JoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class JoinController {
    @Autowired
    private JoinService joinService;

    @GetMapping("/join")
    public String joinPage() {return "join";}

    @PostMapping("/joinProc")
    public String joinProcess(JoinDTO joinDTO) {
        System.out.println(joinDTO.getUsername());
        joinService.joinProcess(joinDTO);
        return "redirect:/login";
    }

    //중복 회원인지 아닌지 보내줌
    @PostMapping("/join/username/duplication")
    public ResponseEntity<String> DuplicateCheck(@RequestBody JoinDTO dto) {
        //중복이라서 가입못함 -> true, 중복X 가입가능 -> false
        boolean res = joinService.isDuplicateUsername(dto.getUsername());
        return new ResponseEntity<>(String.valueOf(res), HttpStatus.OK);
    }
}

