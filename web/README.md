# Web de Panadería Rubicón

Front estático que pinta `../contenido/web.json`. No hace llamadas a ningún backend.
Ver [`docs/arquitectura-estatica.md`](../docs/arquitectura-estatica.md).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Valida `web.json` y compila a `dist/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | Tipos de TypeScript |
| `npm test` | Tests (Vitest + Testing Library) |

## Estructura

- `src/components/`: componentes generales, sin lógica de negocio.
- `src/screens/`: una carpeta por pantalla, con sus componentes específicos.
- `src/hooks/`: hooks compartidos.
- `src/content/`: tipos y carga de `web.json`.
- `src/i18n/messages/`: textos en `es.json` y `en.json`.
- `src/styles/tokens.css`: único sitio con colores.
