import { useState } from "react";
import { Transport } from "./Transport";
import { TrackHeader } from "./TrackHeader";
import { ClipSlot } from "./ClipSlot";
import { PianoRoll } from "./PianoRoll";
import { MasterSection } from "./MasterSection";
import { DeviceRack } from "./DeviceRack";

export interface Clip {
  id: string;
  name: string;
  type: 'audio' | 'midi';
  color: 'orange' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'cyan';
  isPlaying?: boolean;
  isRecording?: boolean;
}

export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi';
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  arm: boolean;
}

export const SessionView = () => {
  const [tracks] = useState<Track[]>(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: `track-${i}`,
      name: i < 4 ? `MIDI ${i + 1}` : `Audio ${i - 3}`,
      type: i < 4 ? 'midi' : 'audio',
      volume: 75,
      pan: 0,
      mute: false,
      solo: false,
      arm: false,
    }))
  );

  const [clips, setClips] = useState<{ [key: string]: Clip }>({});
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [tempo, setTempo] = useState(120);

  const colors: Clip['color'][] = ['orange', 'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'cyan'];

  const handleClipClick = (trackId: string, sceneIndex: number) => {
    const clipId = `${trackId}-${sceneIndex}`;
    
    if (clips[clipId]) {
      // Toggle clip playback
      setClips(prev => ({
        ...prev,
        [clipId]: {
          ...prev[clipId],
          isPlaying: !prev[clipId].isPlaying
        }
      }));
    } else {
      // Create new clip
      const track = tracks.find(t => t.id === trackId);
      if (track) {
        setClips(prev => ({
          ...prev,
          [clipId]: {
            id: clipId,
            name: `${track.name} Clip ${sceneIndex + 1}`,
            type: track.type,
            color: colors[Math.floor(Math.random() * colors.length)],
            isPlaying: false,
          }
        }));
        setSelectedClip(clipId);
      }
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(selectedTrack === trackId ? null : trackId);
  };

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleStop = () => {
    setIsPlaying(false);
    setClips(prev => 
      Object.fromEntries(
        Object.entries(prev).map(([id, clip]) => [id, { ...clip, isPlaying: false }])
      )
    );
  };
  const handleRecord = () => setIsRecording(!isRecording);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden font-mono text-sm">
      {/* Top Transport Bar */}
      <Transport 
        isPlaying={isPlaying}
        isRecording={isRecording}
        tempo={tempo}
        onPlay={handlePlay}
        onStop={handleStop}
        onRecord={handleRecord}
        onTempoChange={setTempo}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Session Grid */}
        <div className="flex flex-1">
          {/* Track Headers */}
          <div className="flex flex-col bg-background-secondary border-r border-border">
            <div className="h-12 bg-background-tertiary border-b border-border flex items-center justify-center">
              <span className="text-foreground-muted text-xs font-mono">TRACKS</span>
            </div>
            {tracks.map((track) => (
              <div 
                key={track.id}
                onClick={() => handleTrackSelect(track.id)}
                className={`cursor-pointer ${selectedTrack === track.id ? 'bg-selected/20' : ''}`}
              >
                <TrackHeader track={track} />
              </div>
            ))}
          </div>

          {/* Clip Grid */}
          <div className="flex-1 overflow-auto">
            <div className="h-12 bg-background-tertiary border-b border-border flex items-center px-4">
              <span className="text-foreground-muted text-xs">SCENES</span>
            </div>
            
            <div className="grid grid-cols-8 gap-px bg-border p-px">
              {Array.from({ length: 8 }, (_, sceneIndex) =>
                tracks.map((track) => (
                  <ClipSlot
                    key={`${track.id}-${sceneIndex}`}
                    clip={clips[`${track.id}-${sceneIndex}`]}
                    onClick={() => handleClipClick(track.id, sceneIndex)}
                    isGlobalPlaying={isPlaying}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Device Rack */}
        {selectedTrack && (
          <DeviceRack 
            track={tracks.find(t => t.id === selectedTrack)!}
          />
        )}

        {/* Master Section */}
        <MasterSection />
      </div>

      {/* Piano Roll */}
      {selectedClip && clips[selectedClip]?.type === 'midi' && (
        <PianoRoll 
          clip={clips[selectedClip]} 
          onClose={() => setSelectedClip(null)}
        />
      )}
    </div>
  );
};