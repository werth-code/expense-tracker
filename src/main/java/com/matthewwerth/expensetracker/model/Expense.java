package com.matthewwerth.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="expense")

public class Expense {
    @Id
    @GeneratedValue
    private Long id;
    private Instant expenseDate;
    private String description;
    private Double amount;

    // now we need to connect to both user and have a category

    @ManyToOne // this is like a sql join but JPA handles it for us
    private Category category;

    @JsonIgnore
    @ManyToOne // many expenses go to one user.
    private User user;




}
