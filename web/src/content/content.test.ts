import { CONTENT } from './content';
import { buildPhotoResolver } from './content.helper';

describe('contenido', () => {
  it('resuelve las fotos de web.json a la URL que genera la compilación', () => {
    const resolve = buildPhotoResolver({ '/contenido/imagenes/productos/pan.jpg': '/assets/pan-123.jpg' });

    expect(CONTENT.version).toBe(2);
    expect(resolve('imagenes/productos/pan.jpg')).toBe('/assets/pan-123.jpg');
  });

  it('devuelve null cuando no hay foto o la foto no existe', () => {
    const resolve = buildPhotoResolver({});

    expect(resolve(null)).toBeNull();
    expect(resolve('imagenes/productos/no-existe.jpg')).toBeNull();
  });
});
