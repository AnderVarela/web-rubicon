# Arquitectura: web estática + app de gestión local

| Campo | Valor |
|---|---|
| Proyecto | Web de Panadería Rubicón |
| Fecha | 18/10/2026 |
| Estado | Propuesta para validar |
| Sustituye a | El planteamiento inicial: backend + base de datos + SPA de gestión desplegada |

## 1. Resumen

La web pública es un **sitio estático** que **solo pinta** lo que hay en un fichero del repositorio, `contenido/web.json`. No hace ninguna llamada: ni a un backend ni a Google.

Ese fichero lo genera una **app de escritorio (Tauri)** que se ejecuta en local. La app es la herramienta de gestión del diseño: guarda sus datos en el propio ordenador, consulta las reseñas de Google y, al exportar, escribe un `web.json` con lo que la web debe mostrar. **Subirlo al repositorio es un paso manual**: la app no toca Git.

```
 App de gestión (Tauri, en local)                    Repositorio            Hosting estático
┌────────────────────────────────┐  a mano        ┌───────────────┐ build ┌───────────────┐
│ datos de trabajo (en local)    │  (copiar y     │ contenido/    │ ────▶ │ web estática  │
│ reseñas ◀── Google             │   subir)       │   web.json    │       │ sin llamadas  │
│ Exportar ──▶ web.json + fotos  │ ─────────────▶ │   imagenes/   │       │               │
└────────────────────────────────┘                └───────────────┘       └───────────────┘
```

### Qué desaparece

| Antes | Ahora |
|---|---|
| Backend con API REST | No existe |
| Base de datos PostgreSQL | Datos de trabajo de la app, en local |
| SPA de gestión desplegada | App de escritorio, sin despliegue |
| Login, usuarios, sesiones | No hacen falta: la app solo existe en tu ordenador |
| Almacenamiento de fotos | Carpeta `contenido/imagenes/` del repositorio |
| Hosting de servidor y base de datos | Hosting estático |

### Qué se pierde, y por qué es asumible

| Limitación | Detalle |
|---|---|
| Publicar es un paso manual y no es instantáneo | Exportar, subir el fichero al repositorio y esperar a la compilación. Los textos «Los cambios se publican al instante» y «Guardar y publicar» de la app deben cambiar |
| Solo se gestiona desde el ordenador que tiene la app | Los datos de trabajo viven ahí (ver riesgos, sección 8) |
| Las reseñas solo se actualizan cuando se exporta | La web no consulta a Google; muestra las que había en la última exportación |

## 2. Dos ficheros con dos papeles

| | Datos de trabajo | Contenido publicado |
|---|---|---|
| Fichero | `datos.json`, en la carpeta de datos de la app | `contenido/web.json`, en el repositorio |
| Formato | [`gestion/datos.schema.json`](../gestion/datos.schema.json) | [`contenido/web.schema.json`](../contenido/web.schema.json) |
| Quién lo escribe | La app, en cada guardado | La app, al exportar |
| Qué contiene | **Todo**: productos y categorías ocultos, todas las reseñas traídas de Google con su marca de selección, el aviso aunque esté apagado | **Solo lo que se ve**, ya filtrado, ordenado y listo para pintar |
| Es público | No | Sí |

Separarlos es lo que permite que la web no tenga ninguna lógica: no filtra productos ocultos ni reseñas, porque nunca le llegan. Y como `web.json` acaba en una web pública, no puede contener nada que no deba verse.

En el repositorio hay un ejemplo de cada uno con datos de muestra del diseño: [`gestion/datos.ejemplo.json`](../gestion/datos.ejemplo.json) y [`contenido/web.json`](../contenido/web.json).

```
contenido/
├── web.json              ← lo que la web pinta; se sube a mano
├── web.schema.json
└── imagenes/
    ├── productos/
    └── equipo/
gestion/                  ← app Tauri (por construir)
├── datos.schema.json
└── datos.ejemplo.json
web/                      ← front estático (por construir)
docs/
```

## 3. `contenido/web.json`: lo que la web pinta

