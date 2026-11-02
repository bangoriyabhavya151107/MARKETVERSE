/**
 * Procedural Sky Dome (Sun/Moon Disc + Horizon Gradient + Market Mood Tint + 5s Event Cue Wash),
 * Night Starfield, Drifting Clouds, Smooth Day/Night Cycle, Rain Streaks + Ground Ripples,
 * and UI Light/Dark 3D Scene Palette Synchronization.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { ambientLight, hemiLight, sunLight, updateCameraFollowingShadow } from './lighting.js';
import { streetLightBulbMesh } from './instancing.js';
import { setBuildingsNightEmissive } from './buildings.js';
import { setExchangeNightGlow } from './exchange.js';
import { updateGroundMaterials } from './ground.js';
import { visualRng } from '../engine/rng.js';
import { store } from '../state/store.js';

let skyDomeMesh = null;
let skyUniforms = null;
let starsPoints = null;
let starsMaterial = null;
let cloudInstancedMesh = null;
let cloudMat = null;
const cloudsData = [];

let rainLinesMesh = null;
let rainRipplesInstanced = null;
const ripplesData = [];

const dummyObj = new THREE.Object3D();
const sunOffsetVec = new THREE.Vector3(85, 135, 85);

const SKY_VERTEX_SHADER = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const SKY_FRAGMENT_SHADER = `
  uniform vec3 uTopColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uBottomColor;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunSize;
  uniform vec3 uMoodTint;
  uniform float uMoodStrength;
  uniform vec3 uEventTint;
  uniform float uEventStrength;

  varying vec3 vWorldPosition;

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float h = clamp(dir.y, -0.2, 1.0);

    vec3 col = mix(uHorizonColor, uTopColor, pow(max(h, 0.0), 0.55));
    if (h < 0.0) {
      col = mix(uHorizonColor, uBottomColor, clamp(-h * 5.0, 0.0, 1.0));
    }

    // Horizon band for market mood & 5s hypothetical event wash
    float horizonBand = pow(1.0 - abs(dir.y), 3.5);
    col = mix(col, uMoodTint, horizonBand * uMoodStrength);
    col = mix(col, uEventTint, horizonBand * uEventStrength);

    // Sun / Moon disc & corona
    float cosAngle = max(dot(dir, normalize(uSunDir)), 0.0);
    float disc = smoothstep(1.0 - uSunSize, 1.0 - uSunSize * 0.25, cosAngle);
    float corona = pow(cosAngle, 28.0) * 0.45;
    col += uSunColor * (disc * 1.35 + corona);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function buildRainParticles() {
  if (!scene) return;

  // 1. Procedural GLSL Sky Dome
  skyUniforms = {
    uTopColor: { value: new THREE.Color(0x0c1b2e) },
    uHorizonColor: { value: new THREE.Color(0x1b334b) },
    uBottomColor: { value: new THREE.Color(0x0a121a) },
    uSunDir: { value: new THREE.Vector3(0.5, 0.72, 0.48).normalize() },
    uSunColor: { value: new THREE.Color(0xfff1d0) },
    uSunSize: { value: 0.0045 },
    uMoodTint: { value: new THREE.Color(0xd6a84f) },
    uMoodStrength: { value: 0.0 },
    uEventTint: { value: new THREE.Color(0x3888ff) },
    uEventStrength: { value: 0.0 }
  };

  const skyGeo = new THREE.SphereGeometry(540, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: SKY_VERTEX_SHADER,
    fragmentShader: SKY_FRAGMENT_SHADER,
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false
  });
  skyDomeMesh = new THREE.Mesh(skyGeo, skyMat);
  scene.add(skyDomeMesh);

  // 2. Night Starfield Dome
  const starCount = 460;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const theta = visualRng.range(0, Math.PI * 2);
    const phi = visualRng.range(0.08, Math.PI * 0.44);
    const r = 490;
    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.cos(phi);
    starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starsMaterial = new THREE.PointsMaterial({
    color: 0xdcecff,
    size: 1.9,
    transparent: true,
    opacity: 0.0,
    depthWrite: false
  });
  starsPoints = new THREE.Points(starGeo, starsMaterial);
  scene.add(starsPoints);

  // 3. Slow Drifting Volumetric Cloud Clusters (InstancedMesh)
  const cloudCount = 34;
  const cloudGeo = new THREE.DodecahedronGeometry(1, 1);
  cloudMat = new THREE.MeshLambertMaterial({
    color: 0xd8e6f2,
    transparent: true,
    opacity: 0.42
  });
  cloudInstancedMesh = new THREE.InstancedMesh(cloudGeo, cloudMat, cloudCount);

  for (let i = 0; i < cloudCount; i++) {
    cloudsData.push({
      x: visualRng.range(-240, 240),
      y: visualRng.range(78, 118),
      z: visualRng.range(-210, 210),
      sx: visualRng.range(12, 26),
      sy: visualRng.range(3.2, 6.2),
      sz: visualRng.range(9, 19),
      speed: visualRng.range(1.4, 3.4)
    });
  }
  scene.add(cloudInstancedMesh);

  // 4. Rain Velocity Streak Lines (LineSegments)
  const dropCount = 720;
  const linePositions = new Float32Array(dropCount * 6);
  for (let i = 0; i < dropCount; i++) {
    const x = visualRng.range(-130, 130);
    const y = visualRng.range(2, 96);
    const z = visualRng.range(-120, 120);
    linePositions[i * 6] = x;
    linePositions[i * 6 + 1] = y;
    linePositions[i * 6 + 2] = z;
    linePositions[i * 6 + 3] = x + 0.35;
    linePositions[i * 6 + 4] = y - 2.6;
    linePositions[i * 6 + 5] = z;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const rainMat = new THREE.LineBasicMaterial({
    color: 0x9ac6f0,
    transparent: true,
    opacity: 0.58
  });
  rainLinesMesh = new THREE.LineSegments(rainGeo, rainMat);
  rainLinesMesh.visible = false;
  scene.add(rainLinesMesh);

  // 5. Expanding Ground & Canal Rain Ripples (InstancedMesh)
  const rippleCount = 90;
  const rippleGeo = new THREE.RingGeometry(0.45, 0.62, 16);
  rippleGeo.rotateX(-Math.PI / 2);
  const rippleMat = new THREE.MeshBasicMaterial({
    color: 0xa8d4ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });
  rainRipplesInstanced = new THREE.InstancedMesh(rippleGeo, rippleMat, rippleCount);
  rainRipplesInstanced.visible = false;

  for (let i = 0; i < rippleCount; i++) {
    ripplesData.push({
      x: visualRng.range(-120, 105),
      z: visualRng.range(-105, 105),
      phase: visualRng.range(0, 1),
      speed: visualRng.range(0.9, 1.7)
    });
  }
  scene.add(rainRipplesInstanced);
}

/**
 * Sets target timeOfDay when user clicks Day/Night or changes Weather dropdown.
 */
