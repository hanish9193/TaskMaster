import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Task } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useTasks(userId: number) {
  const { toast } = useToast();
  
  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: [`/api/users/${userId}/tasks`],
  });

  const addTask = async (taskData: { title: string; dueDate?: string; priority: string }) => {
    try {
      await apiRequest('POST', `/api/users/${userId}/tasks`, taskData);
      await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
      return true;
    } catch (error) {
      console.error("Failed to add task:", error);
      toast({
        title: "Failed to add task",
        description: "There was an error adding your task.",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleTask = async (taskId: number, completed: boolean) => {
    try {
      await apiRequest('PATCH', `/api/tasks/${taskId}`, { completed });
      await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
      toast({
        title: completed ? "Task completed" : "Task unmarked",
        description: completed 
          ? "Great job on completing your task!" 
          : "Your task has been marked as incomplete.",
      });
      return true;
    } catch (error) {
      console.error("Failed to toggle task:", error);
      toast({
        title: "Failed to update task",
        description: "There was an error updating your task.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await apiRequest('DELETE', `/api/tasks/${taskId}`);
      await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
      toast({
        title: "Task deleted",
        description: "Your task has been deleted.",
      });
      return true;
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast({
        title: "Failed to delete task",
        description: "There was an error deleting your task.",
        variant: "destructive",
      });
      return false;
    }
  };

  const clearCompletedTasks = async () => {
    try {
      const promises = tasks
        .filter(task => task.completed)
        .map(task => apiRequest('DELETE', `/api/tasks/${task.id}`));
      
      await Promise.all(promises);
      await queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/tasks`] });
      toast({
        title: "Completed tasks cleared",
        description: "All completed tasks have been removed.",
      });
      return true;
    } catch (error) {
      console.error("Failed to clear completed tasks:", error);
      toast({
        title: "Failed to clear tasks",
        description: "There was an error clearing your completed tasks.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
    isLoading,
    error,
  };
}
