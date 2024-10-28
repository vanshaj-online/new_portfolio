import React, { useEffect, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Environment, OrbitControls, Text } from "@react-three/drei";
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import gsap from 'gsap';
import { createTimeline } from './GsapTimeline';

function Elem() {
    const { nodes } = useGLTF("./torrus.glb");
    const { camera, gl, viewport } = useThree();
    const torus = useRef(null);
    const text = useRef()

    useFrame(() => {
        torus.current.rotation.x += 0.02
    })

    useEffect(() => {
        // Mouse move event listener
        const handleMouseMove = (e) => {
            let moveX = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.02);
            let tl = gsap.timeline()
            tl.to(torus.current.position, {
                x: moveX - .2,
                duration: 0.5,
                ease: 'circ'
            })
        };

        window.addEventListener('mousemove', handleMouseMove);

        torus.current.position.set(-.12, .2, 0);

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
            <Text ref={text} opacity={0} fontSize={0.15 * viewport.width} font='./assets/fonts/Barlow-Bold.ttf' position={[-.12, .5, -1]} color="white" anchorX="center" anchorY="middle">DEVELOPER
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
