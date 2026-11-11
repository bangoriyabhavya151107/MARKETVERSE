/**
 * Model Loader & Asset Manager for Polyfork 3D Models:
 * - Asynchronous preloading with GLTFLoader
 * - Geometry & material caching for InstancedMesh usage
 * - Hybrid building construction (preserves window aspect ratio without stretching)
 * - Seamless Low-Quality fallback to procedural primitives
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ASSETS_MANIFEST from '../data/assets.json';

const gltfLoader = new GLTFLoader();
const modelCache = new Map();
const geometryCache = new Map();
const materialCache = new Map();

let modelsLoaded = false;
let loadPromise = null;

/**
 * Loads all Polyfork GLB models listed in the assets manifest.
 * @param {(progress: number, label: string) => void} onProgress
 * @returns {Promise<void>}
 */
export async function preloadPolyforkModels(onProgress) {
  if (modelsLoaded) return;
  if (loadPromise) return loadPromise;

  const total = ASSETS_MANIFEST.length;
  let loadedCount = 0;

  loadPromise = new Promise((resolve) => {
    if (total === 0) {
      modelsLoaded = true;
      resolve();
      return;
    }

    const loadNext = (index) => {
      if (index >= total) {
        modelsLoaded = true;
        resolve();
        return;
      }

      const asset = ASSETS_MANIFEST[index];
      const modelPath = asset.path;

      gltfLoader.load(
        modelPath,
        (gltf) => {
          modelCache.set(asset.id, gltf.scene);

          // Find main mesh for geometry and material caching (used for InstancedMesh)
          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (!geometryCache.has(asset.id)) {
                geometryCache.set(asset.id, child.geometry.clone());
              }
              if (!materialCache.has(asset.id)) {
                materialCache.set(asset.id, child.material);
              }
            }
          });

          loadedCount++;
          if (onProgress) {
            onProgress(loadedCount / total, asset.name);
          }
          loadNext(index + 1);
        },
        undefined,
        (err) => {
          console.warn(`[Polyfork] Failed to load ${asset.id} from ${modelPath}:`, err);
          loadedCount++;
          if (onProgress) {
            onProgress(loadedCount / total, asset.name);
          }
          loadNext(index + 1);
        }
      );
    };

    // Load in small concurrent batches for rapid startup
    const concurrency = 4;
    let nextIdx = 0;
    let active = 0;

    function step() {
      if (loadedCount >= total) {
        modelsLoaded = true;
        resolve();
        return;
      }
      while (active < concurrency && nextIdx < total) {
        const cur = nextIdx++;
        active++;
        const asset = ASSETS_MANIFEST[cur];
        gltfLoader.load(
          asset.path,
          (gltf) => {
            modelCache.set(asset.id, gltf.scene);
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (!geometryCache.has(asset.id)) {
                  geometryCache.set(asset.id, child.geometry.clone());
                }
                if (!materialCache.has(asset.id)) {
                  materialCache.set(asset.id, child.material);
                }
              }
            });
            loadedCount++;
            active--;
            if (onProgress) onProgress(loadedCount / total, asset.name);
            step();
          },
          undefined,
          (err) => {
            console.warn(`[Polyfork] Failed to load ${asset.id}:`, err);
            loadedCount++;
            active--;
            if (onProgress) onProgress(loadedCount / total, asset.name);
            step();
          }
        );
      }
    }

    step();
  });

  return loadPromise;
}

export function areModelsLoaded() {
  return modelsLoaded;
}

export function getCachedModel(id) {
  const cached = modelCache.get(id);
  if (!cached) return null;
  return cached.clone(true);
}

export function getCachedGeometry(id) {
  return geometryCache.get(id) || null;
}

export function getCachedMaterial(id) {
  return materialCache.get(id) || null;
}

/**
 * Builds a hybrid building structure complying with the Hybrid Height Rule:
 * - Scaled uniformly to footprint width (+/- 15% max non-uniform variation)
 * - Extra height achieved via procedural 3m floor stacks so windows are never stretched
 * - Includes rooftop mechanical details
 */
