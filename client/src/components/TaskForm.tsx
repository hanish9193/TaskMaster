import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Task title is too long"),
  dueDate: z.string().optional(),
  dueTime: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  onAddTask: (task: TaskFormValues) => Promise<boolean | void>;
}

const TaskForm: FC<TaskFormProps> = ({ onAddTask }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      dueTime: "",
      priority: "medium",
    },
  });

  const handleSubmit = async (values: TaskFormValues) => {
    const success = await onAddTask(values);
    if (success) {
      form.reset({
        title: "",
        dueDate: "",
        dueTime: "",
        priority: "medium",
      });
    }
  };

  return (
    <div className="card-glass p-6 shadow-xl mb-6 border-gray-800/30">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground text-glow flex items-center">
        <PlusCircle className="h-5 w-5 mr-2 text-primary" />
        Add New Task
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 rounded-lg input-glass"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center">
                    <span className="ml-1">Due Date</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="w-full px-4 py-2 rounded-lg input-glass"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center">
                    <span className="ml-1">Due Time</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="time" 
                      className="w-full px-4 py-2 rounded-lg input-glass"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center">
                    <span className="ml-1">Priority</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="input-glass">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="glassmorphism border-gray-700/50">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="button-glass px-6 py-5 rounded-lg flex items-center gap-2 text-primary hover:text-primary-foreground"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Task</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
