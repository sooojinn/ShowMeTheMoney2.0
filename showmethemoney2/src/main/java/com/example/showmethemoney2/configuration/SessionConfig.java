//package com.example.showmethemoney2.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
//import org.springframework.session.web.http.CookieSerializer;
//import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
//import org.springframework.session.web.http.HttpSessionIdResolver;
//
//@Configuration
//@EnableRedisHttpSession
//public class SessionConfig {
//
//        @Bean
//        public HttpSessionIdResolver httpSessionIdResolver() {
//            return HeaderHttpSessionIdResolver.xAuthToken(); // 세션 ID를 HTTP 헤더에서 관리
//        }
//
//
//    @Bean
//    public CookieSerializer cookieSerializer() {
//        CustomCookieSerializer serializer = new CustomCookieSerializer();
//        serializer.setCookieName("SESSIONID");
//        serializer.setDomainName("localhost");
//        serializer.setCookiePath("/");
//        serializer.setUseSecureCookie(true);
//        serializer.setUseHttpOnlyCookie(true);
//        serializer.setSameSite("Strict");
//        return serializer;
//    }
//}
