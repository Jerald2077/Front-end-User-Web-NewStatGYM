/* Datos del sistema y utilidades compartidas (solo frontend, localStorage) */

// Disciplinas: estado "activa" se puede elegir, "suspendida" no
const DISCIPLINAS = [
  { id: 'musculacion', nombre: 'Musculación', icono: 'fa-dumbbell', estado: 'activa', pagina: 'principal.html' },
  { id: 'funcional',   nombre: 'Funcional',   icono: 'fa-person-running', estado: 'activa', pagina: 'boxeo.html' },
  { id: 'spinning',    nombre: 'Spinning',    icono: 'fa-person-biking', estado: 'activa', pagina: 'boxeo.html' },
  { id: 'boxing',      nombre: 'Boxing',      img: 'BoxingIcon.png', estado: 'activa', pagina: 'boxeo.html' },
  { id: 'powerjump',   nombre: 'Power jump',  img: 'PowerJumpIcon.png', estado: 'activa', pagina: 'boxeo.html' },
  { id: 'pilates',     nombre: 'Pilates',     img: 'PilatesIcon.png', estado: 'activa', pagina: 'boxeo.html' }
];

// Ejercicios por grupo muscular
const EJERCICIOS = {
  'tren-superior': [
    { id: 'press-banca', nombre: 'Press banca',            detalle: 'Barra - pecho medio',       categoria: 'pecho',   video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'apertura',   nombre: 'Apertura con mancuernas', detalle: 'Mancuernas - Pecho medio',  categoria: 'pecho',   video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'remo',       nombre: 'Remo mentón',             detalle: 'Barra - Espalda',           categoria: 'espalda', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'flexiones',  nombre: 'Flexiones diamante',      detalle: 'peso corporal - Pecho inf.', categoria: 'pecho',   video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ],
  'core': [
    { id: 'plancha', nombre: 'Plancha',           detalle: 'peso corporal - Core', categoria: 'core', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'crunch',  nombre: 'Crunch abdominal',  detalle: 'peso corporal - Core', categoria: 'core', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ],
  'tren-inferior': [
    { id: 'sentadilla',  nombre: 'Sentadilla',  detalle: 'Barra - Cuádriceps', categoria: 'piernas', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'peso-muerto', nombre: 'Peso muerto', detalle: 'Barra - Femoral',    categoria: 'piernas', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ],
  'hombros': [
    { id: 'press-militar',       nombre: 'Press militar',          detalle: 'Barra - Deltoides anterior',  categoria: 'deltoides', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'elevacion-lateral',   nombre: 'Elevación lateral',      detalle: 'Mancuernas - Deltoides lat.', categoria: 'deltoides', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'pajaros',             nombre: 'Pájaros',                detalle: 'Mancuernas - Deltoides post.', categoria: 'deltoides', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'encogimientos',       nombre: 'Encogimientos',          detalle: 'Barra - Trapecios',           categoria: 'trapecios', video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ],
  'brazos': [
    { id: 'curl-biceps',         nombre: 'Curl de bíceps',         detalle: 'Barra - Bíceps',             categoria: 'biceps',   video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'curl-martillo',       nombre: 'Curl martillo',          detalle: 'Mancuernas - Braquial',      categoria: 'biceps',   video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'extension-triceps',   nombre: 'Extensión tríceps polea', detalle: 'Polea - Tríceps',           categoria: 'triceps',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'fondos-paralelas',    nombre: 'Fondos en paralelas',    detalle: 'Peso corporal - Tríceps',    categoria: 'triceps',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ],
  'gluteos': [
    { id: 'hip-thrust',          nombre: 'Hip thrust',             detalle: 'Barra - Glúteos',            categoria: 'glúteos',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'sentadilla-sumo',     nombre: 'Sentadilla sumo',        detalle: 'Barra - Glúteos/Aductores',  categoria: 'glúteos',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'peso-muerto-rumano',  nombre: 'Peso muerto rumano',     detalle: 'Barra - Glúteos/Femoral',    categoria: 'glúteos',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' },
    { id: 'patada-gluteo',       nombre: 'Patada de glúteo',       detalle: 'Máquina - Glúteos',          categoria: 'glúteos',  video: 'https://www.youtube.com/watch?v=gS5KGm4wp1g' }
  ]
};

const PLAN_DIAS = 5; // dias habiles del gym por semana

// --- Utilidades de almacenamiento ---
const guardar = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
const leer = (clave, porDefecto) => JSON.parse(localStorage.getItem(clave)) ?? porDefecto;

// Numero de semana del año, para reiniciar el contador cada semana
function semanaActual() {
  const f = new Date();
  const inicio = new Date(f.getFullYear(), 0, 1);
  return f.getFullYear() + '-' + Math.ceil(((f - inicio) / 86400000 + inicio.getDay() + 1) / 7);
}

// Asistencia: devuelve los dias marcados de la semana en curso
function asistencia() {
  const dato = leer('asistencia', { semana: '', dias: [] });
  if (dato.semana !== semanaActual()) return { semana: semanaActual(), dias: [] };
  return dato;
}

// Nota efímera: se borra a las 2.5 horas de guardada
function leerNota() {
  const n = leer('nota', null);
  if (n && Date.now() - n.hora < 2.5 * 3600 * 1000) return n.texto;
  localStorage.removeItem('nota');
  return '';
}
const guardarNota = (texto) => guardar('nota', { texto, hora: Date.now() });