| Bloque | Sección de la web | Contenido |
|---|---|---|
| `portada` | Introducción | `linea`: la línea pequeña sobre el logo |
| `aviso` | Franja superior | `{ texto, hasta }`, o `null` si no hay franja |
| `catalogo[]` | Nuestro pan | Categorías con `id`, `nombre` y `productos[]` |
| `catalogo[].productos[]` | Tarjeta y ficha | `id`, `nombre`, `descripcion`, `descripcionLarga`, `precio`, `unidad`, `etiqueta`, `ingredientes`, `alergenos[]`, `foto` (tarjeta, 1:1), `fotoFicha` (ficha, 4:3) |
| `equipo[]` | Nosotros | `id`, `nombre`, `puesto`, `descripcion`, `foto` |
| `resenas` | Reseñas | `valoracion`, `total`, `urlEscribir`, `urlTodas`, `lista[]` (`autor`, `puntuacion`, `texto`, `publicadaEn`) |
| `horario` | Visítanos e Introducción | `semana` (un objeto con una clave por día, de `lunes` a `domingo`, cada una con sus tramos `{ abre, cierra }`; `[]` = cerrado), `excepciones[]` (días con horario distinto al de la semana), `zonaHoraria` |
| `contacto` | Visítanos y pie | dirección, localidad, teléfono y WhatsApp con su enlace ya montado, email, `redes`, `urlMapa`, `urlComoLlegar` |

Todo llega resuelto para que la web no tenga que decidir nada:

- **El orden de los arrays es el orden en pantalla.**
- **Solo hay categorías con productos**, y solo productos visibles.
- **`descripcionLarga` siempre viene rellena** (si no hay larga, es la corta).
- **`precio: null`** significa «Consultar en tienda».
- **`unidad` y `etiqueta` son el texto a mostrar** («¼ kg», «Novedad»), no un código.
- **Los alérgenos llegan como nombres listos para mostrar** («Gluten», «Frutos de cáscara»…), en el orden del reglamento. Solo pueden ser uno de los 14 oficiales; el icono de cada uno lo elige la web.
- **Cada día de la semana trae de 0 a 3 tramos**, ordenados y sin solaparse. Una lista vacía es «Cerrado».
- **`excepciones` solo trae fechas de hoy en adelante**, ordenadas. Cada una lleva `fecha`, `motivo` y `abierto`: con `abierto: false` el día se cierra entero y no hay `horario`; con `abierto: true` trae `horario` con sus tramos, que sustituyen a los de ese día de la semana.
- **Las fotos llegan ya recortadas** a la proporción de su marco: `foto` (1:1) y `fotoFicha` (4:3) en productos, `foto` (1:1) en equipo. El encuadre se elige en la app.
- **`redes` solo contiene las redes configuradas**: un icono por cada clave presente.
- **Los enlaces vienen montados**: `tel:`, `wa.me`, reseñas de Google, mapa y «Cómo llegar».
- **`resenas.lista` solo contiene las reseñas elegidas** (seis como máximo). Vacía significa que la web muestra únicamente la invitación a escribir una.

### Versiones del formato

`version` sube cada vez que el formato cambia de forma incompatible. La web solo acepta la versión de su esquema: si llega otra, la compilación falla.

| Versión | Cambios |
|---|---|
| 1 | Formato inicial |
| 2 | `alergenos` pasa de `{ nombre, icono }` a solo el nombre. `horario.semana` pasa de 7 elementos (uno por día, `null` = cerrado) a un objeto por día con hasta 3 tramos. `cierres` y `aperturas` se unen en `excepciones` |

### Lo único que la web calcula

Depende del momento en que se mira la página, así que no puede venir escrito en el fichero. Son cálculos sobre los datos del propio `web.json`, sin llamadas:

- **«Abierto ahora / Cerrado»** y el **día actual resaltado**, a partir de `horario`: primero se mira si hoy tiene una excepción y, si no, los tramos de ese día en `semana`.
- **Ocultar el aviso** una vez pasado `aviso.hasta`.
- **La antigüedad de cada reseña** («hace 2 semanas»), a partir de `publicadaEn`.

## 4. La app de gestión (Tauri)

La interfaz es la del diseño `Rubicon Gestión`, con las mismas pantallas. En lugar de llamar a una API, pide a la app el documento completo al arrancar, lo modifica en memoria y lo devuelve entero para guardarlo.

### 4.1 Contrato entre la interfaz y el núcleo de la app

Sustituye al contrato de API. Son comandos de Tauri (`invoke`):

