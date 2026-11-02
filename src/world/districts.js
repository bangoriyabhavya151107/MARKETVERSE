/**
 * 10 Sector District Plazas and Border Outlines.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { SECTORS } from '../data/sectors.js';
import { registerWorldLabel } from './labels.js';

export const district3DMap = {};

export function buildSectorDistricts() {
  if (!scene) return;

  SECTORS.forEach(sec => {
    const dGroup = new THREE.Group();
    dGroup.position.set(sec.center.x, 0, sec.center.z);

    const padGeo = new THREE.BoxGeometry(sec.size.w, 0.5, sec.size.d);
    const padMat = new THREE.MeshLambertMaterial({ color: 0x1c2834 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.25;
    pad.receiveShadow = true;
    pad.userData = { type: 'SECTOR', id: sec.id };
    dGroup.add(pad);
    interactiveMeshes.push(pad);

    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(sec.size.w + 0.6, 0.9, sec.size.d + 0.6));
    const borderMat = new THREE.LineBasicMaterial({ color: sec.hex });
    const borderMesh = new THREE.LineSegments(edges, borderMat);
    borderMesh.position.y = 0.55;
    dGroup.add(borderMesh);

    scene.add(dGroup);
    district3DMap[sec.id] = { padMesh: pad, borderMesh, borderMat, baseHex: sec.hex };

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

export function updateSectorDistrictHighlights(selectedObject) {
  SECTORS.forEach(s => {
    const d3d = district3DMap[s.id];
    if (!d3d) return;
    const isSel = selectedObject && selectedObject.type === 'SECTOR' && selectedObject.id === s.id;
    d3d.borderMat.color.setHex(isSel ? 0xffffff : d3d.baseHex);
  });
}