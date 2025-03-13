import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AICharacter from "@/components/AICharacter";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import SettingsModal from "@/components/SettingsModal";
import { useTasks } from "@/hooks/useTasks";
import { useRespect } from "@/hooks/useRespect";

const Home = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    clearCompletedTasks,
    isLoading
  } = useTasks(1); // Using userId 1 for demo
  
  const {
    respectLevel,
    aiPersonality,
    streak,
    bestStreak,
    updateAIPersonality,
    resetProgress,
    updateRespectForTaskCompletion,
    updateRespectForTaskDeleted
  } = useRespect(1); // Using userId 1 for demo

  const handleToggleTask = async (taskId: number, completed: boolean): Promise<void> => {
    const success = await toggleTask(taskId, completed);
    if (success) {
      updateRespectForTaskCompletion(completed);
    }
  };

  const handleDeleteTask = async (taskId: number, completed: boolean): Promise<void> => {
    const success = await deleteTask(taskId);
    if (success && !completed) {
      updateRespectForTaskDeleted();
    }
  };

  // Create a wrapper function to match the expected type for TaskForm
  const handleAddTask = async (task: { title: string; dueDate?: string; priority: string }) => {
    return await addTask(task);
  };

  return (
    <div className="text-foreground font-sans min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <Header showSettings={() => setShowSettings(true)} />
        
        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - AI Character & Progress */}
          <div className="lg:w-1/3">
            <AICharacter 
              respectLevel={respectLevel} 
              aiPersonality={aiPersonality}
              streak={streak}
              bestStreak={bestStreak}
              isLoading={isLoading}
            />
          </div>
          
          {/* Right Column - Task Management */}
          <div className="lg:w-2/3">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList 
              tasks={tasks} 
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onClearCompleted={async () => { await clearCompletedTasks(); }}
              isLoading={isLoading}
            />
          </div>
        </main>
        
        {showSettings && (
          <SettingsModal 
            aiPersonality={aiPersonality}
            onPersonalityChange={updateAIPersonality}
            onReset={resetProgress}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
