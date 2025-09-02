import { Upload, Play, Square } from "lucide-react";
import { Device } from "../DeviceRack";
import { Knob } from "../ui/Knob";
import { Button } from "../ui/button";

interface SamplerProps {
  device: Device;
  onParameterChange: (parameter: string, value: number) => void;
}

export const Sampler = ({ device, onParameterChange }: SamplerProps) => {
  const { parameters } = device;

  return (
    <div className="bg-background p-4 space-y-4">
      {/* Sample Area */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          SAMPLE
        </div>
        
        {/* Waveform Display */}
        <div className="bg-background-tertiary border border-border rounded p-3 h-20 flex items-center justify-center">
          <div className="flex items-end justify-center gap-px h-12 w-full max-w-48">
            {/* Sample waveform visualization */}
            {Array.from({ length: 64 }, (_, i) => (
              <div
                key={i}
                className="bg-clip-green flex-1 min-w-0"
                style={{ 
                  height: `${20 + Math.sin(i * 0.3) * 15 + Math.random() * 10}%`,
                  opacity: 0.7
                }}
              />
            ))}
          </div>
        </div>

        {/* Sample Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-foreground-muted hover:text-foreground hover:bg-hover border border-border"
          >
            <Upload className="h-3 w-3 mr-2" />
            Load Sample
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-foreground-muted hover:text-transport-play hover:bg-hover"
          >
            <Play className="h-3 w-3" />
          </Button>
          
          <div className="text-foreground-muted text-xs font-mono ml-2">
            kick_sample.wav
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          PLAYBACK
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.tune || 0}
              onChange={(value) => onParameterChange('tune', value)}
              min={-24}
              max={24}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">TUNE</div>
            <div className="text-foreground text-xs font-mono">{parameters.tune > 0 ? '+' : ''}{Math.round(parameters.tune || 0)}</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.volume || 75}
              onChange={(value) => onParameterChange('volume', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">VOLUME</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.start || 0}
              onChange={(value) => onParameterChange('start', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">START</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.length || 100}
              onChange={(value) => onParameterChange('length', value)}
              min={1}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">LENGTH</div>
          </div>
        </div>
      </div>

      {/* Filter & Envelope */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          FILTER & ENVELOPE
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.filter || 50}
              onChange={(value) => onParameterChange('filter', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">FILTER</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.attack || 0}
              onChange={(value) => onParameterChange('attack', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">ATTACK</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.decay || 50}
              onChange={(value) => onParameterChange('decay', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">DECAY</div>
          </div>
        </div>
      </div>

      {/* Sample Zone */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          KEY MAPPING
        </div>
        
        <div className="bg-background-tertiary border border-border rounded p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-muted">Root Key:</span>
            <span className="text-foreground font-mono">C3</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-foreground-muted">Range:</span>
            <span className="text-foreground font-mono">C1 - C5</span>
          </div>
        </div>
      </div>
    </div>
  );
};