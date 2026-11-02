/**
 * 7 Market Infrastructure Facilities at the southern end of the city.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { registerWorldLabel } from './labels.js';

export function buildInfrastructureDistrict() {
  if (!scene) return;

  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(105, 0.5, 34),
    new THREE.MeshLambertMaterial({ color: 0x1b2733 })
  );
  pad.position.set(0, 0.25, 88);
  scene.add(pad);

  INFRA_FACILITIES.forEach(fac => {
    const g = new THREE.Group();
    g.position.set(fac.pos.x, 0.5, fac.pos.z);

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(fac.size.w, fac.size.h, fac.size.d),
      new THREE.MeshPhongMaterial({ color: fac.color, shininess: 45 })
    );
    mesh.position.y = fac.size.h / 2;
    mesh.castShadow = true;
    mesh.userData = { type: 'INFRA', id: fac.id };
    g.add(mesh);
    interactiveMeshes.push(mesh);

    const dish = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.4, 1.5, 12),
      new THREE.MeshBasicMaterial({ color: 0xe2eef8 })
    );
    dish.position.y = fac.size.h + 0.8;
    g.add(dish);

    scene.add(g);

    registerWorldLabel({
      id: fac.id,
      type: 'INFRA',
      text: '⚙️ ' + fac.short,
      worldPos: new THREE.Vector3(fac.pos.x, fac.size.h + 3.2, fac.pos.z),
      isDistrict: false
    });
  });
}