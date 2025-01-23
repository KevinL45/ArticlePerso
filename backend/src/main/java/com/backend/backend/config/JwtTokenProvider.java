package com.backend.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String secretKey;

    private long validityInMilliseconds = 7200000; // 2 heures

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
        } catch (io.jsonwebtoken.SignatureException e) {
            System.out.println("Signature invalide : " + e.getMessage());
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("Token expiré : " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Erreur lors de la validation du token : " + e.getMessage());
        }
        return false;
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
