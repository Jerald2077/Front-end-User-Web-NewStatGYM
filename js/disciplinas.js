/* Seleccion de disciplinas: suspendidas no se pueden elegir */
guardar('sesionTotal', {});
const grilla = document.getElementById('grilla');
const elegidas = new Set(leer('disciplinas', []));
const btnSeleccionar = document.getElementById('seleccionar');
btnSeleccionar.disabled = elegidas.size === 0;

DISCIPLINAS.forEach(d => {
  const div = document.createElement('div');
  div.className = 'disciplina' + (d.estado === 'suspendida' ? ' suspendida' : '') + (elegidas.has(d.id) ? ' activa' : '');
  const icono = d.img ? `<img src="${d.img}" alt="">` : `<i class="fa-solid ${d.icono}"></i>`;
  div.innerHTML = `${icono}<span>${d.nombre}</span>`;

  // Las suspendidas quedan bloqueadas; el resto alterna seleccion
  if (d.estado !== 'suspendida') {
    div.addEventListener('click', () => {
      elegidas.has(d.id) ? elegidas.delete(d.id) : elegidas.add(d.id);
      div.classList.toggle('activa');
      btnSeleccionar.disabled = elegidas.size === 0;
    });
  }
  grilla.appendChild(div);
});

document.getElementById('seleccionar').addEventListener('click', () => {
  const lista = [...elegidas];
  guardar('disciplinas', lista);
  const primera = DISCIPLINAS.find(d => lista.includes(d.id));
  location.href = primera ? primera.pagina : 'disciplinas.html';
});