| Comando | Entrada | Salida | Qué hace |
|---|---|---|---|
| `cargar_datos` | — | `Datos` | Lee `datos.json` de la carpeta de la app. Si no existe, devuelve un documento inicial vacío |
| `guardar_datos` | `Datos` | `Estado` | Valida contra `datos.schema.json`, escribe el fichero de forma atómica y borra las fotos que ya no se usan |
| `importar_foto` | ruta del fichero elegido, `productos` o `equipo`, `id` del elemento | ruta relativa (`imagenes/…`) | Copia la foto a la carpeta de la app, reducida (2000 px de lado mayor) y sin metadatos |
| `sincronizar_resenas` | — | `Datos` | Consulta Google y actualiza `resenas` (lista, valoración y total) sin tocar las ya seleccionadas |
| `exportar` | carpeta de destino | `Estado` | Genera `web.json` y la carpeta `imagenes/` en el destino (ver 4.3) |
| `estado` | — | `Estado` | Si hay cambios desde la última exportación y cuándo fue |
| `leer_ajustes` / `guardar_ajustes` | `Ajustes` | `Ajustes` | Clave de la API de Google y carpeta de exportación por defecto |

- `Datos` es el objeto de `datos.json`.
- `Estado` = `{ cambiosSinExportar: boolean, exportadoEn: string | null }`.
- Los errores de validación devuelven la lista de campos con su mensaje, como hoy pinta la ficha de producto («Escribe el nombre del producto.»).

### 4.2 Cómo se traduce cada acción del diseño

| Acción en la app | Efecto |
|---|---|
| Interruptor de visible, ordenar, guardar la ficha de un producto, crear o eliminar una categoría, interruptor de reseña | `guardar_datos` inmediato |
| Botón de guardar de Portada, Aviso, Horario, Equipo y Contacto | `guardar_datos` de esa sección. Mientras no se pulsa, el borrador solo está en memoria, como en el diseño |
| «Deshacer» del aviso emergente | `guardar_datos` con el estado anterior, que la interfaz ya conserva |
| «Subir foto» | `importar_foto` y, al guardar, la ruta queda en `foto` |
| Eliminar una categoría con productos | Lo impide la interfaz, como ahora |
| Tope de 6 reseñas seleccionadas | Lo aplica la interfaz y lo comprueba `guardar_datos` |

Cambios necesarios en el diseño:

- Un botón **«Exportar para la web»** (el diseño no lo tiene), junto al enlace «Ver la web».
- El indicador «Todo publicado / Cambios sin publicar» pasa a significar **«Exportado / Cambios sin exportar»**.
- «Guardar y publicar» y «Publicar cambios» pasan a ser **«Guardar»**: guardar ya no publica.

### 4.3 Exportar

`exportar` transforma los datos de trabajo en el contenido publicado:

| En `datos.json` | En `web.json` |
|---|---|
| Categorías y productos con `visible: false` | No aparecen. Una categoría sin productos visibles tampoco |
| `sinPrecio: true` | `precio: null` |
| `descripcionLarga` vacía | Se rellena con la corta |
| Códigos de unidad, etiqueta y alérgeno | Texto listo para mostrar |
| Aviso apagado, sin texto o ya caducado | `aviso: null` |
| `semana` con sus tramos por día | Igual en `semana` |
| Excepciones anteriores a hoy | No aparecen |
| Reseñas con `enWeb: false` | No aparecen |
| Redes sin URL | No aparecen en `redes` |
| Teléfono, WhatsApp, `googlePlaceId`, `googleMapsUrl` | Enlaces ya montados |

Además de `web.json`, deja en el destino la carpeta `imagenes/` con **solo las fotos que se usan** y elimina de ella las que ya no. Lo normal es exportar directamente sobre la carpeta `contenido/` del repositorio y después subir los cambios a mano.

Antes de escribir, la app valida el resultado contra `web.schema.json`; si algo no cuadra, no exporta y dice qué falla.

### 4.4 Secretos

El único secreto es la **clave de la API de Google**. Se guarda en el llavero del sistema operativo: no está en el repositorio, ni en `web.json`, ni llega nunca a la web.

## 5. El front estático

- Importa `contenido/web.json` y lo pinta. No hay `fetch`, ni a un backend ni a terceros. La única carga externa sigue siendo el mapa de Google, y solo tras el consentimiento de cookies.
- La compilación valida `web.json` contra su esquema y comprueba que cada `foto` existe. Si algo falla, **no se despliega** y la web anterior sigue en línea. Es la red de seguridad si el fichero se edita a mano.
- Las fotos se convierten a formatos modernos y a varios tamaños al compilar.
- Sin JavaScript, la web muestra el horario completo y no muestra el estado de apertura.

