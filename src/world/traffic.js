/**
 * City Life via InstancedMesh (Deterministic with `visualRng`):
 * - Lane Traffic with Turning at Avenue Intersections
 * - Sidewalk Pedestrians
 * - Animated Fiber-Optic Data Pulses between Market-Data Center, Exchange, Clearing, and Depository
 * Activity density and speed scale dynamically with normalized market volume.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { visualRng } from '../engine/rng.js';
import { store } from '../state/store.js';

export let vehicleInstancedMesh = null;
let pedestrianInstancedMesh = null;
let dataPulseInstancedMesh = null;

const vehiclesData = [];
const pedestriansData = [];
const dataPulses = [];
const dummyObj = new THREE.Object3D();

const HORIZ_Z = [-55, 5, 64];
const VERT_X = [-42, 42];

// Data link pathways between Exchange (0, -24), Data Center (-40, 84), Clearing (-24, 84), Depository (-8, 84)
const DATA_ROUTES = [
  { start: new THREE.Vector3(-40, 2.2, 84), end: new THREE.Vector3(-19, 3.0, -13) },
  { start: new THREE.Vector3(19, 3.0, -13), end: new THREE.Vector3(-24, 2.2, 84) },
  { start: new THREE.Vector3(-24, 2.2, 84), end: new THREE.Vector3(-8, 2.2, 84) },
  { start: new THREE.Vector3(-19, 3.0, -35), end: new THREE.Vector3(8, 2.2, 84) }
];

export function buildTraffic() {
  if (!scene) return;

  // 1. Instanced Vehicles (40 max capacity; active count scales with quality & market volume)
  const vehicleCount = 40;
  const vehGeo = new THREE.BoxGeometry(1.9, 0.78, 1.05);
  const vehMat = new THREE.MeshPhongMaterial({
    color: 0x68a8ff,
    emissive: 0x1c3f70,
    shininess: 70
  });
  vehicleInstancedMesh = new THREE.InstancedMesh(vehGeo, vehMat, vehicleCount);

  for (let i = 0; i < vehicleCount; i++) {
    const isHorizontal = i % 2 === 0;
    const roadCenter = isHorizontal ? HORIZ_Z[i % 3] : VERT_X[i % 2];
    const dir = i % 4 === 0 ? 1 : -1;
    const laneOffset = dir > 0 ? 1.65 : -1.65;

    vehiclesData.push({
      isHorizontal,
      roadCenter,
      dir,
      pos: isHorizontal ? visualRng.range(-100, 100) : visualRng.range(-95, 95),
      fixedCoord: roadCenter + laneOffset,
      baseSpeed: visualRng.range(11, 20),
      turnCooldown: 0,
      turnPreference: visualRng.next() > 0.45
    });
  }
  scene.add(vehicleInstancedMesh);

  // 2. Instanced Pedestrians on Sidewalks (48 micro-figures)
  const pedCount = 48;
  const pedGeo = new THREE.CylinderGeometry(0.22, 0.25, 1.1, 6);
  const pedMat = new THREE.MeshLambertMaterial({ color: 0xd0deec });
  pedestrianInstancedMesh = new THREE.InstancedMesh(pedGeo, pedMat, pedCount);

  for (let i = 0; i < pedCount; i++) {
    const isHorizontal = i % 2 === 0;
    const roadCenter = isHorizontal ? HORIZ_Z[i % 3] : VERT_X[i % 2];
    const side = i % 4 < 2 ? 4.3 : -4.3;
    pedestriansData.push({
      isHorizontal,
      pos: visualRng.range(-88, 88),
      fixedCoord: roadCenter + side,
      dir: i % 2 === 0 ? 1 : -1,
      speed: visualRng.range(2.2, 4.0)
    });
  }
  scene.add(pedestrianInstancedMesh);

  // 3. Fiber-Optic Guide Lines & Instanced Data Pulses (32 glowing packets)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x3baa91,
    transparent: true,
    opacity: 0.35
  });
  DATA_ROUTES.forEach(route => {
    const mid = route.start.clone().lerp(route.end, 0.5);
    mid.y = 6.5;
    const curve = new THREE.QuadraticBezierCurve3(route.start, mid, route.end);
    const pts = curve.getPoints(24);
    const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
    scene.add(new THREE.Line(lGeo, lineMat));
    route.curve = curve;
  });

  const pulseCount = 32;
  const pulseGeo = new THREE.SphereGeometry(0.55, 8, 8);
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0x5ec2d6 });
  dataPulseInstancedMesh = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);

  for (let i = 0; i < pulseCount; i++) {
    dataPulses.push({
      routeIdx: i % DATA_ROUTES.length,
      t: (i / pulseCount) % 1,
      speed: visualRng.range(0.22, 0.42)
    });
  }
  scene.add(dataPulseInstancedMesh);
}

const tempVec = new THREE.Vector3();

export function updateTraffic(dt, reducedMotion) {
  if (reducedMotion) return;

  const viewState = store.getViewState();
  const quality = viewState.resolvedQuality || 'HIGH';
  // Normalized volume factor (1.0 at baseline, up to 2.2x during high volume)
  const volFactor = Math.max(0.75, Math.min(2.2, (viewState.totals.volumeCr || 5) / 5));

  // 1. Update Vehicles & Intersection Turning
  if (vehicleInstancedMesh) {
    const activeVehLimit = quality === 'LOW' ? 16 : quality === 'MEDIUM' ? 28 : vehiclesData.length;

    vehiclesData.forEach((v, idx) => {
      if (idx >= activeVehLimit) {
        dummyObj.scale.set(0, 0, 0);
        dummyObj.updateMatrix();
        vehicleInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
        return;
      }

      v.turnCooldown = Math.max(0, v.turnCooldown - dt);
      v.pos += v.dir * v.baseSpeed * volFactor * dt;

      if (v.pos > 106) v.pos = -106;
      if (v.pos < -106) v.pos = 106;

      // Check if near an intersection to execute a smooth 90-degree turn onto a cross avenue
      if (v.turnCooldown <= 0 && v.turnPreference) {
        const crossList = v.isHorizontal ? VERT_X : HORIZ_Z;
        for (let c = 0; c < crossList.length; c++) {
          const crossCoord = crossList[c];
          if (Math.abs(v.pos - crossCoord) < 0.85) {
            v.isHorizontal = !v.isHorizontal;
            const newRoadCenter = crossCoord;
            v.pos = v.roadCenter;
            v.roadCenter = newRoadCenter;
            const laneOffset = v.dir > 0 ? 1.65 : -1.65;
            v.fixedCoord = v.roadCenter + laneOffset;
            v.turnCooldown = 4.5;
            break;
          }
        }
      }

      dummyObj.scale.set(1, 1, 1);
      if (v.isHorizontal) {
        dummyObj.position.set(v.pos, 0.62, v.fixedCoord);
        dummyObj.rotation.set(0, v.dir > 0 ? 0 : Math.PI, 0);
      } else {
        dummyObj.position.set(v.fixedCoord, 0.62, v.pos);
        dummyObj.rotation.set(0, v.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      }
      dummyObj.updateMatrix();
      vehicleInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    });

    vehicleInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  // 2. Update Sidewalk Pedestrians
  if (pedestrianInstancedMesh) {
    const activePedLimit = quality === 'LOW' ? 16 : pedestriansData.length;
    pedestriansData.forEach((p, idx) => {
      if (idx >= activePedLimit) {
        dummyObj.scale.set(0, 0, 0);
        dummyObj.updateMatrix();
        pedestrianInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
        return;
      }

      p.pos += p.dir * p.speed * dt;
      if (p.pos > 92) p.dir = -1;
      if (p.pos < -92) p.dir = 1;

      dummyObj.scale.set(1, 1, 1);
      if (p.isHorizontal) {
        dummyObj.position.set(p.pos, 0.75, p.fixedCoord);
      } else {
        dummyObj.position.set(p.fixedCoord, 0.75, p.pos);
      }
      dummyObj.rotation.set(0, 0, 0);
      dummyObj.updateMatrix();
      pedestrianInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    });
    pedestrianInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  // 3. Update Fiber-Optic Data Pulses between Exchange & Infrastructure
  if (dataPulseInstancedMesh) {
    dataPulses.forEach((dp, idx) => {
      const route = DATA_ROUTES[dp.routeIdx];
      if (!route || !route.curve) return;

      dp.t = (dp.t + dp.speed * volFactor * dt) % 1;
      route.curve.getPoint(dp.t, tempVec);

      dummyObj.position.copy(tempVec);
      const s = 0.8 + Math.sin(dp.t * Math.PI) * 0.5;
      dummyObj.scale.set(s, s, s);
      dummyObj.updateMatrix();
      dataPulseInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    });
    dataPulseInstancedMesh.instanceMatrix.needsUpdate = true;
  }
}