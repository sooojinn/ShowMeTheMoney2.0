package com.example.showmethemoney2.configuration.security;

import com.example.showmethemoney2.configuration.security.service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class OauthSecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    public OauthSecurityConfig(CustomOAuth2UserService customOAuth2UserService) {

        this.customOAuth2UserService = customOAuth2UserService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable());
        http
                .formLogin((login) -> login.disable());
        http
                .httpBasic((basic) -> basic.disable());
        http
                .oauth2Login((oauth2) -> oauth2
                        .loginPage("/login")
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService)));
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/oauth2/**", "/login/**", "/login/oauth2/code/google").permitAll()
                        .requestMatchers("/loginPage", "/loginProc", "/join", "/join/username/duplication", "/joinProc").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}