import { Volume2, RotateCcw, Mic, Headphones } from "lucide-react";
import { Track } from "./SessionView";
import { Button } from "./ui/button";

interface TrackHeaderProps {
  track: Track;
}

export const TrackHeader = ({ track }: TrackHeaderProps) => {
  return (
    <div className="w-track bg-background-secondary border-b border-border p-2 space-y-2">
      {/* Track Name and Type */}
      <div className="space-y-1">
        <div className="text-foreground text-xs font-mono truncate">{track.name}</div>
        <div className={`text-xs px-2 py-1 rounded text-center ${
          track.type === 'midi' 
            ? 'bg-clip-blue/20 text-clip-blue' 
            : 'bg-clip-orange/20 text-clip-orange'
        }`}>
          {track.type.toUpperCase()}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-2">
        {/* Arm, Solo, Mute */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 w-6 p-0 text-xs ${
              track.arm 
                ? 'bg-transport-record text-background' 
                : 'text-foreground-muted hover:text-foreground hover:bg-hover'
            }`}
          >
            <Mic className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 w-6 p-0 text-xs ${
              track.solo 
                ? 'bg-clip-yellow text-background' 
                : 'text-foreground-muted hover:text-foreground hover:bg-hover'
            }`}
          >
            S
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 w-6 p-0 text-xs ${
              track.mute 
                ? 'bg-clip-red text-background' 
                : 'text-foreground-muted hover:text-foreground hover:bg-hover'
            }`}
          >
            M
          </Button>
        </div>

        {/* Volume Fader */}
        <div className="space-y-1">
          <div className="text-foreground-muted text-xs flex items-center gap-1">
            <Volume2 className="h-3 w-3" />
            <span>{track.volume}</span>
          </div>
          <div className="relative h-16 w-4 bg-background-tertiary border border-border rounded-sm mx-auto">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-selected rounded-sm"
              style={{ height: `${track.volume}%` }}
            />
            <div 
              className="absolute w-full h-1 bg-background border border-border rounded-sm"
              style={{ bottom: `${track.volume}%`, transform: 'translateY(50%)' }}
            />
          </div>
        </div>

        {/* Pan Knob */}
        <div className="space-y-1">
          <div className="text-foreground-muted text-xs flex items-center gap-1">
            <RotateCcw className="h-3 w-3" />
            <span>{track.pan > 0 ? `R${track.pan}` : track.pan < 0 ? `L${Math.abs(track.pan)}` : 'C'}</span>
          </div>
          <div className="relative h-4 w-4 bg-background-tertiary border border-border rounded-full mx-auto">
            <div className="absolute inset-0.5 bg-selected rounded-full" />
          </div>
        </div>

        {/* Monitor */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-full p-0 text-xs text-foreground-muted hover:text-foreground hover:bg-hover"
        >
          <Headphones className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};