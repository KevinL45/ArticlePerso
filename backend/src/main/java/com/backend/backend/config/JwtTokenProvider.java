package com.backend.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // Utiliser une clé secrète de 256 bits (32 bytes) pour HMAC
    private String secretKey = "thisisaverysecretkeyforjwtwhichshouldbe256bitlong!";
    private long validityInMilliseconds = 7200000; // 2 heure

    // Créer un token JWT à partir des informations utilisateur
    public String createToken(String username) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes()); // Création de la clé secrète à partir du texte

        Claims claims = Jwts.claims().setSubject(username);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key) // Utilisation de la nouvelle méthode de signature avec clé
                .compact();
    }

    // Extraire le sujet (username) du token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // Valider le token JWT
    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extraire les informations de la charge utile du token
    private Claims getClaimsFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes()); // Assurez-vous d'utiliser la même clé

        return Jwts.parserBuilder() // Méthode mise à jour pour parser le token
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
