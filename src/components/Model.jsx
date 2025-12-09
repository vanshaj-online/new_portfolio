import React, { useRef, useState, useEffect } from 'react';
import { MeshTransmissionMaterial, useGLTF, Environment, Text } from "@react-three/drei";
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { createTimeline } from './GsapTimeline';
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Add sessionStorage to track if animation has played
const ANIMATION_PLAYED_KEY = 'model_animation_played';
const MODEL_ANIMATION_COMPLETE_KEY = 'model_animation_completed';

// Preload the 3D model
useGLTF.preload('/torrus.glb');
const Elem = React.memo(({ x, y }) => {
    const text = useRef(null);
    const model3d = useRef(null);
    const { scene } = useGLTF('/torrus.glb');
    const { viewport, gl } = useThree();

    // Use useMemo to clone the scene only once
    const clonedScene = React.useMemo(() => clone(scene), [scene]);

    // Check if this is first load or page refresh
    const [shouldAnimate, setShouldAnimate] = useState(() => {
        // On initial render, check if we've animated before in this session
        const hasAnimated = sessionStorage.getItem(ANIMATION_PLAYED_KEY) === 'true';

        // If refreshing the page, reset the animation complete status
        if (!hasAnimated) {
            sessionStorage.removeItem(MODEL_ANIMATION_COMPLETE_KEY);
        }

        return !hasAnimated;
    });

    useEffect(() => {
        if (!text.current) return;

        const txt = text.current;
        gsap.to(txt.position, {
            x: -x * 0.25,
            y: -y * 0.02 + 0.5,
            duration: 0.5,
            ease: 'power3.out'
        });

    }, [x, y]);

    useEffect(() => {

        // Only create and run timeline if we should animate
        if (shouldAnimate && model3d.current && text.current) {


            // Create timeline
            const tl = createTimeline(model3d, text, true);

            // Mark that animation has played for this session
            sessionStorage.setItem(ANIMATION_PLAYED_KEY, 'true');

            // Clean up timeline when component unmounts
            return () => {
                tl.kill();
            };
        } else if (!shouldAnimate) {
            // If not animating, immediately mark as completed
            // This helps when returning to the page
            sessionStorage.setItem(MODEL_ANIMATION_COMPLETE_KEY, 'true');

            // Dispatch event for non-animated case
            setTimeout(() => {
                window.dispatchEvent(new Event('modelAnimationComplete'));
            }, 100);
        }
    }, [shouldAnimate]);

    // Optimize the animation frame by using useRef for time values
    const rotationRef = useRef({ x: 0, y: 0 });

    useFrame(({ clock }) => {
        if (model3d.current) {
            // Use deltaTime for smoother animation regardless of frame rate
            const time = clock.getElapsedTime();

            // Smooth rotation with lower update frequency
            rotationRef.current.y = time;
            rotationRef.current.x = time * 0.8; // Slightly slower on x-axis

            model3d.current.rotation.y = rotationRef.current.y;
            model3d.current.rotation.x = rotationRef.current.x;
        }
    });

    return (
        <group>
            <Text
                ref={text}
                fontSize={0.15 * viewport.width}
                font='./assets/fonts/Barlow-Bold.ttf'
                position={[0, 0.5, -1]}
                color="white"
                anchorX="center"
                anchorY="middle"
                material-transparent={true}
                material-opacity={shouldAnimate ? 0 : 1} // Start visible if not animating
            >
                DEVELOPER
            </Text>
            {clonedScene.children.map((child, index) =>
                child.isMesh ? (
                    <mesh
                        style={{ position: 'sticky' }}
                        key={index}
                        ref={model3d}
                        geometry={child.geometry}
                        // Position starts at final position if not animating
                        position={[0, shouldAnimate ? -5 : 0.2, 0]}
                    >
                        <MeshTransmissionMaterial
                            thickness={0.1}
                            backside
                            transmission={1}
                            resolution={256}  // Lowered for performance
                            samples={4}       // Lowered for performance
                        />
                    </mesh>
                ) : (
                    <primitive key={index} object={child} />
                )
            )}
        </group>
    );
});
Elem.displayName = 'Elem';

// Memoize the entire Canvas for performance
const Model = React.memo(({ xpos, ypos }) => {

    return (
        <Canvas
            camera={{ fov: 20, position: [0, 0, 5] }}
            id='canvas'
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
                depth: true,
                stencil: false,
            }}
            style={{ width: '100%', height: '100%' }}
            dpr={[1, 2]} // Cap pixel ratio for better performance
            performance={{ min: 0.5 }} // Allow R3F to adjust quality during performance issues
        >
            <directionalLight intensity={2} position={[2, 2, 3]} />
            <Environment preset="city" />
            <Elem x={xpos} y={ypos} />
        </Canvas>
    );
});
Model.displayName = 'Model';

export default Model;