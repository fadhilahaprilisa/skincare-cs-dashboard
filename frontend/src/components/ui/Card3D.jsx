import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import holographicFace from "../../assets/holographic_face_3d.jpg";
import faceScanPortrait from "../../assets/face_scan_portrait.jpg";

// Generate a soft radial glare texture with smooth falloff to transparent edges
const createGlareTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(256, 256, 10, 256, 256, 240);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  gradient.addColorStop(0.3, "rgba(224, 242, 254, 0.2)");
  gradient.addColorStop(0.65, "rgba(255, 255, 255, 0.04)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

/**
 * Card3D Inner Mesh Component
 * - RoundedBox (args={[2, 2.5, 0.12]}, radius={0.12}, smoothness={8}) with material #e7faff
 * - useTexture for front and back images with sRGBColorSpace and anisotropy 8
 * - useFrame with idle floating, mouse tilt, click-to-flip 180°
 * - Smooth radial holographic sheen (no opaque white overlay sheet)
 */
export const Card3D = ({ frontSrc = holographicFace, backSrc = faceScanPortrait }) => {
  const groupRef = useRef();
  const glareRef = useRef();
  const [flipped, setFlipped] = useState(false);

  // Soft radial glare texture so there is NO sharp or opaque white layer covering the portrait
  const glareTexture = React.useMemo(() => createGlareTexture(), []);

  // Load textures
  const [frontTexture, backTexture] = useTexture([frontSrc, backSrc]);

  // Configure textures
  if (frontTexture) {
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.anisotropy = 8;
  }
  if (backTexture) {
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.anisotropy = 8;
  }

  useFrame(({ pointer, clock }, delta) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // 1. Idle floating
    const targetY = Math.sin(t * 1.2) * 0.055;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      4,
      delta
    );

    // 2. Mouse tilt + 3. Click to flip 180°
    const baseRotY = flipped ? Math.PI : 0;
    const targetRotX = -pointer.y * 0.32;
    const targetRotY = baseRotY + pointer.x * 0.38;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      5,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      5,
      delta
    );

    // 4. Glare reflection shifting subtly with pointer (bounded so it stays on card)
    if (glareRef.current) {
      glareRef.current.position.x = THREE.MathUtils.damp(
        glareRef.current.position.x,
        pointer.x * 0.35,
        6,
        delta
      );
      glareRef.current.position.y = THREE.MathUtils.damp(
        glareRef.current.position.y,
        pointer.y * 0.35,
        6,
        delta
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={() => setFlipped((prev) => !prev)}
      cursor="pointer"
    >
      {/* Base Card Body: RoundedBox args={[2, 2.5, 0.12]}, radius={0.12}, smoothness={8} */}
      <RoundedBox args={[2, 2.5, 0.12]} radius={0.12} smoothness={8}>
        <meshStandardMaterial
          color="#e7faff"
          roughness={0.3}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Front Face Image - crystal clear with full opacity */}
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.86, 2.36]} />
        <meshBasicMaterial map={frontTexture} toneMapped={false} />
      </mesh>

      {/* Back Face Image (flipped 180 deg) */}
      <mesh position={[0, 0, -0.062]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.86, 2.36]} />
        <meshBasicMaterial map={backTexture} toneMapped={false} />
      </mesh>

      {/* Soft Holographic Sheen Glint: circular gradient, additive, depthWrite=false so it NEVER obscures face */}
      <mesh ref={glareRef} position={[0, 0, 0.064]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial
          map={glareTexture}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Fallback Loader for Suspense
const Card3DFallback = () => (
  <mesh>
    <RoundedBox args={[2, 2.5, 0.12]} radius={0.12} smoothness={8}>
      <meshStandardMaterial color="#f0f9ff" roughness={0.5} />
    </RoundedBox>
  </mesh>
);

/**
 * Card3DCanvas Component
 * Wraps Card3D inside a standard Canvas scene with lighting and shadows
 */
export const Card3DCanvas = ({ className = "" }) => {
  return (
    <div className={`relative w-full aspect-[4/5] max-w-md mx-auto select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.7], fov: 36 }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <pointLight position={[-3, 1, 2]} color="#00e5ff" intensity={15} />

        <Suspense fallback={<Card3DFallback />}>
          <Card3D />
        </Suspense>

        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.4}
          scale={5.5}
          blur={2.4}
          far={3}
        />
        <Environment preset="studio" />
      </Canvas>

      {/* Interactive Helper Hint */}
      <p className="text-center text-xs font-medium text-[#64748B] mt-2 tracking-wide">
        Gerakkan kursor untuk tilt · Klik kartu untuk membalik
      </p>
    </div>
  );
};

export default Card3DCanvas;
