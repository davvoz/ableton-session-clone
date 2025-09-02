import { X, Grid3X3, Zap } from "lucide-react";
import { Clip } from "./SessionView";
import { Button } from "./ui/button";

interface PianoRollProps {
  clip: Clip;
  onClose: () => void;
}

export const PianoRoll = ({ clip, onClose }: PianoRollProps) => {
  // Generate piano keys (C5 to C3)
  const notes = [
    'C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4',
    'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3'
  ];

  const isBlackKey = (note: string) => note.includes('#');
  const isWhiteKey = (note: string) => !note.includes('#');

  // Generate some random MIDI notes for demo
  const midiNotes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    note: notes[Math.floor(Math.random() * notes.length)],
    start: Math.random() * 15,
    duration: 0.25 + Math.random() * 2,
    velocity: 60 + Math.random() * 67
  }));

  return (
    <div className="fixed inset-0 z-50 bg-background border-t border-border flex flex-col">
      {/* Header */}
      <div className="h-12 bg-background-secondary border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h3 className="text-foreground font-mono text-sm">{clip.name} - Piano Roll</h3>
          <div className={`px-2 py-1 rounded text-xs bg-clip-${clip.color}/20 text-clip-${clip.color}`}>
            MIDI
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-foreground-muted hover:text-foreground hover:bg-hover"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-foreground-muted hover:text-foreground hover:bg-hover"
          >
            <Zap className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-foreground-muted hover:text-foreground hover:bg-hover"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Piano Roll Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Piano Keys */}
        <div className="w-16 bg-background-secondary border-r border-border overflow-y-auto">
          {notes.map((note, index) => (
            <div
              key={note}
              className={`h-6 border-b border-border-subtle flex items-center justify-end px-2 cursor-pointer transition-colors ${
                isBlackKey(note)
                  ? 'bg-background-tertiary text-foreground-muted hover:bg-hover'
                  : 'bg-background-secondary text-foreground hover:bg-hover'
              }`}
            >
              <span className="text-xs font-mono">{note}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto relative">
          {/* Time grid lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 17 }, (_, i) => (
              <div
                key={i}
                className={`absolute top-0 bottom-0 ${i % 4 === 0 ? 'border-border' : 'border-border-subtle'} ${i === 0 ? '' : 'border-l'}`}
                style={{ left: `${i * 64}px` }}
              />
            ))}
          </div>

          {/* Note lanes */}
          {notes.map((note, index) => (
            <div
              key={note}
              className={`h-6 border-b border-border-subtle relative ${
                isBlackKey(note) ? 'bg-background-tertiary/50' : 'bg-background'
              }`}
              style={{ top: `${index * 24}px` }}
            >
              {/* MIDI Notes */}
              {midiNotes
                .filter(midiNote => midiNote.note === note)
                .map(midiNote => (
                  <div
                    key={midiNote.id}
                    className={`absolute top-0.5 h-5 bg-clip-${clip.color} rounded-sm border border-clip-${clip.color}/50 cursor-pointer hover:brightness-110`}
                    style={{
                      left: `${midiNote.start * 64}px`,
                      width: `${midiNote.duration * 64}px`,
                      opacity: midiNote.velocity / 127
                    }}
                  />
                ))
              }
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tools */}
      <div className="h-10 bg-background-secondary border-t border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-xs text-foreground-muted">
          <span>Quantize: 1/16</span>
          <span>Velocity: 100</span>
          <span>Length: 4 bars</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-foreground-muted">
          <span>Notes: {midiNotes.length}</span>
        </div>
      </div>
    </div>
  );
};