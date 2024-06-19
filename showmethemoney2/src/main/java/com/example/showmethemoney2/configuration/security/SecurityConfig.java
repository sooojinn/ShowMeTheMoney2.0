package com.example.showmethemoney2.configuration.security;


import com.example.showmethemoney2.configuration.security.filter.CustomAuthenticationFilter;
import com.example.showmethemoney2.configuration.security.handler.CustomLoginSuccessHandler;
import com.example.showmethemoney2.configuration.security.provider.CustomAuthenticationProvider;
import com.example.showmethemoney2.configuration.security.service.CustomOAuth2UserService;
import com.example.showmethemoney2.configuration.security.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/loginPage", "loginProc", "/join", "/join/username/duplication", "/joinProc", "/login/oauth2/code/google", "/login").permitAll()
//                        .requestMatchers("/api/**").hasRole("USER")
//                        .requestMatchers("/transactions/**").permitAll()
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginPage("/loginPage")
                        .loginProcessingUrl("/loginProc")
//                        .defaultSuccessUrl("/",true)
//                        .failureUrl("/failed")
//                        .usernameParameter("email")
//                        .passwordParameter("password")
//                        .successHandler((request, response, authentication) -> {
//                            System.out.println("authentication : " + authentication);
//                            var context = SecurityContextHolder.getContext();
//                            var auth = context.getAuthentication();
//                            context.setAuthentication(auth);
//
//                            response.setStatus(200);
//                        })
                                .successHandler(customLoginSuccessHandler())
                        .failureHandler((request, response, exception) -> {
                            System.out.println("exception : " + exception.getMessage());
                            response.setStatus(400);
                        })
                        .permitAll()

                ).logout((config) -> {
                    config.logoutUrl("/logout").clearAuthentication(true);
                })
                .oauth2Login((oauth) -> {
                    oauth
                            .loginPage("/login")
                            .successHandler(customLoginSuccessHandler());
                })
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement((configurer -> {
                    configurer.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                            .maximumSessions(1);
                }))
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

//    @Bean
//    public SecurityContextPersistenceFilter securityContextPersistenceFilter() {
//        SecurityContextPersistenceFilter filter = new SecurityContextPersistenceFilter();
//        filter.setSecurityContextHolderStrategy(new HttpSessionSecurityContextRepository());
//        return filter;
//    }






    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/loginProc");
        customAuthenticationFilter.setAuthenticationSuccessHandler(customLoginSuccessHandler());
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }


//    @Bean
//    public AuthenticationManager authenticationManager() throws Exception {
//        AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();
//        return authenticationConfiguration.getAuthenticationManager();
//    }

//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }

    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider();
    }

    @Autowired
    AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        ProviderManager providerManager = (ProviderManager) authenticationConfiguration.getAuthenticationManager();
        providerManager.getProviders().add(this.customAuthenticationProvider());
        return authenticationConfiguration.getAuthenticationManager();
    }
//    @Bean
//    public AuthenticationManager authenticationManager() throws Exception {
////        AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();
////        return authenticationConfiguration.getAuthenticationManager();
//        var bulder = new AuthenticationManagerBuilder();
//        var manager = bulder.authenticationProvider(customAuthenticationProvider());
//        return manager.build();
//    }

    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService customUserDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public CustomLoginSuccessHandler customLoginSuccessHandler() {
        return new CustomLoginSuccessHandler();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

