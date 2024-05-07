"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";
import { UI } from "../components/UI";
import { AudioManagerProvider } from "../hooks/useAudioManager";

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <AudioManagerProvider>
        <Canvas
          shadows
          camera={{ position: [0, 16, 10], fov: 42 }}
          className="w-full h-full"
        >
          <color attach="background" args={["#041c0b"]} />
          <Experience />
        </Canvas>
        <UI />
      </AudioManagerProvider>
    </div>
  );
}
