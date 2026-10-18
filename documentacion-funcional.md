# Documentación funcional — Web de Panadería Rubicón

> **-Delicadamente pan-**

| Campo | Valor |
|---|---|
| Proyecto | Web corporativa de Panadería Rubicón |
| Versión del documento | 2.0 |
| Fecha | 03/10/2026 |
| Estado | Borrador para validación |

Los datos que aún no se conocen aparecen como **`[PENDIENTE]`** y están recogidos en la [checklist de contenidos](#12-checklist-de-contenidos-a-entregar).

**Cambios respecto a la versión 1.0 (25/09/2026):**

| Tema | Versión 1.0 | Versión 2.0 |
|---|---|---|
| Estructura | Multipágina (Inicio, Catálogo, Nosotros, Contacto) | **Una única página** con secciones y menú de anclas |
| Catálogo | Rejilla con filtros y URL por categoría | **Secciones por categoría con scroll lateral** |
| Ficha de producto | Página propia por producto | Desaparece. El detalle (ingredientes y alérgenos) se abre en un **panel** sobre la misma página |
| Productos destacados y accesos a categorías en Inicio | Sí | Desaparecen (el catálogo ya está en la misma página) |
| Estilo visual | Artesanal y cálido (cremas, marrones, texturas) | **Pastel, muy limpio y de gama alta** |
| Reseñas | No había | **Reseñas de Google** y enlace para escribir una |
| Dispositivo prioritario | Mobile-first | Mobile-first, con el **móvil como principal fuente de consumo** |

Se mantiene todo lo que el nuevo planteamiento no contradice: bilingüe ES/EN, redes sociales, alérgenos, mantenimiento por ficheros de datos y páginas legales.

---

## Índice

1. [Objetivo y alcance](#1-objetivo-y-alcance)
2. [Resumen de decisiones](#2-resumen-de-decisiones)
3. [Identidad de marca](#3-identidad-de-marca)
4. [Estructura del sitio y URLs](#4-estructura-del-sitio-y-urls)
5. [Elementos comunes](#5-elementos-comunes)
6. [Secciones de la página](#6-secciones-de-la-página)
7. [Modelo de contenidos (datos editables)](#7-modelo-de-contenidos-datos-editables)
8. [Idiomas](#8-idiomas)
9. [Cumplimiento normativo](#9-cumplimiento-normativo)
10. [Requisitos no funcionales](#10-requisitos-no-funcionales)
11. [Fuera de alcance](#11-fuera-de-alcance)
12. [Checklist de contenidos a entregar](#12-checklist-de-contenidos-a-entregar)
13. [Criterios de aceptación](#13-criterios-de-aceptación)

---

## 1. Objetivo y alcance

### 1.1 Objetivo

Crear una web **puramente informativa, de una sola página**, que:

- Presente Panadería Rubicón y su filosofía.
- Muestre el catálogo completo de productos, por secciones.
- Presente al equipo.
- Muestre las reseñas de Google e invite a dejar una.
- Facilite los datos para visitar o contactar con la tienda.
- Enlace a las redes sociales (Instagram, Facebook y TikTok).

La web debe percibirse como un trabajo de **diseño de gama alta**: elaborada, muy cuidada en el detalle y, a la vez, ligera.

### 1.2 Lo que la web **no** hace

- No vende (sin carrito, pagos ni pedidos).
- No gestiona reservas ni encargos.
- No tiene formulario de contacto ni recoge datos personales de los visitantes.
- No tiene área de usuarios ni panel de administración.

### 1.3 Público objetivo y dispositivo

- Vecinos y clientes habituales que consultan horario, teléfono o productos.
- Nuevos clientes que descubren la panadería por redes sociales, Google o buscadores.
- Visitantes o turistas que no hablan castellano (versión en inglés).

**La mayoría de las visitas llegarán desde el móvil.** El diseño y el desarrollo se plantean primero para móvil y después se amplían a escritorio, donde la web debe verse igual de cuidada.

---

## 2. Resumen de decisiones

| Tema | Decisión |
|---|---|
| Estructura | **Una única página** con cinco bloques: Introducción, Catálogo, Nosotros, Reseñas y Visítanos |
| Navegación | Menú superior con **anclas** que hacen scroll hasta cada sección |
| Páginas aparte | Solo las legales (obligatorias) y la 404 |
| Idiomas | Castellano (principal) e inglés |
| Dispositivos | Móvil (principal) y escritorio |
| Mantenimiento | Lo hace un desarrollador editando ficheros de datos separados del código (sin CMS) |
| Catálogo | Una sección por categoría, cada una con **scroll lateral**. Por producto: foto, descripción con ingredientes y precio orientativo |
| Detalle de producto | Panel sobre la misma página (sin URL propia) con ingredientes y alérgenos |
| Alérgenos | Los 14 alérgenos en el panel de detalle, más un aviso general de trazas |
| Empleados | Tarjetas con foto, nombre, puesto y descripción breve. Entre 5 y 10 personas, número variable |
| Reseñas | Reseñas de **Google** mostradas sin scripts de terceros, con enlace para ver todas y para escribir una |
| Contacto | Solo datos (sin formulario): mapa, horario, dirección, teléfono, WhatsApp y email |
| Tiendas | Una sola tienda |
| Mapa | Google Maps insertado **solo tras consentimiento** de cookies |
| Analítica | No se usa |
| Forma jurídica | Autónomo |
| Estilo visual | **Colores pastel, muy limpio, aspecto elaborado y de gama alta** |
| Logo | Existe solo en PNG/JPG (hay que conseguirlo en alta resolución o vectorizarlo) |
| Frase "Hecho con masa madre y paciencia" | En el footer |

---

## 3. Identidad de marca

### 3.1 Textos de marca

| Elemento | Castellano | Inglés |
|---|---|---|
| Nombre | Rubicón (nombre comercial: Panadería Rubicón) | No se traduce |
| Eslogan | -Delicadamente pan- | -Delicadamente pan- (se mantiene en castellano por ser marca) `[PENDIENTE: confirmar]` |
| Frase del footer | Hecho con masa madre y paciencia | Made with sourdough and patience `[PENDIENTE: confirmar traducción]` |

### 3.2 Logo

- Visible en la **cabecera** (lleva al inicio de la página), en grande en la **Introducción** y en el **footer**.
- Como hoy solo hay PNG/JPG, antes del desarrollo hay que:
  1. Conseguir el logo en **alta resolución (mín. 2000 px de ancho) y con fondo transparente**, o bien
  2. **Vectorizarlo a SVG** (recomendado: se ve nítido en cualquier pantalla y ocupa menos).
- A partir del logo se generan el favicon (16, 32 y 48 px), el icono para móviles (180 px, "apple-touch-icon") y la imagen para compartir en redes (Open Graph, 1200×630 px).
- El logo debe convivir con la nueva paleta pastel. Si sus colores actuales no encajan, se valora una versión monocroma `[PENDIENTE: confirmar con el cliente]`.

### 3.3 Estilo visual: pastel, limpio y de gama alta

Orientaciones para el diseño (se cierran en la fase de diseño gráfico):

- **Sensación general**: delicada, serena y muy cuidada, en línea con el eslogan. Debe parecer el trabajo de un estudio de diseño de primer nivel, no una plantilla.
- **Paleta**: tonos **pastel** suaves y desaturados (p. ej. mantequilla, rosa empolvado, salvia, melocotón, lavanda, azul cielo) sobre una base clara casi blanca. Pocos colores, usados con intención.
- **Texto**: los pastel se usan en **fondos y superficies**, nunca como color de texto. El texto va en un tono oscuro profundo para garantizar el contraste (ver 9.7).
- **Limpieza**: mucho espacio en blanco, rejilla rigurosa, pocos elementos por pantalla y ningún adorno gratuito. Sin texturas recargadas.
- **Tipografía**: con carácter editorial en los títulos y muy legible en los textos. Fuentes con licencia de uso web y alojadas en la propia web (ver 9.3).
- **Fotografía**: gran protagonismo, con luz natural y suave. Todas las fotos de producto con el mismo encuadre, fondo y proporción para que el catálogo se vea homogéneo.
- **Movimiento**: microinteracciones y transiciones sutiles que aporten sensación de calidad, sin penalizar el rendimiento y respetando `prefers-reduced-motion`.

---

## 4. Estructura del sitio y URLs

La web es **una sola página**. Las secciones no tienen URL propia sino un **ancla**, a la que se llega desde el menú o con un enlace directo.

| Sección | Nombre en menú (ES) | Ancla ES | Nombre en menú (EN) | Ancla EN |
|---|---|---|---|---|
| Introducción | (logo) | `/` | (logo) | `/en/` |
| Catálogo | Nuestro pan | `/#catalogo` | Our bakery | `/en/#catalogue` |
| Categoría del catálogo | — | `/#catalogo-{categoria}` | — | `/en/#catalogue-{category}` |
| Nosotros | Nosotros | `/#nosotros` | About us | `/en/#about` |
| Reseñas | Reseñas | `/#resenas` | Reviews | `/en/#reviews` |
| Visítanos | Visítanos | `/#visitanos` | Visit us | `/en/#visit` |

Los nombres del menú se validan con el cliente.

**Páginas aparte** (las únicas con URL propia):

| Página | URL ES | URL EN |
|---|---|---|
| Aviso legal | `/aviso-legal/` | `/en/legal-notice/` |
| Política de privacidad | `/privacidad/` | `/en/privacy/` |
| Política de cookies | `/cookies/` | `/en/cookies/` |
| Declaración de accesibilidad | `/accesibilidad/` | `/en/accessibility/` |
| Error 404 | cualquier URL inexistente | — |

> Los textos legales van en páginas propias, enlazadas desde el footer, porque la ley exige que sean accesibles de forma permanente, fácil y directa, y porque dentro de la página principal la harían innecesariamente larga.

Categorías del catálogo, en este orden:

| Categoría | Ancla ES | Ancla EN |
|---|---|---|
| Panes | `catalogo-panes` | `catalogue-breads` |
| Palmeritas | `catalogo-palmeritas` | `catalogue-palmeritas` |
| Empanadas | `catalogo-empanadas` | `catalogue-empanadas` |
| Palmeras | `catalogo-palmeras` | `catalogue-palmeras` |
| Otros | `catalogo-otros` | `catalogue-others` |

> "Palmeritas", "palmeras" y "empanadas" son productos típicos. En inglés se mantiene el nombre original con una descripción breve (p. ej. *Palmeras — puff pastry hearts*) `[PENDIENTE: confirmar]`.

---

## 5. Elementos comunes

### 5.1 Cabecera y menú

| ID | Requisito |
|---|---|
| RF-01 | Logo a la izquierda. Al pulsarlo se vuelve al principio de la página en el idioma activo. |
| RF-02 | Menú con **Nuestro pan, Nosotros, Reseñas y Visítanos**. Cada opción hace **scroll suave** hasta su sección (o salto directo si el usuario tiene activado `prefers-reduced-motion`). |
| RF-03 | La opción del menú correspondiente a la sección visible aparece **marcada** mientras se hace scroll. |
| RF-04 | Cabecera fija ("sticky") y compacta. Al saltar a una sección, el título de esta **no queda tapado** por la cabecera. |
| RF-05 | Selector de idioma **ES / EN**. Al cambiar de idioma se mantiene la **sección** en la que estaba el usuario. |
| RF-06 | En móvil el menú se resuelve de forma compacta (botón de menú o barra de anclas, a decidir en diseño), accesible con teclado y lector de pantalla, y con áreas táctiles de al menos 44×44 px. |
| RF-07 | Desde las páginas legales y la 404, las opciones del menú llevan a la sección correspondiente de la página principal. |

### 5.2 Footer

| ID | Contenido |
|---|---|
| RF-08 | **Logo** y la frase **"Hecho con masa madre y paciencia"** en un lugar destacado. |
| RF-09 | **Iconos de redes sociales**: Instagram, Facebook y TikTok. Se abren en pestaña nueva (`target="_blank" rel="noopener noreferrer"`) y cada uno tiene su texto accesible ("Instagram de Panadería Rubicón"). Si una red no tiene URL configurada, su icono no se muestra. |
| RF-10 | **Enlaces legales**: Aviso legal · Política de privacidad · Política de cookies · Declaración de accesibilidad · **Configurar cookies** (vuelve a abrir el panel de consentimiento). |
| RF-11 | **Copyright**: "© {año actual} Panadería Rubicón — {Nombre del titular}". El año se calcula automáticamente. |

El footer es breve: la dirección, el horario y los teléfonos ya están justo encima, en Visítanos, y no se repiten.

### 5.3 Redes sociales

Los enlaces a redes aparecen en el footer y en Visítanos. Son **enlaces normales** a los perfiles. **No se insertan feeds ni publicaciones** de Instagram, Facebook o TikTok, porque instalarían cookies de terceros y harían la web más pesada.

### 5.4 Banner de cookies

Ver [9.3 Cookies](#93-cookies-art-222-lssi-y-guía-aepd). Se muestra solo en la primera visita y cada vez que el usuario pulse "Configurar cookies". En móvil no debe tapar el contenido principal de la Introducción.

### 5.5 Aviso temporal (opcional, recomendado)

| ID | Requisito |
|---|---|
| RF-12 | Franja superior configurable desde un fichero de datos para anunciar cierres por vacaciones, festivos o cambios de horario. Tiene texto ES/EN, fecha de inicio y fecha de fin, y se oculta sola cuando termina el periodo. |

---

## 6. Secciones de la página

Orden de arriba abajo: **Introducción → Catálogo → Nosotros → Reseñas → Visítanos → Footer**.

### 6.1 Introducción

Objetivo: transmitir la marca en pocos segundos e invitar a seguir bajando.

| ID | Requisito |
|---|---|
| RF-13 | Primera pantalla con el **logo**, el nombre **Rubicón** y el eslogan **"-Delicadamente pan-"**, acompañados de una fotografía o composición visual cuidada. |
| RF-14 | **Texto de presentación breve** (2–4 líneas) sobre la panadería y su forma de trabajar. |
| RF-15 | Dos accesos: **"Ver nuestro pan"** (→ Catálogo) y **"Cómo llegar"** (→ Visítanos). |
| RF-16 | Indicador discreto de **estado de apertura** calculado con el horario: "Abierto ahora · hasta las 14:00" o "Cerrado · abrimos mañana a las 7:30". Tiene en cuenta los horarios especiales. |
| RF-17 | En móvil, todo lo anterior cabe en la primera pantalla sin necesidad de scroll (salvo el texto de presentación, que puede quedar justo debajo). |

### 6.2 Catálogo ("Nuestro pan")

#### 6.2.1 Organización

| ID | Requisito |
|---|---|
| RF-18 | El catálogo se divide en **5 secciones**, una por categoría, en este orden: **Panes, Palmeritas, Empanadas, Palmeras y Otros**. Cada sección tiene su título y, opcionalmente, una línea de descripción. |
| RF-19 | Dentro de cada sección, los productos se muestran en una **fila con scroll lateral**, de modo que el catálogo completo ocupe poca altura y la página no se haga larga ni pesada. El diseño puede proponer otra solución si queda mejor integrada, siempre que cumpla ese mismo objetivo. |
| RF-20 | El scroll lateral deja **asomar la tarjeta siguiente** para que se entienda que hay más, encaja las tarjetas al soltar (*scroll snap*) y **no avanza solo** (sin reproducción automática). |
| RF-21 | En escritorio hay **flechas** de anterior/siguiente, además del scroll con ratón, trackpad y teclado. Las flechas se desactivan al llegar a cada extremo. |
| RF-22 | Si una categoría tiene tan pocos productos que caben en pantalla, se muestran sin scroll ni flechas. |
| RF-23 | **Accesos rápidos a las categorías** (chips o pestañas) al principio del catálogo, que llevan a cada sección. |
| RF-24 | Dentro de cada categoría, los productos siguen el campo `orden` de los datos. |
| RF-25 | Los productos con `activo: false` no aparecen (sirve para retirar temporalmente los de temporada sin borrarlos). Una categoría sin productos activos no se muestra. |
| RF-26 | Aviso visible en el catálogo: *"Precios orientativos con IVA incluido. Pueden variar; consulta en tienda."* |
| RF-27 | Las fotos de los productos que no están en pantalla se cargan **de forma diferida** (ver 10.2). |

#### 6.2.2 Tarjeta de producto

| ID | Requisito |
|---|---|
| RF-28 | Cada tarjeta muestra: **foto**, **nombre**, **descripción breve** (máx. ~120 caracteres), **precio orientativo con su unidad** (por unidad, por kg, por ración…) y **etiquetas** si las tiene. |
| RF-29 | Si un producto no tiene precio, se muestra "Consultar en tienda". |
| RF-30 | Etiquetas iniciales: **Novedad**, **De temporada** y **Solo fines de semana**. Un producto puede tener ninguna o varias. Se pueden añadir más desde el fichero de etiquetas sin tocar código. |
| RF-31 | Toda la tarjeta es pulsable y abre el **detalle del producto**. |

#### 6.2.3 Detalle de producto

No es una página: es un **panel que se abre sobre la misma página** (hoja inferior en móvil, ventana centrada o lateral en escritorio).

| ID | Requisito |
|---|---|
| RF-32 | Contenido: foto grande, nombre, etiquetas, precio con unidad, descripción y **lista de ingredientes**. |
| RF-33 | En la lista de ingredientes, los que son alérgenos aparecen **resaltados** (en negrita). |
| RF-34 | **Alérgenos**: iconos con texto de los alérgenos que contiene, de entre los 14 oficiales (ver 9.5). Si no contiene ninguno, se indica "Sin alérgenos declarados". |
| RF-35 | Aviso general de trazas: *"Elaborado en un obrador donde se manipulan gluten, huevo, leche, frutos de cáscara, sésamo… Consulta en tienda si tienes alguna alergia o intolerancia."* `[PENDIENTE: el obrador confirma la lista real]`. |
| RF-36 | Botón "Pregúntanos por WhatsApp" con un mensaje precargado: "Hola, quería información sobre {producto}". |
| RF-37 | El panel se cierra con un botón visible, con la tecla Escape, pulsando fuera y con el botón "atrás" del móvil. Al cerrarlo, el usuario vuelve **exactamente al punto** del catálogo donde estaba. |
| RF-38 | El panel es accesible: atrapa el foco mientras está abierto, lo devuelve a la tarjeta al cerrarse y se anuncia como diálogo a los lectores de pantalla. |

### 6.3 Nosotros

| ID | Requisito |
|---|---|
| RF-39 | **Texto breve** sobre la panadería (1–2 párrafos): origen, filosofía y proceso. Puede acompañarse de una foto del obrador o del local. |
| RF-40 | **Equipo**: una **tarjeta por empleado** con **foto, nombre, puesto y descripción breve** (máx. ~200 caracteres). |
| RF-41 | Los empleados **se leen de un único fichero de datos** (ver 7.4). Para añadir, quitar o cambiar una persona **solo hay que editar ese fichero y su foto**, sin tocar plantillas, estilos ni código. |
| RF-42 | La composición se adapta a **cualquier número de empleados** (previsto entre 5 y 10, pero debe funcionar igual con 1 o con 15). En escritorio, si la última fila queda incompleta, va **centrada**. En móvil se resuelve de forma compacta para no alargar la página (p. ej. scroll lateral, igual que el catálogo). |
| RF-43 | El orden de aparición sigue el campo `orden`. |
| RF-44 | Si falta la foto de un empleado, se muestra una ilustración genérica acorde al estilo de la web, nunca una imagen rota. |
| RF-45 | Puesto y descripción son bilingües (ES/EN); el nombre no se traduce. |
| RF-46 | Solo se publica a los empleados con `activo: true` **y** `consentimiento_imagen: true` (ver 9.4). |

### 6.4 Reseñas

Objetivo: mostrar la opinión de los clientes en Google y animar a dejar una nueva.

| ID | Requisito |
|---|---|
| RF-47 | Se muestra la **valoración media** y el **número total de reseñas** de la ficha de Google de la panadería. |
| RF-48 | Se muestran **hasta 5 reseñas** con: nombre del autor tal como aparece en Google, puntuación en estrellas, texto y antigüedad. Los textos largos se recortan con un "Leer más". |
| RF-49 | Las reseñas se muestran **tal como están en Google**: sin editar el texto y **sin elegir a mano solo las positivas**. Se publican las que devuelve Google como más relevantes (ver 9.6). |
| RF-50 | Atribución visible: se indica que las reseñas proceden de **Google**, con su logotipo según sus guías de marca. |
| RF-51 | Botón **"Escribe una reseña"**, que abre en pestaña nueva el formulario de reseñas de Google de la panadería. |
| RF-52 | Enlace **"Ver todas las reseñas en Google"**, en pestaña nueva. |
| RF-53 | Las reseñas **no se cargan con scripts ni widgets de Google** en el navegador del visitante: se obtienen al publicar la web y se sirven como contenido propio, de modo que no instalan cookies ni necesitan consentimiento (ver 7.6 y 9.3). |
| RF-54 | **No se cargan las fotos de perfil** de los autores desde los servidores de Google. En su lugar se muestra un avatar con la inicial. |
| RF-55 | Si no hay reseñas disponibles (fallo de la fuente o ficha sin reseñas), el bloque muestra solo la invitación a escribir una y el enlace a Google, nunca un hueco vacío. |
| RF-56 | Las estrellas tienen equivalente en texto ("4,8 de 5") para lectores de pantalla. |

### 6.5 Visítanos

| ID | Bloque | Contenido |
|---|---|---|
| RF-57 | **Mapa** | Google Maps insertado **solo si el usuario ha aceptado las cookies de terceros**. Si no, se muestra un marcador de posición (mapa estático propio o ilustración) con el texto: *"El mapa lo proporciona Google y usa cookies. [Cargar mapa]"*. Al pulsar el botón se registra el consentimiento para esa categoría y se carga el mapa. |
| RF-58 | **Dirección** | Dirección postal completa. Botón **"Cómo llegar"** que abre Google Maps en una pestaña nueva con la ruta (enlace directo, sin cookies). |
| RF-59 | **Horario** | De lunes a domingo. Admite **varios tramos por día** (p. ej. 7:30–14:00 y 17:00–20:30) y días **cerrados**. El día actual aparece resaltado. |
| RF-60 | **Horarios especiales** | Lista opcional de fechas concretas con horario distinto o cierre (festivos, vacaciones). |
| RF-61 | **Teléfono** | Clicable (`tel:+34…`). |
| RF-62 | **WhatsApp** | Botón "Escribir por WhatsApp" (`https://wa.me/34XXXXXXXXX`). Con nota: *"WhatsApp solo para consultas; no se aceptan pedidos ni reservas"* `[PENDIENTE: confirmar]`. |
| RF-63 | **Email** | Clicable (`mailto:`). |
| RF-64 | **Redes sociales** | Iconos de Instagram, Facebook y TikTok. |

> Todos los datos de esta sección, el estado de apertura de la Introducción y los datos estructurados salen del mismo fichero `negocio` (7.2): **cambiar el horario o un teléfono implica editar un único sitio**.

En móvil, **llamar, WhatsApp y cómo llegar** son las acciones más importantes de la web y deben ser botones grandes y evidentes.

### 6.6 Páginas legales

Aviso legal, Privacidad, Cookies y Accesibilidad. Contenido detallado en la [sección 9](#9-cumplimiento-normativo). Son bilingües, se enlazan desde el footer y comparten cabecera, footer y estilo con la página principal.

### 6.7 Página 404

| ID | Requisito |
|---|---|
| RF-65 | Mensaje amable en el tono de la marca (p. ej. *"Esta hogaza se nos ha quemado…"*), con un botón para volver a la página principal. En el idioma de la URL solicitada. |

---

## 7. Modelo de contenidos (datos editables)

Principio clave: **el contenido va separado del código**. Todo lo que puede cambiar con el tiempo (productos, empleados, horario, teléfonos, redes, textos) está en ficheros de datos legibles (JSON o YAML) dentro de una carpeta `contenido/`. Un desarrollador actualiza la web editando esos ficheros y volviendo a publicar, sin tocar plantillas.

La estructura propuesta es orientativa. El formato exacto lo decide el equipo técnico, respetando los campos.

```
contenido/
├── negocio.json          # datos del negocio, contacto, horario, redes, Google, titular legal
├── avisos.json           # franja de avisos temporales
├── categorias.json       # las 5 categorías
├── etiquetas.json        # Novedad, De temporada...
├── productos/            # un fichero por producto
│   ├── pan-de-centeno.json
│   └── ...
├── equipo.json           # empleados
├── textos/               # textos fijos de la interfaz y de páginas
│   ├── es.json
│   └── en.json
└── imagenes/
    ├── productos/
    ├── equipo/
    └── general/
```

Las reseñas no se editan a mano: se obtienen de Google al publicar (7.6).

### 7.1 Campos bilingües

Todo texto visible que se traduzca usa la forma `{ "es": "...", "en": "..." }`. Si falta la traducción inglesa, se muestra el texto en castellano (nunca un hueco vacío) y el proceso de publicación avisa con un warning.

### 7.2 `negocio`

```json
{
  "nombre_comercial": "Panadería Rubicón",
  "eslogan": "-Delicadamente pan-",
  "frase_footer": { "es": "Hecho con masa madre y paciencia", "en": "Made with sourdough and patience" },
  "titular": {
    "nombre": "[PENDIENTE]",
    "nif": "[PENDIENTE]",
    "domicilio": "[PENDIENTE]"
  },
  "direccion": {
    "calle": "[PENDIENTE]",
    "cp": "[PENDIENTE]",
    "localidad": "[PENDIENTE]",
    "provincia": "[PENDIENTE]",
    "google_maps_url": "[PENDIENTE]",
    "lat": 0, "lng": 0
  },
  "google": {
    "place_id": "[PENDIENTE]",
    "url_resenas": "[PENDIENTE]",
    "url_escribir_resena": "https://search.google.com/local/writereview?placeid=[PENDIENTE]"
  },
  "telefono": "+34 [PENDIENTE]",
  "whatsapp": "+34 [PENDIENTE]",
  "email": "[PENDIENTE]",
  "redes": {
    "instagram": "https://www.instagram.com/[PENDIENTE]",
    "facebook": "https://www.facebook.com/[PENDIENTE]",
    "tiktok": "https://www.tiktok.com/@[PENDIENTE]"
  },
  "horario": {
    "lunes":     [["07:30", "14:00"], ["17:00", "20:30"]],
    "martes":    [["07:30", "14:00"], ["17:00", "20:30"]],
    "miercoles": [],
    "jueves":    [],
    "viernes":   [],
    "sabado":    [["08:00", "14:00"]],
    "domingo":   []
  },
  "horarios_especiales": [
    { "fecha": "2026-12-25", "tramos": [], "nota": { "es": "Cerrado por Navidad", "en": "Closed for Christmas" } }
  ]
}
```

(Una lista de tramos vacía significa **cerrado**. Los valores del ejemplo son ilustrativos. `telefono` y `whatsapp` pueden ser el mismo número.)

### 7.3 Producto

```json
{
  "id": "pan-de-centeno",
  "categoria": "panes",
  "nombre": { "es": "Pan de centeno", "en": "Rye bread" },
  "descripcion": { "es": "...", "en": "..." },
  "ingredientes": { "es": "Harina de **centeno**, agua, masa madre, sal", "en": "..." },
  "precio": 3.50,
  "unidad": "unidad",
  "imagen": "productos/pan-de-centeno.webp",
  "alergenos": ["gluten"],
  "etiquetas": ["novedad"],
  "orden": 10,
  "activo": true
}
```

- `descripcion`: texto breve de la tarjeta (máx. ~120 caracteres).
- `ingredientes`: lista completa, con los alérgenos marcados para que se resalten.
- `precio`: número en euros, **IVA incluido**, opcional.
- `unidad`: uno de `unidad`, `kg`, `racion`, `docena`, `bandeja` (ampliable).
- `alergenos`: valores de la lista cerrada de 9.5.
- `imagen`: una foto por producto, todas con la misma proporción (recomendado 4:5 o 1:1).

### 7.4 Empleado (`equipo.json`)

```json
[
  {
    "id": "empleado-1",
    "nombre": "[PENDIENTE]",
    "puesto": { "es": "Maestro panadero", "en": "Master baker" },
    "descripcion": { "es": "...", "en": "..." },
    "foto": "equipo/empleado-1.webp",
    "orden": 1,
    "activo": true,
    "consentimiento_imagen": true
  }
]
```

**Cómo se mantiene el equipo:**

| Acción | Qué hay que hacer |
|---|---|
| Añadir empleado | Añadir un objeto al fichero, subir su foto a `imagenes/equipo/` y guardar su consentimiento firmado. |
| Quitar empleado | Borrar el objeto (o poner `activo: false`) y borrar su foto. |
| Cambiar puesto o descripción | Editar los campos del objeto. |
| Reordenar | Cambiar los valores de `orden`. |

Fotos del equipo: todas con el **mismo encuadre, fondo y proporción** (recomendado 4:5 o 1:1, mín. 800 px) para que las tarjetas se vean uniformes.

### 7.5 Categorías y etiquetas

```json
// categorias.json
[
  { "id": "panes",      "ancla": { "es": "panes", "en": "breads" },          "nombre": { "es": "Panes", "en": "Breads" },           "descripcion": { "es": "...", "en": "..." }, "orden": 1 },
  { "id": "palmeritas", "ancla": { "es": "palmeritas", "en": "palmeritas" }, "nombre": { "es": "Palmeritas", "en": "Palmeritas" }, "descripcion": { "es": "...", "en": "..." }, "orden": 2 },
  { "id": "empanadas",  "ancla": { "es": "empanadas", "en": "empanadas" },   "nombre": { "es": "Empanadas", "en": "Empanadas" },   "descripcion": { "es": "...", "en": "..." }, "orden": 3 },
  { "id": "palmeras",   "ancla": { "es": "palmeras", "en": "palmeras" },     "nombre": { "es": "Palmeras", "en": "Palmeras" },     "descripcion": { "es": "...", "en": "..." }, "orden": 4 },
  { "id": "otros",      "ancla": { "es": "otros", "en": "others" },          "nombre": { "es": "Otros", "en": "Others" },          "descripcion": { "es": "...", "en": "..." }, "orden": 5 }
]

// etiquetas.json
[
  { "id": "novedad",        "nombre": { "es": "Novedad", "en": "New" } },
  { "id": "temporada",      "nombre": { "es": "De temporada", "en": "Seasonal" } },
  { "id": "fin-de-semana",  "nombre": { "es": "Solo fines de semana", "en": "Weekends only" } }
]
```

### 7.6 Reseñas de Google

| ID | Requisito |
|---|---|
| RF-66 | Al publicar la web se consultan la valoración media, el número de reseñas y las reseñas de la ficha de Google (a partir de `google.place_id`) mediante la API oficial de Google `[PENDIENTE: confirmar el uso de la API, que requiere cuenta de Google Cloud y puede tener coste]`. |
| RF-67 | La web se **vuelve a publicar automáticamente de forma periódica** (p. ej. una vez por semana) para que las reseñas y la valoración no queden desactualizadas, respetando las condiciones de uso de Google sobre almacenamiento y atribución. |
| RF-68 | Si la consulta falla, la publicación **no se detiene**: se conservan los últimos datos válidos o se aplica RF-55, y se muestra un aviso al desarrollador. |
| RF-69 | Las reseñas se muestran en su idioma original en ambas versiones de la web. |

### 7.7 Validación de datos

| ID | Requisito |
|---|---|
| RF-70 | Al compilar o publicar se validan los datos, y la publicación **falla con un mensaje claro** si: un producto apunta a una categoría, etiqueta o alérgeno inexistente; falta una imagen referenciada; hay dos `id` repetidos; o falta un campo obligatorio (nombre, categoría). |
| RF-71 | Si falta la traducción inglesa o la foto de un empleado, la publicación no se detiene pero muestra un aviso. |

---

## 8. Idiomas

| ID | Requisito |
|---|---|
| RF-72 | Idioma por defecto: **castellano**, en la raíz (`/`). Inglés en `/en/`. |
| RF-73 | La primera visita **no redirige automáticamente** según el idioma del navegador; como mucho, se muestra un aviso discreto "This site is also available in English". |
| RF-74 | El selector de idioma mantiene la sección en la que estaba el usuario (RF-05). |
| RF-75 | Cada página declara su idioma (`<html lang="es">` / `lang="en"`) y sus alternativas (`<link rel="alternate" hreflang="…">`). |
| RF-76 | **Todos** los textos propios se traducen, también los legales, el banner de cookies, la 404 y los textos alternativos de las imágenes. Las reseñas de Google se muestran en su idioma original. |
| RF-77 | Formatos: horas en formato 24 h en ambos idiomas; precios como `3,50 €` en ES y `€3.50` en EN. |

---

## 9. Cumplimiento normativo

> **Nota importante**: esta sección recoge los requisitos legales identificados para una web informativa de un autónomo en España. **No sustituye el asesoramiento jurídico.** Se recomienda que un profesional (abogado o gestoría) revise los textos legales definitivos antes de publicar.

### 9.1 LSSI-CE (Ley 34/2002) — Aviso legal

Aunque la web no venda, es un servicio de la sociedad de la información vinculado a una actividad económica, así que el **art. 10 LSSI** obliga a publicar, de forma permanente, fácil, directa y gratuita:

| Dato | Valor |
|---|---|
| Nombre y apellidos del titular (autónomo) | `[PENDIENTE]` |
| NIF | `[PENDIENTE]` |
| Domicilio | `[PENDIENTE]` |
| Email de contacto | `[PENDIENTE]` |
| Teléfono | `[PENDIENTE]` |
| Nombre comercial | Panadería Rubicón |
| Autorizaciones administrativas / Registro Sanitario (RGSEAA) si aplica | `[PENDIENTE: confirmar si procede publicarlo]` |

El Aviso legal incluye además: condiciones de uso de la web, propiedad intelectual (textos, fotos y logo), exclusión de responsabilidad sobre enlaces externos (redes sociales y Google), aclaración de que **precios y productos son informativos y no constituyen una oferta contractual**, origen de las reseñas mostradas (9.6) y legislación aplicable.

Que la web sea de una sola página no cambia esta obligación: el Aviso legal está en una página propia, enlazada desde el footer y accesible con un solo clic.

### 9.2 RGPD (Reglamento UE 2016/679) y LOPDGDD (LO 3/2018) — Política de privacidad

La web **no tiene formularios**, pero sí hay tratamiento de datos personales:

1. **Personas que contactan** por email, teléfono o WhatsApp a través de los enlaces de la web.
2. **Datos técnicos** (dirección IP) que registra el servidor de alojamiento.
3. **Imagen y datos de los empleados** publicados en Nosotros (ver 9.4).
4. **Google Maps**, que trata datos cuando se carga el mapa.
5. **Reseñas de Google**: se reproduce el nombre público y el texto de quienes las han escrito (ver 9.6).

La Política de privacidad debe incluir: responsable del tratamiento (datos del titular), finalidades, base legal, plazos de conservación, destinatarios y encargados (proveedor de hosting, Google, Meta/WhatsApp), transferencias internacionales (Google y Meta, amparadas en el EU-US Data Privacy Framework), derechos (acceso, rectificación, supresión, oposición, limitación y portabilidad) y cómo ejercerlos, y derecho a reclamar ante la **AEPD**.

Obligaciones internas asociadas (fuera de la web, pero necesarias):
- Registro de actividades de tratamiento (simplificado para autónomos).
- **Contrato de encargo del tratamiento** con el proveedor de hosting.

### 9.3 Cookies (art. 22.2 LSSI y Guía AEPD)

| Tipo | Cookies | ¿Necesita consentimiento? |
|---|---|---|
| Técnicas | Preferencia de idioma (si se guarda) y registro del propio consentimiento | No |
| Terceros / funcionales | **Google Maps** insertado | **Sí** |
| Reseñas de Google | Ninguna: se sirven como contenido propio (RF-53) | — |
| Analítica | Ninguna | — |
| Publicidad | Ninguna | — |

| ID | Requisito |
|---|---|
| RF-78 | En la primera visita aparece un **banner de cookies** con tres botones al mismo nivel y con la misma visibilidad: **Aceptar**, **Rechazar** y **Configurar**. Rechazar debe ser igual de fácil que aceptar. |
| RF-79 | **No se carga ninguna cookie no técnica** (Google Maps) antes del consentimiento. |
| RF-80 | El consentimiento se guarda como mucho **24 meses** y después se vuelve a pedir. |
| RF-81 | El enlace "Configurar cookies" del footer permite cambiar o retirar el consentimiento en cualquier momento. |
| RF-82 | La Política de cookies enumera cada cookie: nombre, titular, finalidad y duración. |
| RF-83 | **No** se usan fuentes de Google Fonts cargadas desde servidores de Google ni otros recursos de terceros que transmitan la IP sin consentimiento: las fuentes, los iconos y los datos de las reseñas se alojan en el propio servidor. |
| RF-84 | Los iconos de redes sociales y los botones de reseñas son **enlaces simples** (sin scripts ni widgets de Meta, TikTok o Google). |

### 9.4 Derechos de imagen de los empleados (LO 1/1982 y RGPD)

| ID | Requisito |
|---|---|
| RF-85 | Antes de publicar la foto, el nombre y la descripción de cada empleado hay que obtener su **consentimiento expreso, por escrito, específico para la web**, e informarle de que puede retirarlo en cualquier momento. |
| RF-86 | El consentimiento es **voluntario**: no puede ser condición del puesto de trabajo. Si alguien no lo da, no se le publica (o se publica sin foto si lo acepta así). |
| RF-87 | Si un empleado deja la empresa o retira su consentimiento, sus datos y su foto se **retiran de la web en un plazo máximo de `[PENDIENTE: p. ej. 7 días]`**, borrando también el fichero de imagen del servidor. |
| RF-88 | Solo se publica el **nombre de pila** (o nombre y un apellido si el empleado lo prefiere). Nunca datos de contacto personales. |

Se adjuntará un **modelo de autorización de uso de imagen** para que lo firme cada empleado `[PENDIENTE: redactar con asesoría]`.

### 9.5 Información alimentaria — Alérgenos (Reglamento UE 1169/2011 y RD 126/2015)

Estrictamente, la obligación de informar sobre alérgenos antes de la compra se aplica a la **venta a distancia**, que esta web no hace. Aun así, como el catálogo publica los ingredientes de cada producto, se decide mostrar también los alérgenos para dar información completa y evitar confusiones. Por eso:

| ID | Requisito |
|---|---|
| RF-89 | Se usa la lista oficial de los **14 alérgenos**: gluten, crustáceos, huevos, pescado, cacahuetes, soja, leche, frutos de cáscara, apio, mostaza, sésamo, dióxido de azufre y sulfitos, altramuces y moluscos. |
| RF-90 | Cada alérgeno se muestra con **icono y texto** (nunca solo con icono, por accesibilidad) y, además, resaltado dentro de la lista de ingredientes (RF-33). |
| RF-91 | Hay un aviso visible de que la información es orientativa y de que **la información válida es la disponible en tienda**, con la recomendación de consultar al personal en caso de alergia. |
| RF-92 | Los ingredientes y alérgenos los facilita y **valida el propio obrador**. Cualquier cambio de receta obliga a actualizar el producto. |

### 9.6 Reseñas de clientes (RDL 1/2007, art. 20.3, y Ley 3/1991 de Competencia Desleal, art. 27)

Desde la transposición de la Directiva "Ómnibus", quien muestra reseñas de consumidores debe informar de si garantiza que proceden de clientes reales y cómo, y se considera práctica desleal publicar reseñas falsas o presentar solo las favorables de forma engañosa.

| ID | Requisito |
|---|---|
| RF-93 | Junto a las reseñas se muestra un aviso breve: *"Reseñas publicadas por usuarios en Google. Panadería Rubicón no las verifica ni las modifica."* |
| RF-94 | No se seleccionan a mano las reseñas favorables ni se ocultan las negativas: se muestran las que devuelve Google y la valoración media real (RF-49). |
| RF-95 | No se ofrecen descuentos, regalos ni ninguna otra contraprestación a cambio de reseñas. El botón "Escribe una reseña" es una invitación neutra. |
| RF-96 | Se cumplen las condiciones de uso de Google para mostrar sus reseñas: atribución a Google, nombre del autor y texto sin alterar. |
| RF-97 | Si el autor de una reseña pide que deje de mostrarse su nombre en la web, se retira esa reseña. Las reseñas borradas en Google desaparecen de la web en la siguiente publicación periódica (RF-67). |

### 9.7 Precios (RDL 1/2007, Ley General para la Defensa de Consumidores y Usuarios)

| ID | Requisito |
|---|---|
| RF-98 | Los precios mostrados son **finales, con IVA incluido**, y así se indica. |
| RF-99 | Se indica que son **orientativos** y pueden cambiar sin previo aviso, y que manda el precio en tienda. |

### 9.8 Accesibilidad

La **Ley 11/2023** (que traspone la Directiva Europea de Accesibilidad, exigible desde el 28/06/2025) se aplica sobre todo a servicios de comercio electrónico, y las microempresas de servicios están exentas. Esta web no vende, así que **en principio no es obligatoria**. Aun así, se fija como objetivo **WCAG 2.2 nivel AA** porque:
- Amplía el público (personas mayores, con baja visión, etc.).
- Mejora el SEO y la usabilidad.
- Deja la web preparada si en el futuro se añade venta online.

| ID | Requisito |
|---|---|
| RF-100 | Contraste mínimo de 4,5:1 en texto normal y 3:1 en texto grande e iconos. **Punto crítico con una paleta pastel**: los pastel van en fondos y el texto en un tono oscuro; nunca texto pastel sobre blanco ni texto blanco sobre pastel. |
| RF-101 | Toda la web se puede usar solo con teclado, con el foco siempre visible. Esto incluye las filas con scroll lateral, sus flechas y el panel de producto. |
| RF-102 | Todas las imágenes informativas llevan texto alternativo (`alt`) en su idioma; las decorativas, `alt=""`. |
| RF-103 | Estructura semántica: un único `h1`, jerarquía de encabezados correcta (cada sección con su `h2`) y *landmarks* (`header`, `nav`, `main`, `footer`). |
| RF-104 | Enlace "Saltar al contenido" al principio de la página. |
| RF-105 | Se respeta `prefers-reduced-motion`: sin animaciones ni scroll suave para quien lo haya configurado. |
| RF-106 | Texto ampliable al 200 % sin que se pierda contenido. |
| RF-107 | Ningún contenido se mueve solo: sin carruseles con avance automático. |
| RF-108 | Página de **Declaración de accesibilidad** con el nivel alcanzado y un email para comunicar problemas. |

### 9.9 Propiedad intelectual

| ID | Requisito |
|---|---|
| RF-109 | Todas las fotos, textos, fuentes e iconos usados deben ser propios o tener licencia de uso comercial. Si hay fotógrafo externo, hay que conseguir la **cesión de derechos por escrito**. |
| RF-110 | Los logotipos de Instagram, Facebook, TikTok, WhatsApp y Google se usan según las guías de marca de cada plataforma. |

### 9.10 Resumen de obligaciones legales

| Obligación | Norma | Dónde se cumple |
|---|---|---|
| Identificación del titular | LSSI art. 10 | Aviso legal |
| Información sobre el tratamiento de datos | RGPD art. 13 | Política de privacidad |
| Consentimiento de cookies | LSSI art. 22.2 | Banner de cookies + Política de cookies |
| Consentimiento de imagen de empleados | LO 1/1982, RGPD art. 6 y 7 | Documento firmado (interno) + RF-46 |
| Transparencia sobre las reseñas | RDL 1/2007 art. 20.3, Ley 3/1991 art. 27 | Sección Reseñas (RF-93 a RF-97) |
| Precio final con impuestos | RDL 1/2007 | Catálogo y panel de producto |
| Alérgenos (voluntario, recomendado) | Reg. UE 1169/2011 | Panel de producto |
| Accesibilidad (voluntario, recomendado) | Ley 11/2023 / WCAG 2.2 AA | Toda la web + Declaración |
| Contrato con el hosting | RGPD art. 28 | Documento interno |

---

## 10. Requisitos no funcionales

### 10.1 Diseño adaptable (responsive)

| ID | Requisito |
|---|---|
| RNF-01 | Diseño *mobile-first*: **el móvil es el dispositivo principal** y el que se diseña y valida primero. Se valida en 360 px, 390 px, 768 px, 1024 px y 1440 px de ancho. |
| RNF-02 | La página nunca tiene scroll horizontal. El único scroll lateral es el de las filas del catálogo (y del equipo en móvil), contenido dentro de su fila. |
| RNF-03 | Los botones y enlaces táctiles miden al menos 44×44 px. |
| RNF-04 | La versión de escritorio no es la de móvil estirada: aprovecha el ancho con una composición propia e igual de cuidada. |

### 10.2 Rendimiento

Al concentrarse todo en una sola página, el peso es el principal riesgo técnico.

| ID | Requisito |
|---|---|
| RNF-05 | Lighthouse ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO (en móvil). |
| RNF-06 | Core Web Vitals en verde: LCP < 2,5 s, CLS < 0,1, INP < 200 ms. |
| RNF-07 | Imágenes en formato moderno (WebP/AVIF) con varios tamaños (`srcset`) y dimensiones declaradas para evitar saltos de maquetación. |
| RNF-08 | **Carga diferida** de todo lo que no está en la primera pantalla: fotos del catálogo (también las que quedan fuera de la vista dentro de cada fila), del equipo y el mapa. Solo la imagen de la Introducción se carga con prioridad. |
| RNF-09 | Peso de la carga inicial (lo necesario para ver la primera pantalla) por debajo de **500 KB** en móvil `[objetivo orientativo]`. |
| RNF-10 | Las animaciones usan solo propiedades que no provocan saltos de maquetación (`transform`, `opacity`) y no bloquean el scroll. |
| RNF-11 | El proceso de publicación optimiza automáticamente las imágenes originales que se suban: el mantenedor sube la foto sin preocuparse del peso. |

### 10.3 SEO y compartición en redes

| ID | Requisito |
|---|---|
| RNF-12 | `<title>` y `meta description` propios en cada idioma, tanto en la página principal como en las legales. |
| RNF-13 | Etiquetas **Open Graph** y **Twitter Card** con imagen, para que al compartir el enlace en WhatsApp o redes se vea bien. |
| RNF-14 | Datos estructurados **schema.org** `Bakery`, con dirección, teléfono, horario (`openingHoursSpecification`), geolocalización y `sameAs` con las redes. Las reseñas de Google **no** se marcan como datos estructurados (Google no las admite cuando proceden de terceros). |
| RNF-15 | `sitemap.xml` generado automáticamente (con alternativas de idioma) y `robots.txt`. |
| RNF-16 | Todo el contenido de la página (catálogo y equipo incluidos) está en el HTML inicial, no se carga después con JavaScript, para que los buscadores lo indexen. |
| RNF-17 | Recomendación (fuera de la web): mantener la ficha de **Google Business Profile** con los mismos datos que la web. Es además la fuente de las reseñas. |

### 10.4 Seguridad y alojamiento

| ID | Requisito |
|---|---|
| RNF-18 | HTTPS obligatorio, con redirección de HTTP a HTTPS y de `www` a la versión canónica (o al revés). |
| RNF-19 | Cabeceras de seguridad básicas (HSTS, X-Content-Type-Options, Referrer-Policy y Content-Security-Policy compatible con Google Maps). |
| RNF-20 | Hosting con servidores en la UE, o con garantías RGPD y contrato de encargo del tratamiento. |
| RNF-21 | La clave de la API de Google se usa solo en el proceso de publicación y **nunca se expone** en el código que llega al navegador. |
| RNF-22 | Dominio propio `[PENDIENTE: p. ej. panaderiarubicon.es / .com]`. |

### 10.5 Compatibilidad

| ID | Requisito |
|---|---|
| RNF-23 | Últimas 2 versiones de Chrome, Safari (macOS e iOS), Firefox y Edge, y Samsung Internet. |
| RNF-24 | Con JavaScript desactivado, el contenido sigue siendo legible: el menú funciona como enlaces de ancla y las filas del catálogo siguen pudiendo desplazarse. |

### 10.6 Mantenibilidad

| ID | Requisito |
|---|---|
| RNF-25 | Ningún dato de negocio (horarios, teléfonos, productos, empleados o redes) está escrito directamente en las plantillas: todo sale de `contenido/`. |
| RNF-26 | Se incluye un `README` con instrucciones paso a paso para: añadir, editar o retirar un producto; añadir o retirar un empleado; cambiar el horario; publicar un aviso temporal; y desplegar. |
| RNF-27 | Recomendación técnica (no vinculante): **generador de sitios estáticos** (p. ej. Astro, Eleventy o Hugo) con despliegue automático al hacer cambios en el repositorio y republicación programada para las reseñas. Es rápido y barato de alojar, tiene poca superficie de ataque y encaja con el mantenimiento por ficheros. |

---

## 11. Fuera de alcance

Queda fuera de esta versión, aunque se podría estudiar en el futuro:

- Venta online, pedidos o encargos.
- Reservas.
- Formulario de contacto o newsletter.
- Panel de administración (CMS) para personas sin conocimientos técnicos.
- Páginas propias por producto o por categoría.
- Buscador o filtros dentro del catálogo.
- Blog o noticias.
- Feed de Instagram o TikTok insertado.
- Widget oficial de reseñas de Google o reseñas de otras plataformas.
- Analítica web.
- Más tiendas.
- Otros idiomas además de castellano e inglés.

---

## 12. Checklist de contenidos a entregar

### Datos del negocio y legales
- [ ] Nombre y apellidos del titular (autónomo)
- [ ] NIF
- [ ] Domicilio fiscal
- [ ] Nº de Registro Sanitario (RGSEAA), si procede
- [ ] Dirección de la tienda y enlace de Google Maps
- [ ] Teléfono
- [ ] WhatsApp
- [ ] Email de contacto
- [ ] Horario semanal (con tramos) y festivos o cierres conocidos
- [ ] URL de Instagram
- [ ] URL de Facebook
- [ ] URL de TikTok
- [ ] Dominio deseado
- [ ] Plazo de retirada de datos de un empleado que se va (RF-87)
- [ ] Revisión de los textos legales por un asesor

### Google
- [ ] Enlace a la ficha de Google Business Profile de la panadería (de ahí se obtiene el `place_id`)
- [ ] Decisión sobre el uso de la API de Google para las reseñas (cuenta de Google Cloud y posible coste)

### Marca
- [ ] Logo en alta resolución con fondo transparente, o archivo para vectorizar
- [ ] Colores corporativos, si ya existen, y si el logo puede adaptarse a la paleta pastel
- [ ] Validar la traducción inglesa del eslogan y de la frase del footer
- [ ] Validar los nombres del menú ("Nuestro pan", "Nosotros", "Reseñas", "Visítanos")

### Introducción
- [ ] Imagen principal
- [ ] Texto breve de presentación

### Catálogo
- [ ] Listado de productos por categoría (Panes, Palmeritas, Empanadas, Palmeras y Otros)
- [ ] Por cada producto: nombre, descripción breve, lista de ingredientes, precio y unidad, alérgenos y etiquetas
- [ ] Fotografía de cada producto (mismo estilo, fondo y encuadre)
- [ ] Lista de alérgenos que se manipulan en el obrador (aviso de trazas)

### Nosotros
- [ ] Texto breve sobre la panadería (ES; la traducción EN se puede encargar)
- [ ] Foto del obrador o del local (opcional)
- [ ] Por cada empleado: nombre, puesto, descripción breve, foto y **autorización de imagen firmada**

---

## 13. Criterios de aceptación

La web se da por terminada cuando:

1. Toda la información está en **una única página** con Introducción, Catálogo, Nosotros, Reseñas y Visítanos, en **castellano y en inglés**; el menú lleva a cada sección y marca la sección visible.
2. El catálogo muestra las 5 categorías como secciones con scroll lateral; cada tarjeta tiene foto, nombre, descripción, precio y etiquetas, y el panel de detalle incluye ingredientes y alérgenos.
3. El scroll lateral funciona con el dedo, con ratón, con las flechas y con teclado, y no provoca scroll horizontal de la página.
4. **Añadir un empleado** consiste solo en editar `equipo.json` y subir una foto; el equipo se ve bien con 5, 7 y 10 empleados en móvil y en escritorio (se prueba con los tres casos).
5. Cambiar el horario en `negocio.json` lo actualiza a la vez en Visítanos, en el estado de apertura de la Introducción y en los datos estructurados.
6. La sección de Reseñas muestra la valoración media y reseñas reales de Google con su atribución y aviso, y los botones "Escribe una reseña" y "Ver todas" abren la ficha correcta.
7. El logo aparece en la cabecera, en la Introducción y en el footer; **"-Delicadamente pan-"** aparece en la Introducción; **"Hecho con masa madre y paciencia"** aparece en el footer.
8. Los enlaces a Instagram, Facebook y TikTok funcionan y se abren en una pestaña nueva.
9. El teléfono, el WhatsApp y el email funcionan al pulsarlos en móvil.
10. Google Maps **no se carga** ni instala cookies hasta que el usuario lo consiente, rechazar es igual de fácil que aceptar, y la página no hace ninguna petición a servidores de terceros antes del consentimiento.
11. Las 4 páginas legales y la 404 existen en ambos idiomas, y el Aviso legal contiene todos los datos del art. 10 LSSI.
12. Lighthouse móvil ≥ 90 en las cuatro métricas.
13. Sin errores de nivel A/AA en una auditoría automática (axe o WAVE), contraste verificado en toda la paleta pastel y revisión manual de la navegación con teclado.
14. La web se ha revisado en un móvil real (iOS y Android) y en escritorio.
15. Existe el `README` de mantenimiento (RNF-26).
