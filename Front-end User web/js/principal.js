/* Logica de la Pantalla Principal de ejercicios */

// Cuota vencida: se puede activar con ?cuota=1 (condicion del sistema)
const params = new URLSearchParams(location.search);
if (params.has('cuota')) guardar('cuotaVencida', params.get('cuota') === '1');
window.bloqueado = leer('cuotaVencida', false);

// Banner: con cuota vencida se bloquean busquedas y accesos
if (window.bloqueado) {
  document.getElementById('banner').innerHTML = '<div class="banner">🔔 ¡ Cuota vencida !</div>';
}

// Contador de asistencia: 5 dias de apertura (Lun=1 ... Vie=5), el sistema marca el dia actual
const dias = document.getElementById('dias');
const datos = asistencia();
// Dia de la semana actual: lunes=1 ... viernes=5 (0 y 6 son fin de semana)
const hoy = new Date().getDay(); // 0=dom,1=lun,...,6=sab
const diaGym = hoy >= 1 && hoy <= 5 ? hoy : null;
// Marcar automaticamente si el gym esta abierto hoy y no fue marcado aun
if (diaGym && !datos.dias.includes(diaGym) && datos.dias.length < PLAN_DIAS && !window.bloqueado) {
  datos.dias.push(diaGym);
  guardar('asistencia', datos);
}
for (let n = 1; n <= 5; n++) {
  const div = document.createElement('div');
  const marcado = datos.dias.includes(n);
  const lleno = !marcado && datos.dias.length >= PLAN_DIAS;
  div.className = 'dia' + (marcado ? ' asistido' : lleno ? ' bloqueado' : '');
  div.textContent = n;
  dias.appendChild(div);
}

// Nota efímera (se borra a las 2.5 h)
const nota = document.getElementById('nota');
nota.value = leerNota();
nota.addEventListener('input', () => guardarNota(nota.value));

// Buscador global y acceso a grupos (bloqueados si la cuota vencio)
function irGrupo(grupo) {
  if (window.bloqueado) return;
  location.href = 'ejercicios.html?grupo=' + grupo;
}
document.getElementById('buscador').addEventListener('keydown', e => {
  if (window.bloqueado) { e.preventDefault(); return; }
  if (e.key === 'Enter') location.href = 'ejercicios.html?grupo=todos&q=' + encodeURIComponent(e.target.value);
});

pintarNav('musculacion');
