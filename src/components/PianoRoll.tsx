import { X, Grid3X3, Zap, Plus, Minus, RotateCcw } from "lucide-react";
import { useState, useCallback, useRef, useMemo } from "react";
import { Clip } from "./SessionView";
import { Button } from "./ui/button";

interface MidiNote {
  id: string;
  note: string;
  start: number;
  duration: number;
  velocity: number;
  selected?: boolean;
}

interface PianoRollProps {
  clip: Clip;
  onClose: () => void;
}

export const PianoRoll = ({ clip, onClose }: PianoRollProps) => {
  // Piano keys configuration (extended range)
  const notes = useMemo(() => [
    'C6', 'B5', 'A#5', 'A5', 'G#5', 'G5', 'F#5', 'F5', 'E5', 'D#5', 'D5', 'C#5',
    'C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4',
    'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3',
    'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2', 'C2'
  ], []);

  // State management
  const [midiNotes, setMidiNotes] = useState<MidiNote[]>([
    { id: '1', note: 'C4', start: 0, duration: 1, velocity: 100 },
    { id: '2', note: 'E4', start: 1, duration: 1, velocity: 80 },
    { id: '3', note: 'G4', start: 2, duration: 2, velocity: 90 },
    { id: '4', note: 'C5', start: 4, duration: 1, velocity: 110 }
  ]);
  
  const [zoomX, setZoomX] = useState(64); // pixels per beat
  const [zoomY, setZoomY] = useState(24); // pixels per semitone
  const [quantize, setQuantize] = useState(0.25); // 1/16 note
  const [selectedTool, setSelectedTool] = useState<'pencil' | 'select' | 'erase'>('pencil');
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [dragState, setDragState] = useState<{
    noteId: string;
    startX: number;
    startY: number;
    originalStart: number;
    originalNote: string;
  } | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  // Helper functions
  const isBlackKey = (note: string) => note.includes('#');
  const getNotePosition = (note: string) => notes.indexOf(note);
  const getQuantizedPosition = (position: number) => Math.round(position / quantize) * quantize;
  
  // Event handlers
  const handleNoteClick = useCallback((note: string, position: number) => {
    if (selectedTool === 'pencil') {
      const quantizedStart = getQuantizedPosition(position);
      const existingNote = midiNotes.find(n => n.note === note && Math.abs(n.start - quantizedStart) < 0.1);
      
      if (existingNote) {
        // Remove existing note
        setMidiNotes(prev => prev.filter(n => n.id !== existingNote.id));
      } else {
        // Add new note
        const newNote: MidiNote = {
          id: Date.now().toString(),
          note,
          start: quantizedStart,
          duration: quantize,
          velocity: 100
        };
        setMidiNotes(prev => [...prev, newNote]);
      }
    }
  }, [selectedTool, midiNotes, quantize]);

  const handleNoteSelect = useCallback((noteId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (selectedTool === 'erase') {
      setMidiNotes(prev => prev.filter(n => n.id !== noteId));
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      setSelectedNotes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(noteId)) {
          newSet.delete(noteId);
        } else {
          newSet.add(noteId);
        }
        return newSet;
      });
    } else {
      setSelectedNotes(new Set([noteId]));
    }
  }, [selectedTool]);

  const handleGridClick = useCallback((event: React.MouseEvent) => {
    if (selectedTool === 'select') {
      setSelectedNotes(new Set());
    }
  }, [selectedTool]);

  const handleZoom = useCallback((direction: 'in' | 'out', axis: 'x' | 'y') => {
    if (axis === 'x') {
      setZoomX(prev => direction === 'in' ? Math.min(prev * 1.5, 200) : Math.max(prev / 1.5, 20));
    } else {
      setZoomY(prev => direction === 'in' ? Math.min(prev * 1.5, 48) : Math.max(prev / 1.5, 12));
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background border-t border-border flex flex-col">
      {/* Enhanced Header */}
      <div className="h-12 bg-background-secondary border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h3 className="text-foreground font-mono text-sm font-medium">{clip.name} - Piano Roll</h3>
          <div className={`px-3 py-1 rounded text-xs font-medium bg-clip-${clip.color}/20 text-clip-${clip.color}`}>
            MIDI
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Tool Selection */}
          <div className="flex items-center gap-1 mr-4">
            <Button
              variant={selectedTool === 'pencil' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool('pencil')}
              className="h-8 w-8 p-0"
              title="Pencil Tool (P)"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'select' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool('select')}
              className="h-8 w-8 p-0"
              title="Select Tool (S)"
            >
              <Zap className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('in', 'x')}
              className="h-8 w-8 p-0"
              title="Zoom In Horizontally"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('out', 'x')}
              className="h-8 w-8 p-0"
              title="Zoom Out Horizontally"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setZoomX(64); setZoomY(24); }}
              className="h-8 w-8 p-0"
              title="Reset Zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

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

      {/* Redesigned Piano Roll Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Enhanced Piano Keys */}
        <div className="w-20 bg-background-secondary border-r border-border overflow-y-auto flex-shrink-0">
          <div className="relative">
            {notes.map((note, index) => {
              const isBlack = isBlackKey(note);
              const noteNumber = note.replace(/[A-G]#?/, '');
              const noteName = note.replace(/\d/, '');
              
              return (
                <div
                  key={note}
                  className={`h-6 border-b border-border-subtle flex items-center justify-between px-3 cursor-pointer transition-colors relative ${
                    isBlack
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-background-secondary text-foreground hover:bg-hover'
                  }`}
                  style={{ height: `${zoomY}px` }}
                  onClick={() => {
                    // Play note preview (placeholder)
                    console.log(`Playing ${note}`);
                  }}
                >
                  <span className={`text-xs font-mono font-medium ${isBlack ? 'text-gray-300' : 'text-foreground'}`}>
                    {noteName}
                  </span>
                  <span className={`text-xs font-mono ${isBlack ? 'text-gray-400' : 'text-foreground-muted'}`}>
                    {noteNumber}
                  </span>
                  
                  {/* Octave separator line */}
                  {noteName === 'C' && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Grid */}
        <div 
          ref={gridRef}
          className="flex-1 overflow-auto relative bg-background"
          onClick={handleGridClick}
        >
          {/* Improved time grid lines */}
          <div className="absolute inset-0" style={{ width: `${16 * zoomX}px`, height: `${notes.length * zoomY}px` }}>
            {/* Bar lines (every 4 beats) */}
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={`bar-${i}`}
                className="absolute top-0 bottom-0 border-l-2 border-border pointer-events-none"
                style={{ left: `${i * 4 * zoomX}px` }}
              />
            ))}
            
            {/* Beat lines */}
            {Array.from({ length: 17 }, (_, i) => (
              <div
                key={`beat-${i}`}
                className={`absolute top-0 bottom-0 pointer-events-none ${
                  i % 4 === 0 ? 'border-l border-border' : 'border-l border-border-subtle'
                }`}
                style={{ left: `${i * zoomX}px` }}
              />
            ))}
            
            {/* Subdivision lines (1/4 note divisions) */}
            {Array.from({ length: 65 }, (_, i) => (
              <div
                key={`sub-${i}`}
                className="absolute top-0 bottom-0 border-l border-border-subtle opacity-50 pointer-events-none"
                style={{ left: `${i * (zoomX / 4)}px` }}
              />
            ))}
          </div>

          {/* Note lanes with improved styling */}
          <div className="relative" style={{ height: `${notes.length * zoomY}px` }}>
            {notes.map((note, index) => {
              const isBlack = isBlackKey(note);
              const noteName = note.replace(/\d/, '');
              
              return (
                <div
                  key={note}
                  className={`absolute left-0 right-0 border-b border-border-subtle cursor-pointer ${
                    isBlack ? 'bg-gray-50/5' : 'bg-background'
                  } ${noteName === 'C' ? 'border-b-border' : ''}`}
                  style={{ 
                    top: `${index * zoomY}px`, 
                    height: `${zoomY}px`,
                    width: `${16 * zoomX}px`
                  }}
                  onClick={(e) => {
                    const rect = gridRef.current?.getBoundingClientRect();
                    if (rect) {
                      const x = e.clientX - rect.left;
                      const position = x / zoomX;
                      handleNoteClick(note, position);
                    }
                  }}
                />
              );
            })}

            {/* Enhanced MIDI Notes */}
            {midiNotes.map(midiNote => {
              const noteIndex = getNotePosition(midiNote.note);
              if (noteIndex === -1) return null;
              
              const isSelected = selectedNotes.has(midiNote.id);
              
              return (
                <div
                  key={midiNote.id}
                  className={`absolute rounded-sm border-2 cursor-pointer transition-all hover:brightness-110 ${
                    isSelected 
                      ? `bg-clip-${clip.color} border-white shadow-lg` 
                      : `bg-clip-${clip.color} border-clip-${clip.color}/50`
                  }`}
                  style={{
                    left: `${midiNote.start * zoomX}px`,
                    top: `${noteIndex * zoomY + 2}px`,
                    width: `${Math.max(midiNote.duration * zoomX - 2, 8)}px`,
                    height: `${zoomY - 4}px`,
                    opacity: midiNote.velocity / 127
                  }}
                  onClick={(e) => handleNoteSelect(midiNote.id, e)}
                >
                  {/* Note content */}
                  <div className="w-full h-full flex items-center justify-start px-1">
                    <span className="text-xs font-mono text-background font-medium truncate">
                      {midiNote.note}
                    </span>
                  </div>
                  
                  {/* Resize handles */}
                  {isSelected && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white cursor-w-resize" />
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white cursor-e-resize" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Tools */}
      <div className="h-12 bg-background-secondary border-t border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-6 text-xs text-foreground-muted">
          <div className="flex items-center gap-2">
            <span>Quantize:</span>
            <select 
              value={quantize}
              onChange={(e) => setQuantize(Number(e.target.value))}
              className="bg-background border border-border rounded px-2 py-1 text-foreground text-xs"
            >
              <option value={1}>1/4</option>
              <option value={0.5}>1/8</option>
              <option value={0.25}>1/16</option>
              <option value={0.125}>1/32</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Tool:</span>
            <span className="text-foreground font-medium capitalize">{selectedTool}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Zoom:</span>
            <span className="text-foreground">{Math.round((zoomX / 64) * 100)}%</span>
          </div>
          
          <span>Length: 4 bars</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-foreground-muted">
          <span>Notes: {midiNotes.length}</span>
          <span>Selected: {selectedNotes.size}</span>
        </div>
      </div>
    </div>
  );
};