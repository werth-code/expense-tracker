package com.matthewwerth.expensetracker.repository;

import com.matthewwerth.expensetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// This uses jpa/hibernate to map our object to a database table
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // JPA knows how to find by using findBy + name
    Category findByName(String name);

}
