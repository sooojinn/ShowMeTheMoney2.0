package com.example.showmethemoney2.configuration.cache;

import com.example.showmethemoney2.configuration.security.MyUserDetails;
import org.springframework.context.ApplicationListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {
    private final StringRedisTemplate stringRedisTemplate;

    public AuthenticationSuccessListener(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate=stringRedisTemplate;
    }

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Object principal = event.getAuthentication().getPrincipal();
        String username;
        if(principal instanceof MyUserDetails myUserDetails) {
            username = myUserDetails.getUsername();
        }
        else if(principal instanceof OAuth2User oAuth2User) {
            username = oAuth2User.getAttribute("username");
        }
        else throw new IllegalStateException("유효하지 않은 principal로 접근 중입니다.");
        stringRedisTemplate.opsForValue().set("currentUser"+username,"true");
    }
}
