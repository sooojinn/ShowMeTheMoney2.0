package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.JoinDTO;
import com.example.showmethemoney2.dao.UserRepository;
import com.example.showmethemoney2.entity.UserEntity;
import com.example.showmethemoney2.myexception.InvalidUserAccessException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //중복 회원 검사 로직(true면 중복인거)
    public boolean isDuplicateUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    //회원가입 로직
    public void joinProcess(JoinDTO joinDTO) {
        if(isDuplicateUsername(joinDTO.getUsername())) {
            throw new InvalidUserAccessException("이미 사용하고 있는 유저명입니다.","/join");
        }

        UserEntity data = new UserEntity();

        data.setUsername(joinDTO.getUsername());
//        data.setPassword(bCryptPasswordEncoder.encode(joinDTO.getPassword()));
        data.setPassword((joinDTO.getPassword()));
        data.setRole("ROLE_USER");

        userRepository.save(data);
    }
}