## 6. Reseñas de Google

1. La app consulta Google (`sincronizar_resenas`) con la clave guardada en local y guarda la lista completa en sus datos de trabajo.
2. En la pantalla Reseñas se eligen hasta seis.
3. Al exportar, solo las elegidas pasan a `web.json`, junto con la valoración media y el total.

Las reseñas nuevas entran sin seleccionar. Las que ya no existen en Google se eliminan de la lista y, por tanto, dejan de exportarse.

**Pendiente de confirmar:** la API pública de fichas de Google devuelve solo unas pocas reseñas por consulta (cinco, las que considera más relevantes). La lista de la app irá creciendo con las sincronizaciones, pero no será el histórico completo. Tener todas requiere la API de perfil de empresa, que exige que el titular de la ficha autorice el acceso.

## 7. Publicar un cambio, paso a paso

1. Abrir la app y hacer los cambios.
2. Si se quieren reseñas al día, pulsar sincronizar y revisar la selección.
3. Pulsar «Exportar para la web» sobre la carpeta `contenido/` del repositorio.
4. Subir los cambios al repositorio (`web.json` y, si cambiaron, las fotos).
5. El hosting compila y despliega.

Costes: el repositorio, la compilación y el hosting estático caben en planes gratuitos para este tráfico; la app no se despliega. Quedan el dominio y, pendiente de confirmar, el uso de la API de Google, que serán unas pocas consultas al mes.

## 8. Riesgos y decisiones abiertas

| Tema | Detalle | Propuesta |
|---|---|---|
| Los datos de trabajo solo están en un ordenador | Si se pierde, se pierde lo que no está en `web.json`: productos ocultos (los de temporada), reseñas no seleccionadas y las excepciones ya pasadas | Que la app permita guardar y restaurar una copia de `datos.json` con sus fotos. Decidir dónde se guarda esa copia |
| `web.json` no sirve para reconstruir los datos de trabajo | Es un resumen: no trae lo oculto ni los códigos | Aceptarlo y apoyarse en la copia de seguridad |
| Editar `web.json` a mano | Es posible, pero la siguiente exportación lo sobrescribe | Los cambios se hacen siempre en la app |
| Fotos en el historial de Git | Una foto retirada (por ejemplo, la de un empleado, RF-87) desaparece de la web pero sigue en el historial | Repositorio privado, o reescribir el historial de esa foto si se exige borrado completo |
| Reseñas desactualizadas | Solo cambian al exportar | Exportar con cierta frecuencia |
| App sin firmar | En un ordenador distinto al que la compila, el sistema operativo avisará al abrirla | Compilarla en el equipo donde se usa |

Siguen abiertas, porque no dependen de esta arquitectura, las diferencias entre el diseño y la documentación funcional: web en un solo idioma, una sola etiqueta por producto, selección manual de reseñas (RF-49 y RF-94) y ausencia del consentimiento de imagen en Equipo (RF-46).

## 9. Qué pasa con lo anterior

El primer planteamiento era un backend con base de datos PostgreSQL y una API REST. Se descartó y sus ficheros (esquema SQL y contrato OpenAPI) se eliminaron del repositorio. La tabla recoge en qué se ha convertido cada pieza.

| Pieza anterior | Equivalente ahora |
|---|---|
| Base de datos | `datos.json`, en local |
| Tablas `categorias`, `productos`, `producto_alergenos` | `catalogo.categorias[].productos[]` |
| Tabla `sitio` | `portada`, `aviso`, `contacto` |
| Tablas `horario_semanal`, `cierres` | `horario` |
| Tablas `equipo`, `resenas` | `equipo[]`, `resenas` |
| Tablas `unidades`, `etiquetas`, `alergenos` | Listas cerradas de `datos.schema.json` |
| Tabla `medios` | Ficheros de `imagenes/` |
| Tablas `usuarios`, `sesiones` | No existen |
| Columnas `posicion` | Orden del array |
| Borrado lógico y `restaurar` | «Deshacer» en la app |
| `GET /web/*` | `contenido/web.json` |
| `/admin/*` | Comandos de Tauri (4.1) |
