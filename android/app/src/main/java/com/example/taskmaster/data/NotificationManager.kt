package com.example.taskmaster.data

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.example.taskmaster.MainActivity
import com.example.taskmaster.model.AIPersonality

/**
 * Manager for handling notifications including AI personality messages
 */
class NotificationManager(private val context: Context) {
    private val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    private val aiResponseProvider = AIResponseProvider()
    
    companion object {
        private const val CHANNEL_ID_TASKS = "taskmaster_tasks_channel"
        private const val CHANNEL_ID_AI = "taskmaster_ai_channel"
        private const val NOTIFICATION_ID_AI = 1001
    }
    
    init {
        createNotificationChannels()
    }
    
    /**
     * Send an AI message notification based on respect level and personality
     */
    fun sendAINotification(respectLevel: Int, personality: AIPersonality) {
        val message = aiResponseProvider.getMessage(respectLevel, personality)
        
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_AI)
            .setSmallIcon(android.R.drawable.ic_dialog_info) // Replace with your app icon
            .setContentTitle("TaskMaster AI")
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()
        
        notificationManager.notify(NOTIFICATION_ID_AI, notification)
    }
    
    /**
     * Send a notification for overdue tasks
     */
    fun sendOverdueTasksNotification(overdueTasks: List<String>) {
        if (overdueTasks.isEmpty()) return
        
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent, 
            PendingIntent.FLAG_IMMUTABLE
        )
        
        val title = "You have ${overdueTasks.size} overdue tasks"
        val content = overdueTasks.joinToString("\n")
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_TASKS)
            .setSmallIcon(android.R.drawable.ic_dialog_alert) // Replace with your app icon
            .setContentTitle(title)
            .setContentText(content)
            .setStyle(NotificationCompat.BigTextStyle().bigText(content))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()
        
        notificationManager.notify(overdueTasks.hashCode(), notification)
    }
    
    /**
     * Create notification channels for Android 8.0 (API level 26) and higher
     */
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Channel for task-related notifications
            val tasksChannel = NotificationChannel(
                CHANNEL_ID_TASKS,
                "Tasks",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Task reminders and overdue notifications"
            }
            
            // Channel for AI personality messages
            val aiChannel = NotificationChannel(
                CHANNEL_ID_AI,
                "AI Messages",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Messages from your AI assistant"
            }
            
            notificationManager.createNotificationChannels(listOf(tasksChannel, aiChannel))
        }
    }
}