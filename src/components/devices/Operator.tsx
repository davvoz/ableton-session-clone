import { Device } from "../DeviceRack";
import { Knob } from "../ui/Knob";
import { WaveformDisplay } from "../ui/WaveformDisplay";

interface OperatorProps {
  device: Device;
  onParameterChange: (parameter: string, value: number) => void;
}

export const Operator = ({ device, onParameterChange }: OperatorProps) => {
  const { parameters } = device;

  return (
    <div className="bg-background p-4 space-y-4">
      {/* Oscillator Section */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          OSCILLATOR A
        </div>
        
        {/* Waveform Display */}
        <div className="bg-background-tertiary border border-border rounded p-2 h-16">
          <WaveformDisplay 
            type="sine" 
            frequency={parameters.frequency || 440}
            className="w-full h-full"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.ratio || 1}
              onChange={(value) => onParameterChange('ratio', value)}
              min={0.125}
              max={16}
              step={0.125}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">RATIO</div>
            <div className="text-foreground text-xs font-mono">{(parameters.ratio || 1).toFixed(2)}</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.frequency || 440}
              onChange={(value) => onParameterChange('frequency', value)}
              min={20}
              max={2000}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">FREQ</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.frequency || 440)}Hz</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.level || 50}
              onChange={(value) => onParameterChange('level', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">LEVEL</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.level || 50)}</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.envelope || 50}
              onChange={(value) => onParameterChange('envelope', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">ENV</div>
            <div className="text-foreground text-xs font-mono">{Math.round(parameters.envelope || 50)}</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          FILTER
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.cutoff || 50}
              onChange={(value) => onParameterChange('cutoff', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">CUTOFF</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.resonance || 0}
              onChange={(value) => onParameterChange('resonance', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">RES</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.drive || 0}
              onChange={(value) => onParameterChange('drive', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">DRIVE</div>
          </div>
        </div>
      </div>

      {/* LFO Section */}
      <div className="space-y-3">
        <div className="text-foreground text-xs font-mono border-b border-border pb-1">
          LFO
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <Knob
              value={parameters.lfoRate || 1}
              onChange={(value) => onParameterChange('lfoRate', value)}
              min={0.1}
              max={20}
              step={0.1}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">RATE</div>
            <div className="text-foreground text-xs font-mono">{(parameters.lfoRate || 1).toFixed(1)}Hz</div>
          </div>

          <div className="text-center">
            <Knob
              value={parameters.lfoAmount || 0}
              onChange={(value) => onParameterChange('lfoAmount', value)}
              min={0}
              max={100}
              className="mb-1"
            />
            <div className="text-foreground-muted text-xs">AMOUNT</div>
          </div>
        </div>
      </div>
    </div>
  );
};