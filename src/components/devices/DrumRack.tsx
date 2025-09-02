import { Device } from "../DeviceRack";
import { Knob } from "../ui/Knob";
import { Button } from "../ui/button";

interface DrumRackProps {
  device: Device;
  onParameterChange: (parameter: string, value: number) => void;
}

export const DrumRack = ({ device, onParameterChange }: DrumRackProps) => {
  const { parameters } = device;

  const drumPads = [
    { id: 'kick', name: 'KICK', note: 'C1', color: 'clip-red' },
    { id: 'snare', name: 'SNARE', note: 'D1', color: 'clip-orange' },
    { id: 'hihat', name: 'HI-HAT', note: 'F#1', color: 'clip-yellow' },
    { id: 'openhat', name: 'OPEN HAT', note: 'A#1', color: 'clip-green' },
    { id: 'crash', name: 'CRASH', note: 'C#2', color: 'clip-blue' },
    { id: 'ride', name: 'RIDE', note: 'D#2', color: 'clip-purple' },
    { id: 'clap', name: 'CLAP', note: 'E1', color: 'clip-pink' },
    { id: 'perc', name: 'PERC', note: 'G1', color: 'clip-cyan' },
  ];

  const handlePadClick = (padId: string) => {
    // Trigger drum sound
    console.log(`Playing ${padId}`);
  };

  return (
    <div className="bg-background p-4 space-y-4">
      {/* Drum Pads Grid */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          DRUM PADS
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {drumPads.map((pad) => (
            <Button
              key={pad.id}
              variant="ghost"
              onClick={() => handlePadClick(pad.id)}
              className={`h-12 p-2 bg-${pad.color}/20 border border-${pad.color}/50 hover:bg-${pad.color}/30 text-${pad.color} text-xs font-mono flex flex-col items-center justify-center transition-all`}
            >
              <div className="font-bold">{pad.name}</div>
              <div className="text-xs opacity-75">{pad.note}</div>
            </Button>
          ))}
        </div>
      </div>

      {/* Global Controls */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          GLOBAL
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.swing || 0}
              onChange={(value) => onParameterChange('swing', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">SWING</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.swing || 0)}%</div>
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
              value={parameters.tone || 50}
              onChange={(value) => onParameterChange('tone', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">TONE</div>
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

      {/* Pattern Sequencer */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          PATTERN
        </div>
        
        <div className="space-y-1">
          {drumPads.slice(0, 4).map((pad) => (
            <div key={pad.id} className="flex items-center gap-1">
              <div className={`w-12 text-xs text-${pad.color} font-mono`}>
                {pad.name}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 16 }, (_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className={`w-4 h-4 p-0 border border-border ${
                      Math.random() > 0.7 
                        ? `bg-${pad.color} border-${pad.color}` 
                        : 'bg-background-tertiary hover:bg-hover'
                    }`}
                    style={{ 
                      opacity: i % 4 === 0 ? 1 : 0.7,
                      borderWidth: i % 4 === 0 ? '2px' : '1px'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};