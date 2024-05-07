// "use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Character } from "./Character";
import { Hexagon } from "./Hexagon";
import GameArena from "./GameArena";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Environment files={"hdrs/medieval_cafe_1k.hdr"} />
      <Character />
      {/* <Hexagon color="red" position-y={-0.3} /> */}
      <GameArena/>
    </>
  );
};