/**
 * 36 Company Buildings — height scaled by Market Cap, roof beacons by price movement,
 * selection wireframes, and pulse animation decay.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { getCapTier } from '../engine/finance.js';
import { registerWorldLabel, updateCompanyLabelAnchor } from './labels.js';
import { updateExchangeMonumentMood } from './exchange.js';
import { updateSectorDistrictHighlights } from './districts.js';

export const company3DMap = {};

export function computeBuildingHeight(mcapCr) {
  const clamped = Math.max(1500, Math.min(2500000, mcapCr));
  const norm = (Math.log10(clamped) - 3.17) / (6.4 - 3.17);
  return Number((7.5 + norm * 28.5).toFixed(2));
}

export function buildCompanyBuildings(companies) {
  if (!scene) return;

  companies.forEach((comp, idx) => {
    const sec = SECTOR_MAP[comp.sector];
    const bGroup = new THREE.Group();
    bGroup.position.set(comp.pos.x, 0.5, comp.pos.z);

    const h = computeBuildingHeight(comp.marketCap);
    const tier = getCapTier(comp.marketCap);
    const width = tier === 'Large-Cap' ? 7.6 : tier === 'Mid-Cap' ? 6.4 : 5.4;

    const bodyGeo = new THREE.BoxGeometry(width, 1, width);
    bodyGeo.translate(0, 0.5, 0);
    const baseColor = new THREE.Color(sec.hex).lerp(new THREE.Color(0x2a3b4c), 0.58);
    const bodyMat = new THREE.MeshPhongMaterial({ color: baseColor, shininess: 35 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.scale.y = h;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bodyMesh.userData = { type: 'COMPANY', id: comp.id };
    bGroup.add(bodyMesh);
    interactiveMeshes.push(bodyMesh);

    let crownMesh = null;
    if (tier === 'Large-Cap') {
      const cGeo = new THREE.BoxGeometry(width * 0.68, 2.6, width * 0.68);
      crownMesh = new THREE.Mesh(cGeo, bodyMat);
      crownMesh.position.y = h + 1.3;
      bGroup.add(crownMesh);
    } else if (idx % 2 === 0) {
      const cGeo = new THREE.CylinderGeometry(width * 0.35, width * 0.45, 1.8, 8);
      crownMesh = new THREE.Mesh(cGeo, bodyMat);
      crownMesh.position.y = h + 0.9;
      bGroup.add(crownMesh);
    }

    const beaconGeo = new THREE.BoxGeometry(width * 0.82, 0.9, width * 0.82);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22a06b });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = h + 0.5;
    bGroup.add(beaconMesh);

    const ringGeo = new THREE.RingGeometry(width * 0.62, width * 0.76, 20);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: sec.hex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.12;
    bGroup.add(ringMesh);

    const selEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(width + 1.0, 1, width + 1.0));
    selEdges.translate(0, 0.5, 0);
    const selMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const selectionBox = new THREE.LineSegments(selEdges, selMat);
    selectionBox.scale.y = h + 2.5;
    selectionBox.visible = false;
    bGroup.add(selectionBox);

    scene.add(bGroup);

    company3DMap[comp.id] = {
      group: bGroup,
      bodyMesh,
      crownMesh,
      beaconMesh,
      beaconMat,
      ringMesh,
      ringMat,
      selectionBox,
      width,
      height: h
    };

    registerWorldLabel({
      id: comp.id,
      type: 'COMPANY',
      text: comp.symbol,
      worldPos: new THREE.Vector3(comp.pos.x, h + 4.2, comp.pos.z),
      isDistrict: false
    });
  });
}

export function update3DCityFromState(viewState) {
  updateExchangeMonumentMood(viewState.totals.mood);
  updateSectorDistrictHighlights(viewState.selectedObject);

  viewState.companies.forEach(c => {
    const b3d = company3DMap[c.id];
    if (!b3d) return;

    const newH = computeBuildingHeight(c.marketCap);
    b3d.height = newH;
    b3d.bodyMesh.scale.y = newH;
    b3d.beaconMesh.position.y = newH + 0.5;
    if (b3d.crownMesh) b3d.crownMesh.position.y = newH + 1.1;
    b3d.selectionBox.scale.y = newH + 2.5;

    if (viewState.dataMode === 'REAL_DATA') {
      b3d.beaconMat.color.setHex(0xd6a84f);
    } else if (c.changePercent > 0.03) {
      b3d.beaconMat.color.setHex(0x22a06b);
    } else if (c.changePercent < -0.03) {
      b3d.beaconMat.color.setHex(0xd94f52);
    } else {
      b3d.beaconMat.color.setHex(0xd6a84f);
    }

    const isSelected =
      viewState.selectedObject && viewState.selectedObject.type === 'COMPANY' && viewState.selectedObject.id === c.id;
    const isCompared = viewState.activeNavView === 'compare' && viewState.compareIds.includes(c.id);
    const isInSelectedSector =
      viewState.selectedObject && viewState.selectedObject.type === 'SECTOR' && viewState.selectedObject.id === c.sector;
    const matchesExchange = viewState.exchangeFilter === 'ALL' || c.exchange === viewState.exchangeFilter;

    b3d.selectionBox.visible = Boolean(isSelected || isCompared || isInSelectedSector);
    b3d.bodyMesh.material.opacity = matchesExchange ? 1.0 : 0.25;
    b3d.bodyMesh.material.transparent = !matchesExchange;

    updateCompanyLabelAnchor(c, newH, isSelected || isCompared, viewState.labelsVisible && matchesExchange);
  });
}

export function updateBuildingPulses(liveCompanies, dt) {
  liveCompanies.forEach(c => {
    const b3d = company3DMap[c.id];
    if (!b3d) return;
    if (c.pulseIntensity > 0) {
      c.pulseIntensity = Math.max(0, c.pulseIntensity - dt * 1.8);
      const s = 1 + c.pulseIntensity * 0.25;
      b3d.beaconMesh.scale.set(s, 1 + c.pulseIntensity * 0.6, s);
    } else {
      b3d.beaconMesh.scale.set(1, 1, 1);
    }
  });
}