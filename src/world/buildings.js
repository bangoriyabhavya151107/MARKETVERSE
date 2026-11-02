/**
 * 36 Company Buildings — 10 Sector Architectural Languages, Procedural Window Facades,
 * Soft Contact Shadow Decals (AO), Night Emissive Window Glow, Base Mover Sparkline Rings,
 * and Smooth Lerped Scale Transitions.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { getCapTier } from '../engine/finance.js';
import { createContactShadowMesh } from './lighting.js';
import { registerWorldLabel, updateCompanyLabelAnchor } from './labels.js';
import { updateExchangeMonumentAndTicker } from './exchange.js';
import { updateSectorDistrictHighlights } from './districts.js';

export const company3DMap = {};

export function computeBuildingHeight(mcapCr) {
  const clamped = Math.max(1500, Math.min(2500000, mcapCr));
  const norm = (Math.log10(clamped) - 3.17) / (6.4 - 3.17);
  return Number((7.5 + norm * 28.5).toFixed(2));
}

export function computeBuildingWidth(mcapCr, thresholds) {
  const tier = getCapTier(mcapCr, thresholds);
  return tier === 'Large-Cap' ? 7.6 : tier === 'Mid-Cap' ? 6.4 : 5.4;
}

/**
 * Generates both diffuse and emissive window CanvasTextures so windows glow at night.
 */
function createFacadeWindowTextures(sectorHex, litRatio = 0.55, seedOffset = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const emCanvas = document.createElement('canvas');
  emCanvas.width = 128;
  emCanvas.height = 256;
  const emCtx = emCanvas.getContext('2d');

  const baseCol = new THREE.Color(sectorHex).lerp(new THREE.Color(0x1e2c3a), 0.65);
  ctx.fillStyle = '#' + baseCol.getHexString();
  ctx.fillRect(0, 0, 128, 256);

  emCtx.fillStyle = '#000000';
  emCtx.fillRect(0, 0, 128, 256);

  // Subtle vertical bevel mullions
  ctx.fillStyle = 'rgba(10, 16, 24, 0.55)';
  ctx.fillRect(0, 0, 6, 256);
  ctx.fillRect(122, 0, 6, 256);

  const cols = 4;
  const rows = 12;
  const padX = 12;
  const padY = 10;
  const cellW = (128 - padX * 2) / cols;
  const cellH = (256 - padY * 2) / rows;

  let hash = seedOffset * 1337;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      hash = (hash * 16807) % 2147483647;
      const rand = (hash & 0xffff) / 0xffff;
      if (rand < litRatio) {
        const winColor = rand < litRatio * 0.35 ? '#ffe7a3' : '#9ed2ff';
        ctx.fillStyle = winColor;
        emCtx.fillStyle = winColor;
      } else {
        ctx.fillStyle = '#121c26';
        emCtx.fillStyle = '#000000';
      }
      ctx.fillRect(padX + c * cellW + 3, padY + r * cellH + 3, cellW - 6, cellH - 6);
      emCtx.fillRect(padX + c * cellW + 3, padY + r * cellH + 3, cellW - 6, cellH - 6);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const emissiveMap = new THREE.CanvasTexture(emCanvas);
  emissiveMap.wrapS = THREE.RepeatWrapping;
  emissiveMap.wrapT = THREE.RepeatWrapping;

  return { map, emissiveMap };
}

