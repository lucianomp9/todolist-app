package com.todolist.todolist.controllers;

import com.todolist.todolist.dao.TaskDao;
import com.todolist.todolist.models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private TaskDao TaskDao;

    @RequestMapping(value = "api/tasks/{id}", method = RequestMethod.PUT)
    public void updateTaskStatus(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = TaskDao.updateTaskStatus(id);

        if (task != null) {
            task.setStatus(updatedTask.getStatus());
            TaskDao.registerTask(task);
        }
    }
    @RequestMapping(value = "api/tasks", method = RequestMethod.GET)
    public List<Task> getTasks(){
        List<Task> tasks = new ArrayList<>();
        return TaskDao.getTasks();
    }

    @RequestMapping(value = "api/tasks/{id}", method = RequestMethod.DELETE)
    public void delTask(@PathVariable Long id){
        TaskDao.delTask(id);
    }

    @RequestMapping(value = "api/tasks", method = RequestMethod.POST)
    public void registerTask(@RequestBody Task task) {
        TaskDao.registerTask(task);
    }
}
