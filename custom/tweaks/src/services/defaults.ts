
export interface Range {
  min: number;
  max: number;
}

export interface ConfigItemDefaults {
  type: string;
  editable: boolean;
  dp?: number;
  range?: Range;
}

export interface ConfigItemMap {
  [key: string]: ConfigItemDefaults;
}

const defaults: ConfigItemMap = {
  'pipeDebugLog': {
    type: 'boolean-switch',
    editable: false,
  },
  'MaxWoundsPerPart': {
    type: 'integer',
    editable: false,
  },
  'lagCompensation': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'TimeAdjustDuration': {
    type: 'integer-slider',
    editable: true,
  },
  'grassVerticalScale': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100 }
  },
  'terrainRealmChange': {
    type: 'boolean-switch',
    editable: true,
  },
  'terrainHeightmapCellSize': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100 }
  },
  'blockResourceID': {
    type: 'number',
    editable: false,
  },
  'followGroundTangentMaxAngleDeg': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 90 }
  },
  'maxVelocityThreshold': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 2000 }
  },
  'cylinderMorph': {
    type: 'boolean-switch',
    editable: true,
  },
  'colorByHealthAndStability': {
    type: 'boolean-switch',
    editable: true,
  },
  'colorByHealth': {
    type: 'boolean-switch',
    editable: true,
  },
  'colorByStability': {
    type: 'boolean-switch',
    editable: true,
  },
  'netForceThreshold': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'onAxisModifier': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 5 }
  },
  'bottomWeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'sideWeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'topWeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'tLimit': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'cLimit': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10000 }
  },
  'countCells': {
    type: 'boolean-switch',
    editable: true,
  },
  'terrainMaxError': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 5 }
  },
  'terrainMaxSegments': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'noTerrainCollide': {
    type: 'boolean-switch',
    editable: true,
  },
  'useCachedResourceLoader': {
    type: 'boolean-switch',
    editable: true,
  },
  'fileReloadDelay': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10000 }
  },
  'gravity': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: -100, max: 100 }
  },
  'SyncAritmeticCoder': {
    type: 'boolean-switch',
    editable: true,
  },
  'PhysicsSubzonesPerDim': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'PhysicsWorldHeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10000 }
  },
  'PhysicsWorldSize': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100000 }
  },
  'PhysicsFPS': {
    type: 'integer-slider',
    editable: true,
    range: { min: 10, max: 120 }
  },
  'MaxClientTimeLag': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'MinSimulationFPS': {
    type: 'integer-slider',
    editable: true,
    range: { min: 5, max: 20 }
  },
  'msaa': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'windowResizable': {
    type: 'boolean-switch',
    editable: true,
  },
  'VSync': {
    type: 'boolean-switch',
    editable: true,
  },
  'centerCycleTime': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'turnAngleRate': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'runCycleTime': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'runSpeed': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'walkCycleTime': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'walkSpeed': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'fogEnabled': {
    type: 'boolean-switch',
    editable: true,
  },
  'fogDensity': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'sceneRebalanceThreshold': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20 }
  },
  'attemptSelectDevice': {
    type: 'boolean-switch',
    editable: true,
  },
  'forceDX10': {
    type: 'boolean-switch',
    editable: true,
  },
  'CAEnabled': {
    type: 'boolean-switch',
    editable: true,
  },
  'longRangeTeleportDistance': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'copyServerPhysics': {
    type: 'boolean-switch',
    editable: true,
  },
  'snapPosition': {
    type: 'boolean-switch',
    editable: true,
  },
  'offlineMoveSpeedShiftMultiplier': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 20 }
  },
  'offlineMoveSpeedAltMultiplier': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'offlineMoveSpeed': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 20 }
  },
  'jumpDelay': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 2 }
  },
  'isMovingVelocityThresholdSq': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 0.001 }
  },
  'fallDistance': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'ignoreServer': {
    type: 'boolean-switch',
    editable: true,
  },
  'localPhysicsRange': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'showServerPosition': {
    type: 'boolean-switch',
    editable: true,
  },
  'showSelf': {
    type: 'boolean-switch',
    editable: true,
  },
  'compatResultDurationSec': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'fly': {
    type: 'boolean-switch',
    editable: true,
  },
  'debugBoneModelScale': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'renderDebugBonesAsModels': {
    type: 'boolean-switch',
    editable: true,
  },
  'renderDebugBonesAsParticles': {
    type: 'boolean-switch',
    editable: true,
  },
  'transitionDistance': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100 }
  },
  'overrideGear': {
    type: 'boolean-switch',
    editable: true,
  },
  'DebugLights': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10000 }
  },
  'updateThreshold': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'skipSpawnLoad': {
    type: 'boolean-switch',
    editable: true,
  },
  'NameplateHeight': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 10 }
  },
  'Nameplates': {
    type: 'boolean-switch',
    editable: true,
  },
  'NameplateTotalFadeDistance': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'NameplateFadeStartDistance': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'NameplateDesiredDistanceToCamera': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'invertMouseY': {
    type: 'boolean-switch',
    editable: true,
  },
  'invertMouseX': {
    type: 'boolean-switch',
    editable: true,
  },
  'assertTest': {
    type: 'boolean-switch',
    editable: true,
  },
  'fullscreen': {
    type: 'boolean-switch',
    editable: true,
  },
  'cubeRace': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'uiDebugMode': {
    type: 'boolean-switch',
    editable: true,
  },
  'snowY': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'snowZ': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'spawnGrass': {
    type: 'boolean-switch',
    editable: true,
  },
  'loadWaterPlane': {
    type: 'boolean-switch',
    editable: true,
  },
  'TargetIndicatorHeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 15 }
  },
  'TargetIndicatorDesiredDistanceToCamera': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 50 }
  },
  'targetLerpToGround': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 1 }
  },
  'targetDistExtrap': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 200 }
  },
  'targetTimeExtrap': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'targetingMouseScale': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 2 }
  },

  'dragonHeightVariance': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'dragonHeight': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'dragonScale': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 2 }
  },
  'dragonSpace': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'dragonSpeed': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },

  'shadowsEnabled': {
    type: 'boolean-switch',
    editable: true,
  },
  'shadowBackDist': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 1000 }
  },
  'shadowCheat': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 10 }
  },
  'shadowMapType': {
    type: 'integer-slider',
    editable: false,
    range: { min: 0, max: 5 }
  },
  'shadowMapCount': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'shadowMapRes': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 4096 }
  },
  'shadowOverlap': {
    type: 'float-slider',
    dp: 2,
    editable: true,
    range: { min: 0, max: 10 }
  },
  'shadowQuality': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'shadowMaxDist': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 20000 }
  },

  'shaderQuality': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },
  'textureQuality': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 10 }
  },


  'cameraDistMax': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100 }
  },
  'cameraDistMin': {
    type: 'integer-slider',
    editable: true,
    range: { min: 0, max: 100 }
  },


};

export default defaults;