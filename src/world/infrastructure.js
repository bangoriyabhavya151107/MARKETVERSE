/**
 * 7 Market Infrastructure Facilities with Unique Recognizable Architectural Silhouettes.
 */
import * as THREE from 'three';
import { scene, interactiveMeshes } from './scene.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { registerWorldLabel } from './labels.js';

let riskRadarBar = null;

export function buildInfrastructureDistrict() {
  if (!scene) return;

  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(108, 0.5, 36),
    new THREE.MeshLambertMaterial({ color: 0x1b2733 })
  );
  pad.position.set(0, 0.25, 88);
  pad.receiveShadow = true;
  scene.add(pad);

  const brightMat = new THREE.MeshBasicMaterial({ color: 0xe2eef8 });
  const darkMetalMat = new THREE.MeshPhongMaterial({ color: 0x22303d, shininess: 60 });

  INFRA_FACILITIES.forEach(fac => {
    const g = new THREE.Group();
    g.position.set(fac.pos.x, 0.5, fac.pos.z);

    const mainMat = new THREE.MeshPhongMaterial({ color: fac.color, shininess: 48 });

    if (fac.id === 'INFRA_DATA') {
      // 1. Market-Data Broadcast Center: Stepped facility + 3 parabolic satellite dishes
      const base = new THREE.Mesh(new THREE.BoxGeometry(11, 9, 11), mainMat);
      base.position.y = 4.5;
      base.castShadow = true;
      g.add(base);

      [-3.0, 0, 3.0].forEach((dx, i) => {
        const dish = new THREE.Mesh(
          new THREE.SphereGeometry(1.7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2.2),
          brightMat
        );
        dish.rotation.x = Math.PI - 0.45;
        dish.rotation.z = (i - 1) * 0.3;
        dish.position.set(dx, 10.5, (i % 2 === 0 ? -1.5 : 1.5));
        g.add(dish);
      });
    } else if (fac.id === 'INFRA_CLEARING') {
      // 2. Clearing Corp (CCP): Server hall with glowing vertical server rack columns
      const core = new THREE.Mesh(new THREE.BoxGeometry(11.5, 13, 10.5), darkMetalMat);
      core.position.y = 6.5;
      core.castShadow = true;
      g.add(core);

      const rackMat = new THREE.MeshBasicMaterial({ color: 0x3baa91 });
      for (let rx = -4; rx <= 4; rx += 2) {
        const rack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 11, 11.0), rackMat);
        rack.position.set(rx, 6.5, 0);
        g.add(rack);
      }
    } else if (fac.id === 'INFRA_DEPOSITORY') {
      // 3. Central Securities Depository: Fortified bullion vault block + circular vault door
      const vault = new THREE.Mesh(new THREE.BoxGeometry(12, 14, 11), mainMat);
      vault.position.y = 7.0;
      vault.castShadow = true;
      g.add(vault);

      const doorRing = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.8, 20), darkMetalMat);
      doorRing.rotation.x = Math.PI / 2;
      doorRing.position.set(0, 7.0, -5.5);
      g.add(doorRing);

      const doorCore = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 1.0, 16), brightMat);
      doorCore.rotation.x = Math.PI / 2;
      doorCore.position.set(0, 7.0, -5.6);
      g.add(doorCore);
    } else if (fac.id === 'INFRA_BROKERAGE') {
      // 4. Brokerage Hub: Multi-tier concourse with ribbon windows
      for (let tier = 0; tier < 3; tier++) {
        const w = 11 - tier * 1.8;
        const block = new THREE.Mesh(new THREE.BoxGeometry(w, 4.2, w), mainMat);
        block.position.y = 2.1 + tier * 4.2;
        block.castShadow = true;
        g.add(block);
      }
    } else if (fac.id === 'INFRA_RISK') {
      // 5. Risk Surveillance: Base + Octagonal Watchtower + Rotating Radar Bar
      const base = new THREE.Mesh(new THREE.BoxGeometry(11, 7, 11), darkMetalMat);
      base.position.y = 3.5;
      g.add(base);

      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 3.4, 9, 8), mainMat);
      shaft.position.y = 11.5;
      shaft.castShadow = true;
      g.add(shaft);

      riskRadarBar = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.6, 0.9), brightMat);
      riskRadarBar.position.y = 16.8;
      g.add(riskRadarBar);
    } else if (fac.id === 'INFRA_NEWS') {
      // 6. Disclosures & News Hub: Media press building + wrap-around ticker band + broadcast mast
      const press = new THREE.Mesh(new THREE.BoxGeometry(10, 11, 10), mainMat);
      press.position.y = 5.5;
      press.castShadow = true;
      g.add(press);

      const ribbon = new THREE.Mesh(
        new THREE.BoxGeometry(10.6, 1.6, 10.6),
        new THREE.MeshBasicMaterial({ color: 0xffd27d })
      );
      ribbon.position.y = 7.5;
      g.add(ribbon);

      const mast = new THREE.Mesh(new THREE.ConeGeometry(0.8, 5, 4), brightMat);
      mast.position.y = 13.5;
      g.add(mast);
    } else {
      // 7. Investor-Information Center: Civic pavilion with colonnade & domed skylight
      const pav = new THREE.Mesh(new THREE.BoxGeometry(14, 7.5, 9), mainMat);
      pav.position.y = 3.75;
      pav.castShadow = true;
      g.add(pav);

      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(3.6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2),
        brightMat
      );
      dome.position.y = 7.5;
      g.add(dome);
    }

    // Generous Hitbox for Raycaster
    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(fac.size.w + 2, fac.size.h + 5, fac.size.d + 2),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.y = (fac.size.h + 5) / 2;
    hit.userData = { type: 'INFRA', id: fac.id };
    g.add(hit);
    interactiveMeshes.push(hit);

    scene.add(g);

    registerWorldLabel({
      id: fac.id,
      type: 'INFRA',
      text: '⚙️ ' + fac.short,
      worldPos: new THREE.Vector3(fac.pos.x, fac.size.h + 4.2, fac.pos.z),
      isDistrict: false
    });
  });
}

export function animateInfrastructure(dt, reducedMotion) {
  if (reducedMotion || !riskRadarBar) return;
  riskRadarBar.rotation.y += dt * 2.2;
}