import { Play, Square } from "lucide-react";
import { Clip } from "./SessionView";

interface ClipSlotProps {
  clip?: Clip;
  onClick: () => void;
  isGlobalPlaying: boolean;
}

export const ClipSlot = ({ clip, onClick, isGlobalPlaying }: ClipSlotProps) => {
  const isEmpty = !clip;
  const isPlaying = clip?.isPlaying && isGlobalPlaying;
  const isRecording = clip?.isRecording;

  return (
    <div
      onClick={onClick}
      className={`
        h-grid aspect-square border border-border cursor-pointer
        flex items-center justify-center relative overflow-hidden
        transition-all duration-fast hover:brightness-110
        ${isEmpty 
          ? 'bg-background-tertiary hover:bg-hover' 
          : `bg-clip-${clip.color} hover:bg-clip-${clip.color}/80`
        }
        ${isPlaying ? 'animate-pulse' : ''}
      `}
    >
      {isEmpty ? (
        /* Empty slot */
        <div className="w-full h-full flex items-center justify-center text-foreground-subtle">
          <div className="w-1 h-1 rounded-full bg-current opacity-50" />
        </div>
      ) : (
        /* Clip content */
        <>
          {/* Clip name */}
          <div className="absolute inset-2 flex flex-col justify-between text-xs text-background">
            <div className="font-mono truncate">{clip.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-75">{clip.type.toUpperCase()}</span>
              {isRecording && (
                <div className="w-2 h-2 rounded-full bg-transport-record animate-pulse" />
              )}
            </div>
          </div>

          {/* Play/Stop indicator */}
          <div className="absolute top-1 right-1">
            {isPlaying ? (
              <Square className="h-3 w-3 text-background" fill="currentColor" />
            ) : (
              <Play className="h-3 w-3 text-background opacity-75" />
            )}
          </div>

          {/* Waveform/Piano roll preview */}
          <div className="absolute bottom-1 left-1 right-1 h-3 opacity-50">
            {clip.type === 'audio' ? (
              /* Audio waveform */
              <div className="flex items-end justify-between h-full gap-px">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-background flex-1"
                    style={{ 
                      height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%` 
                    }}
                  />
                ))}
              </div>
            ) : (
              /* MIDI notes */
              <div className="grid grid-cols-4 gap-px h-full">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className={`bg-background ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'}`}
                    style={{ 
                      height: `${40 + Math.random() * 60}%`,
                      alignSelf: 'flex-end'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};