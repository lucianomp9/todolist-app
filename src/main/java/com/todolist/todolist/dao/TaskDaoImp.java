/*
 * Copyright (c) 2023.  Luciano Perez
 * All rights reserved.
 */

package com.todolist.todolist.dao;

import com.todolist.todolist.models.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public  class TaskDaoImp implements TaskDao{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Task> getTasks(){
        String query = "FROM Task";
        return entityManager.createQuery(query).getResultList();
    };


    @Override
    public void delTask(Long taskId) {
        Task task = entityManager.find(Task.class, taskId);
        entityManager.remove(task);
    }

    @Override
    public void registerTask(Task task) {
        entityManager.merge(task);
    }



    @Override
    public Task updateTaskStatus(Long id) {
        return entityManager.find(Task.class, id);
    }


}
