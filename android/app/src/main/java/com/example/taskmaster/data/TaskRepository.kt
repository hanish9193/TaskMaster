package com.example.taskmaster.data

import com.example.taskmaster.model.Task
import com.example.taskmaster.model.Priority
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import java.time.LocalDate

/**
 * Repository for managing task data
 */
class TaskRepository {
    // In-memory storage for tasks
    private val _tasks = MutableStateFlow<List<Task>>(emptyList())
    val tasks: Flow<List<Task>> = _tasks.asStateFlow()

    /**
     * Add a new task
     */
    fun addTask(title: String, priority: Priority = Priority.MEDIUM, dueDate: LocalDate? = null): Task {
        val newTask = Task(
            title = title,
            priority = priority,
            dueDate = dueDate
        )
        
        _tasks.update { currentTasks ->
            currentTasks + newTask
        }
        
        return newTask
    }

    /**
     * Toggle task completion status
     */
    fun toggleTaskCompleted(taskId: String): Boolean {
        var wasToggled = false
        
        _tasks.update { currentTasks ->
            currentTasks.map { task ->
                if (task.id == taskId) {
                    wasToggled = true
                    task.copy(completed = !task.completed)
                } else {
                    task
                }
            }
        }
        
        return wasToggled
    }

    /**
     * Delete a task
     */
    fun deleteTask(taskId: String): Boolean {
        var wasDeleted = false
        
        _tasks.update { currentTasks ->
            val filteredList = currentTasks.filter { it.id != taskId }
            wasDeleted = filteredList.size < currentTasks.size
            filteredList
        }
        
        return wasDeleted
    }

    /**
     * Clear all completed tasks
     */
    fun clearCompletedTasks(): Int {
        var count = 0
        
        _tasks.update { currentTasks ->
            val remainingTasks = currentTasks.filter { !it.completed }
            count = currentTasks.size - remainingTasks.size
            remainingTasks
        }
        
        return count
    }

    /**
     * Get all tasks for a specific date
     */
    fun getTasksForDate(date: LocalDate): List<Task> {
        return _tasks.value.filter { task -> 
            task.dueDate == date 
        }
    }

    /**
     * Get all overdue tasks (due date is before today and not completed)
     */
    fun getOverdueTasks(): List<Task> {
        val today = LocalDate.now()
        return _tasks.value.filter { task -> 
            task.dueDate != null && task.dueDate.isBefore(today) && !task.completed 
        }
    }
    
    /**
     * Clear all tasks (used for testing and reset functionality)
     */
    fun clearAllTasks() {
        _tasks.update { emptyList() }
    }
}