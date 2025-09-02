import { Volume2, Settings, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export const MasterSection = () => {
  return (
    <div className="w-24 bg-background-secondary border-l border-border flex flex-col">
      {/* Header */}
      <div className="h-12 bg-background-tertiary border-b border-border flex items-center justify-center">
        <span className="text-foreground-muted text-xs font-mono">MASTER</span>
      </div>

      {/* Master Controls */}
      <div className="flex-1 p-2 space-y-4">
        {/* Master Volume */}
        <div className="space-y-2">
          <div className="text-foreground-muted text-xs flex items-center gap-1 justify-center">
            <Volume2 className="h-3 w-3" />
            <span>85</span>
          </div>
          <div className="relative h-32 w-6 bg-background-tertiary border border-border rounded-sm mx-auto">
            <div className="absolute bottom-0 left-0 right-0 bg-selected rounded-sm h-3/4" />
            <div className="absolute w-full h-1 bg-background border border-border rounded-sm bottom-3/4 transform translate-y-1/2" />
          </div>
        </div>

        {/* Level Meters */}
        <div className="space-y-1">
          <div className="text-foreground-muted text-xs text-center">LEVELS</div>
          <div className="flex justify-center gap-1">
            <div className="w-1 h-16 bg-background-tertiary border border-border rounded-sm">
              <div className="w-full bg-gradient-to-t from-clip-green via-clip-yellow to-clip-red rounded-sm h-3/4" />
            </div>
            <div className="w-1 h-16 bg-background-tertiary border border-border rounded-sm">
              <div className="w-full bg-gradient-to-t from-clip-green via-clip-yellow to-clip-red rounded-sm h-2/3" />
            </div>
          </div>
        </div>

        {/* Cue Volume */}
        <div className="space-y-2">
          <div className="text-foreground-muted text-xs flex items-center gap-1 justify-center">
            <TrendingUp className="h-3 w-3" />
            <span>CUE</span>
          </div>
          <div className="relative h-16 w-4 bg-background-tertiary border border-border rounded-sm mx-auto">
            <div className="absolute bottom-0 left-0 right-0 bg-clip-cyan rounded-sm h-1/2" />
            <div className="absolute w-full h-1 bg-background border border-border rounded-sm bottom-1/2 transform translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-2 space-y-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-8 p-0 text-xs text-foreground-muted hover:text-foreground hover:bg-hover"
        >
          <Settings className="h-3 w-3" />
        </Button>
        
        <div className="text-foreground-muted text-xs text-center">
          <div>44.1kHz</div>
          <div>24bit</div>
        </div>
      </div>
    </div>
  );
};