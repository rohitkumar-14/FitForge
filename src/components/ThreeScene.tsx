import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const equipmentRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Gym equipment model (kettlebell-like structure)
    const equipmentGroup = new THREE.Group();
    equipmentRef.current = equipmentGroup;

    // Main kettlebell body
    const bodyGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6b35,
      shininess: 120,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.y = 0.7;
    equipmentGroup.add(body);

    // Handle
    const handleGeometry = new THREE.TorusGeometry(0.6, 0.1, 8, 16);
    const handleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b5cf6,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = 0.5;
    handle.rotation.x = Math.PI / 2;
    equipmentGroup.add(handle);

    // Base platform
    const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf59e0b,
      shininess: 80,
      transparent: true,
      opacity: 0.7
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.8;
    equipmentGroup.add(base);

    // Energy glow effect
    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    equipmentGroup.add(glow);

    scene.add(equipmentGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff6b35, 1.2);
    directionalLight.position.set(6, 6, 6);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 12);
    pointLight1.position.set(-6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf59e0b, 0.8, 10);
    pointLight2.position.set(0, -6, 6);
    scene.add(pointLight2);

    // Particles
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 25;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 25;

      const color = new THREE.Color();
      const hue = Math.random() * 0.2 + 0.05; // Orange to yellow range
      color.setHSL(hue, 0.8, 0.6);
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (equipmentRef.current) {
        equipmentRef.current.rotation.y += 0.008;
        equipmentRef.current.rotation.x += 0.003;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0015;
        particlesRef.current.rotation.x += 0.0008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.to(equipmentGroup.position, {
      y: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(equipmentGroup.rotation, {
      z: 0.2,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (equipmentRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        gsap.to(equipmentRef.current.rotation, {
          y: mouseX * 0.4,
          x: mouseY * 0.4,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default ThreeScene;