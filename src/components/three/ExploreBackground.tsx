"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

function WarmParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 120;
  const spread = 18;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d4a853"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh position={[5, 2, -6]} scale={0.6}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#c9a04e" transparent opacity={0.06} wireframe />
        </mesh>
      </Float>
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[-5, -2, -4]} scale={0.9}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#8b6914" transparent opacity={0.04} wireframe />
        </mesh>
      </Float>
      <Float speed={0.5} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh position={[3, -3, -7]} scale={0.4}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#d4a853" transparent opacity={0.05} wireframe />
        </mesh>
      </Float>
    </>
  );
}

function Scene() {
  return (
    <>
      <WarmParticles />
      <Sparkles
        count={60}
        speed={0.15}
        color="#e8c469"
        size={0.8}
        scale={[16, 10, 10]}
        noise={[0.3, 0.2, 0.3]}
        opacity={0.25}
      />
      <FloatingShapes />
    </>
  );
}

export default function ExploreBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
