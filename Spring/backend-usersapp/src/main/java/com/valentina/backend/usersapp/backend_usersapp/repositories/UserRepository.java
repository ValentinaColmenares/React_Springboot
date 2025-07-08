package com.valentina.backend.usersapp.backend_usersapp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.valentina.backend.usersapp.backend_usersapp.models.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
    User findByUsername(String username);
    
    User findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);

}