function buildSectorArchitecture(sectorId, bodyMat, accentMat, darkGlassMat) {
  const archGroup = new THREE.Group();
  const roofGroup = new THREE.Group();

  switch (sectorId) {
    case 'TECH': {
      const lower = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.62, 1.0), bodyMat);
      lower.position.y = 0.31;
      lower.castShadow = true;
      archGroup.add(lower);

      const mid = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.26, 0.82), bodyMat);
      mid.position.y = 0.75;
      mid.castShadow = true;
      archGroup.add(mid);

      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.14, 0.64), darkGlassMat);
      upper.position.y = 0.93;
      archGroup.add(upper);

      const spire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 3.2, 6), accentMat);
      spire1.position.set(-0.14, 1.6, -0.14);
      roofGroup.add(spire1);

      const spire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.03, 2.2, 6), accentMat);
      spire2.position.set(0.16, 1.1, 0.14);
      roofGroup.add(spire2);
      break;
    }

    case 'BANKING': {
      const stoneMat = new THREE.MeshLambertMaterial({ color: 0x8fa3b8 });
      const podium = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.2, 1.08), stoneMat);
      podium.position.y = 0.1;
      podium.castShadow = true;
      archGroup.add(podium);

      [-0.48, 0.48].forEach(px => {
        [-0.48, 0.48].forEach(pz => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 8), stoneMat);
          col.position.set(px, 0.11, pz);
          archGroup.add(col);
        });
      });

      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.8, 0.86), bodyMat);
      shaft.position.y = 0.6;
      shaft.castShadow = true;
      archGroup.add(shaft);

      const vaultCrown = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), accentMat);
      vaultCrown.position.y = 0.7;
      roofGroup.add(vaultCrown);
      break;
    }

    case 'ENERGY': {
      const mainHall = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.75), bodyMat);
      mainHall.position.set(0, 0.325, 0.1);
      mainHall.castShadow = true;
      archGroup.add(mainHall);

      const tankMat = new THREE.MeshPhongMaterial({ color: 0xc8d4e0, shininess: 60 });
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.55, 14), tankMat);
      tank.position.set(-0.22, 0.275, -0.26);
      archGroup.add(tank);

      const stack1 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.98, 10), accentMat);
      stack1.position.set(0.24, 0.49, -0.25);
      stack1.castShadow = true;
      archGroup.add(stack1);

      const pylon = new THREE.Mesh(new THREE.ConeGeometry(0.18, 2.4, 4), accentMat);
      pylon.position.set(0, 1.2, 0.1);
      roofGroup.add(pylon);
      break;
    }

    case 'HEALTH': {
      const podium = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.58, 0.22, 18), accentMat);
      podium.position.y = 0.11;
      archGroup.add(podium);

      const wingA = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.78, 0.42), bodyMat);
      wingA.position.y = 0.61;
      wingA.castShadow = true;
      archGroup.add(wingA);

      const wingB = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.78, 0.96), bodyMat);
      wingB.position.y = 0.61;
      wingB.castShadow = true;
      archGroup.add(wingB);

      const crossMat = new THREE.MeshBasicMaterial({ color: 0x3baa91 });
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.14), crossMat);
      c1.position.y = 0.7;
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.42), crossMat);
      c2.position.y = 0.7;
      roofGroup.add(c1, c2);
      break;
    }

    case 'AUTO': {
      const shed = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.48, 1.04), bodyMat);
      shed.position.y = 0.24;
      shed.castShadow = true;
      archGroup.add(shed);

      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.52, 0.54), bodyMat);
      tower.position.set(0.22, 0.74, 0.2);
      tower.castShadow = true;
      archGroup.add(tower);

      for (let i = -1; i <= 1; i++) {
        const prism = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.8, 4), accentMat);
        prism.rotation.y = Math.PI / 4;
        prism.position.set(-0.24, 0.4, i * 0.28);
        roofGroup.add(prism);
      }
      break;
    }

    case 'CONSUMER': {
      const mallBase = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.42, 1.06), bodyMat);
      mallBase.position.y = 0.21;
      mallBase.castShadow = true;
      archGroup.add(mallBase);

      const upperBlock = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.58, 0.82), bodyMat);
      upperBlock.position.y = 0.71;
      upperBlock.castShadow = true;
      archGroup.add(upperBlock);

      const awningMat = new THREE.MeshBasicMaterial({ color: 0xe8875a });
      const awning = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.06, 1.14), awningMat);
      awning.position.y = 0.42;
      archGroup.add(awning);

      const skylight = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        darkGlassMat
      );
      skylight.position.y = 0.5;
      roofGroup.add(skylight);
      break;
    }

    case 'TELECOM': {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.55, 0.92), bodyMat);
      base.position.y = 0.275;
      base.castShadow = true;
      archGroup.add(base);

      const upperCore = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.38, 0.45, 8), bodyMat);
      upperCore.position.y = 0.775;
      archGroup.add(upperCore);

      const mast = new THREE.Mesh(new THREE.ConeGeometry(0.22, 3.4, 4), accentMat);
      mast.position.y = 1.7;
      roofGroup.add(mast);

      const dishRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 6, 16), accentMat);
      dishRing.rotation.x = Math.PI / 2;
      dishRing.position.y = 1.4;
      roofGroup.add(dishRing);
      break;
    }

    case 'INFRA_IND': {
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.88, 0.72), bodyMat);
      block.position.set(-0.08, 0.44, 0.12);
      block.castShadow = true;
      archGroup.add(block);

      const siloMat = new THREE.MeshLambertMaterial({ color: 0x8c9aa8 });
      [-0.22, 0.22].forEach(sx => {
        const silo = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.95, 12), siloMat);
        silo.position.set(sx, 0.475, -0.28);
        archGroup.add(silo);
      });

      const craneMast = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), accentMat);
      craneMast.position.set(0, 1.1, 0);
      const craneJib = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.1, 0.1), accentMat);
      craneJib.position.set(0.25, 2.1, 0);
      roofGroup.add(craneMast, craneJib);
      break;
    }

    case 'MATERIALS': {
      const smelter = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.72, 0.98), bodyMat);
      smelter.position.y = 0.36;
      smelter.castShadow = true;
      archGroup.add(smelter);

      const furnace1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 0.32, 10), accentMat);
      furnace1.position.set(-0.22, 0.84, -0.18);
      const furnace2 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 0.32, 10), accentMat);
      furnace2.position.set(0.22, 0.84, 0.18);
      archGroup.add(furnace1, furnace2);

      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.8, 8), accentMat);
      stack.position.set(-0.22, 0.9, -0.18);
      roofGroup.add(stack);
      break;
    }

    default: {
      const podium = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.24, 1.0), bodyMat);
      podium.position.y = 0.12;
      archGroup.add(podium);

      const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.76, 0.88), bodyMat);
      t1.position.set(-0.24, 0.62, 0);
      t1.castShadow = true;
      archGroup.add(t1);

      const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.62, 0.88), bodyMat);
      t2.position.set(0.24, 0.55, 0);
      t2.castShadow = true;
      archGroup.add(t2);

      const skybridge = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.36), darkGlassMat);
      skybridge.position.set(0, 0.72, 0);
      archGroup.add(skybridge);
      break;
    }
  }

  return { archGroup, roofGroup };
}

