import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { MeshTransmissionMaterial, useGLTF, Environment, OrbitControls, Text } from "@react-three/drei";
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { createTimeline } from './GsapTimeline';
import * as THREE from 'three';

const Elem = React.memo(() => {
    const { nodes } = useGLTF("./torrus.glb");
    const { camera, gl, viewport } = useThree();
    const torus = useRef(null);
    const text = useRef(null);
    const clock = new THREE.Clock();
    const [animationRan, setAnimationRan] = useState(false);

    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.x = clock.getElapsedTime() * 0.5;
        }
    });

    useEffect(() => {
        if (!animationRan) {
            createTimeline(torus, text, true);
            setAnimationRan(true);
        }
    }, [animationRan, torus, text]);

    useLayoutEffect(() => {
        const resize = viewport.width * 0.45;

        torus.current.position.set(0, -5, 0);
        torus.current.scale.set(Math.min(resize, 1), Math.min(resize, 1), Math.min(resize, 1));


        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
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
})

const Model = React.memo(() => {
    return (
        <Canvas camera={{ fov: 20, position: [0, 0, 5] }} id='canvas' style={{ width: '100%', height: '100%' }} >
            <directionalLight intensity={2} position={[2, 2, 3]} />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
            <Elem />
        </Canvas>
    );
})

export default Model;

