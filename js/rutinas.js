/* Resumen consolidado de todos los ejercicios seleccionados */
const sesionTotal = leer('sesionTotal', {});
const contenedor = document.getElementById('bloques');
let total = 0;
let hechos = 0;

function actualizarBtn() {
  const btn = document.getElementById('continuar');
  btn.disabled = hechos < total;
  btn.textContent = hechos < total ? `Terminar (${hechos}/${total})` : 'Terminar entrenamiento';
}

Object.entries(sesionTotal).forEach(([grupo, ejercicios]) => {
  const lista = EJERCICIOS[grupo] || [];
  const ids = Object.keys(ejercicios);
  if (!ids.length) return;

  const titulo = grupo.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const bloque = document.createElement('div');
  bloque.className = 'bloque-rutina';
  bloque.innerHTML = `<h2>${titulo}</h2>`;

  ids.forEach(id => {
    const datos = lista.find(x => x.id === id) || { nombre: id };
    const item = document.createElement('div');
    item.className = 'item-rutina';
    item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;text-align:left';
    item.innerHTML = `<span style="cursor:pointer;flex:1">${datos.nombre}</span>
      <button style="background:none;border:2px solid #666;border-radius:50%;width:32px;height:32px;color:#666;font-size:16px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center"><i class="fa-solid fa-check"></i></button>`;
    item.querySelector('span').addEventListener('click', () => location.href = 'detalle.html?id=' + id);
    const check = item.querySelector('button');
    check.addEventListener('click', () => {
      const marcado = item.classList.toggle('marcado');
      check.style.borderColor = marcado ? 'var(--amarillo)' : '#666';
      check.style.color = marcado ? 'var(--amarillo)' : '#666';
      hechos += marcado ? 1 : -1;
      actualizarBtn();
    });
    bloque.appendChild(item);
    total++;
  });
  contenedor.appendChild(bloque);
});

actualizarBtn();

document.getElementById('continuar').addEventListener('click', () => {
  guardar('sesionTotal', {});
  location.href = 'principal.html';
});
