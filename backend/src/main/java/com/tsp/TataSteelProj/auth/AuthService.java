package com.tsp.TataSteelProj.auth;

import com.tsp.TataSteelProj.config.JwtService;
import com.tsp.TataSteelProj.user.User;
import com.tsp.TataSteelProj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest){
        var oldUser=userRepository.findByEmail(registerRequest.getEmail());
        if(oldUser.isPresent()){
            return AuthenticationResponse.builder().message("Email already Exists!").build();
        }
        var user=User.builder()
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole())
                .sp_no(registerRequest.getSp_no())
                .build();
        var savedUser=userRepository.save(user);
        String jwtToken= jwtService.generateToken(user);
        var newUser=userRepository.findByEmail(registerRequest.getEmail());
        User reqUser=null;
        if(newUser.isPresent()) reqUser=newUser.get();
        int id=0;
        if(reqUser!=null) id=reqUser.getId();
        return AuthenticationResponse.builder().accessToken(jwtToken).message("Registration Successful").user_id(id).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user=userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder().accessToken(jwtToken).message("Authentication Successful").user_id(user.getId()).build();
    }
}
