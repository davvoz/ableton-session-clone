import { Search, Zap, Music, Volume2 } from "lucide-react";
import { Device } from "./DeviceRack";
import { Button } from "./ui/button";

interface DeviceBrowserProps {
  onDeviceSelect: (deviceType: Device['category']) => void;
  onClose: () => void;
}

export const DeviceBrowser = ({ onDeviceSelect, onClose }: DeviceBrowserProps) => {
  const instruments = [
    { id: 'synth', name: 'Operator', description: 'FM Synthesizer', icon: Zap },
    { id: 'drum', name: 'Drum Rack', description: 'Drum Machine', icon: Music },
    { id: 'sampler', name: 'Sampler', description: 'Audio Sampler', icon: Volume2 },
  ];

  const effects = [
    { id: 'reverb', name: 'Reverb', description: 'Algorithmic Reverb', icon: Volume2 },
    { id: 'delay', name: 'Delay', description: 'Digital Delay', icon: Volume2 },
    { id: 'eq', name: 'EQ Eight', description: '8-Band Equalizer', icon: Volume2 },
    { id: 'compressor', name: 'Compressor', description: 'Dynamic Range Compressor', icon: Volume2 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-background border border-border rounded-lg w-96 h-96 flex flex-col shadow-lg">
        {/* Header */}
        <div className="h-12 bg-background-secondary border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-foreground-muted" />
            <span className="text-foreground text-sm font-mono">DEVICE BROWSER</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground"
          >
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Instruments */}
          <div>
            <h3 className="text-foreground text-xs font-mono mb-2 flex items-center gap-2">
              <Zap className="h-3 w-3 text-clip-blue" />
              INSTRUMENTS
            </h3>
            <div className="space-y-1">
              {instruments.map((device) => (
                <Button
                  key={device.id}
                  variant="ghost"
                  onClick={() => onDeviceSelect(device.id as Device['category'])}
                  className="w-full justify-start h-auto p-3 hover:bg-hover text-left"
                >
                  <div className="flex items-center gap-3">
                    <device.icon className="h-4 w-4 text-clip-blue" />
                    <div>
                      <div className="text-foreground text-sm font-mono">{device.name}</div>
                      <div className="text-foreground-muted text-xs">{device.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Effects */}
          <div>
            <h3 className="text-foreground text-xs font-mono mb-2 flex items-center gap-2">
              <Volume2 className="h-3 w-3 text-clip-orange" />
              AUDIO EFFECTS
            </h3>
            <div className="space-y-1">
              {effects.map((device) => (
                <Button
                  key={device.id}
                  variant="ghost"
                  onClick={() => onDeviceSelect(device.id as Device['category'])}
                  className="w-full justify-start h-auto p-3 hover:bg-hover text-left"
                >
                  <div className="flex items-center gap-3">
                    <device.icon className="h-4 w-4 text-clip-orange" />
                    <div>
                      <div className="text-foreground text-sm font-mono">{device.name}</div>
                      <div className="text-foreground-muted text-xs">{device.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};