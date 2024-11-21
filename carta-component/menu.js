function generarMenu(categoria, containerId) {
    const container = document.getElementById(containerId);
    container.classList.remove('fade-in'); // Eliminar la clase de desvanecimiento al iniciar
  
    // Añadir clase de desvanecimiento
    container.classList.add('fade-out');
  
    // Esperar que el desvanecimiento se complete antes de limpiar el contenido
    setTimeout(() => {
        container.innerHTML = ''; // Limpiar el contenido previo
  
        // Verificar si la categoría existe en menuItems
        if (menuItems[categoria]) {
            menuItems[categoria].forEach(item => {
                const div = document.createElement('div');
                div.className = 'col-md-6'; // Mantener esta clase para la estructura de columnas
  
                // Generar alérgenos dinámicamente usando el objeto alergenosIcons
                const alergenosHTML = item.alergenos ? item.alergenos.map(alergeno => {
                    const iconUrl = alergenosIcons[alergeno];
                    return iconUrl ? `<img loading="lazy" class="alergeno-icon" data-alergeno="${alergeno}" src="${iconUrl}" alt="${alergeno}">` : '';
                }).join('') : '';
  
                // Aplicar la clase "especial" a la clase box
                div.innerHTML = `
                    <div class="box ${item.especial ? 'especial' : ''}">
                        <div class="single_menu">
                            <div class="food-img">
                                <img loading="lazy" src="${item.img}" alt="${item.nombre}">
                            </div>
                            <div class="menu_content">
                                <div class="top-names">
                                    <p class="nombre">${item.nombre}</p>
                                    <div class="alergenos">
                                        ${alergenosHTML}
                                    </div>
                                </div>
                                <div class="low-content">
                                    <p>${item.descripcion}</p>
                                    <span>${item.precio}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
  
                container.appendChild(div);
            });
        } else {
            console.warn(`La categoría "${categoria}" no existe en menuItems.`);
        }
  
        // Mostrar el nuevo contenido con fade-in
        setTimeout(() => {
            container.classList.remove('fade-out'); // Eliminar clase de desvanecimiento
            container.classList.add('fade-in'); // Agregar clase para mostrar el contenido
        }, 50); // Tiempo muy corto para iniciar la animación
  
        // Agregar evento click a cada imagen de alérgeno
        document.querySelectorAll('.alergeno-icon').forEach(img => {
            img.addEventListener('click', (e) => {
                mostrarTooltip(e.target);
            });
        });
    }, 400); // Ajustar el tiempo de fade-out antes de limpiar el contenido
  }

// Cargar la categoría de localStorage
function cargarCategoriaInicial() {
    const categoriaGuardada = localStorage.getItem('categoriaSeleccionada');
    return categoriaGuardada ? categoriaGuardada : 'entrantes'; // Si no hay una guardada, usar 'entrantes'
  }
  
  // Generar el contenido al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    const categoriaInicial = cargarCategoriaInicial(); // Cargar la categoría desde localStorage
    generarMenu(categoriaInicial, `${categoriaInicial}-content`);
  });
  
  // Añadir listeners a los selectores (opcional, si tienes botones o links para cambiar categorías)
  document.querySelectorAll('.selector-categoria').forEach(selector => {
    selector.addEventListener('click', (e) => {
        const categoria = e.target.getAttribute('data-categoria');
        const containerId = `${categoria}-content`;
        generarMenu(categoria, containerId);
    });
  });

  
// Generar el contenido al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  generarMenu('entrantes', 'entrantes-content');
  generarMenu('platos', 'platos-content');
  generarMenu('menu', 'menu-content');
  generarMenu('postres', 'postres-content');
  generarMenu('bebidas', 'bebidas-content');
  generarMenu('cervezas', 'cervezas-content');
  generarMenu('cocteles', 'cocteles-content');
  generarMenu('vinos', 'vinos-content');
});