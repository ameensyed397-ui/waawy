'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 120;
const SPEED = 0.18;

export const ThreeNetwork = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 280;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Nodes
        const nodePositions: THREE.Vector3[] = [];
        const nodeVelocities: THREE.Vector3[] = [];
        const nodeMeshes: THREE.Mesh[] = [];

        const nodeGeo = new THREE.SphereGeometry(1.8, 8, 8);

        for (let i = 0; i < NODE_COUNT; i++) {
            const x = (Math.random() - 0.5) * mount.clientWidth * 0.9;
            const y = (Math.random() - 0.5) * mount.clientHeight * 0.9;
            const z = (Math.random() - 0.5) * 80;
            const pos = new THREE.Vector3(x, y, z);
            nodePositions.push(pos);

            const vx = (Math.random() - 0.5) * SPEED;
            const vy = (Math.random() - 0.5) * SPEED;
            nodeVelocities.push(new THREE.Vector3(vx, vy, 0));

            const brightness = 0.5 + Math.random() * 0.5;
            const mat = new THREE.MeshBasicMaterial({
                color: new THREE.Color(0.32 * brightness, 0.21 * brightness, 0.94 * brightness),
                transparent: true,
                opacity: 0.55 + Math.random() * 0.35,
            });
            const mesh = new THREE.Mesh(nodeGeo, mat);
            mesh.position.copy(pos);
            scene.add(mesh);
            nodeMeshes.push(mesh);
        }

        // Lines (we'll update geometry each frame)
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x8771ff,
            transparent: true,
            opacity: 0.15,
        });
        const linesGeo = new THREE.BufferGeometry();
        const maxLines = NODE_COUNT * NODE_COUNT;
        const linePositions = new Float32Array(maxLines * 6);
        linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineSegments = new THREE.LineSegments(linesGeo, linesMaterial);
        scene.add(lineSegments);

        // Mouse parallax
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 20;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Bounds
        const halfW = () => mount.clientWidth * 0.48;
        const halfH = () => mount.clientHeight * 0.48;

        // Animate
        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Move nodes
            for (let i = 0; i < NODE_COUNT; i++) {
                nodePositions[i].add(nodeVelocities[i]);
                if (Math.abs(nodePositions[i].x) > halfW()) nodeVelocities[i].x *= -1;
                if (Math.abs(nodePositions[i].y) > halfH()) nodeVelocities[i].y *= -1;
                nodeMeshes[i].position.copy(nodePositions[i]);
            }

            // Update connections
            let lineIdx = 0;
            for (let i = 0; i < NODE_COUNT; i++) {
                for (let j = i + 1; j < NODE_COUNT; j++) {
                    const dist = nodePositions[i].distanceTo(nodePositions[j]);
                    if (dist < CONNECTION_DISTANCE) {
                        linePositions[lineIdx++] = nodePositions[i].x;
                        linePositions[lineIdx++] = nodePositions[i].y;
                        linePositions[lineIdx++] = nodePositions[i].z;
                        linePositions[lineIdx++] = nodePositions[j].x;
                        linePositions[lineIdx++] = nodePositions[j].y;
                        linePositions[lineIdx++] = nodePositions[j].z;
                    }
                }
            }
            linesGeo.setDrawRange(0, lineIdx / 3);
            linesGeo.attributes.position.needsUpdate = true;

            // Camera parallax
            camera.position.x += (mouseX - camera.position.x) * 0.04;
            camera.position.y += (mouseY - camera.position.y) * 0.04;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};
