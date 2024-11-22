package com.backend.backend.utils;

import org.springframework.stereotype.Component;

@Component
public class RegexValidor {

    public boolean isValidEmail(String email) {
        return email != null && email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

    }

}
