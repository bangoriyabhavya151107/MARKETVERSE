/**
 * 6 Investor Learning District Landmarks between Exchange and Infrastructure.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { LEARNING_LANDMARKS } from '../data/landmarks.js';
import { registerWorldLabel } from './labels.js';

export function buildLearningDistrict() {
  if (!scene) return;

  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(84, 0.5, 28),
    new THREE.MeshLambertMaterial({ color: 0x1e2c3a })
  );
  pad.position.set(0, 0.25, 48);
  scene.add(pad);

  LEARNING_LANDMARKS.forEach(lm => {
    const g = new THREE.Group();
    g.position.set(lm.pos.x, 0.5, lm.pos.z);

    const ped = new THREE.Mesh(
      new THREE.BoxGeometry(8, 2, 8),
      new THREE.MeshLambertMaterial({ color: 0x2c3e50 })
    );
    ped.position.y = 1;
    g.add(ped);

    const monGeo = new THREE.OctahedronGeometry(3.4, 0);
    const monMat = new THREE.MeshPhongMaterial({ color: lm.color, shininess: 80 });
    const mon = new THREE.Mesh(monGeo, monMat);
    mon.position.y = 5.5;
    mon.castShadow = true;
    g.add(mon);

    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(10, 12, 10),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.y = 6;
    hit.userData = { type: 'LEARN', id: lm.id };
    g.add(hit);
    interactiveMeshes.push(hit);

    scene.add(g);

    registerWorldLabel({
      id: lm.id,
      type: 'LEARN',
      text: '🎓 ' + lm.short,
      worldPos: new THREE.Vector3(lm.pos.x, 10.5, lm.pos.z),
      isDistrict: false
    });
  });
}