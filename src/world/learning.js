/**
 * 6 Investor Learning District Landmarks — Physical 3D Demonstrations.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { LEARNING_LANDMARKS } from '../data/landmarks.js';
import { registerWorldLabel } from './labels.js';

let pvvPriceBar = null;
let pvvVolumeBar = null;
let riskSwaySpire = null;
let indexBasketGroup = null;

export function buildLearningDistrict() {
  if (!scene) return;

  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(86, 0.5, 30),
    new THREE.MeshLambertMaterial({ color: 0x1e2c3a })
  );
  pad.position.set(0, 0.25, 48);
  pad.receiveShadow = true;
  scene.add(pad);

  const pedMat = new THREE.MeshLambertMaterial({ color: 0x2c3e50 });

  LEARNING_LANDMARKS.forEach(lm => {
    const g = new THREE.Group();
    g.position.set(lm.pos.x, 0.5, lm.pos.z);

    // Base Pedestal
    const ped = new THREE.Mesh(new THREE.BoxGeometry(9.5, 1.4, 9.5), pedMat);
    ped.position.y = 0.7;
    ped.receiveShadow = true;
    g.add(ped);

    if (lm.id === 'LEARN_MCAP') {
      // 1. Market-Cap Monument: Two towers comparing ₹400 × 500 Cr sh (Tall/Wide) vs ₹4,000 × 10 Cr sh (Short/Thin)
      const towerLarge = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 9.5, 3.2),
        new THREE.MeshPhongMaterial({ color: 0x4b8be8, shininess: 65 })
      );
      towerLarge.position.set(-2.0, 1.4 + 4.75, 0);
      towerLarge.castShadow = true;
      g.add(towerLarge);

      const towerSmall = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 3.6, 1.5),
        new THREE.MeshPhongMaterial({ color: 0xd6a84f, shininess: 65 })
      );
      towerSmall.position.set(2.2, 1.4 + 1.8, 0);
      towerSmall.castShadow = true;
      g.add(towerSmall);
    } else if (lm.id === 'LEARN_PVV') {
      // 2. Price vs Volume Demonstration: Paired animated Price bar & Volume bar
      const pGeo = new THREE.BoxGeometry(2.2, 1, 2.2);
      pGeo.translate(0, 0.5, 0);
      pvvPriceBar = new THREE.Mesh(
        pGeo,
        new THREE.MeshPhongMaterial({ color: 0x3baa91, shininess: 60 })
      );
      pvvPriceBar.position.set(-1.8, 1.4, 0);
      pvvPriceBar.scale.y = 6.5;
      g.add(pvvPriceBar);

      const vGeo = new THREE.CylinderGeometry(1.2, 1.2, 1, 16);
      vGeo.translate(0, 0.5, 0);
      pvvVolumeBar = new THREE.Mesh(
        vGeo,
        new THREE.MeshPhongMaterial({ color: 0x4b8be8, shininess: 60 })
      );
      pvvVolumeBar.position.set(1.8, 1.4, 0);
      pvvVolumeBar.scale.y = 5.0;
      g.add(pvvVolumeBar);
    } else if (lm.id === 'LEARN_BULLBEAR') {
      // 3. Bull vs Bear Sculpture: Charging emerald Bull vs downward-angled crimson Bear
      const bullGroup = new THREE.Group();
      bullGroup.position.set(-2.1, 2.6, 0);
      const bullBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 1.6, 1.5),
        new THREE.MeshPhongMaterial({ color: 0x22a06b, shininess: 75 })
      );
      bullBody.rotation.z = 0.28; // Charging upward
      const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.2, 5), new THREE.MeshBasicMaterial({ color: 0xffe7a3 }));
      hornL.position.set(1.3, 1.1, 0.45);
      hornL.rotation.z = -0.5;
      const hornR = hornL.clone();
      hornR.position.z = -0.45;
      bullGroup.add(bullBody, hornL, hornR);
      g.add(bullGroup);

      const bearGroup = new THREE.Group();
      bearGroup.position.set(2.1, 2.6, 0);
      const bearBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 1.8, 1.7),
        new THREE.MeshPhongMaterial({ color: 0xd94f52, shininess: 75 })
      );
      bearBody.rotation.z = -0.25; // Pressing downward
      bearGroup.add(bearBody);
      g.add(bearGroup);
    } else if (lm.id === 'LEARN_DIVERSIFY') {
      // 4. Diversified Portfolio Garden: Multi-species colorful grove vs uniform monoculture patch
      const colors = [0x22a06b, 0x4b8be8, 0xd6a84f, 0xb58ae0];
      colors.forEach((col, i) => {
        const crown = new THREE.Mesh(
          new THREE.SphereGeometry(1.1, 10, 8),
          new THREE.MeshLambertMaterial({ color: col })
        );
        crown.position.set(-2.2 + (i % 2) * 1.6, 3.2 + (i % 2) * 0.6, -1.2 + Math.floor(i / 2) * 2.2);
        g.add(crown);
      });

      // Uniform monoculture patch on right side
      for (let i = 0; i < 3; i++) {
        const mono = new THREE.Mesh(
          new THREE.ConeGeometry(0.75, 2.2, 5),
          new THREE.MeshLambertMaterial({ color: 0x768696 })
        );
        mono.position.set(2.2, 2.5, -1.8 + i * 1.8);
        g.add(mono);
      }
    } else if (lm.id === 'LEARN_RISK') {
      // 5. Risk-and-Return Observation Tower: Tall needle with wind-swaying upper section
      const lowerBase = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.8, 4.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b5875 })
      );
      lowerBase.position.y = 3.65;
      g.add(lowerBase);

      riskSwaySpire = new THREE.Group();
      riskSwaySpire.position.set(0, 5.8, 0);

      const upperShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 1.0, 7.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xd94f52, shininess: 80 })
      );
      upperShaft.position.y = 3.75;
      riskSwaySpire.add(upperShaft);

      const obsDeck = new THREE.Mesh(
        new THREE.CylinderGeometry(1.9, 1.9, 0.6, 16),
        new THREE.MeshBasicMaterial({ color: 0xffd27d })
      );
      obsDeck.position.y = 6.2;
      riskSwaySpire.add(obsDeck);

      g.add(riskSwaySpire);
    } else if (lm.id === 'LEARN_INDEX') {
      // 6. Market-Index Information Plaza: Rotating ring carrying a basket of 6 mini-buildings
      indexBasketGroup = new THREE.Group();
      indexBasketGroup.position.y = 1.6;

      const ringPlate = new THREE.Mesh(
        new THREE.CylinderGeometry(3.8, 4.0, 0.4, 24),
        new THREE.MeshPhongMaterial({ color: 0xb58ae0 })
      );
      indexBasketGroup.add(ringPlate);

      const miniColors = [0x3baa91, 0x4b8be8, 0xd6a84f, 0xe8875a, 0xd9789b, 0x5ec2d6];
      const miniHeights = [4.8, 4.2, 3.5, 2.8, 2.4, 3.2];
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        const mh = miniHeights[i];
        const miniTower = new THREE.Mesh(
          new THREE.BoxGeometry(1.1, mh, 1.1),
          new THREE.MeshPhongMaterial({ color: miniColors[i] })
        );
        miniTower.position.set(Math.cos(ang) * 2.4, mh / 2 + 0.2, Math.sin(ang) * 2.4);
        indexBasketGroup.add(miniTower);
      }

      g.add(indexBasketGroup);
    }

    // Generous Hitbox
    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(10.5, 14, 10.5),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.y = 7;
    hit.userData = { type: 'LEARN', id: lm.id };
    g.add(hit);
    interactiveMeshes.push(hit);

    scene.add(g);

    registerWorldLabel({
      id: lm.id,
      type: 'LEARN',
      text: '🎓 ' + lm.short,
      worldPos: new THREE.Vector3(lm.pos.x, 12.2, lm.pos.z),
      isDistrict: false
    });
  });
}

export function animateLearningLandmarks(nowSec, dt, reducedMotion) {
  if (reducedMotion) return;

  if (pvvPriceBar && pvvVolumeBar) {
    pvvPriceBar.scale.y = 5.5 + Math.sin(nowSec * 1.9) * 2.2;
    pvvVolumeBar.scale.y = 4.8 + Math.cos(nowSec * 2.7) * 2.4;
  }

  if (riskSwaySpire) {
    riskSwaySpire.rotation.z = Math.sin(nowSec * 1.6) * 0.09;
    riskSwaySpire.rotation.x = Math.cos(nowSec * 1.2) * 0.06;
  }

  if (indexBasketGroup) {
    indexBasketGroup.rotation.y += dt * 0.55;
  }
}