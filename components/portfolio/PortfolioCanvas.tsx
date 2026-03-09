"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
    const ref = useRef<THREE.Points>(null);
    const count = 900;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.9 + Math.random() * 0.8;
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#818cf8" transparent opacity={0.7} sizeAttenuation />
        </points>
    );
}

function AnimatedRing() {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.z += delta * 0.05;
        }
    });
    return (
        <Torus ref={ref} args={[1.5, 0.012, 16, 150]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} />
        </Torus>
    );
}

function GlowingSphere() {
    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#1a1650"
                    distort={0.3}
                    speed={1.5}
                    roughness={0}
                    metalness={0.9}
                    emissive="#3730a3"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
}

export function PortfolioCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="!h-full !w-full"
        >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={3} color="#6366f1" />
            <pointLight position={[-5, -3, -5]} intensity={2} color="#06b6d4" />
            <GlowingSphere />
            <AnimatedRing />
            <ParticleField />
        </Canvas>
    );
}
