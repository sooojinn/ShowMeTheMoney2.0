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

        String reactUrl="https://localhost:3000";

        //Configure form login
        http.formLogin(auth -> auth
                .loginPage(reactUrl+"/login")
                .loginProcessingUrl("/loginProc")
                .failureHandler(new MyFailureHandler()));

        //Configure authorization rules
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/","/login/**", "/loginProc", "/join/**", "/joinProc").permitAll()//모든 사용자에게 오픈
                .requestMatchers("/write/**", "/accountbook/**","/transactions/**").permitAll() //USER role을 부여받았을떄만오픈
                .requestMatchers(HttpMethod.PUT, "/accountbook/**").hasRole("USER")
                .anyRequest().permitAll());

        //Session management
        http.sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

        //Configrue logout
        http.logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/"));

        //Disable CSRF
        http.csrf(AbstractHttpConfigurer::disable);


        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

