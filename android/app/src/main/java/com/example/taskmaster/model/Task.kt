package com.example.taskmaster.model

import java.time.LocalDate

enum class Priority {
    LOW, MEDIUM, HIGH
}

data class Task(
    val id: Long,
    val title: String,
    val completed: Boolean = false,
    val dueDate: LocalDate? = null,
    val priority: Priority = Priority.MEDIUM,
    val userId: Long,
    val createdAt: LocalDate = LocalDate.now()
)