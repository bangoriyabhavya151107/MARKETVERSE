/**
 * Landmark Central Stock Exchange Complex:
 * - Stepped Plaza, Soft AO Contact Shadows & Classical Colonnade Rotunda
 * - Illuminated Ribbed Glass Dome + Central Tower
 * - 4 Wings with Distinct Labeled Entrances
 * - Rotating 3D Ticker-Tape Band (live CanvasTexture showing top movers)
 * - Counter-Rotating Gyroscope Market-Status Monument
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { createContactShadowMesh } from './lighting.js';
import { registerWorldLabel } from './labels.js';

export let exchangeMonumentMat = null;
let domeMat = null;
let towerMat = null;
let tickerBandMesh = null;
let tickerCanvas = null;
let tickerCtx = null;
let tickerTexture = null;
let outerGyroRing = null;
let innerGyroRing = null;

function createWingPortalLabel(title) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111b26';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = '#4b8be8';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 252, 60);
  ctx.fillStyle = '#e6f0fa';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, 128, 32);
  return new THREE.CanvasTexture(canvas);
}

export function buildCentralExchangeComplex() {
  if (!scene) return;

  const exGroup = new THREE.Group();
  exGroup.position.set(0, 0, -24);

  // Soft AO Contact Shadow under Exchange Complex
  const exAo = createContactShadowMesh(64, 48, 0.65);
  exAo.position.y = 0.05;
  exGroup.add(exAo);

  // 1. Stepped Ceremonial Plaza Base
  const plazaGeo = new THREE.BoxGeometry(68, 0.6, 50);
  const plazaMat = new THREE.MeshLambertMaterial({ color: 0x22313f });
  const plaza = new THREE.Mesh(plazaGeo, plazaMat);
  plaza.position.y = 0.3;
  plaza.receiveShadow = true;
  exGroup.add(plaza);

  const innerSteps = new THREE.Mesh(
    new THREE.CylinderGeometry(17.5, 19, 1.2, 32),
    new THREE.MeshLambertMaterial({ color: 0x2a3d4f })
  );
  innerSteps.position.y = 0.9;
  innerSteps.receiveShadow = true;
  exGroup.add(innerSteps);

  // 2. Rotunda Podium + Perimeter Colonnade Pillars
  const podiumGeo = new THREE.CylinderGeometry(14, 15.2, 6.5, 24);
  const podiumMat = new THREE.MeshPhongMaterial({ color: 0x2f4356, shininess: 40 });
  const podium = new THREE.Mesh(podiumGeo, podiumMat);
  podium.position.set(0, 4.2, 0);
  podium.castShadow = true;
  exGroup.add(podium);

  const colMat = new THREE.MeshLambertMaterial({ color: 0x99afc4 });
  const colGeo = new THREE.CylinderGeometry(0.45, 0.5, 6.4, 8);
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const col = new THREE.Mesh(colGeo, colMat);
    col.position.set(Math.cos(angle) * 15.8, 4.2, Math.sin(angle) * 15.8);
    exGroup.add(col);
  }

  // 3. Translucent Ribbed Glass Dome over Rotunda
  const domeGeo = new THREE.SphereGeometry(13.6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  domeMat = new THREE.MeshPhongMaterial({
    color: 0x5ea2f0,
    emissive: 0x1b4578,
    emissiveIntensity: 0.25,
    transparent: true,
    opacity: 0.48,
    shininess: 95
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 7.4;
  exGroup.add(dome);

  // 4. Prominent Exchange Headquarters Tower
  const towerGeo = new THREE.CylinderGeometry(8.8, 10.6, 28, 16);
  towerMat = new THREE.MeshPhongMaterial({
    color: 0x3b5875,
    emissive: 0x18304c,
    emissiveIntensity: 0.2,
    shininess: 75
  });
  const mainTower = new THREE.Mesh(towerGeo, towerMat);
  mainTower.position.set(0, 21.5, 0);
  mainTower.castShadow = true;
  exGroup.add(mainTower);

  // 5. Rotating 3D Ticker-Tape Band wrapping the Tower
  tickerCanvas = document.createElement('canvas');
  tickerCanvas.width = 1024;
  tickerCanvas.height = 96;
  tickerCtx = tickerCanvas.getContext('2d');
  tickerTexture = new THREE.CanvasTexture(tickerCanvas);
  tickerTexture.wrapS = THREE.RepeatWrapping;
  tickerTexture.wrapT = THREE.ClampToEdgeWrapping;

  const tickerGeo = new THREE.CylinderGeometry(10.5, 10.5, 2.8, 32, 1, true);
  const tickerMat = new THREE.MeshBasicMaterial({
    map: tickerTexture,
    side: THREE.DoubleSide
  });
  tickerBandMesh = new THREE.Mesh(tickerGeo, tickerMat);
  tickerBandMesh.position.set(0, 18.5, 0);
  exGroup.add(tickerBandMesh);

  // 6. Market-Status Monument (Orb + Counter-Rotating Gyroscope Rings)
  exchangeMonumentMat = new THREE.MeshBasicMaterial({ color: 0x22a06b });

  const coreOrb = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 1), exchangeMonumentMat);
  coreOrb.position.set(0, 39.5, 0);
  exGroup.add(coreOrb);

  outerGyroRing = new THREE.Mesh(
    new THREE.TorusGeometry(4.6, 0.35, 8, 28),
    exchangeMonumentMat
  );
  outerGyroRing.position.set(0, 39.5, 0);
  exGroup.add(outerGyroRing);

  innerGyroRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.28, 8, 24),
    exchangeMonumentMat
  );
  innerGyroRing.position.set(0, 39.5, 0);
  innerGyroRing.rotation.y = Math.PI / 2;
  exGroup.add(innerGyroRing);

  const crownBand = new THREE.Mesh(
    new THREE.CylinderGeometry(9.6, 9.6, 1.8, 24),
    exchangeMonumentMat
  );
  crownBand.position.set(0, 34.5, 0);
  exGroup.add(crownBand);

  // 7. Four Distinct Wings with Entrance Portals & Signage
  const wingSpecs = [
    { x: -19, z: -11, label: 'ORDER MATCHING' },
    { x: 19, z: -11, label: 'CLEARING LINK' },
    { x: -19, z: 11, label: 'SETTLEMENT' },
    { x: 19, z: 11, label: 'MARKET-DATA' }
  ];
  const wingMat = new THREE.MeshLambertMaterial({ color: 0x2b3e50 });
  const portalMat = new THREE.MeshBasicMaterial({ color: 0x4b8be8 });

  wingSpecs.forEach(w => {
    const wGroup = new THREE.Group();
    wGroup.position.set(w.x, 0, w.z);

    const wingAo = createContactShadowMesh(15, 15, 0.6);
    wingAo.position.y = 0.62;
    wGroup.add(wingAo);

    const wing = new THREE.Mesh(new THREE.BoxGeometry(11, 11.5, 11), wingMat);
    wing.position.y = 6.2;
    wing.castShadow = true;
    wGroup.add(wing);

    const zSign = w.z > 0 ? 5.65 : -5.65;
    const portalFrame = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 0.3), portalMat);
    portalFrame.position.set(0, 2.6, zSign);
    wGroup.add(portalFrame);

    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 1.8),
      new THREE.MeshBasicMaterial({ map: createWingPortalLabel(w.label), side: THREE.DoubleSide })
    );
    signMesh.position.set(0, 9.8, zSign);
    if (w.z < 0) signMesh.rotation.y = Math.PI;
    wGroup.add(signMesh);

    exGroup.add(wGroup);
  });

  // 8. Generous Raycast Hitbox
  const hitGeo = new THREE.BoxGeometry(54, 45, 40);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.set(0, 22, 0);
  hitMesh.userData = {
    type: 'EXCHANGE',
    id: 'CENTRAL_EXCHANGE',
    name: 'Central Stock Exchange Complex (NSE / BSE Anchor)'
  };
  exGroup.add(hitMesh);
  interactiveMeshes.push(hitMesh);

  scene.add(exGroup);

  registerWorldLabel({
    id: 'CENTRAL_EXCHANGE',
    type: 'EXCHANGE',
    text: '🏛️ STOCK EXCHANGE HQ',
    worldPos: new THREE.Vector3(0, 46, -24),
    isDistrict: true
  });
}

export function setExchangeNightGlow(nightFactor) {
  if (domeMat) {
    domeMat.emissiveIntensity = 0.22 + nightFactor * 0.95;
  }
  if (towerMat) {
    towerMat.emissiveIntensity = 0.15 + nightFactor * 0.65;
  }
}

export function updateExchangeMonumentAndTicker(viewState) {
  if (exchangeMonumentMat) {
    const mood = viewState.totals.mood;
    if (mood === 'BULLISH') exchangeMonumentMat.color.setHex(0x22a06b);
    else if (mood === 'BEARISH') exchangeMonumentMat.color.setHex(0xd94f52);
    else exchangeMonumentMat.color.setHex(0xd6a84f);
  }

  if (!tickerCtx || !tickerTexture || !viewState.companies.length) return;

  tickerCtx.fillStyle = '#0c141d';
  tickerCtx.fillRect(0, 0, 1024, 96);

  tickerCtx.strokeStyle = '#3b5875';
  tickerCtx.lineWidth = 4;
  tickerCtx.strokeRect(0, 2, 1024, 92);

  const movers = [...viewState.companies]
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 6);

  tickerCtx.font = 'bold 26px "SFMono-Regular", Consolas, monospace';
  tickerCtx.textBaseline = 'middle';

  let xCursor = 24;
  movers.forEach(c => {
    const isPos = c.changePercent >= 0;
    const arrow = isPos ? '▲' : '▼';
    const pctStr = `${arrow}${Math.abs(c.changePercent).toFixed(1)}%`;

    tickerCtx.fillStyle = '#f2f5f7';
    tickerCtx.fillText(c.symbol, xCursor, 48);
    xCursor += tickerCtx.measureText(c.symbol).width + 10;

    tickerCtx.fillStyle = isPos ? '#22a06b' : '#d94f52';
    tickerCtx.fillText(pctStr, xCursor, 48);
    xCursor += tickerCtx.measureText(pctStr).width + 36;
  });

  tickerTexture.needsUpdate = true;
}

export function animateExchangeComplex(dt, reducedMotion) {
  if (reducedMotion) return;
  if (tickerBandMesh) {
    tickerBandMesh.rotation.y += dt * 0.38;
  }
  if (outerGyroRing) {
    outerGyroRing.rotation.y += dt * 0.85;
    outerGyroRing.rotation.x += dt * 0.35;
  }
  if (innerGyroRing) {
    innerGyroRing.rotation.z -= dt * 1.1;
    innerGyroRing.rotation.y -= dt * 0.5;
  }
}