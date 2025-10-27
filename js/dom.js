
console.log("DOM.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function() {
  const contenedor = document.querySelector("#productos .row");
  const xhr = new XMLHttpRequest(); 

  xhr.open("GET", "data/datos.json", true);

  xhr.onload = function() {
    console.log("Respuesta del servidor:", xhr.status, xhr.responseText);

    if (xhr.status === 200) {
      const productos = JSON.parse(xhr.responseText); 
      contenedor.innerHTML = ""; 

      productos.forEach(prod => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
          <img src="${prod.imagen}" alt="${prod.alt}" class="img-fluid">
          <h5 class="mt-3">${prod.nombre}</h5>
          <a href="${prod.enlace}" class="btn btn-primary mt-2">Ver más</a>
        `;

        col.appendChild(tarjeta);
        contenedor.appendChild(col);
        setTimeout(() => {
  tarjeta.classList.add("visible");
}, 100);

      });
    } else {
      console.error("Error al cargar los datos:", xhr.statusText);
      contenedor.innerHTML = `<p class="text-danger">No se pudieron cargar los productos.</p>`;
    }
  };

  xhr.onerror = function() {
    console.error("Error de red o conexión al intentar cargar el JSON.");
    contenedor.innerHTML = `<p class="text-danger">Error de conexión al servidor.</p>`;
  };

  xhr.send();
});
