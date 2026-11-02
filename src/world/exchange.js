/**
 * Central Stock Exchange Complex (NSE / BSE Anchor) at city center.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { registerWorldLabel } from './labels.js';

export let exchangeMonumentMat = null;

export function buildCentralExchangeComplex() {
  if (!scene) return;

  const exGroup = new THREE.Group();
  exGroup.position.set(0, 0, -24);

  const plazaGeo = new THREE.BoxGeometry(68, 0.6, 50);
  const plazaMat = new THREE.MeshLambertMaterial({ color: 0x22313f });
  const plaza = new THREE.Mesh(plazaGeo, plazaMat);
  plaza.position.y = 0.3;
  plaza.receiveShadow = true;
  exGroup.add(plaza);

  const podiumGeo = new THREE.CylinderGeometry(14, 15.5, 6, 24);
  const podiumMat = new THREE.MeshPhongMaterial({ color: 0x2f4356, shininess: 40 });
  const podium = new THREE.Mesh(podiumGeo, podiumMat);
  podium.position.set(0, 3.6, 0);
  podium.castShadow = true;
  exGroup.add(podium);

  const towerGeo = new THREE.CylinderGeometry(9.5, 11, 30, 16);
  const towerMat = new THREE.MeshPhongMaterial({ color: 0x3b5875, shininess: 70 });
  const mainTower = new THREE.Mesh(towerGeo, towerMat);
  mainTower.position.set(0, 21, 0);
  mainTower.castShadow = true;
  exGroup.add(mainTower);

  const ringGeo = new THREE.CylinderGeometry(10.4, 10.4, 2.6, 24);
  exchangeMonumentMat = new THREE.MeshBasicMaterial({ color: 0x22a06b });
  const ringMesh = new THREE.Mesh(ringGeo, exchangeMonumentMat);
  ringMesh.position.set(0, 34, 0);
  exGroup.add(ringMesh);

  const spire = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0x9ec5ff })
  );
  spire.position.set(0, 41, 0);
  exGroup.add(spire);

  const wingSpecs = [
    { x: -18, z: -10 },
    { x: 18, z: -10 },
    { x: -18, z: 10 },
    { x: 18, z: 10 }
  ];
  const wingMat = new THREE.MeshLambertMaterial({ color: 0x2b3e50 });
  wingSpecs.forEach(w => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(10, 12, 10), wingMat);
    wing.position.set(w.x, 6.6, w.z);
    wing.castShadow = true;
    exGroup.add(wing);
  });

  const hitGeo = new THREE.BoxGeometry(52, 42, 38);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.set(0, 21, 0);
  hitMesh.userData = { type: 'EXCHANGE', id: 'CENTRAL_EXCHANGE', name: 'Central Stock Exchange Complex (NSE / BSE Anchor)' };
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

export function updateExchangeMonumentMood(mood) {
  if (!exchangeMonumentMat) return;
  if (mood === 'BULLISH') exchangeMonumentMat.color.setHex(0x22a06b);
  else if (mood === 'BEARISH') exchangeMonumentMat.color.setHex(0xd94f52);
  else exchangeMonumentMat.color.setHex(0xd6a84f);
}