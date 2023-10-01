/*
 * Copyright (c) 2023.  Luciano Perez
 * All rights reserved.
 */

package com.todolist.todolist.dao;

import com.todolist.todolist.models.Task;

import java.util.List;

public interface TaskDao {
    List<Task> getTasks();
    void delTask(Long id);
    void registerTask(Task task);
    Task updateTaskStatus(Long id);
}
