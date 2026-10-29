import React, { useState } from 'react';

import { isMuted, setMuted } from '../game/sound';

/** Mute button, fixed in the top-right corner of the screen. */
export default function MuteButton() {
  const [muted, setMutedState] = useState(isMuted());

  const toggle = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  return (
    <button
      onClick={toggle}
      title={muted ? 'Sound is off' : 'Sound is on'}
      aria-label={muted ? 'Unmute' : 'Mute'}
      className="fixed right-3 top-3 z-40 border-2 border-white/70 bg-black/60 px-2 py-1 font-pixel text-[10px] text-white hover:border-amber-300"
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
