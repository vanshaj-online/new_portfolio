import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'


const Model = ({ onLoad }) => {

    const { camera, gl } = useThree();
    const modelRef = useRef()
    const model = useGLTF('./rose.glb')
    const bodyRef = useRef()


    useEffect(() => {
        modelRef.current.scale.set(1, 1, 1);

        // Load the texture
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load('./texture.jpg', () => {
            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.material = MeshTransmissionMaterial; // Apply the texture
                    console.log(child.material)
                    // child.material.emmisiveIntensity = 0.5
                    // child.material.opacity = 0.5
                    child.material.needsUpdate = true; // Update the material
                }
            });
        });

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Call the resize handler initially to set the correct size
        handleResize();

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [model, onLoad, camera, gl]);

    useEffect(() => {
        camera.position.set(0, 0, 2); // Adjust this value as needed
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera]);

    return <group ref={bodyRef} >
        <primitive ref={modelRef} object={model.scene} />
    </group>;
};

const Robo = () => {
    return (
        <Canvas camera={{ fov: 20, position: [0, 0, 75] }} id='canvas' >
            <Environment
                // files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_02_1k.hdr"
            files='./env2.hdr'
            />
            <OrbitControls enableZoom={false} />

            <Model />

        </Canvas>
    );
};

export default Robo;
