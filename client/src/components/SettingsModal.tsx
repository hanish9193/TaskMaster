import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Settings, Sparkles, Bomb } from "lucide-react";

interface SettingsModalProps {
  aiPersonality: string;
  onPersonalityChange: (personality: string) => Promise<void>;
  onReset: () => Promise<void>;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({
  aiPersonality,
  onPersonalityChange,
  onReset,
  onClose
}) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md glassmorphism border-gray-800/30">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-glow flex items-center">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Settings
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full button-glass"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* AI Personality Selection */}
          <div>
            <h3 className="text-base font-medium mb-3 text-glow flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              AI Personality
            </h3>
            <RadioGroup value={aiPersonality} onValueChange={onPersonalityChange} className="space-y-2">
              <div className="flex items-center space-x-3 p-3 border border-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/30 glassmorphism">
                <RadioGroupItem value="supportive" id="supportive" className="border-gray-600" />
                <Label htmlFor="supportive" className="flex-1 cursor-pointer">
                  <span className="block font-medium">Supportive</span>
                  <span className="block text-sm text-muted-foreground">Always encouraging and positive</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/30 glassmorphism">
                <RadioGroupItem value="balanced" id="balanced" className="border-gray-600" />
                <Label htmlFor="balanced" className="flex-1 cursor-pointer">
                  <span className="block font-medium">Balanced</span>
                  <span className="block text-sm text-muted-foreground">Positive when you do well, stern when you don't</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/30 glassmorphism">
                <RadioGroupItem value="savage" id="savage" className="border-gray-600" />
                <Label htmlFor="savage" className="flex-1 cursor-pointer">
                  <span className="block font-medium">Savage</span>
                  <span className="block text-sm text-muted-foreground">Extra harsh criticism, extra sarcastic</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Reset Progress */}
          <div className="border-t border-gray-800/30 pt-4">
            <h3 className="text-base font-medium mb-3 text-glow flex items-center">
              <Bomb className="h-4 w-4 mr-2 text-red-500" />
              Reset Progress
            </h3>
            <p className="text-sm text-muted-foreground mb-3">This will reset your respect level and all tasks, but keep your settings.</p>
            <Button 
              variant="destructive"
              className="w-full bg-red-900/50 hover:bg-red-800/70 text-red-100"
              onClick={onReset}
            >
              Reset All Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