export function buildCompanyBuildings(companies) {
  if (!scene) return;

  const plinthMat = new THREE.MeshLambertMaterial({ color: 0x243444 });
  const darkGlassMat = new THREE.MeshPhongMaterial({ color: 0x1a2d40, shininess: 90 });

  companies.forEach((comp, idx) => {
    const sec = SECTOR_MAP[comp.sector];
    const bGroup = new THREE.Group();
    bGroup.position.set(comp.pos.x, 0.5, comp.pos.z);

    const h = computeBuildingHeight(comp.marketCap);
    const width = computeBuildingWidth(comp.marketCap);
    const relVol = comp.volume / Math.max(1, comp.avgDailyVolume);
    const litRatio = Math.max(0.25, Math.min(0.92, 0.45 * relVol));

    // 1. Soft Baked-Looking AO Contact Shadow Decal under Building
    const aoShadowMesh = createContactShadowMesh(width * 1.75, width * 1.75, 0.65);
    aoShadowMesh.position.y = 0.03;
    bGroup.add(aoShadowMesh);

    // 2. Base Plinth
    const plinthGeo = new THREE.BoxGeometry(1.14, 0.6, 1.14);
    plinthGeo.translate(0, 0.3, 0);
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.scale.set(width, 1, width);
    plinthMesh.receiveShadow = true;
    bGroup.add(plinthMesh);

    // 3. Procedural Facade Material (Diffuse + Emissive Window Map for Night Bloom)
    const { map, emissiveMap } = createFacadeWindowTextures(sec.hex, litRatio, idx + 1);
    const bodyMat = new THREE.MeshPhongMaterial({
      map,
      emissive: new THREE.Color(0xffffff),
      emissiveMap,
      emissiveIntensity: 0.18,
      shininess: 48
    });
    const accentMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(sec.hex).lerp(new THREE.Color(0xffffff), 0.18),
      shininess: 55
    });

    const { archGroup, roofGroup } = buildSectorArchitecture(
      comp.sector,
      bodyMat,
      accentMat,
      darkGlassMat
    );
    archGroup.position.y = 0.6;
    archGroup.scale.set(width, h, width);
    bGroup.add(archGroup);

    roofGroup.position.y = h + 0.6;
    roofGroup.scale.set(width, 1, width);
    bGroup.add(roofGroup);

    // 4. Dedicated Raycast Hitbox
    const hitGeo = new THREE.BoxGeometry(1.05, 1, 1.05);
    hitGeo.translate(0, 0.5, 0);
    const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
    hitMesh.scale.set(width, h + 1.2, width);
    hitMesh.userData = { type: 'COMPANY', id: comp.id };
    bGroup.add(hitMesh);
    interactiveMeshes.push(hitMesh);

    // 5. Price-Movement Status Beacon on Roof
    const beaconGeo = new THREE.BoxGeometry(0.76, 0.85, 0.76);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22a06b });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = h + 0.95;
    beaconMesh.scale.set(width, 1, width);
    bGroup.add(beaconMesh);

    // 6. Trading-Activity Base Ring
    const ringGeo = new THREE.RingGeometry(0.62, 0.76, 24);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: sec.hex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.14;
    ringMesh.scale.set(width, 1, width);
    bGroup.add(ringMesh);

    // 7. Selection Outline Wireframe
    const selEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.16, 1, 1.16));
    selEdges.translate(0, 0.5, 0);
    const selMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const selectionBox = new THREE.LineSegments(selEdges, selMat);
    selectionBox.scale.set(width, h + 2.8, width);
    selectionBox.visible = false;
    bGroup.add(selectionBox);

    scene.add(bGroup);

    company3DMap[comp.id] = {
      group: bGroup,
      aoShadowMesh,
      plinthMesh,
      archGroup,
      roofGroup,
      hitMesh,
      bodyMat,
      accentMat,
      beaconMesh,
      beaconMat,
      ringMesh,
      ringMat,
      selectionBox,
      currentWidth: width,
      goalWidth: width,
      currentHeight: h,
      goalHeight: h,
      height: h,
      lastLitBucket: Math.round(litRatio * 10),
      isLargeMover: false,
      idx
    };

    registerWorldLabel({
      id: comp.id,
      type: 'COMPANY',
      text: comp.symbol,
      worldPos: new THREE.Vector3(comp.pos.x, h + 4.8, comp.pos.z),
      isDistrict: false
    });
  });
}

