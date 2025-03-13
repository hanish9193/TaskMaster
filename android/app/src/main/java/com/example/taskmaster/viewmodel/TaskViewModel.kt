package com.example.taskmaster.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.taskmaster.data.TaskRepository
import com.example.taskmaster.data.UserRepository
import com.example.taskmaster.data.NotificationManager
import com.example.taskmaster.data.AIResponseProvider
import com.example.taskmaster.model.AIPersonality
import com.example.taskmaster.model.Priority
import com.example.taskmaster.model.Task
import com.example.taskmaster.model.User
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.time.LocalDate

/**
 * ViewModel for handling task-related business logic
 */
class TaskViewModel(application: Application) : AndroidViewModel(application) {
    private val taskRepository = TaskRepository()
    private val userRepository = UserRepository()
    private val notificationManager = NotificationManager(application)
    private val aiResponseProvider = AIResponseProvider()
    
    val tasks = taskRepository.tasks
    val user = userRepository.user
    
    // Current AI message
    private val _currentAIMessage = MutableStateFlow("")
    val currentAIMessage: StateFlow<String> = _currentAIMessage
    
    init {
        updateAIMessage()
        
        // Observe user changes to update AI message
        viewModelScope.launch {
            user.collect {
                updateAIMessage()
            }
        }
    }
    
    /**
     * Add a new task
     */
    fun addTask(title: String, priority: Priority = Priority.MEDIUM, dueDate: LocalDate? = null) {
        taskRepository.addTask(title, priority, dueDate)
    }
    
    /**
     * Toggle task completion status
     */
    fun toggleTaskCompleted(taskId: String) {
        val task = tasks.value.find { it.id == taskId } ?: return
        val wasToggled = taskRepository.toggleTaskCompleted(taskId)
        
        if (wasToggled) {
            if (task.completed) {
                // Task was uncompleted
                userRepository.decreaseRespectForTaskUncompletion()
            } else {
                // Task was completed
                val newRespectLevel = userRepository.increaseRespectForTaskCompletion()
                
                // Send AI notification
                val user = userRepository.user.value
                notificationManager.sendAINotification(
                    newRespectLevel,
                    user.aiPersonality
                )
            }
            
            // Update AI message
            updateAIMessage()
        }
    }
    
    /**
     * Delete a task
     */
    fun deleteTask(taskId: String) {
        val task = tasks.value.find { it.id == taskId } ?: return
        val wasDeleted = taskRepository.deleteTask(taskId)
        
        if (wasDeleted && !task.completed) {
            // Only decrease respect if deleting an uncompleted task
            userRepository.decreaseRespectForTaskDeletion()
            updateAIMessage()
        }
    }
    
    /**
     * Clear all completed tasks
     */
    fun clearCompletedTasks() {
        taskRepository.clearCompletedTasks()
    }
    
    /**
     * Update AI personality preference
     */
    fun updateAIPersonality(personality: AIPersonality) {
        userRepository.updateAIPersonality(personality)
    }
    
    /**
     * Reset all progress
     */
    fun resetProgress() {
        userRepository.resetProgress()
        taskRepository.clearAllTasks()
    }
    
    /**
     * Update the current AI message based on respect level and personality
     */
    private fun updateAIMessage() {
        val currentUser = userRepository.user.value
        val message = aiResponseProvider.getMessage(
            currentUser.respectLevel,
            currentUser.aiPersonality
        )
        _currentAIMessage.value = message
    }
    
    /**
     * Check for overdue tasks and send notifications
     */
    fun checkOverdueTasks() {
        val overdueTasks = taskRepository.getOverdueTasks()
        
        if (overdueTasks.isNotEmpty()) {
            val taskTitles = overdueTasks.map { it.title }
            notificationManager.sendOverdueTasksNotification(taskTitles)
        }
    }
    
    /**
     * Send an AI notification message
     */
    fun sendAINotification() {
        val currentUser = userRepository.user.value
        notificationManager.sendAINotification(
            currentUser.respectLevel,
            currentUser.aiPersonality
        )
    }
}