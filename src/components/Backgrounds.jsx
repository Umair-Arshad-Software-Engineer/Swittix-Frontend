import { useRef } from 'react';

// Animated canvas backgrounds (NetworkBackground, BubbleField) removed.
// PageBackgrounds now just provides a stable relative wrapper for content.

export function PageBackgrounds({ children }) {
  const contentRef = useRef(null);

  return (
    <div className="relative">
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}