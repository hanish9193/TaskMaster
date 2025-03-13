import { FC, useState } from "react";
import { Task } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Flag,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number, completed: boolean) => Promise<void>;
  onDeleteTask: (taskId: number, completed: boolean) => Promise<void>;
  onClearCompleted: () => Promise<void>;
  isLoading: boolean;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onClearCompleted,
  isLoading
}) => {
  const [taskFilter, setTaskFilter] = useState<"all" | "completed" | "active">("all");
  const [sortMethod, setSortMethod] = useState<"dueDate" | "priority">("dueDate");
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isTaskOverdue = (task: Task) => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };
  
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === "all") return true;
    if (taskFilter === "completed") return task.completed;
    return !task.completed;
  }).sort((a, b) => {
    if (sortMethod === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      const priorityValue = { high: 0, medium: 1, low: 2 };
      return priorityValue[a.priority as "high" | "medium" | "low"] - 
             priorityValue[b.priority as "high" | "medium" | "low"];
    }
  });
  
  const completedTasksCount = tasks.filter(task => task.completed).length;

  if (isLoading) {
    return (
      <div className="card-glass p-6 shadow-xl border-gray-800/30">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32 bg-gray-900/50" />
          <Skeleton className="h-10 w-48 bg-gray-900/50" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24 w-full bg-gray-900/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass p-6 shadow-xl border-gray-800/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-card-foreground text-glow flex items-center">
          <Flag className="h-5 w-5 mr-2 text-primary" />
          Your Tasks
        </h2>
        
        <div className="flex items-center gap-2">
          <Select
            value={taskFilter}
            onValueChange={(value: "all" | "completed" | "active") => setTaskFilter(value)}
          >
            <SelectTrigger className="w-[130px] input-glass">
              <SelectValue placeholder="All Tasks" />
            </SelectTrigger>
            <SelectContent className="glassmorphism border-gray-700/50">
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSortMethod("dueDate")}
            className={`button-glass ${sortMethod === "dueDate" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Calendar className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSortMethod("priority")}
            className={`button-glass ${sortMethod === "priority" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Flag className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Task Items */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="py-10 text-center glassmorphism rounded-xl">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full glassmorphism flex items-center justify-center ai-glow">
              <Calendar className="h-16 w-16 text-primary/70" />
            </div>
            <p className="text-card-foreground font-medium">No tasks here!</p>
            <p className="text-muted-foreground text-sm mb-4">Add a task to get started</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredTasks.map(task => {
              // Determine notification interval based on priority
              const getNotificationInterval = (priority: string): string => {
                switch(priority) {
                  case 'high': return 'Hourly reminders';
                  case 'medium': return 'Daily reminders';
                  case 'low': return 'Weekly reminders';
                  default: return 'No reminders';
                }
              };
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`glassmorphism rounded-lg p-4 border ${
                    task.completed 
                      ? 'border-gray-800/30' 
                      : (isTaskOverdue(task) 
                         ? 'border-red-800/30 bg-red-900/10' 
                         : 'border-gray-700/30')
                  } hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={(checked) => {
                        onToggleTask(task.id, checked as boolean);
                      }}
                      className={`mt-1 ${task.completed ? 'bg-primary/80 border-primary/50' : 'border-gray-600'}`}
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`font-medium cursor-pointer ${
                            task.completed ? "line-through text-muted-foreground" : "text-card-foreground"
                          }`}
                        >
                          {task.title}
                          
                          {task.priority !== "low" && (
                            <Badge
                              className={`ml-2 ${
                                task.priority === "high" 
                                  ? "bg-red-900/30 text-red-400 border border-red-800/30" 
                                  : "bg-amber-900/30 text-amber-400 border border-amber-800/30"
                              }`}
                            >
                              {task.priority}
                            </Badge>
                          )}
                        </label>
                        
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteTask(task.id, task.completed)}
                            className="text-muted-foreground hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-between mt-2">
                        <div className="text-xs text-muted-foreground flex items-center">
                          {task.dueDate && (
                            <>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(task.dueDate)}</span>
                              {isTaskOverdue(task) && !task.completed && (
                                <span className="ml-2 text-xs text-red-400 font-medium">
                                  Overdue!
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-500 flex items-center">
                          <span className="mr-2">{getNotificationInterval(task.priority)}</span>
                          <span className="bg-gray-800/50 px-2 py-0.5 rounded-full">
                            {task.completed ? "Completed" : "Active"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
      
      {/* Task Summary */}
      <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground border-t border-gray-800/30 pt-4">
        <span className="text-glow text-primary/80">{completedTasksCount} of {tasks.length} tasks completed</span>
        {completedTasksCount > 0 && (
          <Button
            variant="ghost"
            className="button-glass px-3 py-1 rounded-lg text-primary hover:text-primary-foreground"
            onClick={onClearCompleted}
          >
            Clear completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
