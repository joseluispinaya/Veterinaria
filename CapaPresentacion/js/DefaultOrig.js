
let esquemaSimplificadoz = [];
let mape;
let markers = []; // Arreglo para almacenar los marcadores

//$(document).ready(function () {
//    obtenerEsquemazz();
//})

function obtenerEsquemazz() {
    $.ajax({
        type: "POST",
        url: "Default.aspx/EsquemaBaseDatosServer",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const esquema = response.d.Data;
                console.log(esquema);

                esquemaSimplificadoz = esquema.map(tabla => ({
                    NombreTabla: tabla.NombreTabla,
                    Columnas: tabla.Columnas.map(col => ({
                        NombreColumna: col.NombreColumna,
                        TipoDato: col.TipoDato
                    }))
                }));

                console.log(esquemaSimplificadoz);

                //swal("Mensaje", "El esquema está listo para su uso.", "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


// Inicializa el mapa con una ubicación predeterminada
async function initMap() {
    const position = { lat: -11.0064, lng: -66.0730 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    mape = new Map(document.getElementById("mapaz"), {
        zoom: 13,
        center: position,
        mapId: "DEMOMAPA",
    });

    // Llama a la función para obtener la lista de veterinarias y crear los marcadores
    listaVeterinariasm();
}
// Función para obtener la lista de veterinarias y crear los marcadores
function listaVeterinariasm() {
    $.ajax({
        type: "POST",
        url: "PageVeterinarias.aspx/ObtenerVeterinarias",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                //console.log("Lista de Veterinarias: ", response.d.Data);
                crearMarcadores(response.d.Data);
                listVeteriCard(response.d.Data);
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function listVeteriCard(listaVeterinarias) {

    $("#listaVet").empty();

    // Recorremos la lista y generamos el HTML
    listaVeterinarias.forEach(function (veteri) {
        var cardHtml = `
        <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-blogs mb-30">
                <div class="blog-img">
                    <img src="${veteri.ImageFullVete}" alt="Foto veterinaria" style="height: 283px; object-fit: cover;" />
                </div>
                <div class="blogs-cap" style="padding: 10px 20px 22px 20px;">
                    <p class="mb-0">📞 Contacto: ${veteri.Celular}</p>
                    <div class="date-info">
                        <span>Atencion</span>
                        <p>${veteri.DiasAtencion}</p>
                    </div>
                    <h4>Veterinaria: ${veteri.NombreVeterinaria}</h4>
                    <a href="#" class="read-more1 btn-detalles"
                    data-veteridetalle='${encodeURIComponent(JSON.stringify(veteri))}'
                    >Ver Info</a>
                </div>
            </div>
        </div>`;


        // Agregamos al contenedor
        $("#listaVet").append(cardHtml);
    });
}

// Función para crear múltiples marcadores en el mapa
function crearMarcadores(listaVeterinarias) {
    // Limpia los marcadores existentes si ya hay en el mapa
    markers.forEach(marker => marker.map = null);
    markers = [];

    const infoWindow = new google.maps.InfoWindow();

    // Recorre la lista y crea un marcador para cada veterinaria
    listaVeterinarias.forEach(vet => {
        const { NombreVeterinaria, Latitud, Longitud, Correo, Celular } = vet;

        if (Latitud && Longitud) { // Verifica que existan coordenadas
            let nuevoMarker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: parseFloat(Latitud), lng: parseFloat(Longitud) },
                map: mape,
                title: NombreVeterinaria
            });

            // Agrega un evento para mostrar el nombre en un InfoWindow o en la consola
            nuevoMarker.addListener("click", () => {
                const contenido = `
                    <div style="font-size:16px; font-weight:bold;">Veterinaria: ${NombreVeterinaria}</div>
                    <div style="font-size:14px;">📍 Correo: ${Correo || 'Sin correo registrada'}</div>
                    <div style="font-size:14px;">📞 Contacto: ${Celular || 'Sin teléfono'}</div>
                `;
                infoWindow.setContent(contenido);
                infoWindow.open(mape, nuevoMarker);
                // Aquí puedes usar InfoWindow si quieres mostrar más detalles
            });

            // Añade el nuevo marcador al arreglo de marcadores
            markers.push(nuevoMarker);
        }
    });

    // Opcional: Ajusta el zoom y el centro del mapa para mostrar todos los marcadores
    ajustarVistaMarcadores();
}

// Función para ajustar el mapa y mostrar todos los marcadores
function ajustarVistaMarcadores() {
    if (markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => bounds.extend(marker.position));
    mape.fitBounds(bounds);
}


$(document).on("click", ".btn-detalles", function (e) {
    e.preventDefault();

    var veterinadetalleStr = decodeURIComponent($(this).attr("data-veteridetalle"));
    //var activodetalleStr = $(this).attr("data-activodetalle");
    var detalle = JSON.parse(veterinadetalleStr);

    if (!detalle || !detalle.IdVeterinaria) {
        console.warn("Objeto detalle inválido", detalle);
        return;
    }
    // console.log(detalle);
    // $("#defini").text(detalle.definition);
    // $("#specifi").text(detalle.specification);
    // $("#packi").text(detalle.packing);
    // $("#typesa").text("Type: " + detalle.type);
    // $("#imgUsuarioMx").attr("src", detalle.imagenMo);
    $("#miModal").modal("show");
});

// chat bot

$('#chatButton').on('click', function () {
    $('.chat-container').css('display', 'flex');
    $('#chatButton').hide();
});

$('#closeChat').on('click', function () {
    $('.chat-container').hide();
    $('#chatButton').show();
});

function generadorUid() {
    let a = Date.now().toString(30);        // siempre consistente
    let b = Math.random().toString(30).slice(2, 8); // 6 caracteres fijos
    return a + b;

    //swal("Hecho", `Se genero el id: ${sessionId}.`, "success");
    //return dat + ran;
}

function enviarPrompt() {

    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;


    // Verificar o generar sessionId
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = generadorUid();
        sessionStorage.setItem('sessionId', sessionId);
    }

    // Agregar el mensaje del usuario al chat
    agregarMensaje(userInput, "user-message");
    document.getElementById("user-input").value = "";

    document.getElementById("btn-icon").style.display = "none";
    document.getElementById("btn-loading").style.display = "inline";
    document.getElementById("btnenviar").disabled = true;

    var request = {
        session: sessionId,
        pregunta: userInput
    };

    $.ajax({
        type: "POST",
        url: "Default.aspx/ChatBotVeterinaria",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            console.log(response);
            var responde = response.d;
            // Agregar la respuesta del bot al chat
            agregarMensaje(responde, "bot-message");

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
        },
        complete: function () {
            document.getElementById("btn-icon").style.display = "inline";
            document.getElementById("btn-loading").style.display = "none";
            document.getElementById("btnenviar").disabled = false;
        }
    });
}

// Función para agregar un mensaje al chat
function agregarMensaje(texto, clase) {
    const chatMessages = document.getElementById("chat-messages");
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("message", clase);
    mensajeDiv.textContent = texto;
    chatMessages.appendChild(mensajeDiv);

    // Limitar el número de mensajes mostrados
    if (chatMessages.children.length > 50) {
        chatMessages.removeChild(chatMessages.firstChild);
    }

    // Aplicar animación
    setTimeout(() => {
        mensajeDiv.classList.add("visible");
    }, 10);

    // Desplazar el scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

$('#btnenviar').on('click', function () {
    enviarPrompt();
});

// Permitir enviar mensajes con la tecla Enter
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        enviarPrompt();
    }
});