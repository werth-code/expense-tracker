package com.matthewwerth.expensetracker.repository;

import com.matthewwerth.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
