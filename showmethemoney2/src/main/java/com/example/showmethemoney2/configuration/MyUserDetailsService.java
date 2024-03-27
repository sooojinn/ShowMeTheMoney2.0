package com.example.showmethemoney2.configuration;

import com.example.showmethemoney2.dao.UserRepository;
import com.example.showmethemoney2.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userData = userRepository.findByUsername(username);
        if(userData!=null) {return new MyUserDetails(userData);}
        else throw new UsernameNotFoundException("입력하신 아이디 또는 비밀번호가 일치하지 않습니다.");
    }
}