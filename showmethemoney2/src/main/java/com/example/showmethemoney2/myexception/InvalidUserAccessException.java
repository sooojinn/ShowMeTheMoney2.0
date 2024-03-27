package com.example.showmethemoney2.myexception;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
public class InvalidUserAccessException extends RuntimeException{
    private final String redirectUrl;
    private static final Logger logger = LoggerFactory.getLogger(InvalidUserAccessException.class);
    public InvalidUserAccessException(String message, String redirectUrl) {
        super(message);
        this.redirectUrl=redirectUrl;
        logger.error("회원가입 중 발생한 오류 메세지 : " +message);}
}

