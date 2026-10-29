/* Comunicación con EmailJS */
emailjs.init({publicKey: "2BsbziQewCjFu5VGM"}); // Public Key (emailJS)

/* Relaciono "formulario" con "formContacto" */
const formulario = document.getElementById("formContacto");

/* Relaciono "alerta" con "mensajeExito" */
const alerta = document.getElementById("mensajeExito");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

// Función para validar que un correo se parezca a 'fvs@gmail.com'
function validarEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
}

function limpiarValidaciones(){
    nombre.classList.remove("is-valid", "is-invalid");
    correo.classList.remove("is-valid", "is-invalid");
    mensaje.classList.remove("is-valid", "is-invalid");
}

formulario.addEventListener("submit", function(event){
    event.preventDefault(); // No se recarga toda la página
    alerta.classList.add("d-none"); // Inicializo siempre desde un estado limpio.
            
    let valido = true; // 'valido' decide si se muestra el 'mensaje de alerta' o no

    const datos={
        nombre: nombre.value,
        correo: correo.value,
        mensaje: mensaje.value
    };


    // Si el 'nombre' està vacío, es inválido
    if(nombre.value.trim() === ""){
        nombre.classList.remove("is-valid");
        nombre.classList.add("is-invalid");
        valido = false;
    } else{ // caso contrario, es válido
        nombre.classList.remove("is-invalid");
        nombre.classList.add("is-valid");
    }

    // Si el 'correo' està vacío o mal escrito, es inválido
    if(!validarEmail(correo.value)){
        correo.classList.remove("is-valid");
        correo.classList.add("is-invalid");
        valido = false;
    } else{ // caso contrario, es válido
        correo.classList.remove("is-invalid");
        correo.classList.add("is-valid");
    }

    // Si el 'mensaje' està vacío, es inválido
    if(mensaje.value.trim() ===""){
        mensaje.classList.remove("is-valid");
        mensaje.classList.add("is-invalid");
        valido = false;
    } else{ // caso contrario, es válido
        mensaje.classList.remove("is-invalid");
        mensaje.classList.add("is-valid");
    }

    // Si 'válido' es true, se muestra el mensaje de alerta
    if(valido){
                
        emailjs.send(
            "service_euv0ezv", // Service ID (emailJS)
            "template_cryzzqk", // Template ID (emailJS)
            datos
        ).then(function(){
            alerta.classList.remove("d-none");
            setTimeout(function(){ // La alerta se vuelve visible por 5 segundos
                alerta.classList.add("d-none");
                }, 5000);
            formulario.reset(); // Reseteo el formulario
            limpiarValidaciones(); // Reseteo el DOM al estado original (sin clases)
        }).catch(function(error){
            console.log("Error EmailJS");
            console.log(error.status);
            console.log(error.text);
            console.log(error);
            alert("Se produjo un error al enviar el mensaje.");
        });                

    }
});