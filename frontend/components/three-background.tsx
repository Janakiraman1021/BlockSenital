"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function SecurityGrid() {
  const gridRef = useRef<THREE.Group>(null!)

  // Simple animation
  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.x += delta * 0.03
      gridRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={gridRef}>
      {/* Simple grid of lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`horizontal-${i}`}>
          <bufferGeometry attach="geometry" args={[new Float32Array([-10, i - 5, 0, 10, i - 5, 0]), 2]} />
          <lineBasicMaterial attach="material" color="#00FFFF" opacity={0.2} transparent />
        </line>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`vertical-${i}`}>
          <bufferGeometry attach="geometry" args={[new Float32Array([i - 5, -10, 0, i - 5, 10, 0]), 2]} />
          <lineBasicMaterial attach="material" color="#00FFFF" opacity={0.2} transparent />
        </line>
      ))}

      {/* Add some simple spheres */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`node-${i}`}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-black to-gray-900">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <SecurityGrid />
      </Canvas>
    </div>
  )
}
