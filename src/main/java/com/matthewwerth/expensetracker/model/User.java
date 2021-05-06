package com.matthewwerth.expensetracker.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@AllArgsConstructor // creates a constructor with all of our fields
@NoArgsConstructor // creates an empty default constructor
@Entity  // tells JPA we want to build a table with this data
@Data  // Lombok creates all getters and setters as well as toString
@Table(name="user") // name the table specifically user.

public class User {
    @Id //set as primary key
    private Long id;
    private String name;
    private String email;

//    @OneToMany  // this is how we connect to our categories. One user, many categories.
//    private Set<Category> category;

}
