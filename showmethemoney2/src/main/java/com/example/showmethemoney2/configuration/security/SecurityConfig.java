package com.example.showmethemoney2.configuration.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig{


    //접근 권한 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authorize) -> authorize
                .requestMatchers("/", "/login/**", "/loginProc", "/join/**", "/joinProc").permitAll()//모든 사용자에게 오픈
                .requestMatchers("/write/**", "/calendar/**", "/statics/**", "/users/**").hasRole("USER") //USER role을 부여받았을떄만오픈
                .requestMatchers(HttpMethod.PUT, "/users/**").hasRole("USER")
                .anyRequest().authenticated());

        http.formLogin(auth -> auth.loginPage("/login")
                        .defaultSuccessUrl("/calendar")
                .loginProcessingUrl("/loginProc")
                .failureHandler(new MyFailureHandler())
                .permitAll())
                .cors(cors->cors.configurationSource(corsConfigurationSource()));

        /*
        http.oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                        .userInfoEndpoint()
                                .userService(CustomOAuth2UserService));


         */

        http.logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/"));
        http.csrf((x) -> x.disable());
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // 모든 오리진 허용
        configuration.addAllowedMethod("*"); // 모든 메서드 허용
        configuration.addAllowedHeader("*"); // 모든 헤더 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}

