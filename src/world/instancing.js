/**
 * Instanced City Props: Trees, Streetlights (Emissive Bulbs), Planters, Benches, and Cranes.
 */
import * as THREE from 'three';
import { scene } from './scene.js';

export let treeFoliageMesh = null;
export let streetLightBulbMesh = null;
let craneJibInstancedMesh = null;
const craneLocations = [
  { x: 14, y: 15, z: -76 },
  { x: 34, y: 14, z: -88 },
  { x: -66, y: 14, z: -76 },
  { x: -84, y: 13, z: 92 }
];

const dummyObj = new THREE.Object3D();

export function buildInstancedProps() {
  if (!scene) return;

  // 1. Instanced Trees & Planters along avenues + inside Portfolio Garden
  const treeCoords = [];
  for (let z = -95; z <= 95; z += 16) {
    treeCoords.push({ x: -48, z }, { x: -36, z }, { x: 36, z }, { x: 48, z });
  }
  for (let dx = -3; dx <= 3; dx += 3) {
    for (let dz = -3; dz <= 3; dz += 3) {
      treeCoords.push({ x: 34 + dx, z: 42 + dz });
    }
  }

  const planterGeo = new THREE.BoxGeometry(2.2, 0.5, 2.2);
  const planterMat = new THREE.MeshLambertMaterial({ color: 0x2c3e50 });
  const planterInst = new THREE.InstancedMesh(planterGeo, planterMat, treeCoords.length);

  const trunkGeo = new THREE.CylinderGeometry(0.28, 0.38, 2.2, 6);
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
  const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCoords.length);

  const foliageGeo = new THREE.ConeGeometry(1.65, 4.2, 7);
  const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2d7a53 });
  treeFoliageMesh = new THREE.InstancedMesh(foliageGeo, foliageMat, treeCoords.length);

  treeCoords.forEach((pt, i) => {
    dummyObj.position.set(pt.x, 0.25, pt.z);
    dummyObj.rotation.set(0, 0, 0);
    dummyObj.scale.set(1, 1, 1);
    dummyObj.updateMatrix();
    planterInst.setMatrixAt(i, dummyObj.matrix);

    dummyObj.position.set(pt.x, 1.3, pt.z);
    dummyObj.updateMatrix();
    trunkInst.setMatrixAt(i, dummyObj.matrix);

    dummyObj.position.set(pt.x, 3.8, pt.z);
    dummyObj.updateMatrix();
    treeFoliageMesh.setMatrixAt(i, dummyObj.matrix);
  });

  scene.add(planterInst);
  scene.add(trunkInst);
  scene.add(treeFoliageMesh);

  // 2. Instanced Streetlight Poles & Emissive Bulbs
  const lightCoords = [];
  for (let x = -92; x <= 92; x += 22) {
    lightCoords.push({ x, z: -50.2 }, { x, z: 9.8 }, { x, z: 68.8 });
  }
  const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 5.2, 6);
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x3b4d5e });
  const poleInst = new THREE.InstancedMesh(poleGeo, poleMat, lightCoords.length);

  const bulbGeo = new THREE.SphereGeometry(0.52, 8, 8);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0x667788 });
  streetLightBulbMesh = new THREE.InstancedMesh(bulbGeo, bulbMat, lightCoords.length);

  lightCoords.forEach((pt, i) => {
    dummyObj.position.set(pt.x, 2.6, pt.z);
    dummyObj.updateMatrix();
    poleInst.setMatrixAt(i, dummyObj.matrix);

    dummyObj.position.set(pt.x, 5.3, pt.z);
    dummyObj.updateMatrix();
    streetLightBulbMesh.setMatrixAt(i, dummyObj.matrix);
  });

  scene.add(poleInst);
  scene.add(streetLightBulbMesh);

  // 3. Instanced Sidewalk Benches along Plazas
  const benchCoords = [];
  for (let x = -75; x <= 75; x += 30) {
    benchCoords.push({ x, z: -59.8 }, { x, z: 0.2 }, { x, z: 59.2 });
  }
  const benchGeo = new THREE.BoxGeometry(1.8, 0.45, 0.65);
  const benchMat = new THREE.MeshLambertMaterial({ color: 0x7c5c43 });
  const benchInst = new THREE.InstancedMesh(benchGeo, benchMat, benchCoords.length);
  benchCoords.forEach((pt, i) => {
    dummyObj.position.set(pt.x, 0.42, pt.z);
    dummyObj.updateMatrix();
    benchInst.setMatrixAt(i, dummyObj.matrix);
  });
  scene.add(benchInst);

  // 4. Instanced Industrial Tower Cranes (Masts + Rotating Jibs)
  const mastGeo = new THREE.BoxGeometry(0.6, 14, 0.6);
  const craneMat = new THREE.MeshLambertMaterial({ color: 0xd6a84f });
  const mastInst = new THREE.InstancedMesh(mastGeo, craneMat, craneLocations.length);

  const jibGeo = new THREE.BoxGeometry(9.5, 0.45, 0.45);
  jibGeo.translate(2.2, 0, 0);
  craneJibInstancedMesh = new THREE.InstancedMesh(jibGeo, craneMat, craneLocations.length);

  craneLocations.forEach((c, i) => {
    dummyObj.position.set(c.x, c.y / 2, c.z);
    dummyObj.rotation.set(0, 0, 0);
    dummyObj.updateMatrix();
    mastInst.setMatrixAt(i, dummyObj.matrix);

    dummyObj.position.set(c.x, c.y, c.z);
    dummyObj.updateMatrix();
    craneJibInstancedMesh.setMatrixAt(i, dummyObj.matrix);
  });

  scene.add(mastInst);
  scene.add(craneJibInstancedMesh);
}

export function animateInstancedProps(nowSec, reducedMotion) {
  if (reducedMotion || !craneJibInstancedMesh) return;

  craneLocations.forEach((c, i) => {
    dummyObj.position.set(c.x, c.y, c.z);
    dummyObj.rotation.set(0, Math.sin(nowSec * 0.45 + i * 1.7) * 0.85, 0);
    dummyObj.updateMatrix();
    craneJibInstancedMesh.setMatrixAt(i, dummyObj.matrix);
  });
  craneJibInstancedMesh.instanceMatrix.needsUpdate = true;
}