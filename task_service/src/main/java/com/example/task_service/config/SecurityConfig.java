// package com.example.task_service.config;

// import java.lang.reflect.Method;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
// import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.example.task_service.utility.JwtFilter;

// import jakarta.servlet.http.HttpServletResponse;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig {

//     @Autowired
//     private JwtFilter jwtFilter;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/auth/**","/auth/loginJwt").permitAll()
//                 .anyRequest().authenticated()
//             )
//             .sessionManagement(sess -> sess
//                 // .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
//                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
//             .exceptionHandling(e -> e
//                 .authenticationEntryPoint((request, response, authException) -> {
//                     response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//                     response.setContentType("application/json");
//                     response.getWriter().write("{\"error\": \"Unauthorized\"}");
//                 })
//             );
//         return http.build();
//     }
//     // @Bean
//     // public MethodSecurityExpressionHandler methodSecurityExpressionHandler(
//     //     CustomPermissionEvaluator permissionEvaluator
//     // ) {
//     //     DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
//     //     handler.setPermissionEvaluator(permissionEvaluator);
//     //     return handler;
//     // }
    
// }
package com.example.task_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.task_service.utility.JwtFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

   @Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http
) throws Exception {

    http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            "/auth/login",
                            "/auth/loginJwt"
                    ).permitAll()

                    .anyRequest().authenticated()
            )

            .addFilterBefore(
                    jwtFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

    return http.build();
}
}

