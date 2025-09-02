import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Knob = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  className,
  size = 'md'
}: KnobProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const lastY = useRef<number>(0);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const normalizedValue = (value - min) / (max - min);
  const rotation = normalizedValue * 300 - 150; // -150° to +150°

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastY.current = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = lastY.current - e.clientY;
    const sensitivity = 0.5;
    const change = (deltaY * sensitivity * (max - min)) / 100;
    
    const newValue = Math.max(min, Math.min(max, value + change));
    const steppedValue = Math.round(newValue / step) * step;
    
    onChange(steppedValue);
    lastY.current = e.clientY;
  }, [isDragging, value, min, max, step, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ns-resize';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={knobRef}
      className={cn(
        sizeClasses[size],
        "relative cursor-pointer select-none",
        className
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Knob Body */}
      <div className="absolute inset-0 rounded-full bg-background-tertiary border-2 border-border shadow-inner">
        {/* Value Track */}
        <svg
          className="absolute inset-0 w-full h-full rotate-[-150deg]"
          viewBox="0 0 40 40"
        >
          {/* Background Arc */}
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="78.5"
            strokeDashoffset="26.2"
            className="opacity-30"
          />
          
          {/* Value Arc */}
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="hsl(var(--selected))"
            strokeWidth="2"
            strokeDasharray="78.5"
            strokeDashoffset={78.5 - (normalizedValue * 52.3) + 26.2}
            className="transition-all duration-75"
          />
        </svg>

        {/* Knob Pointer */}
        <div
          className="absolute inset-2 rounded-full bg-background border border-border flex items-start justify-center pt-1"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease'
          }}
        >
          <div className="w-0.5 h-2 bg-selected rounded-full" />
        </div>

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-foreground-subtle" />
        </div>
      </div>
    </div>
  );
};