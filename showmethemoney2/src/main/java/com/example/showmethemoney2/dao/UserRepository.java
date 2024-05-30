package com.example.showmethemoney2.dao;

import com.example.showmethemoney2.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    boolean existsByUsername(String username);
    UserEntity findByUsername(String username);
}
