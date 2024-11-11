package com.backend.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Désactive CSRF pour simplifier les tests (à réactiver en production)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll() // Autorise l'accès public à la racine ("/")
                        .anyRequest().permitAll()); // Permet l'accès sans authentification pour toutes les autres
                                                    // routes
        return http.build();
    }
}
