package com.college.taskmanagement.controller;

import com.college.taskmanagement.model.Employee;
import com.college.taskmanagement.model.Task;
import com.college.taskmanagement.repository.EmployeeRepository;
import com.college.taskmanagement.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TaskManagementController {

    private final EmployeeRepository employeeRepository;
    private final TaskRepository taskRepository;

    public TaskManagementController(EmployeeRepository employeeRepository, TaskRepository taskRepository) {
        this.employeeRepository = employeeRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping("/employees")
    public List<Employee> listEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/tasks")
    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        if (task.getStatus() == null || task.getStatus().isBlank()) {
            task.setStatus("OPEN");
        }
        if (task.getDueDate() == null) {
            task.setDueDate(LocalDate.now().plusWeeks(1));
        }
        return taskRepository.save(task);
    }

    @PutMapping("/tasks/{taskId}/assign/{employeeId}")
    public ResponseEntity<Task> assignTask(@PathVariable Long taskId, @PathVariable Long employeeId) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);
        if (taskOpt.isEmpty() || employeeOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = taskOpt.get();
        Employee employee = employeeOpt.get();
        task.setAssignee(employee);
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/tasks/{taskId}/status")
    public ResponseEntity<Task> updateStatus(@PathVariable Long taskId, @RequestParam String status) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Task task = taskOpt.get();
        task.setStatus(status);
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/employees/{employeeId}/tasks")
    public ResponseEntity<List<Task>> getTasksByEmployee(@PathVariable Long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(taskRepository.findByAssigneeId(employeeId));
    }
}