export function setBuildingsNightEmissive(nightFactor) {
  const emIntensity = 0.15 + nightFactor * 0.85;
  Object.values(company3DMap).forEach(b3d => {
    if (b3d.bodyMat) {
      b3d.bodyMat.emissiveIntensity = emIntensity;
    }
  });
}

export function update3DCityFromState(viewState) {
  updateExchangeMonumentAndTicker(viewState);
  updateSectorDistrictHighlights(viewState);

  viewState.companies.forEach(c => {
    const b3d = company3DMap[c.id];
    if (!b3d) return;

    b3d.goalHeight = computeBuildingHeight(c.marketCap);
    b3d.goalWidth = computeBuildingWidth(c.marketCap, viewState.mcapThresholds);
    b3d.isLargeMover = Math.abs(c.changePercent) >= 1.2;

    if (viewState.reducedMotion) {
      b3d.currentHeight = b3d.goalHeight;
      b3d.currentWidth = b3d.goalWidth;
    }

    const relVol = c.volume / Math.max(1, c.avgDailyVolume);
    const litRatio = Math.max(0.25, Math.min(0.95, 0.45 * relVol));
    const bucket = Math.round(litRatio * 10);
    if (bucket !== b3d.lastLitBucket) {
      b3d.lastLitBucket = bucket;
      const sec = SECTOR_MAP[c.sector];
      const { map, emissiveMap } = createFacadeWindowTextures(sec.hex, litRatio, b3d.idx + bucket);
      if (b3d.bodyMat.map) b3d.bodyMat.map.dispose();
      if (b3d.bodyMat.emissiveMap) b3d.bodyMat.emissiveMap.dispose();
      b3d.bodyMat.map = map;
      b3d.bodyMat.emissiveMap = emissiveMap;
      b3d.bodyMat.needsUpdate = true;
    }

    if (viewState.dataMode === 'REAL_DATA') {
      b3d.beaconMat.color.setHex(0xd6a84f);
    } else if (c.changePercent > 0.03) {
      b3d.beaconMat.color.setHex(0x22a06b);
    } else if (c.changePercent < -0.03) {
      b3d.beaconMat.color.setHex(0xd94f52);
    } else {
      b3d.beaconMat.color.setHex(0xd6a84f);
    }

    if (b3d.isLargeMover) {
      b3d.ringMat.color.setHex(c.changePercent >= 0 ? 0x22a06b : 0xd94f52);
      b3d.ringMat.opacity = 0.92;
    } else {
      b3d.ringMat.color.setHex(SECTOR_MAP[c.sector].hex);
      b3d.ringMat.opacity = 0.52;
    }

    const isSelected =
      viewState.selectedObject && viewState.selectedObject.type === 'COMPANY' && viewState.selectedObject.id === c.id;
    const isCompared = viewState.activeNavView === 'compare' && viewState.compareIds.includes(c.id);
    const isInSelectedSector =
      viewState.selectedObject && viewState.selectedObject.type === 'SECTOR' && viewState.selectedObject.id === c.sector;
    const matchesExchange = viewState.exchangeFilter === 'ALL' || c.exchange === viewState.exchangeFilter;

    b3d.selectionBox.visible = Boolean(isSelected || isCompared || isInSelectedSector);
    b3d.bodyMat.opacity = matchesExchange ? 1.0 : 0.25;
    b3d.bodyMat.transparent = !matchesExchange;
    b3d.accentMat.opacity = matchesExchange ? 1.0 : 0.25;
    b3d.accentMat.transparent = !matchesExchange;

    updateCompanyLabelAnchor(
      c,
      b3d.currentHeight,
      isSelected || isCompared,
      viewState.labelsVisible && matchesExchange
    );
  });
}

