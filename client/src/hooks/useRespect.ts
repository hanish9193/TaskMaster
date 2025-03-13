import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { getMessages } from "@/lib/ai-responses";

export function useRespect(userId: number) {
  const { toast } = useToast();
  
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: [`/api/users/${userId}`],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetch(queryKey[0] as string, {
          credentials: "include",
        });
        
        if (response.status === 404) {
          // Create a new user if not found
          const newUser = await apiRequest('POST', '/api/users', {
            username: `user${userId}`,
            password: `password${userId}`,
            aiPersonality: "balanced",
            respectLevel: 100
          });
          return await newUser.json();
        }
        
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Error fetching or creating user:", error);
        return null;
      }
    },
  });

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      await apiRequest('PATCH', `/api/users/${userId}`, userData);
      await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}`] });
      return true;
    } catch (error) {
      console.error("Failed to update user:", error);
      toast({
        title: "Failed to update user data",
        description: "There was an error updating your progress.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Streak management
  const updateStreak = async () => {
    if (!user) return;

    const today = new Date().toDateString();
    
    // If we don't have a last completed date, set it to today and streak to 1
    if (!user.lastCompletedDate) {
      await updateUser({
        lastCompletedDate: today,
        streak: 1
      });
      return;
    }
    
    // If the last completed date was yesterday, increment streak
    if (isYesterday(user.lastCompletedDate)) {
      const newStreak = user.streak + 1;
      const bestStreak = Math.max(user.bestStreak, newStreak);
      
      await updateUser({
        lastCompletedDate: today,
        streak: newStreak,
        bestStreak
      });
      return;
    }
    
    // If it's still the same day, do nothing
    if (user.lastCompletedDate === today) {
      return;
    }
    
    // Otherwise, reset streak if we missed days
    await updateUser({
      lastCompletedDate: today,
      streak: 1
    });
  };

  const isYesterday = (dateString?: string | null) => {
    if (!dateString) return false;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString() === dateString;
  };

  // Respect level management
  const updateRespectForTaskCompletion = async (completed: boolean) => {
    if (!user) return;
    
    if (completed) {
      // Increase respect for completing tasks
      const respectIncrease = 5;
      const newRespectLevel = Math.min(100, user.respectLevel + respectIncrease);
      
      await updateUser({
        respectLevel: newRespectLevel
      });
      
      // Update streak when completing a task
      await updateStreak();
    } else {
      // Decrease respect for unchecking a completed task
      const respectDecrease = 3;
      const newRespectLevel = Math.max(0, user.respectLevel - respectDecrease);
      
      await updateUser({
        respectLevel: newRespectLevel
      });
    }
  };

  const updateRespectForTaskDeleted = async () => {
    if (!user) return;
    
    // Penalize for deleting uncompleted tasks
    const respectDecrease = 2;
    const newRespectLevel = Math.max(0, user.respectLevel - respectDecrease);
    
    await updateUser({
      respectLevel: newRespectLevel
    });
  };

  const updateAIPersonality = async (personality: string) => {
    if (!user) return;
    
    await updateUser({
      aiPersonality: personality
    });
    
    toast({
      title: "AI Personality updated",
      description: `Your AI is now ${personality}.`,
    });
  };

  const resetProgress = async () => {
    if (!user) return;
    
    await updateUser({
      respectLevel: 100,
      streak: 0,
      bestStreak: 0,
      lastCompletedDate: null
    });
    
    // Clear all tasks for this user
    const tasksResponse = await fetch(`/api/users/${userId}/tasks`, {
      credentials: "include"
    });
    const tasks = await tasksResponse.json();
    
    const deletePromises = tasks.map((task: any) => 
      apiRequest('DELETE', `/api/tasks/${task.id}`)
    );
    
    await Promise.all(deletePromises);
    await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
    
    toast({
      title: "Progress reset",
      description: "All your progress has been reset.",
    });
  };

  return {
    respectLevel: user?.respectLevel ?? 100,
    aiPersonality: user?.aiPersonality ?? "balanced",
    streak: user?.streak ?? 0,
    bestStreak: user?.bestStreak ?? 0,
    updateAIPersonality,
    resetProgress,
    updateRespectForTaskCompletion,
    updateRespectForTaskDeleted,
    isLoading
  };
}

export function useMessages(respectLevel: number, aiPersonality: string) {
  const [currentMessage, setCurrentMessage] = useState("");
  
  useEffect(() => {
    const messages = getMessages(respectLevel, aiPersonality);
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
  }, [respectLevel, aiPersonality]);
  
  return currentMessage;
}
