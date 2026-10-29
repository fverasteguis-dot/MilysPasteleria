let catalogo = [];

let productoActual = null;

fetch("Json/productos.json")

    .then(response => response.json())
    .then(productos => {
        catalogo = productos;
        const contenedor = document.getElementById("contenedorProductos");
        productos.forEach(producto => {
            contenedor.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm rounded-3">
                        <div class="card-header">
                            <h5 class="card-title text-center m-3">
                                ${producto.titulo}
                            </h5>
                            <div class="text-center">
                                <span class="badge bg-success">
                                    Desde ${producto.precio} €
                                </span>
                            </div>
                        </div>
                        <div class="card-body">
                            <img src="${producto.imagen}" class="card-img-top imagen-producto" data-id="${producto.id}" alt="${producto.titulo}">
                            <p class="card-text">${producto.descripcion}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-mily w-100 solicitar-info" data-producto="${producto.titulo}">
                                Solicitar información
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    });


    function solicitarInformacion(producto){
        document.getElementById("mensaje").value = `Hola, quisiera información sobre ${producto}.`;
        document.getElementById("contacto").scrollIntoView({behavior:"smooth"});
        
        setTimeout(function(){
            document.getElementById("nombre").focus();
        }, 800);
    };

    // Evento para solicitar información
    document.addEventListener("click", function(event){
        if(event.target.classList.contains("solicitar-info")){
        solicitarInformacion(event.target.dataset.producto);
        }
    });

    document.addEventListener("click", function(event){
        if(event.target.classList.contains("imagen-producto")){
            const id = Number(event.target.dataset.id);
            const producto = catalogo.find(p => p.id == id);

            productoActual = producto;
        
        document.getElementById("tituloModal").textContent = producto.titulo;
        const carrusel = document.getElementById("contenidoCarrusel");
    
        carrusel.innerHTML = "";

        producto.galeria.forEach(function(imagen, indice){
            carrusel.innerHTML += `
                    <div class="carousel-item ${indice === 0 ? "active" : ""}">
                        <img
                            src="${imagen}"
                            class="d-block w-100"
                            alt="Galería">
                    </div>`;
        });

        const modal = new bootstrap.Modal(document.getElementById("modalGaleria"));
        modal.show();
    }
    });

    document.addEventListener("click", function(event){
        if(event.target.id == "btnSolicitarModal"){
            bootstrap.Modal.getInstance(document.getElementById("modalGaleria")).hide();
            solicitarInformacion(productoActual.titulo)
        };
    });

    document.addEventListener("click", function(event){
        if(event.target.id === "btnWhatsappModal"){
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalGaleria")); 
            if(modal){
                modal.hide();
            }
            const mensaje = encodeURIComponent(
                `Hola.
                 Estoy interesado(a) en el producto: 
                 ${productoActual.titulo}.
                 ¿Podrías brindarme más informaciòn?. 
                 Gracias.`);
                 window.open(
                    `https://wa.me/34603220697?text=${mensaje}`,
                    "_blank"
                );
        }
    });
       