/* Barra de navegacion inferior: muestra solo las disciplinas elegidas */
function pintarNav(activa) {
  const nav = document.getElementById('nav');
  const elegidas = leer('disciplinas', []);
  DISCIPLINAS.filter(d => elegidas.includes(d.id)).forEach(d => {
    const a = document.createElement('a');
    a.href = d.id === 'musculacion' ? 'principal.html' : 'boxeo.html?d=' + d.id;
    a.className = d.id === activa ? 'activo' : '';
    a.innerHTML = d.img ? `<img src="${d.img}" alt="">` : `<i class="fa-solid ${d.icono}"></i>`;
    if (window.bloqueado) a.addEventListener('click', e => e.preventDefault());
    nav.appendChild(a);
  });
}
