/* Listado, filtrado y configuracion de ejercicios del grupo */
const params = new URLSearchParams(location.search);
const grupo = params.get('grupo') || 'tren-superior';
const lista = grupo === 'todos'
  ? Object.values(EJERCICIOS).flat()
  : (EJERCICIOS[grupo] || []);

document.getElementById('titulo').textContent = grupo === 'todos'
  ? 'Búsqueda global'
  : grupo.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// Sesion acumulada por grupo: { 'tren-superior': {id: {Series,Repeticiones,Descansos}}, ... }
const sesionTotal = leer('sesionTotal', {});
const sesion = Object.assign({}, sesionTotal[grupo] || {});
let filtro = 'todos';
let texto = params.get('q') || '';

// Filtros tipo chip a partir de las categorias del grupo
const categorias = ['todos', ...new Set(lista.map(e => e.categoria))];
const cont = document.getElementById('chips');
categorias.forEach(c => {
  const b = document.createElement('button');
  b.className = 'chip' + (c === filtro ? ' activo' : '');
  b.textContent = c.charAt(0).toUpperCase() + c.slice(1);
  b.addEventListener('click', () => {
    filtro = c;
    document.querySelectorAll('.chip').forEach(x => x.classList.toggle('activo', x === b));
    pintar();
  });
  cont.appendChild(b);
});

const buscador = document.getElementById('buscador');
buscador.value = texto;
buscador.addEventListener('input', () => { texto = buscador.value.toLowerCase(); pintar(); });

// Control + / - para series, repeticiones y descanso
function paso(id, campo, delta, unidad) {
  return `<div class="config-fila"><span>${campo} :</span><div class="contador">
    <button onclick="ajustar('${id}','${campo}',${-delta})">−</button>
    <span id="${id}-${campo}">${sesion[id][campo]}${unidad}</span>
    <button onclick="ajustar('${id}','${campo}',${delta})">+</button></div></div>`;
}

function ajustar(id, campo, delta) {
  sesion[id][campo] = Math.max(0, sesion[id][campo] + delta);
  document.getElementById(`${id}-${campo}`).textContent =
    sesion[id][campo] + (campo === 'Descansos' ? 's' : '');
}

function alternar(id) {
  if (sesion[id]) delete sesion[id];
  else sesion[id] = { Series: 3, Repeticiones: 10, Descansos: 60 };
  pintar();
}

function pintar() {
  const cont = document.getElementById('lista');
  cont.innerHTML = '';
  lista
    .filter(e => filtro === 'todos' || e.categoria === filtro)
    .filter(e => e.nombre.toLowerCase().includes(texto))
    .forEach(e => {
      const elegido = sesion[e.id];
      const div = document.createElement('div');
      div.className = 'ejercicio' + (elegido ? ' elegido' : '');
      div.innerHTML = `<div class="ejercicio-fila">
          <span class="punto"></span>
          <div class="ejercicio-info"><h3>${e.nombre}</h3><small>${e.detalle}</small></div>
          <button class="mas" onclick="alternar('${e.id}')"><i class="fa-solid ${elegido ? 'fa-check' : 'fa-plus'}"></i></button>
        </div>` +
        (elegido ? `<div class="config">
          ${paso(e.id, 'Series', 1, '')}
          ${paso(e.id, 'Repeticiones', 1, '')}
          ${paso(e.id, 'Descansos', 10, 's')}</div>` : '');
      cont.appendChild(div);
    });

  const n = Object.keys(sesion).length;
  const btn = document.getElementById('continuar');
  btn.disabled = n === 0;
  btn.textContent = n ? `Continuar (${n} ejercicios)` : 'Continuar';
}

document.getElementById('continuar').addEventListener('click', () => {
  if (grupo === 'todos') {
    Object.keys(sesion).forEach(id => {
      const g = Object.keys(EJERCICIOS).find(k => EJERCICIOS[k].some(e => e.id === id));
      if (g) { sesionTotal[g] = sesionTotal[g] || {}; sesionTotal[g][id] = sesion[id]; }
    });
  } else {
    sesionTotal[grupo] = sesion;
  }
  guardar('sesionTotal', sesionTotal);
  location.href = 'rutinas.html';
});

pintar();
