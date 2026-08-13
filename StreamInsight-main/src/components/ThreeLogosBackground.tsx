import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeLogosBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const redLight = new THREE.PointLight(0xe50914, 1.5, 10);
    redLight.position.set(-4, 2, 2);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x00a8e1, 1.5, 10);
    blueLight.position.set(4, -2, 2);
    scene.add(blueLight);

    // Floating 3D Cards representing platform logos
    const logosCount = 12;
    const logos: THREE.Mesh[] = [];
    const colors = [
      0xe50914, // Netflix Red
      0x00a8e1, // Prime Blue
      0x7c3aed, // HBO Max Purple
      0x1cd760, // Hulu Green
      0xffffff, // Apple TV White
      0x00a8e1, // Disney+ Blue
    ];

    const geometry = new THREE.BoxGeometry(1.4, 0.9, 0.12);

    for (let i = 0; i < logosCount; i++) {
      const color = colors[i % colors.length];
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.75,
        shininess: 90,
      });

      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 3
      );

      mesh.rotation.set(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.3
      );

      mesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.005
        ),
        rotationSpeedX: (Math.random() - 0.5) * 0.01,
        rotationSpeedY: (Math.random() - 0.5) * 0.01,
      };

      scene.add(mesh);
      logos.push(mesh);
    }

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Camera soft lerp to mouse position
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      logos.forEach((logo) => {
        logo.position.add(logo.userData.velocity);
        logo.rotation.x += logo.userData.rotationSpeedX;
        logo.rotation.y += logo.userData.rotationSpeedY;

        // Boundaries bounce
        if (Math.abs(logo.position.x) > 9) logo.userData.velocity.x *= -1;
        if (Math.abs(logo.position.y) > 6) logo.userData.velocity.y *= -1;
        if (Math.abs(logo.position.z + 3) > 4) logo.userData.velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-full opacity-60" />
    </div>
  );
};
