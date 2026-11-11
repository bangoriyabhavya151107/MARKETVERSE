/**
 * Instanced City Props using Polyfork Low-Poly 3D Assets (CC BY 4.0):
 * - Trees (street-tree-0d33f3)
 * - Street Lamps (street-lamp-136745)
 * - Park Benches (park-bench-dc8b62)
 * - Bike Racks (bike-rack-a1e7c3)
 * - Traffic Lights (traffic-light-b217a2)
 * - Bus Shelters (bus-shelter-f786b4)
 * - Industrial Tower Cranes (Masts + Rotating Jibs)
 * With graceful fallback to procedural geometry on LOW quality settings.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { getCachedGeometry, getCachedMaterial, areModelsLoaded } from './modelLoader.js';
import { store } from '../state/store.js';

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
  const isLowQuality = store.getLiveState().graphicsQuality === 'LOW';

  // 1. Instanced Trees along Avenues and Portfolio Garden
  const treeCoords = [];
  for (let z = -95; z <= 95; z += 16) {
    treeCoords.push({ x: -48, z }, { x: -36, z }, { x: 36, z }, { x: 48, z });
  }
  for (let dx = -3; dx <= 3; dx += 3) {
    for (let dz = -3; dz <= 3; dz += 3) {
      treeCoords.push({ x: 34 + dx, z: 42 + dz });
    }
  }

  const polyTreeGeo = !isLowQuality && getCachedGeometry('street-tree-0d33f3');
  const polyTreeMat = !isLowQuality && getCachedMaterial('street-tree-0d33f3');

  if (polyTreeGeo && polyTreeMat) {
    const treeInst = new THREE.InstancedMesh(polyTreeGeo, polyTreeMat, treeCoords.length);
    treeInst.castShadow = true;
    treeInst.receiveShadow = true;
    treeCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, (i * 1.618) % (Math.PI * 2), 0);
      dummyObj.scale.set(0.9, 0.9, 0.9);
      dummyObj.updateMatrix();
      treeInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(treeInst);
  } else {
    // Procedural Fallback
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
  }

  // 2. Instanced Streetlight Poles & Emissive Fixtures
  const lightCoords = [];
  for (let x = -92; x <= 92; x += 22) {
    lightCoords.push({ x, z: -50.2 }, { x, z: 9.8 }, { x, z: 68.8 });
  }

  const polyLampGeo = !isLowQuality && getCachedGeometry('street-lamp-136745');
  const polyLampMat = !isLowQuality && getCachedMaterial('street-lamp-136745');

  if (polyLampGeo && polyLampMat) {
    const lampInst = new THREE.InstancedMesh(polyLampGeo, polyLampMat, lightCoords.length);
    lampInst.castShadow = true;
    lightCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, pt.z > 0 ? 0 : Math.PI, 0);
      dummyObj.scale.set(0.95, 0.95, 0.95);
      dummyObj.updateMatrix();
      lampInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(lampInst);
  } else {
    // Procedural Fallback
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 5.2, 6);
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x3b4d5e });
    const poleInst = new THREE.InstancedMesh(poleGeo, poleMat, lightCoords.length);

    const bulbGeo = new THREE.SphereGeometry(0.52, 8, 8);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0x667788 });
    streetLightBulbMesh = new THREE.InstancedMesh(bulbGeo, bulbMat, lightCoords.length);

    lightCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 2.6, pt.z);
      dummyObj.rotation.set(0, 0, 0);
      dummyObj.scale.set(1, 1, 1);
      dummyObj.updateMatrix();
      poleInst.setMatrixAt(i, dummyObj.matrix);

      dummyObj.position.set(pt.x, 5.3, pt.z);
      dummyObj.updateMatrix();
      streetLightBulbMesh.setMatrixAt(i, dummyObj.matrix);
    });

    scene.add(poleInst);
    scene.add(streetLightBulbMesh);
  }

  // 3. Instanced Sidewalk Benches along Plazas
  const benchCoords = [];
  for (let x = -75; x <= 75; x += 30) {
    benchCoords.push({ x, z: -59.8 }, { x, z: 0.2 }, { x, z: 59.2 });
  }

  const polyBenchGeo = !isLowQuality && getCachedGeometry('park-bench-dc8b62');
  const polyBenchMat = !isLowQuality && getCachedMaterial('park-bench-dc8b62');

  if (polyBenchGeo && polyBenchMat) {
    const benchInst = new THREE.InstancedMesh(polyBenchGeo, polyBenchMat, benchCoords.length);
    benchInst.castShadow = true;
    benchCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, pt.z > 0 ? 0 : Math.PI, 0);
      dummyObj.scale.set(0.9, 0.9, 0.9);
      dummyObj.updateMatrix();
      benchInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(benchInst);
  } else {
    // Procedural Fallback
    const benchGeo = new THREE.BoxGeometry(1.8, 0.45, 0.65);
    const benchMat = new THREE.MeshLambertMaterial({ color: 0x7c5c43 });
    const benchInst = new THREE.InstancedMesh(benchGeo, benchMat, benchCoords.length);
    benchCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.42, pt.z);
      dummyObj.rotation.set(0, 0, 0);
      dummyObj.scale.set(1, 1, 1);
      dummyObj.updateMatrix();
      benchInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(benchInst);
  }

  // 4. Instanced Traffic Lights at Major Avenue Intersections
  const tlGeo = !isLowQuality && getCachedGeometry('traffic-light-b217a2');
  const tlMat = !isLowQuality && getCachedMaterial('traffic-light-b217a2');
  if (tlGeo && tlMat) {
    const tlCoords = [
      { x: -44, z: -55 },
      { x: -40, z: 5 },
      { x: 40, z: -55 },
      { x: 44, z: 5 },
      { x: -44, z: 64 },
      { x: 44, z: 64 }
    ];
    const tlInst = new THREE.InstancedMesh(tlGeo, tlMat, tlCoords.length);
    tlInst.castShadow = true;
    tlCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, (i % 2 === 0 ? 0 : Math.PI / 2), 0);
      dummyObj.scale.set(0.85, 0.85, 0.85);
      dummyObj.updateMatrix();
      tlInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(tlInst);
  }

  // 5. Instanced Bus Shelters along Transit Corridors
  const shelterGeo = !isLowQuality && getCachedGeometry('bus-shelter-f786b4');
  const shelterMat = !isLowQuality && getCachedMaterial('bus-shelter-f786b4');
  if (shelterGeo && shelterMat) {
    const shelterCoords = [
      { x: -44, z: -25 },
      { x: 44, z: -25 },
      { x: -44, z: 32 },
      { x: 44, z: 32 }
    ];
    const shelterInst = new THREE.InstancedMesh(shelterGeo, shelterMat, shelterCoords.length);
    shelterInst.castShadow = true;
    shelterCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, pt.x > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
      dummyObj.scale.set(0.9, 0.9, 0.9);
      dummyObj.updateMatrix();
      shelterInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(shelterInst);
  }

  // 6. Instanced Bike Racks in Plaza Walkways
  const bikeGeo = !isLowQuality && getCachedGeometry('bike-rack-a1e7c3');
  const bikeMat = !isLowQuality && getCachedMaterial('bike-rack-a1e7c3');
  if (bikeGeo && bikeMat) {
    const bikeCoords = [
      { x: -16, z: -2 },
      { x: 16, z: -2 },
      { x: -16, z: -46 },
      { x: 16, z: -46 }
    ];
    const bikeInst = new THREE.InstancedMesh(bikeGeo, bikeMat, bikeCoords.length);
    bikeCoords.forEach((pt, i) => {
      dummyObj.position.set(pt.x, 0.05, pt.z);
      dummyObj.rotation.set(0, 0, 0);
      dummyObj.scale.set(0.9, 0.9, 0.9);
      dummyObj.updateMatrix();
      bikeInst.setMatrixAt(i, dummyObj.matrix);
    });
    scene.add(bikeInst);
  }

  // 7. Instanced Industrial Tower Cranes (Masts + Rotating Jibs)
  const mastGeo = new THREE.BoxGeometry(0.6, 14, 0.6);
  const craneMat = new THREE.MeshLambertMaterial({ color: 0xd6a84f });
  const mastInst = new THREE.InstancedMesh(mastGeo, craneMat, craneLocations.length);

  const jibGeo = new THREE.BoxGeometry(9.5, 0.45, 0.45);
  jibGeo.translate(2.2, 0, 0);
  craneJibInstancedMesh = new THREE.InstancedMesh(jibGeo, craneMat, craneLocations.length);

  craneLocations.forEach((c, i) => {
    dummyObj.position.set(c.x, c.y / 2, c.z);
    dummyObj.rotation.set(0, 0, 0);
    dummyObj.scale.set(1, 1, 1);
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
    dummyObj.scale.set(1, 1, 1);
    dummyObj.updateMatrix();
    craneJibInstancedMesh.setMatrixAt(i, dummyObj.matrix);
  });
  craneJibInstancedMesh.instanceMatrix.needsUpdate = true;
}
