export const getDynamicUrl = (imageUrl) => {
  return new URL(
    new URL(import.meta.url).origin + `/src/assets/3D/${imageUrl}.glb`
  ).href;
  // for production use /create-your-own-luster
};
