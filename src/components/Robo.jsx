import React, { useEffect, useRef, } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';


const Model = ({ onLoad }) => {

    const { camera, gl } = useThree();
    const modelRef = useRef()
    const model = useGLTF('./diamond.glb')
    const bodyRef = useRef()


    useEffect(() => {
        modelRef.current.scale.set(1, 1, 1);



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
        camera.position.set(0, 0, 1000); // Adjust this value as needed
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera]);

    return <group ref={bodyRef} position={[0, 0, 0]}>
        <primitive ref={modelRef} object={model.scene} />
    </group>;
};

const Robo = () => {
    return (
        <Canvas camera={{ fov: 20, position: [0, 0, 75] }} id='canvas' >
            <Environment
                files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_02_1k.hdr"
            // files='./env.hdr'
            />
            <OrbitControls enableZoom={false} />

            <Model />

        </Canvas>
    );
};

export default Robo;
