export type Silhouette = {
  above: string;
  below: string;
};

/** Lengths stay in shared metre units. Vertical size is exaggerated so the profile can be read. */
export const silhouettes: Record<string, Silhouette> = {
  tug: {
    above: "M1 62 L4 52 L7 44 L14 40 L18 48 L27 54 L31 62 Z",
    below: "M1 62 L5 70 L27 70 L31 62 Z",
  },
  osv: {
    above: "M2 62 L6 54 L12 44 L30 38 L38 48 L68 54 L78 62 Z",
    below: "M2 62 L10 74 L68 74 L78 62 Z",
  },
  "general-cargo": {
    above: "M4 62 L12 54 L20 46 L36 44 L42 32 L48 44 L78 44 L84 30 L90 44 L118 50 L132 56 L136 62 Z",
    below: "M4 62 L16 76 L122 76 L136 62 Z",
  },
  "product-tanker": {
    above: "M4 62 L12 56 L18 42 L40 38 L48 52 L158 54 L174 58 L179 62 Z",
    below: "M4 62 L16 78 L164 78 L179 62 Z",
  },
  bulk: {
    above: "M4 62 L14 54 L22 46 L48 42 L58 36 L96 36 L108 42 L148 42 L160 36 L176 44 L190 54 L196 62 Z",
    below: "M4 62 L18 80 L180 80 L196 62 Z",
  },
  car: {
    above: "M6 62 L16 56 L24 22 L148 20 L170 28 L186 54 L194 62 Z",
    below: "M6 62 L18 76 L180 76 L194 62 Z",
  },
  crude: {
    above: "M6 62 L16 56 L24 44 L52 38 L66 50 L292 52 L316 56 L327 62 Z",
    below: "M6 62 L22 82 L308 82 L327 62 Z",
  },
  container: {
    above: "M8 62 L16 56 L24 40 L52 26 L86 26 L96 46 L300 46 L332 52 L356 58 L360 62 Z",
    below: "M8 62 L20 82 L332 82 L360 62 Z",
  },
};
