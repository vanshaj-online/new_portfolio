import React, { useLayoutEffect, useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF, Environment, OrbitControls, Text } from "@react-three/drei";
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { createTimeline } from './GsapTimeline';
import * as THREE from 'three';

function Elem() {
    const { nodes } = useGLTF("./torrus.glb");
    const { camera, gl, viewport } = useThree();
    const torus = useRef(null);
    const text = useRef();
    const clock = new THREE.Clock();

    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.x = clock.getElapsedTime() * 0.5;
        }
    });

    useLayoutEffect(() => {
        const handleMouseMove = (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.02);
            gsap.to(torus.current.position, {
                x: moveX,
                duration: 0.5,
                ease: 'circ'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const resize = viewport.width * 0.45;
        torus.current.position.set(0.08, -5, 0);
        torus.current.scale.set(Math.min(resize, 1), Math.min(resize, 1), Math.min(resize, 1));

        const HeroTl = createTimeline(torus, text);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [camera, gl, viewport.width]); // Added viewport.width to dependencies

    return (
        <group>
            <Text 
                ref={text} 
                opacity={0} 
                fontSize={0.15 * viewport.width} 
                font='./assets/fonts/Barlow-Bold.ttf' 
                position={[0, 0.5, -1]} 
                color="white" 
                anchorX="center" 
                anchorY="middle"
            >
                DEVELOPER
            </Text>
            <mesh ref={torus} {...nodes.Torus002}>
                <MeshTransmissionMaterial thickness={0.1} backside={true} />
            </mesh>
        </group>
    );
}

const Model = () => {
    return (
        <Canvas camera={{ fov: 20, position: [0, 0, 5] }} id='canvas' style={{ width: '100%', height: '100%' }}>
            <directionalLight intensity={2} position={[2, 2, 3]} />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
            <Elem />
        </Canvas>
    );
};

export default Model;
