import { Play, Square, Circle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "./ui/button";

interface TransportProps {
  isPlaying: boolean;
  isRecording: boolean;
  tempo: number;
  onPlay: () => void;
  onStop: () => void;
  onRecord: () => void;
  onTempoChange: (tempo: number) => void;
}

export const Transport = ({
  isPlaying,
  isRecording,
  tempo,
  onPlay,
  onStop,
  onRecord,
  onTempoChange,
}: TransportProps) => {
  return (
    <div className="h-16 bg-background-secondary border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        {/* Transport Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-hover text-foreground-muted hover:text-foreground"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onPlay}
            className={`h-10 w-10 p-0 hover:bg-hover ${
              isPlaying 
                ? 'bg-transport-play text-background hover:bg-transport-play/80' 
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <Play className="h-5 w-5" fill={isPlaying ? 'currentColor' : 'none'} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onStop}
            className="h-8 w-8 p-0 hover:bg-hover text-foreground-muted hover:text-foreground"
          >
            <Square className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRecord}
            className={`h-8 w-8 p-0 hover:bg-hover ${
              isRecording 
                ? 'bg-transport-record text-background hover:bg-transport-record/80' 
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <Circle className="h-4 w-4" fill={isRecording ? 'currentColor' : 'none'} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-hover text-foreground-muted hover:text-foreground"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Tempo */}
        <div className="flex items-center gap-2 ml-6">
          <span className="text-foreground-muted text-xs">TEMPO</span>
          <div className="flex items-center bg-background-tertiary border border-border rounded px-2 py-1">
            <input
              type="number"
              value={tempo}
              onChange={(e) => onTempoChange(Math.max(60, Math.min(200, Number(e.target.value))))}
              className="w-12 bg-transparent text-foreground text-xs outline-none text-center"
              min="60"
              max="200"
            />
            <span className="text-foreground-muted text-xs ml-1">BPM</span>
          </div>
        </div>
      </div>

      {/* Position Display */}
      <div className="flex items-center gap-4">
        <div className="text-foreground-muted text-xs">
          <span className="text-lg font-mono">1.1.1</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-transport-play animate-pulse"></div>
          <span className="text-foreground-muted text-xs">SESSION</span>
        </div>
      </div>
    </div>
  );
};