package com.backend.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/", "/users/login", "/users/add", "/categories/list",
                                                                "/categories/details/{id}", "/articles/list",
                                                                "/articles/details/{id}",
                                                                "/galleries/list", "/galleries/details/{id}")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                // .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }

}
