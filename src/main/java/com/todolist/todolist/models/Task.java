/*
 * Copyright (c) 2023.  Luciano Perez
 * All rights reserved.
 */

package com.todolist.todolist.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "task")
@ToString @EqualsAndHashCode

public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "task_id")
    private Long id;

    @Getter @Setter @Column(name = "description")
    private String task;

    @Getter @Setter @Column(name = "status")
    private String status;
}
