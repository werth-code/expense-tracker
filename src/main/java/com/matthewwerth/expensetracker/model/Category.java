package com.matthewwerth.expensetracker.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data //Lombok auto create getters/setters etc.
@NoArgsConstructor
@Table(name="category")
public class Category {

    @Id
    private Long id;

    // categories like travel, phone bill, internet
    private String name;

}
