/**
 * Instanced Trees and Streetlights along avenues and inside the Portfolio Garden.
 */
import * as THREE from 'three';
import { scene } from './scene.js';

export let treeFoliageMesh = null;
export let streetLightBulbMesh = null;

const dummyObj = new THREE.Object3D();

export function buildInstancedProps() {
  if (!scene) return;

  const treeCoords = [];
  for (let z = -95; z <= 95; z += 16) {
    treeCoords.push({ x: -47, z }, { x: -37, z }, { x: 37, z }, { x: 47, z });
  }
  for (let dx = -3; dx <= 3; dx += 3) {
    for (let dz = -3; dz <= 3; dz += 3) {
      treeCoords.push({ x: 34 + dx, z: 42 + dz });
    }
  }

  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 2.2, 6);
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
  const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCoords.length);

  const foliageGeo = new THREE.ConeGeometry(1.7, 4.2, 7);
  const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2d7a53 });
  treeFoliageMesh = new THREE.InstancedMesh(foliageGeo, foliageMat, treeCoords.length);

  treeCoords.forEach((pt, i) => {
    dummyObj.position.set(pt.x, 1.1, pt.z);
    dummyObj.scale.set(1, 1, 1);
    dummyObj.updateMatrix();
    trunkInst.setMatrixAt(i, dummyObj.matrix);

    dummyObj.position.set(pt.x, 3.6, pt.z);
    dummyObj.updateMatrix();
    treeFoliageMesh.setMatrixAt(i, dummyObj.matrix);
  });

  scene.add(trunkInst);
  scene.add(treeFoliageMesh);

  const lightCoords = [];
  for (let x = -90; x <= 90; x += 22) {
    lightCoords.push({ x, z: -51 }, { x, z: 9 }, { x, z: 68 });
  }
  const bulbGeo = new THREE.SphereGeometry(0.55, 8, 8);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0x556677 });
  streetLightBulbMesh = new THREE.InstancedMesh(bulbGeo, bulbMat, lightCoords.length);

  lightCoords.forEach((pt, i) => {
    dummyObj.position.set(pt.x, 5.2, pt.z);
    dummyObj.updateMatrix();
    streetLightBulbMesh.setMatrixAt(i, dummyObj.matrix);
  });

  scene.add(streetLightBulbMesh);
}