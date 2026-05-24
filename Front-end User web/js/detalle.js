/* Detalle de un ejercicio: descripcion, video y series/repeticiones */

// Descripciones (las demas usan un texto generico)
const DESCRIPCIONES = {
  'press-banca': {
    tag: 'Pecho medio',
    texto: `<p>El Press de Banca es el ejercicio estrella para fortalecer el pecho, los hombros y los brazos de una forma sencilla:</p>
      <ul>
        <li><b>Prepárate:</b> Acuéstate en el banco con los pies firmes en el suelo y "saca pecho" juntando los omóplatos.</li>
        <li><b>Baja:</b> Desciende la barra suavemente hasta que toque el centro de tu pecho, manteniendo los codos relajados.</li>
        <li><b>Sube:</b> Empuja la barra con fuerza hacia el techo mientras sueltas el aire.</li>
      </ul>`
  }
};

// Buscar el ejercicio en todos los grupos
const id = new URLSearchParams(location.search).get('id');
let ejercicio = null;
for (const grupo in EJERCICIOS) {
  const e = EJERCICIOS[grupo].find(x => x.id === id);
  if (e) ejercicio = e;
}
ejercicio = ejercicio || { nombre: 'Ejercicio', detalle: '' };

const info = DESCRIPCIONES[id] || {
  tag: ejercicio.detalle.split(' - ')[1] || 'General',
  texto: `<p>Realiza el ejercicio con una técnica controlada, manteniendo la postura y respirando de forma constante en cada repetición.</p>`
};

document.getElementById('nombre').textContent = ejercicio.nombre;
document.getElementById('tag').textContent = info.tag;
document.getElementById('descripcion').innerHTML = info.texto;
// Convertir URL de YouTube a embed (ej: ?v=xxxx → /embed/xxxx)
const videoUrl = ejercicio.video || '';
const videoId = videoUrl.match(/[?&]v=([^&]+)/)?.[1] || '';
if (videoId) document.getElementById('video').src = `https://www.youtube.com/embed/${videoId}`;

// Series y repeticiones tomadas de sesionTotal (busca en todos los grupos)
const sesionTotal = leer('sesionTotal', {});
const cfg = Object.values(sesionTotal).map(g => g[id]).find(Boolean) || { Repeticiones: 10, Series: 3 };
document.getElementById('reps').textContent = cfg.Repeticiones;
document.getElementById('series').textContent = cfg.Series;
