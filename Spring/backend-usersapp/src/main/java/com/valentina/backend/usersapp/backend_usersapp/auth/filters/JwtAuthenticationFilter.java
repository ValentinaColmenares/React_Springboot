package com.valentina.backend.usersapp.backend_usersapp.auth.filters;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.valentina.backend.usersapp.backend_usersapp.models.entities.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private AuthenticationManager authenticationManager;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {
            
            User user = null;
            String username = null;    
            String password = null;

            try {
                user = new ObjectMapper().readValue(request.getInputStream(), User.class);
                username = user.getUsername();
                password = user.getPassword();
                
                logger.info("Username desde request InputStream (raw) " + username);
                logger.info("Password desde request InputStream (raw) " + password);
            } catch (StreamReadException e) {
                e.printStackTrace();
            } catch (DatabindException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
            return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        String  username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal())
                .getUsername();
        String originalInput = "algun_token_con_alguna_frase_secreta" + username;
        String token = Base64.getEncoder().encodeToString(originalInput.getBytes());
        
        response.addHeader("Authorization", "Bearer " + token);

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("message", String.format("Hola %s, has iniciado sesion con exito!", username));
        body.put("username", username);
        response.getWriter().write(new ObjectMapper().writeValueAsString(body)); // Se convierte el body a JSON
        response.setStatus(200);
        response.setContentType("application/json");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Error en la autenticacion username o password incorrecto!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body)); // Se convierte el body a JSON
        response.setStatus(401);
        response.setContentType("application/json");
    }
    
}
