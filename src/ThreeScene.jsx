import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const FoxModel = () => {
  const gltf = useGLTF("/models/Fox/glTF/Fox.gltf");
  const mixer = useRef();

  React.useEffect(() => {
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(gltf.animations[2]);
    action.play();

    // Enable shadow casting for all meshes in the model
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.colorSpace = THREE.SRGBColorSpace;
      }
    });

    return () => mixer.current.stopAllAction();
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current.update(delta);
  });

  return <primitive object={gltf.scene} scale={0.02} />;
};

const Floor = () => {
  const [colorMap, normalMap] = useTexture([
    "/textures/dirt/color.jpg",
    "/textures/dirt/normal.jpg",
  ]);

  colorMap.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
      <circleGeometry args={[5, 64]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        envMapIntensity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [6, 4, 17], fov: 35 }}
      style={{ width: "800px", height: "800px" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 8]} // Adjusted position for better shadow casting
        intensity={2.5} // Reduced intensity to prevent overexposure
        shadow-mapSize-width={2048} // Increased shadow map size for better quality
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-normalBias={0.05}
      />

      {/* Environment map */}
      <Environment
        files={[
          "/textures/environmentMap/px.jpg",
          "/textures/environmentMap/nx.jpg",
          "/textures/environmentMap/py.jpg",
          "/textures/environmentMap/ny.jpg",
          "/textures/environmentMap/pz.jpg",
          "/textures/environmentMap/nz.jpg",
        ]}
      />

      {/* Model and Floor */}
      <FoxModel />
      <Floor />

      {/* Orbit Controls */}
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
};

export default ThreeScene;
