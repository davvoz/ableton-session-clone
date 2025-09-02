import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WaveformDisplayProps {
  type?: 'sine' | 'square' | 'sawtooth' | 'triangle';
  frequency?: number;
  className?: string;
}

export const WaveformDisplay = ({ 
  type = 'sine', 
  frequency = 440, 
  className 
}: WaveformDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Set up drawing style
      ctx.strokeStyle = 'hsl(var(--selected))';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw waveform
      ctx.beginPath();
      
      const samples = width;
      const amplitude = height * 0.3;
      const centerY = height / 2;
      const cycles = 2; // Number of complete cycles to show
      
      for (let x = 0; x < samples; x++) {
        const t = (x / samples) * cycles * Math.PI * 2;
        let y = centerY;

        switch (type) {
          case 'sine':
            y = centerY + Math.sin(t) * amplitude;
            break;
          case 'square':
            y = centerY + (Math.sin(t) > 0 ? amplitude : -amplitude);
            break;
          case 'sawtooth':
            y = centerY + ((t % (Math.PI * 2)) / (Math.PI * 2) - 0.5) * 2 * amplitude;
            break;
          case 'triangle':
            const phase = (t % (Math.PI * 2)) / (Math.PI * 2);
            y = centerY + (phase < 0.5 ? (phase * 4 - 1) : (3 - phase * 4)) * amplitude;
            break;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw center line
      ctx.strokeStyle = 'hsl(var(--border))';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    draw();
  }, [type, frequency]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ width: '100%', height: '100%' }}
    />
  );
};