export function applyWeatherAndLighting(viewState) {
  const live = store.getLiveState();
  const mode = viewState.weather;

  if (viewState.isNight || mode === 'NIGHT') {
    live.targetTimeOfDay = 22.0;
  } else if (mode === 'EVENING') {
    live.targetTimeOfDay = 18.2;
  } else {
    live.targetTimeOfDay = 13.5;
  }

  if (live.reducedMotion) {
    live.timeOfDay = live.targetTimeOfDay;
  }
}

const colTopDayDark = new THREE.Color(0x0b1d33);
const colHorDayDark = new THREE.Color(0x1f3d5a);
const colTopDayLight = new THREE.Color(0x63a4e8);
const colHorDayLight = new THREE.Color(0xdbeeff);

const colTopEve = new THREE.Color(0x181730);
const colHorEve = new THREE.Color(0x7c4438);
const colTopNight = new THREE.Color(0x040810);
const colHorNight = new THREE.Color(0x0b1524);

const colRallyTint = new THREE.Color(0xe8a848);
const colSelloffTint = new THREE.Color(0xc83e4b);
const colNeutralTint = new THREE.Color(0x4b8be8);

const workTop = new THREE.Color();
const workHor = new THREE.Color();
const workSun = new THREE.Color();

export function updateRainParticles(dt, reducedMotion, camTarget, camDistance) {
  const live = store.getLiveState();
  const viewState = store.getViewState();

  // 1. Advance Auto Day/Night Cycle or Smoothly Lerp toward Target Time of Day
  if (live.autoDayNight && !reducedMotion) {
    live.timeOfDay = (live.timeOfDay + dt * 0.65) % 24;
    live.targetTimeOfDay = live.timeOfDay;
    const isNowNight = live.timeOfDay >= 19.5 || live.timeOfDay < 5.5;
    if (live.isNight !== isNowNight) {
      live.isNight = isNowNight;
      const dnBtn = document.getElementById('day-night-btn');
      if (dnBtn) dnBtn.textContent = isNowNight ? '🌙 Night' : '☀️ Day';
    }
  } else if (!reducedMotion) {
    const diff = live.targetTimeOfDay - live.timeOfDay;
    if (Math.abs(diff) > 0.01) {
      live.timeOfDay += diff * Math.min(1, dt * 3.2);
    } else {
      live.timeOfDay = live.targetTimeOfDay;
    }
  } else {
    live.timeOfDay = live.targetTimeOfDay;
  }

  // 2. Compute Day / Evening / Night Blend Factors from `live.timeOfDay`
  const t = live.timeOfDay;
  // Sun elevation angle
  const angle = ((t - 6) / 12) * Math.PI;
  const sinElev = Math.sin(angle);
  const cosElev = Math.cos(angle);

  const nightFactor = THREE.MathUtils.clamp(-sinElev + 0.15, 0, 1);
  const eveFactor = THREE.MathUtils.clamp(1 - Math.abs(sinElev - 0.1) * 2.5, 0, 1);
  const isOvercast = viewState.weather === 'CLOUDY' || viewState.weather === 'RAIN';
  const isRain = viewState.weather === 'RAIN';

  // Position key light along solar/lunar arc
  const sunY = Math.max(38, Math.abs(sinElev) * 145 + 25);
  const sunX = cosElev * 115;
  const sunZ = 75 + sinElev * 20;
  sunOffsetVec.set(sunX, sunY, sunZ);

  if (camTarget) {
    updateCameraFollowingShadow(camTarget, camDistance || 140, sunOffsetVec);
    if (skyDomeMesh) {
      skyDomeMesh.position.set(camTarget.x, 0, camTarget.z);
    }
    if (starsPoints) {
      starsPoints.position.set(camTarget.x, 0, camTarget.z);
    }
  }

  // 3. Sky Palette (Supports Dark Navy UI vs. Daylight High-Contrast UI Theme)
  const baseTop = viewState.lightUiTheme ? colTopDayLight : colTopDayDark;
  const baseHor = viewState.lightUiTheme ? colHorDayLight : colHorDayDark;

  workTop.copy(baseTop).lerp(colTopEve, eveFactor).lerp(colTopNight, nightFactor);
  workHor.copy(baseHor).lerp(colHorEve, eveFactor).lerp(colHorNight, nightFactor);

  if (isOvercast) {
    const overcastCol = viewState.lightUiTheme ? new THREE.Color(0x8fa3b5) : new THREE.Color(0x16222e);
    workTop.lerp(overcastCol, 0.55);
    workHor.lerp(overcastCol, 0.65);
  }

  // 4. Market-Mood Skyline Tint (unless overridden by user)
  let moodStrength = 0.0;
  let moodTintColor = colNeutralTint;
  if (!viewState.atmosphereOverride && viewState.dataMode === 'SIMULATION') {
    if (viewState.totals.mood === 'BULLISH') {
      moodTintColor = colRallyTint;
      moodStrength = 0.34;
    } else if (viewState.totals.mood === 'BEARISH') {
      moodTintColor = colSelloffTint;
      moodStrength = 0.38;
    }
  }

  // 5. 5-Second Hypothetical Event Visual Cue Wash
  let eventStrength = 0.0;
  if (live.eventCue && live.eventCue.timer > 0) {
    live.eventCue.timer = Math.max(0, live.eventCue.timer - dt);
    const norm = live.eventCue.timer / Math.max(0.1, live.eventCue.duration);
    // Smooth bell pulse over the 5 seconds
    eventStrength = Math.sin(norm * Math.PI) * 0.62;
    if (skyUniforms) {
      skyUniforms.uEventTint.value.setHex(live.eventCue.colorHex);
    }
  }

  // 6. Apply Uniforms to Sky Dome, Fog, and Scene Lights
  if (skyUniforms) {
    skyUniforms.uTopColor.value.copy(workTop);
    skyUniforms.uHorizonColor.value.copy(workHor);
    skyUniforms.uSunDir.value.copy(sunOffsetVec).normalize();

    if (nightFactor > 0.55) {
      workSun.setHex(0xb8d8ff); // Cool moon disc
    } else if (eveFactor > 0.35) {
      workSun.setHex(0xff9e58); // Sunset orange disc
    } else if ( moodStrength > 0 && viewState.totals.mood === 'BULLISH') {
      workSun.setHex(0xffdf9e); // Warm golden rally light
    } else {
      workSun.setHex(0xfff4e0);
    }

    skyUniforms.uSunColor.value.copy(workSun);
    skyUniforms.uMoodTint.value.copy(moodTintColor);
    skyUniforms.uMoodStrength.value = moodStrength;
    skyUniforms.uEventStrength.value = eventStrength;
  }

  if (scene && scene.fog) {
    scene.fog.color.copy(workHor);
    if (eventStrength > 0.01 && skyUniforms) {
      scene.fog.color.lerp(skyUniforms.uEventTint.value, eventStrength * 0.45);
    }
    scene.background.copy(scene.fog.color);
    // Tuned depth fog: never hides the city when zoomed out
    scene.fog.density = isRain ? 0.0017 : isOvercast ? 0.0015 : 0.0011;
  }

  if (ambientLight && hemiLight && sunLight) {
    const lightBoost = viewState.lightUiTheme && nightFactor < 0.4 ? 0.22 : 0;
    ambientLight.intensity = THREE.MathUtils.lerp(0.62 + lightBoost, 0.26, nightFactor);
    hemiLight.intensity = THREE.MathUtils.lerp(0.55 + lightBoost, 0.24, nightFactor);
    hemiLight.color.copy(workTop).lerp(new THREE.Color(0xffffff), 0.4);

    let sunInt = THREE.MathUtils.lerp(1.18 + lightBoost, 0.25, nightFactor);
    if (isOvercast) sunInt *= 0.58;
    sunLight.intensity = sunInt;
    sunLight.color.copy(workSun);
    if (eventStrength > 0.05 && skyUniforms) {
      sunLight.color.lerp(skyUniforms.uEventTint.value, eventStrength * 0.4);
    }
  }

  // 7. Night Reactivity: Stars, Lit Windows, Glowing Streetlights, Illuminated Exchange, Wet Roads
  if (starsMaterial) {
    starsMaterial.opacity = THREE.MathUtils.clamp((nightFactor - 0.35) * 1.4, 0, 0.88);
  }
  if (streetLightBulbMesh) {
    streetLightBulbMesh.material.color.setHex(nightFactor > 0.35 || eveFactor > 0.45 ? 0xffd685 : 0x5c6d7e);
  }
  setBuildingsNightEmissive(nightFactor);
  setExchangeNightGlow(nightFactor);
  updateGroundMaterials(isRain, nightFactor, viewState.lightUiTheme);

  // 8. Animate Drifting Clouds
  if (cloudInstancedMesh && cloudMat) {
    const isBearishSky = !viewState.atmosphereOverride && viewState.totals.mood === 'BEARISH';
    cloudMat.opacity = isRain ? 0.72 : isOvercast || isBearishSky ? 0.62 : 0.36;
    cloudMat.color.setHex(nightFactor > 0.5 ? 0x243447 : isOvercast ? 0x7b8d9e : 0xdbe9f5);

    cloudsData.forEach((c, idx) => {
      if (!reducedMotion) {
        c.x += c.speed * dt;
        if (c.x > 250) c.x = -250;
      }
      dummyObj.position.set(c.x, c.y, c.z);
      dummyObj.rotation.set(0, 0, 0);
      dummyObj.scale.set(c.sx, c.sy, c.sz);
      dummyObj.updateMatrix();
      cloudInstancedMesh.setMatrixAt(idx, dummyObj.matrix);
    });
    cloudInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  // 9. Animate Rain Streak Lines & Ground Ripples
  if (rainLinesMesh) {
    rainLinesMesh.visible = isRain;
    if (isRain && !reducedMotion) {
      const posAttr = rainLinesMesh.geometry.attributes.position;
      const dropTotal = posAttr.count / 2;
      for (let i = 0; i < dropTotal; i++) {
        let yTop = posAttr.getY(i * 2) - 64 * dt;
        if (yTop < 1) yTop = 94;
        posAttr.setY(i * 2, yTop);
        posAttr.setY(i * 2 + 1, yTop - 2.6);
      }
      posAttr.needsUpdate = true;
    }
  }

  if (rainRipplesInstanced) {
    rainRipplesInstanced.visible = isRain;
    if (isRain && !reducedMotion) {
      ripplesData.forEach((rp, idx) => {
        rp.phase = (rp.phase + rp.speed * dt) % 1;
        const scale = 0.3 + rp.phase * 2.1;
        dummyObj.position.set(rp.x, 0.32, rp.z);
        dummyObj.rotation.set(0, 0, 0);
        dummyObj.scale.set(scale, 1, scale);
        dummyObj.updateMatrix();
        rainRipplesInstanced.setMatrixAt(idx, dummyObj.matrix);
      });
      rainRipplesInstanced.instanceMatrix.needsUpdate = true;
    }
  }
}