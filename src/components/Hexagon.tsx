// "use client";

import { useGLTF } from "@react-three/drei";
import React from "react";

export function Hexagon({ color, ...props }: any) {
  const { nodes, materials } = useGLTF("/models/hexagon.glb", "draco/gltf/");

  return (
    <group {...props}>
      <mesh
        geometry={(nodes.Hexagon as any).geometry}
        material={materials.hexagon}
      >
        <meshStandardMaterial
          {...materials.hexagon}
          color={color}
          transparent
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/hexagon.glb", "draco/gltf/");
