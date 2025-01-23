package com.backend.backend.service;

import com.backend.backend.config.JwtTokenProvider;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.utils.RegexValidor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RegexValidor regexValidor;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public boolean isEmailValid(String email) {
        return regexValidor.isValidEmail(email);
    }

    public String authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String token = jwtTokenProvider.createToken(user.getEmail());
            return token;
        }
        return null;
    }

    public User createUser(User user) {

        User emailExist = userRepository.findByEmail(user.getEmail());
        User pseudoExist = userRepository.findByPseudo(user.getPseudo());

        // if (regexValidor.isValidEmail(user.getEmail())) {
        // throw new IllegalArgumentException("L'email est invalide.");
        // }

        if (emailExist != null) {
            throw new IllegalArgumentException("Un utilisateur avec cet email existe déjà.");
        }

        if (pseudoExist != null) {
            throw new IllegalArgumentException("Le pseudo avec ce pseudo existe déjà.");
        }
        user.setPassword(hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("L'utilisateur n'existe pas: " + username);
        }
        return user;
    }
}
