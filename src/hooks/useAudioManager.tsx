"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Define the type for AudioManagerContext
interface AudioManagerContextType {
  playAudio: (file: string, force?: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with initial value undefined
const AudioManagerContext = createContext<AudioManagerContextType | undefined>(undefined);

// Define AudioManagerProvider component
export const AudioManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lastAudioPlayed = useRef<number>(new Date().getTime());
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);

  // Function to play audio
  const playAudio = (file: string, force = false) => {
    if (!audioEnabled) return;
    if (!force && new Date().getTime() - lastAudioPlayed.current < 100) return;
    lastAudioPlayed.current = new Date().getTime();
    const audio = new Audio(`/audios/${file}.mp3`);
    audio.play();
  };

  // Effect to handle background audio
  useEffect(() => {
    const bgAudio = new Audio("/audios/bg.mp3");
    if (audioEnabled) {
      bgAudio.play();
      bgAudio.loop = true;
    } else {
      bgAudio.pause();
    }
    return () => {
      bgAudio.pause();
    };
  }, [audioEnabled]);

  // Value to be provided by the context
  const contextValue: AudioManagerContextType = {
    playAudio,
    audioEnabled,
    setAudioEnabled,
  };

  return (
    <AudioManagerContext.Provider value={contextValue}>
      {children}
    </AudioManagerContext.Provider>
  );
};

// Define useAudioManager hook
export const useAudioManager = (): AudioManagerContextType => {
  const audioManager = useContext(AudioManagerContext);
  if (!audioManager) {
    throw new Error(
      "useAudioManager must be used within an AudioManagerProvider"
    );
  }
  return audioManager;
};
