/**
 * Ground Plaza, Paved Road Network with Reflective Wet-Road Material Support,
 * Sidewalks & Curbs, Scenic Canal Waterway, Bridges, and Light/Dark 3D Theme Palette.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { createContactShadowMesh } from './lighting.js';

let groundMat = null;
let sidewalkMat = null;
let embankmentMat = null;
let canalWaterMesh = null;
let canalWaterTexture = null;
const roadMaterials = [];

function createPlazaTileTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#d0dce8';
  ctx.lineWidth = 2;
  const step = 32;
  for (let i = 0; i <= 256; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if ((x + y) % 2 === 0) {
        ctx.fillRect(x * step + 2, y * step + 2, step - 4, step - 4);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(28, 28);
  return tex;
}

function createRoadAsphaltTexture(isHorizontal, lengthUnits) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#18222d';
  ctx.fillRect(0, 0, 128, 512);

  ctx.fillStyle = '#3b526b';
  ctx.fillRect(8, 0, 3, 512);
  ctx.fillRect(117, 0, 3, 512);

  ctx.fillStyle = '#d6a84f';
  for (let y = 16; y < 512; y += 48) {
    ctx.fillRect(62, y, 4, 24);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  if (isHorizontal) {
    tex.rotation = Math.PI / 2;
    tex.center.set(0.5, 0.5);
    tex.repeat.set(1, lengthUnits / 18);
  } else {
    tex.repeat.set(1, lengthUnits / 18);
  }
  return tex;
}

function createCrosswalkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#18222d';
  ctx.fillRect(0, 0, 128, 128);

  ctx.fillStyle = '#d4e2f0';
  for (let i = 18; i < 110; i += 14) {
    ctx.fillRect(i, 4, 8, 18);
    ctx.fillRect(i, 106, 8, 18);
    ctx.fillRect(4, i, 18, 8);
    ctx.fillRect(106, i, 18, 8);
  }

  return new THREE.CanvasTexture(canvas);
}

function createCanalWaterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0c283d';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(94, 194, 214, 0.25)';
  ctx.lineWidth = 2;
  for (let y = 0; y < 256; y += 16) {
    ctx.beginPath();
    for (let x = 0; x <= 256; x += 32) {
      const waveY = y + Math.sin((x / 256) * Math.PI * 2) * 3;
      if (x === 0) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 16);
  return tex;
}

export function buildGroundAndRoadNetwork() {
  if (!scene) return;

  // 1. Main City Peninsula Stone Foundation (MeshPhongMaterial for wet-rain reflection support)
  const plazaTex = createPlazaTileTexture();
  const groundGeo = new THREE.BoxGeometry(276, 4, 256);
  groundMat = new THREE.MeshPhongMaterial({
    map: plazaTex,
    color: 0x16222f,
    specular: 0x111922,
    shininess: 12
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.set(0, -2, 8);
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. Scenic Canal Waterway along the Western Edge (x = -117)
  embankmentMat = new THREE.MeshLambertMaterial({ color: 0x243444 });
  const westBank = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 256), embankmentMat);
  westBank.position.set(-108.5, 0.4, 8);
  scene.add(westBank);

  const outerBank = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.4, 256), embankmentMat);
  outerBank.position.set(-125.5, 0.4, 8);
  scene.add(outerBank);

  canalWaterTexture = createCanalWaterTexture();
  const waterGeo = new THREE.PlaneGeometry(15, 254);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshPhongMaterial({
    map: canalWaterTexture,
    color: 0x1a5b7a,
    emissive: 0x071d2c,
    specular: 0x88ccff,
    shininess: 95
  });
  canalWaterMesh = new THREE.Mesh(waterGeo, waterMat);
  canalWaterMesh.position.set(-117, 0.12, 8);
  scene.add(canalWaterMesh);

  // 3. Paved Road Avenues with Sidewalks & Curbs
  sidewalkMat = new THREE.MeshLambertMaterial({ color: 0x263545 });
  const avenues = [
    { x: -42, z: 8, w: 7.4, d: 226, horiz: false },
    { x: 42, z: 8, w: 7.4, d: 226, horiz: false },
    { x: 0, z: -55, w: 236, d: 7.4, horiz: true },
    { x: 0, z: 5, w: 236, d: 7.4, horiz: true },
    { x: 0, z: 64, w: 236, d: 7.4, horiz: true }
  ];

  avenues.forEach(r => {
    const swW = r.horiz ? r.w : r.w + 2.6;
    const swD = r.horiz ? r.d + 2.6 : r.d;
    const swMesh = new THREE.Mesh(new THREE.BoxGeometry(swW, 0.22, swD), sidewalkMat);
    swMesh.position.set(r.x, 0.11, r.z);
    swMesh.receiveShadow = true;
    scene.add(swMesh);

    const roadTex = createRoadAsphaltTexture(r.horiz, r.horiz ? r.w : r.d);
    const roadMat = new THREE.MeshPhongMaterial({
      map: roadTex,
      color: 0xffffff,
      specular: 0x182430,
      shininess: 18
    });
    roadMaterials.push(roadMat);

    const roadMesh = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.26, r.d), roadMat);
    roadMesh.position.set(r.x, 0.13, r.z);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);
  });

  // 4. Intersection Crosswalks
  const crosswalkTex = createCrosswalkTexture();
  const crosswalkMat = new THREE.MeshPhongMaterial({
    map: crosswalkTex,
    specular: 0x203040,
    shininess: 20
  });
  roadMaterials.push(crosswalkMat);

  const intersections = [
    { x: -42, z: -55 },
    { x: 42, z: -55 },
    { x: -42, z: 5 },
    { x: 42, z: 5 },
    { x: -42, z: 64 },
    { x: 42, z: 64 }
  ];

  intersections.forEach(pt => {
    const cw = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.28, 9.6), crosswalkMat);
    cw.position.set(pt.x, 0.14, pt.z);
    cw.receiveShadow = true;
    scene.add(cw);
  });

  // 5. Three Arch Bridges with Soft Contact Shadows
  const bridgeDeckMat = new THREE.MeshLambertMaterial({ color: 0x34495e });
  const bridgeArchMat = new THREE.MeshPhongMaterial({ color: 0x4b8be8, shininess: 50 });

  [-55, 5, 64].forEach(zPos => {
    const bGroup = new THREE.Group();
    bGroup.position.set(-117, 0, zPos);

    const deck = new THREE.Mesh(new THREE.BoxGeometry(19, 0.8, 9.5), bridgeDeckMat);
    deck.position.y = 1.2;
    deck.castShadow = true;
    bGroup.add(deck);

    const bridgeAo = createContactShadowMesh(20, 11, 0.55);
    bridgeAo.position.y = 0.16;
    bGroup.add(bridgeAo);

    [-4.3, 4.3].forEach(zOff => {
      const arch = new THREE.Mesh(
        new THREE.TorusGeometry(7.5, 0.38, 8, 18, Math.PI),
        bridgeArchMat
      );
      arch.position.set(0, 1.4, zOff);
      bGroup.add(arch);
    });

    scene.add(bGroup);
  });
}

/**
 * Updates ground & road materials for:
 * - Wet reflective roads during Rain
 * - Light vs. Dark UI 3D Scene Palette
 */
export function updateGroundMaterials(isRain, nightFactor, lightUiTheme) {
  if (!groundMat || !sidewalkMat || !embankmentMat) return;

  if (lightUiTheme && nightFactor < 0.45) {
    groundMat.color.setHex(0xc8d4df);
    sidewalkMat.color.setHex(0xdbe4ec);
    embankmentMat.color.setHex(0x9fb0c0);
  } else {
    groundMat.color.setHex(0x16222f);
    sidewalkMat.color.setHex(0x263545);
    embankmentMat.color.setHex(0x243444);
  }

  const targetShine = isRain ? 110 : 16;
  const targetSpecHex = isRain ? 0x7ab4e8 : 0x15202b;

  groundMat.shininess = targetShine * 0.7;
  groundMat.specular.setHex(targetSpecHex);

  roadMaterials.forEach(rm => {
    rm.shininess = targetShine;
    rm.specular.setHex(targetSpecHex);
  });
}

export function updateCanalWater(dt, reducedMotion) {
  if (!canalWaterTexture || reducedMotion) return;
  canalWaterTexture.offset.y = (canalWaterTexture.offset.y + dt * 0.18) % 1;
}