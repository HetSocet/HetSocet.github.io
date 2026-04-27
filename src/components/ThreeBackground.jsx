import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function AnimatedSphere() {
  const mesh = useRef();

  useFrame((state) => {
    const { clock, mouse } = state;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.2 + mouse.y * 0.5;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.3 + mouse.x * 0.5;
  });

  return (
    <Float speed={1.4} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#7000ff"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedSphere />
        <gridHelper args={[100, 100, '#111', '#111']} rotation={[Math.PI / 2, 0, 0]} />
      </Canvas>
    </div>
  );
}
