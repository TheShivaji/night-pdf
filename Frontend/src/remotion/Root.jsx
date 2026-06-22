import React from 'react';
import { Composition } from 'remotion';
import { NightPDFVideo } from './NightPDFVideo';
import './compiled-tailwind.css'; // Ensure static Tailwind v4 CSS loads for Remotion

export const RemotionRoot = () => {
  // 23 seconds at 60 FPS = 1380 frames (Full original animation cycle)
  return (
    <>
      <Composition
        id="NightPDF-Hero-Video"
        component={NightPDFVideo}
        durationInFrames={1380}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