export function updateBuildingPulses(liveCompanies, dt, viewState) {
  const lerpSpeed = Math.min(1, dt * 6.5);

  liveCompanies.forEach(c => {
    const b3d = company3DMap[c.id];
    if (!b3d) return;

    const dh = Math.abs(b3d.goalHeight - b3d.currentHeight);
    const dw = Math.abs(b3d.goalWidth - b3d.currentWidth);
    if (dh > 0.01 || dw > 0.01) {
      b3d.currentHeight += (b3d.goalHeight - b3d.currentHeight) * lerpSpeed;
      b3d.currentWidth += (b3d.goalWidth - b3d.currentWidth) * lerpSpeed;
      b3d.height = b3d.currentHeight;

      const w = b3d.currentWidth;
      const h = b3d.currentHeight;

      b3d.aoShadowMesh.scale.set(w * 1.75, 1, w * 1.75);
      b3d.plinthMesh.scale.set(w, 1, w);
      b3d.archGroup.scale.set(w, h, w);
      b3d.roofGroup.position.y = h + 0.6;
      b3d.roofGroup.scale.set(w, 1, w);
      b3d.hitMesh.scale.set(w, h + 1.2, w);
      b3d.beaconMesh.position.y = h + 0.95;
      b3d.beaconMesh.scale.set(w, 1, w);
      b3d.ringMesh.scale.set(w, 1, w);
      b3d.selectionBox.scale.set(w, h + 2.8, w);

      if (viewState) {
        const isSelected =
          viewState.selectedObject && viewState.selectedObject.type === 'COMPANY' && viewState.selectedObject.id === c.id;
        const isCompared = viewState.activeNavView === 'compare' && viewState.compareIds.includes(c.id);
        const matchesExchange = viewState.exchangeFilter === 'ALL' || c.exchange === viewState.exchangeFilter;
        updateCompanyLabelAnchor(c, h, isSelected || isCompared, viewState.labelsVisible && matchesExchange);
      }
    }

    const w = b3d.currentWidth;
    if (c.pulseIntensity > 0) {
      c.pulseIntensity = Math.max(0, c.pulseIntensity - dt * 1.8);
      const s = 1 + c.pulseIntensity * 0.22;
      b3d.beaconMesh.scale.set(w * s, 1 + c.pulseIntensity * 0.55, w * s);
    } else {
      b3d.beaconMesh.scale.set(w, 1, w);
    }

    if (b3d.isLargeMover) {
      const pulseScale = 1 + Math.sin(performance.now() * 0.006) * 0.08;
      b3d.ringMesh.scale.set(w * pulseScale, 1, w * pulseScale);
    }
  });
}