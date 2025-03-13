package com.example.taskmaster.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.example.taskmaster.model.Priority
import com.example.taskmaster.model.Task
import com.example.taskmaster.ui.components.TaskItem
import com.example.taskmaster.viewmodel.TaskViewModel
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: TaskViewModel,
    onNavigateToSettings: () -> Unit
) {
    val tasks by viewModel.tasks.collectAsState(initial = emptyList())
    val currentUser by viewModel.user.collectAsState()
    val currentAIMessage by viewModel.currentAIMessage.collectAsState()
    
    var showAddTaskDialog by remember { mutableStateOf(false) }
    var taskTitle by remember { mutableStateOf("") }
    var selectedPriority by remember { mutableStateOf(Priority.MEDIUM) }
    var selectedDate by remember { mutableStateOf<LocalDate?>(null) }
    
    Column(modifier = Modifier.fillMaxSize()) {
        // AI Message Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = when {
                    currentUser.respectLevel >= 70 -> MaterialTheme.colorScheme.primaryContainer
                    currentUser.respectLevel >= 30 -> MaterialTheme.colorScheme.surfaceVariant
                    else -> MaterialTheme.colorScheme.errorContainer
                }
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "AI Assistant",
                    style = MaterialTheme.typography.titleMedium,
                    color = when {
                        currentUser.respectLevel >= 70 -> MaterialTheme.colorScheme.onPrimaryContainer
                        currentUser.respectLevel >= 30 -> MaterialTheme.colorScheme.onSurfaceVariant
                        else -> MaterialTheme.colorScheme.onErrorContainer
                    }
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = currentAIMessage,
                    style = MaterialTheme.typography.bodyLarge,
                    color = when {
                        currentUser.respectLevel >= 70 -> MaterialTheme.colorScheme.onPrimaryContainer
                        currentUser.respectLevel >= 30 -> MaterialTheme.colorScheme.onSurfaceVariant
                        else -> MaterialTheme.colorScheme.onErrorContainer
                    }
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Respect Level
                    Text(
                        text = "Respect: ${currentUser.respectLevel}%",
                        style = MaterialTheme.typography.labelMedium
                    )
                    
                    // Streak
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.LocalFireDepartment,
                            contentDescription = "Streak",
                            tint = MaterialTheme.colorScheme.secondary
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "${currentUser.streak} day streak",
                            style = MaterialTheme.typography.labelMedium
                        )
                    }
                    
                    // Settings button
                    IconButton(onClick = onNavigateToSettings) {
                        Icon(
                            imageVector = Icons.Default.Settings,
                            contentDescription = "Settings"
                        )
                    }
                }
            }
        }
        
        // Tasks header with add button
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Tasks",
                style = MaterialTheme.typography.headlineSmall
            )
            
            Button(
                onClick = { showAddTaskDialog = true },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Add Task"
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Task")
            }
        }
        
        // Task list
        if (tasks.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No tasks yet. Add one to get started!",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(horizontal = 16.dp)
            ) {
                items(tasks) { task ->
                    TaskItem(
                        task = task,
                        onTaskChecked = { viewModel.toggleTaskCompleted(task.id) },
                        onTaskDeleted = { viewModel.deleteTask(task.id) }
                    )
                }
            }
        }
        
        // Clear completed tasks button
        if (tasks.any { it.completed }) {
            Button(
                onClick = { viewModel.clearCompletedTasks() },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant,
                    contentColor = MaterialTheme.colorScheme.onSurfaceVariant
                )
            ) {
                Text("Clear Completed Tasks")
            }
        }
    }
    
    // Add Task Dialog
    if (showAddTaskDialog) {
        AlertDialog(
            onDismissRequest = {
                showAddTaskDialog = false
                taskTitle = ""
                selectedPriority = Priority.MEDIUM
                selectedDate = null
            },
            title = { Text("Add New Task") },
            text = {
                Column {
                    OutlinedTextField(
                        value = taskTitle,
                        onValueChange = { taskTitle = it },
                        label = { Text("Task Title") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text("Priority", style = MaterialTheme.typography.labelMedium)
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        PriorityButton(
                            text = "Low",
                            selected = selectedPriority == Priority.LOW,
                            color = Color(0xFF4CAF50),
                            onClick = { selectedPriority = Priority.LOW }
                        )
                        
                        PriorityButton(
                            text = "Medium",
                            selected = selectedPriority == Priority.MEDIUM,
                            color = Color(0xFFFFC107),
                            onClick = { selectedPriority = Priority.MEDIUM }
                        )
                        
                        PriorityButton(
                            text = "High",
                            selected = selectedPriority == Priority.HIGH,
                            color = Color(0xFFF44336),
                            onClick = { selectedPriority = Priority.HIGH }
                        )
                    }
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    // Due date picker button
                    OutlinedButton(
                        onClick = { 
                            // In a real app, this would show a date picker
                            // Here we just set it to tomorrow for demo purposes
                            selectedDate = LocalDate.now().plusDays(1)
                        },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Icon(
                            imageVector = Icons.Default.CalendarToday,
                            contentDescription = "Set Due Date"
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = selectedDate?.format(
                                DateTimeFormatter.ofPattern("MMM dd, yyyy")
                            ) ?: "Set Due Date"
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (taskTitle.isNotBlank()) {
                            viewModel.addTask(taskTitle, selectedPriority, selectedDate)
                            showAddTaskDialog = false
                            taskTitle = ""
                            selectedPriority = Priority.MEDIUM
                            selectedDate = null
                        }
                    },
                    enabled = taskTitle.isNotBlank()
                ) {
                    Text("Add Task")
                }
            },
            dismissButton = {
                TextButton(
                    onClick = {
                        showAddTaskDialog = false
                        taskTitle = ""
                        selectedPriority = Priority.MEDIUM
                        selectedDate = null
                    }
                ) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun PriorityButton(
    text: String,
    selected: Boolean,
    color: Color,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = if (selected) color else MaterialTheme.colorScheme.surface,
            contentColor = if (selected) MaterialTheme.colorScheme.onPrimary else color
        ),
        border = if (selected) null else ButtonDefaults.outlinedButtonBorder
    ) {
        Text(text)
    }
}