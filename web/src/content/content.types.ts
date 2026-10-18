// Tipos de contenido/web.json (formato versión 2). Ver contenido/web.schema.json.

export type FotoPath = string | null;

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  precio: number | null;
  unidad: string;
  etiqueta: string | null;
  ingredientes: string;
  alergenos: Alergeno[];
  foto: FotoPath;
  fotoFicha: FotoPath;
}

export interface Categoria {
  id: string;
  nombre: string;
  productos: Producto[];
}

export interface Persona {
  id: string;
  nombre: string;
  puesto: string;
  descripcion: string;
  foto: FotoPath;
}

export interface Resena {
  autor: string;
  puntuacion: number;
  texto: string;
  publicadaEn: string;
}

export interface Resenas {
  valoracion: number | null;
  total: number;
  urlEscribir: string;
  urlTodas: string;
  lista: Resena[];
}

export interface Franja {
  abre: string;
  cierra: string;
}

export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type Semana = Record<DiaSemana, Franja[]>;

export interface Excepcion {
  fecha: string;
  abierto: boolean;
  motivo: string;
  horario?: Franja[];
}

export interface Horario {
  zonaHoraria: string;
  semana: Semana;
  excepciones: Excepcion[];
}

export type Red = 'instagram' | 'facebook' | 'tiktok';

export interface Contacto {
  direccion: string;
  localidad: string;
  telefono: { texto: string; enlace: string };
  whatsapp: { enlace: string };
  email: string;
  redes: Partial<Record<Red, string>>;
  urlMapa: string;
  urlComoLlegar: string;
}

export interface Aviso {
  texto: string;
  hasta: string | null;
}

export type Alergeno =
  | 'Gluten'
  | 'Crustáceos'
  | 'Huevos'
  | 'Pescado'
  | 'Cacahuetes'
  | 'Soja'
  | 'Leche'
  | 'Frutos de cáscara'
  | 'Apio'
  | 'Mostaza'
  | 'Sésamo'
  | 'Sulfitos'
  | 'Altramuces'
  | 'Moluscos';

export interface Contenido {
  version: 2;
  generadoEn: string;
  portada: { linea: string };
  aviso: Aviso | null;
  catalogo: Categoria[];
  equipo: Persona[];
  resenas: Resenas;
  horario: Horario;
  contacto: Contacto;
}
