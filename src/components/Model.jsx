import React, {  useLayoutEffect, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Environment, OrbitControls, Text } from "@react-three/drei";
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import gsap from 'gsap';
import { createTimeline } from './GsapTimeline';
import * as THREE from 'three';

function Elem({pass}) {
    const { nodes } = useGLTF("./torrus.glb");
    const { camera, gl, viewport,scene } = useThree();
    const torus = useRef(null);
    const text = useRef()
    const clock = new THREE.Clock()
    

    useFrame(() => {
        torus.current.rotation.x = clock.getElapsedTime() * 0.5
    })

    useLayoutEffect(() => {
        // Mouse move event listener
        const handleMouseMove = (e) => {
            let moveX = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.02);
            let tl = gsap.timeline()
            tl.to(torus.current.position, {
                x: moveX ,
                duration: 0.5,
                ease: 'circ'
            })
        };

        window.addEventListener('mousemove', handleMouseMove);

        const resize = viewport.width * 0.45


        torus.current.position.set(0.08, -5, 0);
        torus.current.scale.set(Math.min(resize , 1), Math.min(resize , 1), Math.min(resize , 1));

        const HeroTl = createTimeline(torus, text)

        

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // Cleanup mouse move listener
            window.removeEventListener('resize', handleResize);
        };

    }, [camera, gl]) // Added gl to dependencies

    return (
        <group >
            <Text ref={text} opacity={0} fontSize={0.15 * viewport.width} font='./assets/fonts/Barlow-Bold.ttf' position={[0, 0.5, -1]} color="white" anchorX="center" anchorY="middle">DEVELOPER
            </Text>
            <mesh ref={torus} {...nodes.Torus002}>

                <MeshTransmissionMaterial thickness={0.1} backside={true} />

            </mesh>

        </group>
    )
}

const Model = () => {

    const canvas = useRef()

    return (
        <Canvas ref={canvas} camera={{ fov: 20, position: [0, 0, 5] }} id='canvas' style={{ width: '100%', height: '100%' }}> {/* Ensure canvas has size */}
            <directionalLight intensity={2} position={[2, 2, 3]} />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
            <Elem pass={canvas} />
        </Canvas>
    );
};

export default Model;


