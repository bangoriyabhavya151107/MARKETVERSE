/**
 * City Life via InstancedMesh (Deterministic with `visualRng`):
 * - Polyfork Vehicles (Yellow Cab, City Bus, Hatchback, Town Car, Delivery Truck, Ambulance)
 * - Polyfork Pedestrians (Commuter, Shopper, Doorman, Street Vendor)
 * - Animated Fiber-Optic Data Pulses between Data Center, Exchange, Clearing, and Depository
 * Activity density and speed scale dynamically with normalized market volume.
 * Full low-quality procedural fallback provided for low-end hardware.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { visualRng } from '../engine/rng.js';
import { store } from '../state/store.js';
import { getCachedGeometry, getCachedMaterial, areModelsLoaded } from './modelLoader.js';

export let vehicleInstancedMesh = null;
let pedestrianInstancedMesh = null;
let dataPulseInstancedMesh = null;

// Polyfork Model Instanced Mesh Groups
const polyforkVehicles = [];
const polyforkPedestrians = [];

const vehiclesData = [];
const pedestriansData = [];
const dataPulses = [];
const dummyObj = new THREE.Object3D();

const HORIZ_Z = [-55, 5, 64];
const VERT_X = [-42, 42];

const VEHICLE_MODELS = [
  { id: 'yellow-cab-8df4a0', scale: 0.9 },
  { id: 'city-bus-49fd97', scale: 0.8 },
  { id: 'compact-hatchback-386417', scale: 0.9 },
  { id: 'town-car-56eeb6', scale: 0.9 },
  { id: 'delivery-truck-a9537e', scale: 0.85 },
  { id: 'ambulance-van-29919a', scale: 0.9 }
];

const PEDESTRIAN_MODELS = [
  { id: 'commuter-381e7f', scale: 0.75 },
  { id: 'shopper-d3208f', scale: 0.75 },
  { id: 'doorman-3f2e09', scale: 0.75 },
  { id: 'street-vendor-139de3', scale: 0.75 }
];

// Data link pathways between Exchange (0, -24), Data Center (-40, 84), Clearing (-24, 84), Depository (-8, 84)
const DATA_ROUTES = [
  { start: new THREE.Vector3(-40, 2.2, 84), end: new THREE.Vector3(-19, 3.0, -13) },
  { start: new THREE.Vector3(19, 3.0, -13), end: new THREE.Vector3(-24, 2.2, 84) },
  { start: new THREE.Vector3(-24, 2.2, 84), end: new THREE.Vector3(-8, 2.2, 84) },
  { start: new THREE.Vector3(-19, 3.0, -35), end: new THREE.Vector3(8, 2.2, 84) }
];

export function buildTraffic() {
  if (!scene) return;
  const isLowQuality = store.getLiveState().graphicsQuality === 'LOW';

  // 1. Vehicles Initialization (40 total)
  const vehicleCount = 40;
  vehiclesData.length = 0;
  polyforkVehicles.length = 0;

  for (let i = 0; i < vehicleCount; i++) {
    const isHorizontal = i % 2 === 0;
    const roadCenter = isHorizontal ? HORIZ_Z[i % 3] : VERT_X[i % 2];
    const dir = i % 4 === 0 ? 1 : -1;
    const laneOffset = dir > 0 ? 1.65 : -1.65;
    const typeIdx = i % VEHICLE_MODELS.length;

    vehiclesData.push({
      isHorizontal,
      roadCenter,
      dir,
      pos: isHorizontal ? visualRng.range(-100, 100) : visualRng.range(-95, 95),
      fixedCoord: roadCenter + laneOffset,
      baseSpeed: visualRng.range(11, 20),
      turnCooldown: 0,
      turnPreference: visualRng.next() > 0.45,
      typeIdx
    });
  }

  // Create Polyfork InstancedMeshes if models are loaded & not low quality
  let usingPolyforkVehicles = false;
  if (!isLowQuality && areModelsLoaded()) {
    VEHICLE_MODELS.forEach((vm, typeIdx) => {
      const geo = getCachedGeometry(vm.id);
      const mat = getCachedMaterial(vm.id);
      if (geo && mat) {
        const count = vehiclesData.filter(v => v.typeIdx === typeIdx).length;
        const inst = new THREE.InstancedMesh(geo, mat, Math.max(1, count));
        inst.castShadow = true;
        scene.add(inst);
        polyforkVehicles.push({ inst, typeIdx, scale: vm.scale });
        usingPolyforkVehicles = true;
      }
    });
  }

  // Procedural Fallback Mesh (Used on LOW quality or if Polyfork not ready)
  const vehGeo = new THREE.BoxGeometry(1.9, 0.78, 1.05);
  const vehMat = new THREE.MeshPhongMaterial({
    color: 0x68a8ff,
    emissive: 0x1c3f70,
    shininess: 70
  });
  vehicleInstancedMesh = new THREE.InstancedMesh(vehGeo, vehMat, vehicleCount);
  vehicleInstancedMesh.visible = !usingPolyforkVehicles;
  scene.add(vehicleInstancedMesh);

  // 2. Pedestrians Initialization (48 figures)
  const pedCount = 48;
  pedestriansData.length = 0;
  polyforkPedestrians.length = 0;

  for (let i = 0; i < pedCount; i++) {
    const isHorizontal = i % 2 === 0;
    const roadCenter = isHorizontal ? HORIZ_Z[i % 3] : VERT_X[i % 2];
    const side = i % 4 < 2 ? 4.3 : -4.3;
    const typeIdx = i % PEDESTRIAN_MODELS.length;

    pedestriansData.push({
      isHorizontal,
      pos: visualRng.range(-88, 88),
      fixedCoord: roadCenter + side,
      dir: i % 2 === 0 ? 1 : -1,
      speed: visualRng.range(2.2, 4.0),
      typeIdx
    });
  }

  let usingPolyforkPedestrians = false;
  if (!isLowQuality && areModelsLoaded()) {
    PEDESTRIAN_MODELS.forEach((pm, typeIdx) => {
      const geo = getCachedGeometry(pm.id);
      const mat = getCachedMaterial(pm.id);
      if (geo && mat) {
        const count = pedestriansData.filter(p => p.typeIdx === typeIdx).length;
        const inst = new THREE.InstancedMesh(geo, mat, Math.max(1, count));
        inst.castShadow = true;
        scene.add(inst);
        polyforkPedestrians.push({ inst, typeIdx, scale: pm.scale });
        usingPolyforkPedestrians = true;
      }
    });
  }

  // Procedural Fallback Pedestrians
  const pedGeo = new THREE.CylinderGeometry(0.22, 0.25, 1.1, 6);
  const pedMat = new THREE.MeshLambertMaterial({ color: 0xd0deec });
  pedestrianInstancedMesh = new THREE.InstancedMesh(pedGeo, pedMat, pedCount);
  pedestrianInstancedMesh.visible = !usingPolyforkPedestrians;
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
  const isLow = quality === 'LOW';
  const volFactor = Math.max(0.75, Math.min(2.2, (viewState.totals.volumeCr || 5) / 5));

  // 1. Update Vehicles
  const activeVehLimit = isLow ? 16 : quality === 'MEDIUM' ? 28 : vehiclesData.length;
  const usePolyVeh = !isLow && polyforkVehicles.length > 0;

  if (vehicleInstancedMesh) {
    vehicleInstancedMesh.visible = !usePolyVeh;
  }
  polyforkVehicles.forEach(pv => {
    pv.inst.visible = usePolyVeh;
  });

  // Track sub-indices for each polyfork vehicle type
  const typeSlotCounters = {};
  polyforkVehicles.forEach(pv => {
    typeSlotCounters[pv.typeIdx] = 0;
  });

  vehiclesData.forEach((v, idx) => {
    v.turnCooldown = Math.max(0, v.turnCooldown - dt);
    v.pos += v.dir * v.baseSpeed * volFactor * dt;

    if (v.pos > 106) v.pos = -106;
    if (v.pos < -106) v.pos = 106;

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

    const isActive = idx < activeVehLimit;
    const polyEntry = usePolyVeh ? polyforkVehicles.find(pv => pv.typeIdx === v.typeIdx) : null;
    const modelScale = polyEntry ? polyEntry.scale : 1.0;
    const finalScale = isActive ? modelScale : 0.0001;

    dummyObj.scale.set(finalScale, finalScale, finalScale);
    if (v.isHorizontal) {
      dummyObj.position.set(v.pos, 0.05, v.fixedCoord);
      dummyObj.rotation.set(0, v.dir > 0 ? 0 : Math.PI, 0);
    } else {
      dummyObj.position.set(v.fixedCoord, 0.05, v.pos);
      dummyObj.rotation.set(0, v.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
    }
    dummyObj.updateMatrix();

    if (usePolyVeh && polyEntry) {
      const slot = typeSlotCounters[v.typeIdx]++;
      if (slot < polyEntry.inst.count) {
        polyEntry.inst.setMatrixAt(slot, dummyObj.matrix);
      }
    } else if (vehicleInstancedMesh) {
      vehicleInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    }
  });

  if (usePolyVeh) {
    polyforkVehicles.forEach(pv => {
      pv.inst.instanceMatrix.needsUpdate = true;
    });
  } else if (vehicleInstancedMesh) {
    vehicleInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  // 2. Update Pedestrians
  const activePedLimit = isLow ? 16 : pedestriansData.length;
  const usePolyPed = !isLow && polyforkPedestrians.length > 0;

  if (pedestrianInstancedMesh) {
    pedestrianInstancedMesh.visible = !usePolyPed;
  }
  polyforkPedestrians.forEach(pp => {
    pp.inst.visible = usePolyPed;
  });

  const pedSlotCounters = {};
  polyforkPedestrians.forEach(pp => {
    pedSlotCounters[pp.typeIdx] = 0;
  });

  pedestriansData.forEach((p, idx) => {
    p.pos += p.dir * p.speed * dt;
    if (p.pos > 92) p.dir = -1;
    if (p.pos < -92) p.dir = 1;

    const isActive = idx < activePedLimit;
    const polyPed = usePolyPed ? polyforkPedestrians.find(pp => pp.typeIdx === p.typeIdx) : null;
    const pedScale = polyPed ? polyPed.scale : 1.0;
    const finalScale = isActive ? pedScale : 0.0001;

    dummyObj.scale.set(finalScale, finalScale, finalScale);
    if (p.isHorizontal) {
      dummyObj.position.set(p.pos, 0.05, p.fixedCoord);
    } else {
      dummyObj.position.set(p.fixedCoord, 0.05, p.pos);
    }
    dummyObj.rotation.set(0, (p.dir > 0 ? 0 : Math.PI), 0);
    dummyObj.updateMatrix();

    if (usePolyPed && polyPed) {
      const slot = pedSlotCounters[p.typeIdx]++;
      if (slot < polyPed.inst.count) {
        polyPed.inst.setMatrixAt(slot, dummyObj.matrix);
      }
    } else if (pedestrianInstancedMesh) {
      pedestrianInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    }
  });

  if (usePolyPed) {
    polyforkPedestrians.forEach(pp => {
      pp.inst.instanceMatrix.needsUpdate = true;
    });
  } else if (pedestrianInstancedMesh) {
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
