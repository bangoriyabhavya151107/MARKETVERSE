/**
 * Peninsula ground plane, grid lines, and major road avenues.
 */
import * as THREE from 'three';
import { scene } from './scene.js';

export function buildGroundAndRoadNetwork() {
  if (!scene) return;

  const groundGeo = new THREE.BoxGeometry(260, 4, 250);
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x16202a });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.set(0, -2, 8);
  ground.receiveShadow = true;
  scene.add(ground);

  const gridHelper = new THREE.GridHelper(250, 50, 0x263849, 0x1c2b38);
  gridHelper.position.set(0, 0.05, 8);
  scene.add(gridHelper);

  const roadMat = new THREE.MeshLambertMaterial({ color: 0x10171f });
  const avenues = [
    { x: -42, z: 8, w: 7, d: 220 },
    { x: 42, z: 8, w: 7, d: 220 },
    { x: 0, z: -55, w: 220, d: 7 },
    { x: 0, z: 5, w: 220, d: 7 },
    { x: 0, z: 64, w: 220, d: 7 }
  ];

  avenues.forEach(r => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.14, r.d), roadMat);
    mesh.position.set(r.x, 0.07, r.z);
    scene.add(mesh);
  });
}