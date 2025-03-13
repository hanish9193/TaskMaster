package com.example.taskmaster.model

import java.time.LocalDate

data class User(
    val id: Long,
    val username: String,
    val respectLevel: Int = 50,
    val streak: Int = 0,
    val bestStreak: Int = 0,
    val lastActive: LocalDate = LocalDate.now(),
    val aiPersonality: String = "balanced" // supportive, balanced, savage
)