export function buildHybridBuilding(comp, width, targetHeight, sectorHex, quality = 'HIGH') {
  const group = new THREE.Group();

  // If low quality or model not loaded, fallback to lightweight procedural boxes
  if (quality === 'LOW' || !modelsLoaded) {
    return null; // Signals caller to use procedural fallback
  }

  // Model selection by cap tier and sector
  let modelId = 'office-tower-1538cc';
  const tier = comp.capTier || 'Mid-Cap';

  if (tier === 'Large-Cap') {
    if (comp.sector === 'BANKING' || comp.sector === 'OTHER') {
      modelId = 'art-deco-setback-tower-b3a788';
    } else if (comp.sector === 'ENERGY' || comp.sector === 'MATERIALS') {
      modelId = 'postwar-apartment-slab-cee5f9';
    } else if (comp.sector === 'INFRA_IND') {
      modelId = 'cast-iron-loft-b04b5a';
    } else {
      modelId = 'office-tower-1538cc';
    }
  } else if (tier === 'Mid-Cap') {
    if (comp.sector === 'BANKING') {
      modelId = 'classical-bank-04954e';
    } else if (comp.sector === 'CONSUMER') {
      modelId = 'department-store-ffbd58';
    } else if (comp.sector === 'AUTO') {
      modelId = 'parking-garage-6e4f2c';
    } else if (comp.sector === 'HEALTH') {
      modelId = 'prewar-apartment-house-1081a6';
    } else {
      modelId = 'cast-iron-loft-b04b5a';
    }
  } else {
    // Small-Cap
    if (comp.sector === 'AUTO') {
      modelId = 'auto-repair-garage-b91464';
    } else if (comp.sector === 'CONSUMER') {
      modelId = comp.id === 'C26' ? 'corner-shop-5aec8c' : 'one-storey-shop-row-83c958';
    } else if (comp.sector === 'HEALTH') {
      modelId = 'narrow-walk-up-41f10c';
    } else {
      modelId = 'brownstone-row-house-1b84fd';
    }
  }

  const baseModel = getCachedModel(modelId);
  if (!baseModel) return null;

  // Compute bounding box to know natural dimensions
  const bbox = new THREE.Box3().setFromObject(baseModel);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const naturalWidth = Math.max(size.x, size.z) || 12;
  const naturalHeight = size.y || 15;

  // Scale uniformly to footprint width
  const uniformScale = width / naturalWidth;
  const clampedScale = Math.max(0.3, Math.min(1.8, uniformScale));
  const modelH = naturalHeight * clampedScale;

  baseModel.scale.set(clampedScale, clampedScale, clampedScale);

  if (targetHeight <= modelH * 1.15) {
    // Height fits model nicely
    baseModel.position.set(0, 0, 0);
    group.add(baseModel);
  } else {
    // Height exceeds model: Hybrid stacking!
    // Model sits as the architectural base / podium, and procedural 3m floor stacks
    // rise to targetHeight without stretching the model's windows
    baseModel.position.set(0, 0, 0);
    group.add(baseModel);

    const extraHeight = targetHeight - modelH;
    const floorPitch = 3.0; // 3m standardized floor height from NYC kit contract
    const floorCount = Math.max(1, Math.round(extraHeight / floorPitch));
    const actualExtraH = floorCount * floorPitch;

    const shaftMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(sectorHex).lerp(new THREE.Color(0x233142), 0.5),
      shininess: 40
    });

    const shaftGeo = new THREE.BoxGeometry(width * 0.88, actualExtraH, width * 0.88);
    shaftGeo.translate(0, actualExtraH / 2, 0);
    const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
    shaftMesh.position.y = modelH;
    shaftMesh.castShadow = true;
    shaftMesh.receiveShadow = true;
    group.add(shaftMesh);

    // Crown topper
    const crownMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(sectorHex).lerp(new THREE.Color(0xffffff), 0.2),
      shininess: 60
    });
    const crownMesh = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 1.2, width * 0.72), crownMat);
    crownMesh.position.y = modelH + actualExtraH + 0.6;
    group.add(crownMesh);
  }

  // Add rooftop detail (AC Unit or Water Tower or Bulkhead)
  const rooftopTypes = [
    'rooftop-ac-unit-6ccb3c',
    'rooftop-water-tower-b38362',
    'roof-bulkhead-0f0acc'
  ];
  const roofId = rooftopTypes[Math.abs(comp.symbol.charCodeAt(0)) % rooftopTypes.length];
  const roofProp = getCachedModel(roofId);
  if (roofProp) {
    roofProp.scale.set(0.85, 0.85, 0.85);
    roofProp.position.set(0, targetHeight, 0);
    group.add(roofProp);
  }

  return group;
}
