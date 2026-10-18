// Valida contenido/web.json contra su esquema y comprueba que cada foto existe.
// Si algo falla, la compilación se detiene y la web anterior sigue en línea.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = process.env.CONTENIDO_DIR ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'contenido');
const read = (file) => JSON.parse(readFileSync(path.join(root, file), 'utf8'));

const schema = read('web.schema.json');
const content = read('web.json');

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const errors = [];
if (!validate(content)) {
  for (const error of validate.errors ?? []) errors.push(`${error.instancePath || '/'} ${error.message}`);
}

const photos = [
  ...content.catalogo.flatMap((categoria) => categoria.productos.flatMap((p) => [p.foto, p.fotoFicha])),
  ...content.equipo.map((persona) => persona.foto),
].filter(Boolean);

for (const photo of photos) {
  if (!existsSync(path.join(root, photo))) errors.push(`No existe la foto ${photo}`);
}

if (errors.length) {
  console.error('contenido/web.json no es válido:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`contenido/web.json válido (versión ${content.version}, ${photos.length} fotos).`);
