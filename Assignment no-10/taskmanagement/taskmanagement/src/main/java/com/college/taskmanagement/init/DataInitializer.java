package com.college.taskmanagement.init;

import com.college.taskmanagement.model.Employee;
import com.college.taskmanagement.model.Task;
import com.college.taskmanagement.repository.EmployeeRepository;
import com.college.taskmanagement.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final TaskRepository taskRepository;

    public DataInitializer(EmployeeRepository employeeRepository, TaskRepository taskRepository) {
        this.employeeRepository = employeeRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        employeeRepository.deleteAll();
        taskRepository.deleteAll();

        Employee alice = new Employee("Alice Johnson", "Computer Science", "alice.johnson@college.edu");
        Employee bob = new Employee("Bob Patel", "Mechanical Engineering", "bob.patel@college.edu");
        Employee charlie = new Employee("Charlie Smith", "Electrical Engineering", "charlie.smith@college.edu");

        employeeRepository.save(alice);
        employeeRepository.save(bob);
        employeeRepository.save(charlie);

        Task task1 = new Task("Exam Duty", "Supervise the final exam in CS101", "Exam Duty", "OPEN", LocalDate.now().plusDays(5));
        Task task2 = new Task("Project Guide", "Guide the robotics project group", "Project Guide", "IN_PROGRESS", LocalDate.now().plusDays(12));
        Task task3 = new Task("Event Coordination", "Coordinate the department seminar", "Event Coordination", "OPEN", LocalDate.now().plusDays(8));

        task1.setAssignee(alice);
        task2.setAssignee(bob);
        task3.setAssignee(charlie);

        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
    }
}
