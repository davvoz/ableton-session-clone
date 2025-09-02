import { Device } from "../DeviceRack";
import { Knob } from "../ui/Knob";

interface ReverbProps {
  device: Device;
  onParameterChange: (parameter: string, value: number) => void;
}

export const Reverb = ({ device, onParameterChange }: ReverbProps) => {
  const { parameters } = device;

  return (
    <div className="bg-background p-4 space-y-4">
      {/* Algorithm Selection */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          ALGORITHM
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {['Hall', 'Room', 'Plate', 'Spring'].map((algo) => (
            <button
              key={algo}
              className={`h-8 px-3 text-xs font-mono border border-border rounded transition-colors ${
                algo === 'Hall' 
                  ? 'bg-selected text-background' 
                  : 'bg-background-tertiary text-foreground-muted hover:bg-hover'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      {/* Main Controls */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          REVERB PARAMETERS
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Knob
              value={parameters.size || 50}
              onChange={(value) => onParameterChange('size', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">SIZE</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.size || 50)}%</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.decay || 40}
              onChange={(value) => onParameterChange('decay', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">DECAY</div>
            <div className="text-foreground text-xs font-mono">{((parameters.decay || 40) * 0.1).toFixed(1)}s</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Knob
              value={parameters.damping || 30}
              onChange={(value) => onParameterChange('damping', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">DAMPING</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.predelay || 0}
              onChange={(value) => onParameterChange('predelay', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">PRE-DELAY</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.predelay || 0)}ms</div>
          </div>
        </div>
      </div>

      {/* EQ Section */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          EQ
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.lowCut || 0}
              onChange={(value) => onParameterChange('lowCut', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">LOW CUT</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.highCut || 100}
              onChange={(value) => onParameterChange('highCut', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">HIGH CUT</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.mix || 25}
              onChange={(value) => onParameterChange('mix', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">MIX</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.mix || 25)}%</div>
          </div>
        </div>
      </div>

      {/* Modulation */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          MODULATION
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Knob
              value={parameters.chorus || 0}
              onChange={(value) => onParameterChange('chorus', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">CHORUS</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.spin || 0}
              onChange={(value) => onParameterChange('spin', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">SPIN</div>
          </div>
        </div>
      </div>
    </div>
  );
};