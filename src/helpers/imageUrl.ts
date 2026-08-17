export const getDynamicUrl = (glbCode: string): string =>
  `https://cdn.jsdelivr.net/gh/mahdigitassets-afk/chandelier-assets@main/${glbCode}.glb.enc`;

const imageModules = (import.meta as any).glob('../assets/image/*.png', { eager: true }) as Record<string, { default: string }>;

export const getImageUrl = (code: string): string => {
  const path = `../assets/image/${code}.png`;
  return imageModules[path]?.default || '';
};
