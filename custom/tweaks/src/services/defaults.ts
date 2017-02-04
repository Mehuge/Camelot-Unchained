
export interface Range {
  min: number;
  max: number;
}

export interface ConfigItemDefaults {
  type: string;
  editable: boolean;
  range?: Range;
}

export interface ConfigItemMap {
  [key: string]: ConfigItemDefaults;
}

const defaults: ConfigItemMap = {
  "cameraDistMax": {
    type: "integer-slider",
    editable: true,
    range: {
      min: 0,
      max: 100
    }
  },
  "runSpeed": {
    type: "integer-slider",
    editable: true,
    range: {
      min: 0,
      max: 20
    }
  },

  "walkSpeed": {
    type: "integer-slider",
    editable: true,
    range: {
      min: 0,
      max: 20
    }
  },

  "DebugLights": {
    type: "integer-slider",
    editable: true,
    range: {
      min: 0,
      max: 9000
    }
  },

};

export default defaults;