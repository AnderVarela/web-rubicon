/// <reference types="vite/client" />

// Imágenes optimizadas por vite-imagetools (?…&as=picture): srcset por formato y JPEG de respaldo.
declare module '*&as=picture' {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}
