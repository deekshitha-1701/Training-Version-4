package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student save(Student student) {
        return repository.save(student);
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Student update(Long id, Student student) {

        Student existing =
                repository.findById(id).orElseThrow();

        existing.setName(student.getName());
        existing.setAge(student.getAge());
        existing.setEmail(student.getEmail());
        existing.setCgpa(student.getCgpa());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}