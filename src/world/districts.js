/**
 * 10 Sector District Plazas, 3D Entrance Gates with Glowing Signage,
 * and Live Sector-Performance Heatmap Mode.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { SECTORS } from '../data/sectors.js';
import { getSectorStats } from '../engine/finance.js';
import { registerWorldLabel } from './labels.js';

export const district3DMap = {};

function createGateSignTexture(text, accentColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f1720';
  ctx.fillRect(0, 0, 512, 96);

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 504, 88);

  ctx.fillStyle = '#f2f5f7';
  ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.toUpperCase(), 256, 48);

  return new THREE.CanvasTexture(canvas);
}

function createDistrictPavingTexture(hexColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1b2733';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#' + new THREE.Color(hexColor).getHexString();
  ctx.globalAlpha = 0.16;
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 6, 116, 116);

  ctx.globalAlpha = 0.07;
  for (let i = 32; i < 128; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

export function buildSectorDistricts() {
  if (!scene) return;

  const pillarMat = new THREE.MeshLambertMaterial({ color: 0x263646 });

  SECTORS.forEach(sec => {
    const dGroup = new THREE.Group();
    dGroup.position.set(sec.center.x, 0, sec.center.z);

    // 1. Textured District Plaza Pad + Curb
    const curbGeo = new THREE.BoxGeometry(sec.size.w + 1.2, 0.36, sec.size.d + 1.2);
    const curbMat = new THREE.MeshLambertMaterial({ color: 0x283848 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.y = 0.18;
    curb.receiveShadow = true;
    dGroup.add(curb);

    const pavTex = createDistrictPavingTexture(sec.hex);
    const padGeo = new THREE.BoxGeometry(sec.size.w, 0.52, sec.size.d);
    const padMat = new THREE.MeshLambertMaterial({
      map: pavTex,
      color: 0xffffff
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.26;
    pad.receiveShadow = true;
    pad.userData = { type: 'SECTOR', id: sec.id };
    dGroup.add(pad);
    interactiveMeshes.push(pad);

    // 2. Colored District Border Frame
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(sec.size.w + 0.8, 0.95, sec.size.d + 0.8));
    const borderMat = new THREE.LineBasicMaterial({ color: sec.hex });
    const borderMesh = new THREE.LineSegments(edges, borderMat);
    borderMesh.position.y = 0.56;
    dGroup.add(borderMesh);

    // 3. District Entrance Gate with Glowing Name Sign (at avenue-facing edge)
    const gateGroup = new THREE.Group();
    const gateZ = sec.size.d / 2 - 0.6;
    gateGroup.position.set(0, 0.5, gateZ);

    const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 6.2, 0.9), pillarMat);
    leftPillar.position.set(-5.2, 3.1, 0);
    leftPillar.castShadow = true;
    gateGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 6.2, 0.9), pillarMat);
    rightPillar.position.set(5.2, 3.1, 0);
    rightPillar.castShadow = true;
    gateGroup.add(rightPillar);

    const signTex = createGateSignTexture(sec.short, sec.color);
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(11.6, 1.7, 0.6),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signBoard.position.set(0, 5.8, 0);
    gateGroup.add(signBoard);

    dGroup.add(gateGroup);
    scene.add(dGroup);

    district3DMap[sec.id] = {
      padMesh: pad,
      padMat,
      borderMesh,
      borderMat,
      baseHex: sec.hex
    };

    registerWorldLabel({
      id: sec.id,
      type: 'SECTOR',
      text: sec.short,
      worldPos: new THREE.Vector3(sec.center.x, 2.5, sec.center.z - sec.size.d / 2 + 2),
      isDistrict: true,
      borderColor: sec.color
    });
  });
}

const neutralColor = new THREE.Color(0xffffff);
const posHeatColor = new THREE.Color(0x1f9d68);
const negHeatColor = new THREE.Color(0xd64548);
const flatHeatColor = new THREE.Color(0x526476);

export function updateSectorDistrictHighlights(viewState) {
  const { selectedObject, heatmapMode } = viewState;

  SECTORS.forEach(s => {
    const d3d = district3DMap[s.id];
    if (!d3d) return;

    const isSel = selectedObject && selectedObject.type === 'SECTOR' && selectedObject.id === s.id;
    d3d.borderMat.color.setHex(isSel ? 0xffffff : d3d.baseHex);

    if (heatmapMode && viewState.dataMode === 'SIMULATION') {
      const stats = getSectorStats(s.id, viewState);
      const pct = stats.capWeightedChangePct;
      const intensity = Math.min(1, Math.abs(pct) / 2.2);
      if (pct > 0.05) {
        d3d.padMat.color.copy(flatHeatColor).lerp(posHeatColor, intensity);
      } else if (pct < -0.05) {
        d3d.padMat.color.copy(flatHeatColor).lerp(negHeatColor, intensity);
      } else {
        d3d.padMat.color.copy(flatHeatColor);
      }
    } else {
      d3d.padMat.color.copy(neutralColor);
    }
  });
}