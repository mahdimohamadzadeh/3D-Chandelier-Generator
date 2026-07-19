export const getDynamicUrl = (glbCode: string): string =>
  new URL(new URL(import.meta.url).origin + `/src/assets/3D/${glbCode}.glb`).href;

export const getImageUrl = (code: string): string =>
  new URL(`../assets/image/${code}.png`, import.meta.url).href;
