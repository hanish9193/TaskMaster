package com.example.taskmaster.data

import com.example.taskmaster.model.User
import com.example.taskmaster.model.AIPersonality
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import java.time.LocalDate

/**
 * Repository for managing user data and respect level
 */
class UserRepository {
    private val _user = MutableStateFlow(User())
    val user: StateFlow<User> = _user.asStateFlow()

    /**
     * Update the AI personality preference
     */
    fun updateAIPersonality(personality: AIPersonality) {
        _user.update { currentUser ->
            currentUser.copy(aiPersonality = personality)
        }
    }

    /**
     * Increase respect level for completing a task
     * @return The new respect level
     */
    fun increaseRespectForTaskCompletion(): Int {
        var newRespectLevel = 0
        
        _user.update { currentUser ->
            newRespectLevel = minOf(100, currentUser.respectLevel + 5)
            currentUser.copy(respectLevel = newRespectLevel)
        }
        
        updateStreakIfNeeded()
        
        return newRespectLevel
    }

    /**
     * Decrease respect level for uncompleting a task
     * @return The new respect level
     */
    fun decreaseRespectForTaskUncompletion(): Int {
        var newRespectLevel = 0
        
        _user.update { currentUser ->
            newRespectLevel = maxOf(0, currentUser.respectLevel - 3)
            currentUser.copy(respectLevel = newRespectLevel)
        }
        
        return newRespectLevel
    }

    /**
     * Decrease respect level for deleting an uncompleted task
     * @return The new respect level
     */
    fun decreaseRespectForTaskDeletion(): Int {
        var newRespectLevel = 0
        
        _user.update { currentUser ->
            newRespectLevel = maxOf(0, currentUser.respectLevel - 2)
            currentUser.copy(respectLevel = newRespectLevel)
        }
        
        return newRespectLevel
    }

    /**
     * Reset all user progress
     */
    fun resetProgress() {
        _user.update { currentUser ->
            currentUser.copy(
                respectLevel = 50,
                streak = 0,
                bestStreak = 0,
                lastCompletedDate = null
            )
        }
    }

    /**
     * Update the user streak when a task is completed
     */
    private fun updateStreakIfNeeded() {
        val today = LocalDate.now()
        
        _user.update { currentUser ->
            // If we don't have a last completed date, set it to today and streak to 1
            if (currentUser.lastCompletedDate == null) {
                return@update currentUser.copy(
                    lastCompletedDate = today,
                    streak = 1
                )
            }
            
            // If the last completed date was yesterday, increment streak
            if (isYesterday(currentUser.lastCompletedDate, today)) {
                val newStreak = currentUser.streak + 1
                val bestStreak = maxOf(currentUser.bestStreak, newStreak)
                
                return@update currentUser.copy(
                    lastCompletedDate = today,
                    streak = newStreak,
                    bestStreak = bestStreak
                )
            }
            
            // If it's still the same day, do nothing
            if (currentUser.lastCompletedDate == today) {
                return@update currentUser
            }
            
            // Otherwise, reset streak if we missed days
            return@update currentUser.copy(
                lastCompletedDate = today,
                streak = 1
            )
        }
    }

    private fun isYesterday(date: LocalDate, today: LocalDate): Boolean {
        val yesterday = today.minusDays(1)
        return date == yesterday
    }
}