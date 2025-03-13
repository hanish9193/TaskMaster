package com.example.taskmaster.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// Custom dark color scheme
private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF4575FF),         // Blue
    onPrimary = Color.White,
    primaryContainer = Color(0xFF0A2472), // Darker blue
    onPrimaryContainer = Color.White,
    secondary = Color(0xFF7C5AF6),       // Purple
    onSecondary = Color.White,
    tertiary = Color(0xFF00D0FF),        // Cyan
    onTertiary = Color.Black,
    background = Color(0xFF121212),      // Dark background
    onBackground = Color.White,
    surface = Color(0xFF1E1E1E),         // Dark surface
    onSurface = Color.White,
    error = Color(0xFFFF4C5D),           // Red
    onError = Color.White
)

// Light color scheme (fallback in case dark mode is disabled)
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF0A2472),          // Blue
    onPrimary = Color.White,
    primaryContainer = Color(0xFFD6E1FF), // Light blue
    onPrimaryContainer = Color(0xFF0A2472),
    secondary = Color(0xFF7C5AF6),        // Purple
    onSecondary = Color.White,
    tertiary = Color(0xFF00A8CC),         // Cyan
    onTertiary = Color.White,
    background = Color.White,
    onBackground = Color(0xFF121212),
    surface = Color(0xFFF5F5F5),          // Light surface
    onSurface = Color(0xFF121212),
    error = Color(0xFFFF4C5D),            // Red
    onError = Color.White
)

/**
 * TaskMaster theme with dark mode as the default
 */
@Composable
fun TaskMasterTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    // Always use dark theme by default unless explicitly set to false
    val useDarkTheme = darkTheme || true
    
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (useDarkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        useDarkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}