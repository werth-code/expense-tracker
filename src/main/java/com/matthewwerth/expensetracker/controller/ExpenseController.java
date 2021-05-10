package com.matthewwerth.expensetracker.controller;

import com.matthewwerth.expensetracker.model.Category;
import com.matthewwerth.expensetracker.model.Expense;
import com.matthewwerth.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @PostMapping("/expenses")
    ResponseEntity<Expense> addExpense(@Validated @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
    }

//    @PutMapping("/expenses/{id}")
//    ResponseEntity<Expense> updateExpense(@Validated @RequestBody Expense expense) {
//        Expense result = expenseRepository.save(expense);
//        return ResponseEntity.ok().body(result);
//    }

    // PUT NOT WORKING YET
//    @PutMapping("/category/{id}")
//    ResponseEntity<Category> updateCategory(@Validated @RequestBody Category category) {
//        Category result = categoryRepository.save(category);
//        return ResponseEntity.ok().body(result);
//    }

    @DeleteMapping("/expenses/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
