/**
 * Instanced Service Vehicles using `visualRng` (isolated from simulation RNG).
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { visualRng } from '../engine/rng.js';

export let vehicleInstancedMesh = null;
const vehiclesData = [];
const dummyObj = new THREE.Object3D();

export function buildTraffic() {
  if (!scene) return;

  const vehicleCount = 28;
  const vehGeo = new THREE.BoxGeometry(1.8, 0.8, 1.0);
  const vehMat = new THREE.MeshBasicMaterial({ color: 0x68a8ff });
  vehicleInstancedMesh = new THREE.InstancedMesh(vehGeo, vehMat, vehicleCount);

  for (let i = 0; i < vehicleCount; i++) {
    const isHorizontal = i % 2 === 0;
    const laneZ = [-55, 5, 64][i % 3] + (i % 4 === 0 ? 1.6 : -1.6);
    const laneX = [-42, 42][i % 2] + (i % 4 === 0 ? 1.6 : -1.6);
    vehiclesData.push({
      isHorizontal,
      pos: isHorizontal ? visualRng.range(-100, 100) : visualRng.range(-95, 95),
      fixedCoord: isHorizontal ? laneZ : laneX,
      speed: (i % 4 === 0 ? 1 : -1) * visualRng.range(10, 20)
    });
  }

  scene.add(vehicleInstancedMesh);
}

export function updateTraffic(dt, reducedMotion) {
  if (!vehicleInstancedMesh || reducedMotion) return;

  vehiclesData.forEach((v, idx) => {
    v.pos += v.speed * dt;
    if (v.pos > 105) v.pos = -105;
    if (v.pos < -105) v.pos = 105;

    if (v.isHorizontal) {
      dummyObj.position.set(v.pos, 0.55, v.fixedCoord);
      dummyObj.rotation.set(0, 0, 0);
    } else {
      dummyObj.position.set(v.fixedCoord, 0.55, v.pos);
      dummyObj.rotation.set(0, Math.PI / 2, 0);
    }
    dummyObj.updateMatrix();
    vehicleInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
  });

  vehicleInstancedMesh.instanceMatrix.needsUpdate = true;
}