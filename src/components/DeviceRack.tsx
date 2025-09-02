import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Track } from "./SessionView";
import { Button } from "./ui/button";
import { Operator } from "./devices/Operator";
import { DrumRack } from "./devices/DrumRack";
import { Sampler } from "./devices/Sampler";
import { Reverb } from "./devices/Reverb";
import { DeviceBrowser } from "./DeviceBrowser";

export interface Device {
  id: string;
  name: string;
  type: 'instrument' | 'effect';
  category: 'synth' | 'drum' | 'sampler' | 'reverb' | 'delay' | 'eq' | 'compressor';
  isExpanded: boolean;
  parameters: { [key: string]: number };
}

interface DeviceRackProps {
  track: Track;
  onDeviceAdd?: (device: Device) => void;
  onDeviceRemove?: (deviceId: string) => void;
}

export const DeviceRack = ({ track, onDeviceAdd, onDeviceRemove }: DeviceRackProps) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showBrowser, setShowBrowser] = useState(false);

  const handleDeviceAdd = (deviceType: Device['category']) => {
    const newDevice: Device = {
      id: `${deviceType}-${Date.now()}`,
      name: getDeviceName(deviceType),
      type: getDeviceType(deviceType),
      category: deviceType,
      isExpanded: true,
      parameters: getDefaultParameters(deviceType)
    };

    setDevices(prev => [...prev, newDevice]);
    onDeviceAdd?.(newDevice);
    setShowBrowser(false);
  };

  const handleDeviceRemove = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    onDeviceRemove?.(deviceId);
  };

  const handleDeviceToggle = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, isExpanded: !d.isExpanded } : d
    ));
  };

  const handleParameterChange = (deviceId: string, parameter: string, value: number) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, parameters: { ...d.parameters, [parameter]: value }}
        : d
    ));
  };

  const renderDevice = (device: Device) => {
    switch (device.category) {
      case 'synth':
        return (
          <Operator
            device={device}
            onParameterChange={(param, value) => handleParameterChange(device.id, param, value)}
          />
        );
      case 'drum':
        return (
          <DrumRack
            device={device}
            onParameterChange={(param, value) => handleParameterChange(device.id, param, value)}
          />
        );
      case 'sampler':
        return (
          <Sampler
            device={device}
            onParameterChange={(param, value) => handleParameterChange(device.id, param, value)}
          />
        );
      case 'reverb':
        return (
          <Reverb
            device={device}
            onParameterChange={(param, value) => handleParameterChange(device.id, param, value)}
          />
        );
      default:
        return <div className="p-4 text-foreground-muted">Device not implemented</div>;
    }
  };

  return (
    <div className="bg-background-secondary border-l border-border w-80 flex flex-col">
      {/* Header */}
      <div className="h-12 bg-background-tertiary border-b border-border flex items-center justify-between px-4">
        <span className="text-foreground-muted text-xs font-mono">{track.name} - DEVICES</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBrowser(true)}
          className="h-6 w-6 p-0 text-foreground-muted hover:text-foreground hover:bg-hover"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Device Chain */}
      <div className="flex-1 overflow-y-auto">
        {devices.length === 0 ? (
          <div className="p-8 text-center text-foreground-muted">
            <div className="mb-4">No devices loaded</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBrowser(true)}
              className="text-xs hover:bg-hover"
            >
              <Plus className="h-3 w-3 mr-2" />
              Add Device
            </Button>
          </div>
        ) : (
          <div className="space-y-px">
            {devices.map((device) => (
              <div key={device.id} className="bg-background border-b border-border">
                {/* Device Header */}
                <div className="h-8 bg-background-tertiary border-b border-border flex items-center justify-between px-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeviceToggle(device.id)}
                      className="h-4 w-4 p-0 text-foreground-muted hover:text-foreground"
                    >
                      {device.isExpanded ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                    <span className="text-foreground text-xs font-mono">{device.name}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      device.type === 'instrument' ? 'bg-clip-blue' : 'bg-clip-orange'
                    }`} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeviceRemove(device.id)}
                    className="h-4 w-4 p-0 text-foreground-muted hover:text-transport-record"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Device Content */}
                {device.isExpanded && renderDevice(device)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Device Browser */}
      {showBrowser && (
        <DeviceBrowser
          onDeviceSelect={handleDeviceAdd}
          onClose={() => setShowBrowser(false)}
        />
      )}
    </div>
  );
};

function getDeviceName(category: Device['category']): string {
  const names = {
    synth: 'Operator',
    drum: 'Drum Rack',
    sampler: 'Sampler',
    reverb: 'Reverb',
    delay: 'Delay',
    eq: 'EQ Eight',
    compressor: 'Compressor'
  };
  return names[category];
}

function getDeviceType(category: Device['category']): Device['type'] {
  const instruments = ['synth', 'drum', 'sampler'];
  return instruments.includes(category) ? 'instrument' : 'effect';
}

function getDefaultParameters(category: Device['category']): { [key: string]: number } {
  switch (category) {
    case 'synth':
      return { ratio: 1, frequency: 440, level: 50, envelope: 50 };
    case 'drum':
      return { kick: 75, snare: 70, hihat: 60, swing: 0 };
    case 'sampler':
      return { tune: 0, volume: 75, filter: 50, decay: 50 };
    case 'reverb':
      return { size: 50, decay: 40, damping: 30, mix: 25 };
    default:
      return {};
  }
}