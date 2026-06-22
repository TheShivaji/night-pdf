import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import InteractiveDemo from '../components/InteractiveDemo';

// This component acts purely as an adapter between Remotion's frame engine and the GSAP timeline.
export const NightPDFVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 1152, height: 648 }}>
        <InteractiveDemo remotionFrame={frame} remotionFps={fps} />
      </div>
    </div>
  );
};
