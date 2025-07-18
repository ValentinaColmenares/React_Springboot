package com.valentina.backend.usersapp.backend_usersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.valentina.backend.usersapp.backend_usersapp.models.entities.User;
import com.valentina.backend.usersapp.backend_usersapp.models.request.UserRequest;
import com.valentina.backend.usersapp.backend_usersapp.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

  @Autowired
  private UserRepository repository;
  
  @Override
  @Transactional(readOnly = true)
  public List<User> findAll() {
    return (List<User>) repository.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<User> findById(Long id) {
    return repository.findById(id);
  }

  @Override
  @Transactional
  public User save(User user) {
    return repository.save(user);
  }

  @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {
        Optional<User> o = this.findById(id);
        User userOptional = null;
        if (o.isPresent()){
            User userDb = o.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            //return Optional.of(this.save(userDb)); esto está bien v.1
            userOptional = this.save(userDb);
        }
        //return Optional.empty(); esto está bien v.1
        return Optional.ofNullable(userOptional);
    }

  @Override
  @Transactional
  public void remove(Long id) {
    repository.deleteById(id);
  }

}
