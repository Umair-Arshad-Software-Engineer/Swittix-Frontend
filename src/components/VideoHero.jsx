// Adjust these relative paths if this file doesn't live in src/components.
import portraitVideo from '../assets/videos/1.mp4';
import landscapeVideo from '../assets/videos/2.mp4';
import { useState, useEffect } from 'react';

/**
 * Sits above the Hero section. Renders one <video> or the other depending
 * on viewport width via Tailwind's responsive display classes (both are
 * mounted, but only one is ever visible/laid out) — the `sm` breakpoint
 * (640px) is the swap point, matching the rest of the site's responsive
 * conventions.
 */
export function VideoHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative mx-auto max-w-[1432px] overflow-hidden px-4 pt-4 sm:px-6 lg:px-8">
      {/* Subtle glow behind the video container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-700 hover:shadow-blue-500/5">
        {/* Decorative top gradient line */}
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Decorative corner accents */}
        <div className="absolute left-4 top-4 z-10 h-8 w-8 border-l-2 border-t-2 border-white/10 rounded-tl-lg" />
        <div className="absolute right-4 top-4 z-10 h-8 w-8 border-r-2 border-t-2 border-white/10 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 z-10 h-8 w-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 z-10 h-8 w-8 border-r-2 border-b-2 border-white/10 rounded-br-lg" />

        {/* Portrait video — small screens only */}
        <video
          className={`block h-[70vh] max-h-[560px] w-full object-cover sm:hidden transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={portraitVideo}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />

        {/* Landscape video — sm breakpoint and up */}
        <video
          className={`hidden aspect-video w-full object-cover sm:block transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={landscapeVideo}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />

        {/* Enhanced gradient overlay at the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#05070C] via-[#05070C]/80 to-transparent" />
        
        {/* Subtle vignette effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        
        {/* Glass reflection effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-1000 hover:opacity-100" />

        {/* Play/pause indicator (optional decorative) */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="h-8 w-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="h-0 w-0 border-l-[6px] border-l-white/60 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
          </div>
          <span className="text-xs font-medium text-white/40 tracking-wider">PLAY</span>
        </div>

        {/* Video status indicator */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400/60 animate-pulse" />
          <span className="text-[10px] font-medium text-white/30 tracking-widest uppercase">Live</span>
        </div>
      </div>
    </div>
  );
}