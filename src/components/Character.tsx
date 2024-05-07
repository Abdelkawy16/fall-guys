"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";

export function Character({
  animation = "wave",
  color = "yellow",
  name = "Player",
  ...props
}) {
  const group = useRef<any>();
  const { scene, animations } = useGLTF("/models/character.glb", "draco/gltf/");
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  useEffect(():any => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return () => actions[animation]?.fadeOut(0.1);
  }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            geometry={(nodes.body as any).geometry}
            skeleton={(nodes.body as any).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="eye"
            geometry={(nodes.eye as any).geometry}
            material={materials.Material_2}
            skeleton={(nodes.eye as any).skeleton}
          >
            <meshStandardMaterial {...materials.Material_2} color={"white"} />
          </skinnedMesh>
          <skinnedMesh
            name="hand-"
            geometry={(nodes["hand-"] as any).geometry}
            skeleton={(nodes["hand-"] as any).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="leg"
            geometry={(nodes.leg as any).geometry}
            skeleton={(nodes.leg as any).skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb", "draco/gltf/");
