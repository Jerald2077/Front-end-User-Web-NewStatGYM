/* Pantalla de clase: registro de asistencia independiente al de musculacion */
const id = new URLSearchParams(location.search).get('d') || 'boxing';
const disciplina = DISCIPLINAS.find(x => x.id === id) || { nombre: 'Boxeo' };
document.getElementById('disciplina').textContent = disciplina.nombre;

// La cuota vencida bloquea tambien las otras disciplinas
window.bloqueado = leer('cuotaVencida', false);

const btn = document.getElementById('asistir');
const hoy = new Date().toDateString();
const yaRegistrado = leer('claseHoy_' + id, null) === hoy;

if (window.bloqueado || yaRegistrado) {
  btn.disabled = true;
  if (yaRegistrado) btn.textContent = 'Asistencia registrada ✓';
} else {
  btn.addEventListener('click', () => {
    guardar('asistenciaClases', leer('asistenciaClases', 0) + 1);
    guardar('claseHoy_' + id, hoy);
    btn.textContent = 'Asistencia registrada ✓';
    btn.disabled = true;
  });
}

pintarNav(id);
