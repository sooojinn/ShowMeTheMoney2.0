package com.example.showmethemoney2.configuration;

import org.springframework.session.web.http.DefaultCookieSerializer;

public class CustomCookieSerializer extends DefaultCookieSerializer {
    @Override
    public void setCookieName(String cookieName) {
        super.setCookieName(cookieName);
    }

    @Override
    public void setDomainName(String domainName) {
        super.setDomainName(domainName);
    }

    @Override
    public void setCookiePath(String cookiePath) {
        super.setCookiePath(cookiePath);
    }

    @Override
    public void setUseSecureCookie(boolean useSecureCookie) {
        super.setUseSecureCookie(useSecureCookie);
    }

    @Override
    public void setUseHttpOnlyCookie(boolean useHttpOnlyCookie) {
        super.setUseHttpOnlyCookie(useHttpOnlyCookie);
    }

    @Override
    public void setSameSite(String sameSite) {
        super.setSameSite(sameSite);
    }
}