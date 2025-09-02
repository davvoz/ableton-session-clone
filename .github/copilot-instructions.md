# Ableton Session Clone

Ableton Session Clone is a React TypeScript web application that recreates the session view interface of Ableton Live DAW. The application features transport controls, track headers with volume/pan controls, clip slots in a grid layout, and a master section - providing an authentic Ableton Live experience in the browser.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Dependencies
- Node.js v20.19.4 and npm v10.8.2 are available and working
- Dependencies are managed via npm and install consistently in 16 seconds

### Core Development Workflow
- Install dependencies: `npm install` -- takes 16 seconds. NEVER CANCEL.
- Development server: `npm run dev` -- starts in 283ms on http://localhost:8080
- Production build: `npm run build` -- takes 4 seconds. NEVER CANCEL.
- Production preview: `npm run preview` -- serves production build on http://localhost:4173
- Code linting: `npm run lint` -- takes 2 seconds but has 4 existing errors and 7 warnings

### Build and Test Commands
- `npm install` -- Install all dependencies (16 seconds)
- `npm run dev` -- Start development server (instant startup)
- `npm run build` -- Create production build (4 seconds) 
- `npm run preview` -- Preview production build (instant startup)
- `npm run lint` -- Run ESLint (2 seconds, currently fails with existing issues)

### CRITICAL Build Information
- NEVER CANCEL any npm commands - they complete quickly (under 20 seconds maximum)
- Set timeouts to 60+ seconds for npm install, 30+ seconds for builds
- All commands run successfully despite linting warnings/errors
- The application builds and runs perfectly even with existing lint issues

## Validation and Testing

### Manual Validation Requirements
- ALWAYS test the running application after making changes
- Access the development server at http://localhost:8080
- Verify the Ableton Live session view interface loads correctly
- Test transport controls (play button should show active state when clicked)
- Verify track headers display MIDI 1-4 and Audio 1-4 tracks
- Check that the master section displays volume controls and audio levels
- Test clip slot grid interaction (8 tracks × multiple scene rows)

### Key Functional Areas to Test
- Transport controls: Play, Stop, Record, Tempo adjustment
- Track controls: Volume faders, Pan knobs, Solo/Mute buttons, Arm buttons
- Session grid: Clip slots interaction and visual feedback
- Master section: Master volume, CUE controls, audio format display (44.1kHz/24bit)

### Screenshots for Validation
- Take screenshots of the main session view to verify visual correctness
- The interface should show a dark theme with orange volume faders
- Transport section at top with tempo display showing "120 BPM"
- Session position indicator showing "1.1.1"

## Code Organization and Key Files

### Project Structure
```
/src
  /components     -- UI components (SessionView, Transport, TrackHeader, etc.)
    /ui           -- shadcn-ui component library
    /devices      -- Device-related components
  /hooks          -- Custom React hooks (use-mobile, use-toast)
  /lib            -- Utility functions
  /pages          -- Route components (Index, NotFound)
  App.tsx         -- Main application component with routing
  main.tsx        -- Application entry point
```

### Critical Configuration Files
- `package.json` -- Dependencies and scripts (no test runner configured)
- `vite.config.ts` -- Vite build configuration (port 8080, React SWC plugin)
- `tailwind.config.ts` -- Tailwind CSS with custom colors for clips/transport
- `tsconfig.json` -- TypeScript configuration with path aliases (@/*)
- `eslint.config.js` -- ESLint configuration (currently has known issues)
- `components.json` -- shadcn-ui configuration

### Key Component Files
- `SessionView.tsx` -- Main application interface component
- `Transport.tsx` -- Transport controls (play, stop, record, tempo)
- `TrackHeader.tsx` -- Individual track controls and labeling  
- `ClipSlot.tsx` -- Individual clip slot in the session grid
- `MasterSection.tsx` -- Master volume and audio controls

## Known Issues and Workarounds

### Linting Issues (Non-blocking)
- WaveformDisplay.tsx has lexical declaration in case block
- Several UI components have fast refresh warnings
- TypeScript empty object type warnings in command.tsx and textarea.tsx
- tailwind.config.ts has require() style import warning
- **These errors do not prevent building or running the application**

### Development Notes
- The application uses Vite for fast development and building
- shadcn-ui provides the component library with custom Ableton-themed styling
- React Router handles client-side routing
- No test framework is currently configured
- The project includes bun.lockb but uses npm for package management

## Common Development Tasks

### Adding New Features
- New components should follow the existing patterns in /src/components
- Use the established TypeScript interfaces (Clip, Track) from SessionView.tsx
- Follow the existing styling patterns with Tailwind CSS custom variables
- Always test in the browser after changes

### Styling and UI
- Custom CSS variables are defined for Ableton-specific colors (clip colors, transport colors)
- The interface uses a dark theme with carefully chosen colors
- Volume faders are orange, clip colors include orange/blue/green/red/yellow/purple/pink/cyan
- All UI follows the shadcn-ui design system with custom Ableton theming

### Debugging and Development
- Use browser developer tools for debugging React components
- Vite provides hot module replacement for fast development iteration
- Console warnings about React Router future flags can be ignored
- Focus on visual and functional correctness over linting perfection

### Pre-commit Validation
- Always run `npm run build` to ensure your changes don't break the build
- Test the application manually in the browser
- Verify that all existing functionality still works
- Take screenshots if you modify the UI to confirm visual correctness

## Technology Stack Summary
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4.19 with SWC
- **Styling**: Tailwind CSS with custom Ableton theming
- **Components**: shadcn-ui component library
- **State Management**: React useState/useEffect (no external state library)
- **Routing**: React Router v6
- **Development**: Hot module replacement, fast refresh
- **Production**: Static build optimized for deployment