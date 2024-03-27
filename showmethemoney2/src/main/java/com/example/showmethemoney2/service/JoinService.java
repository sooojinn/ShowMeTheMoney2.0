package com.example.showmethemoney2.service;

import com.example.showmethemoney2.dao.JoinDTO;
import com.example.showmethemoney2.dao.UserRepository;
import com.example.showmethemoney2.entity.UserEntity;
import com.example.showmethemoney2.myexception.InvalidUserAccessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //중복 회원 검사 로직(true면 중복인거)
    public boolean isDuplicateUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    //회원가입 로직
    public void joinProcess(JoinDTO joinDTO) {
        if(isDuplicateUsername(joinDTO.getUsername())) {
            throw new InvalidUserAccessException("이미 사용하고 있는 유저명입니다.","/join");
        }
        String pattern1 = "^[A-Za-z\\d]{5,20}$";

        if(!joinDTO.getUsername().matches((pattern1))) throw new
                InvalidUserAccessException("아이디가 적합하지 않습니다. \n 아이디는 영문과 숫자만 포함하여 5-20글자로 구성되어야 합니다.","/join");

        String pattern2 = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";
        if(!joinDTO.getPassword().matches(pattern2)) throw new
                InvalidUserAccessException("비밀번호가 적합하지 않습니다.\n 영문 알파벳, 0-9사이의 숫자, " +
                "특수문자 [!@#$%^&*] 3가지를 모두 포함해서\n 8글자 이상 16글자 이하의 비밀번호로 다시 시도해주세요.","/join");

        if(!joinDTO.getPassword().equals(joinDTO.getPasswordcheck())) throw new InvalidUserAccessException(
                "입력하신 비밀번호와 비밀번호 확인 값이 다릅니다.","/join");

        UserEntity data = new UserEntity();

        data.setUsername(joinDTO.getUsername());
        data.setPassword(bCryptPasswordEncoder.encode(joinDTO.getPassword()));
        data.setRole("ROLE_USER");

        userRepository.save(data);
    }
}

