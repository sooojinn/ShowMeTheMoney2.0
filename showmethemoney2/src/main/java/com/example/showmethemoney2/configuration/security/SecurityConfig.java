package com.example.showmethemoney2.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig{

    //접근 권한 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        String reactUrl="http://localhost:3000";

        http.formLogin(auth -> auth
                .loginPage(reactUrl+"/login")
                .loginProcessingUrl("/loginProc")
                .failureHandler(new MyFailureHandler()));

        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/","/login/**", "/loginProc", "/join/**", "/joinProc").permitAll()//모든 사용자에게 오픈
                .requestMatchers("/write/**", "/accountbook/**","transactions/**").hasRole("USER") //USER role을 부여받았을떄만오픈
                .requestMatchers(HttpMethod.PUT, "/accountbook/**").hasRole("USER")
                .anyRequest().authenticated());

        http.sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

        http.logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/"));
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

