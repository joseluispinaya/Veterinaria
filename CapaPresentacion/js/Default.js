
let esquemaSimplificado = [];
const tokenOPENAI = '';

let user = {
    message: null
}
const chatHistoryz = [];


let mape;
let markers = []; // Arreglo para almacenar los marcadores

$(document).ready(function () {
    obtenerEsquema();
})


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
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
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
        const { NombreVeterinaria, Latitud, Longitud } = vet;

        if (Latitud && Longitud) { // Verifica que existan coordenadas
            let nuevoMarker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: parseFloat(Latitud), lng: parseFloat(Longitud) },
                map: mape,
                title: NombreVeterinaria
            });

            // Agrega un evento para mostrar el nombre en un InfoWindow o en la consola
            nuevoMarker.addListener("click", () => {
                infoWindow.setContent(`<div style="font-size:16px; font-weight:bold;">${NombreVeterinaria}</div>`);
                infoWindow.open(mape, nuevoMarker);
                console.log(`Veterinaria: ${NombreVeterinaria}`);
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

// chat bot

$('#chatButton').on('click', function () {
    $('.chat-container').css('display', 'flex');
    $('#chatButton').hide();
});

$('#closeChat').on('click', function () {
    $('.chat-container').hide();
    $('#chatButton').show();
});

function obtenerEsquema() {
    $.ajax({
        type: "POST",
        url: "Default.aspx/ObtenerEsquemaBD",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const esquema = response.d.Data;
                esquemaSimplificado = esquema.map(tabla => ({
                    NombreTabla: tabla.NombreTabla,
                    Columnas: tabla.Columnas.map(col => ({
                        NombreColumna: col.NombreColumna,
                        TipoDato: col.TipoDato
                    }))
                }));

                swal("Mensaje", "El esquema está listo para su uso.", "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

async function responderAnteFueraContexto(preguntaUsuario) {
    const mensajeSistema = `
        Eres un asistente de IA que solo responde saludos o despedidas.

        - Si el mensaje del usuario es un saludo (como "Hola", "Buenos días") o una despedida (como "Gracias, hasta luego"), responde de forma amable y profesional.
        - Si el mensaje NO es un saludo o despedida, responde exactamente con: 
          "Lo siento, tu pregunta no está en mi modelo para ser atendida. Solo puedo darte información sobre Veterinarias o relacionada con ella."

        Ejemplos:
        - Usuario: "Hola"
          Respuesta: "¡Hola! ¿En qué puedo ayudarte hoy?"
        - Usuario: "Gracias, hasta luego"
          Respuesta: "¡Gracias a ti! Que tengas un excelente día."
        - Usuario: "¿Cuál es la capital de Francia?"
          Respuesta: "Lo siento, tu pregunta no está en mi modelo para ser atendida. Solo puedo darte información sobre Veterinarias o relacionada con ella."

        Responde ahora según estas instrucciones:
        `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenOPENAI}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: mensajeSistema },
                    { role: "user", content: preguntaUsuario }
                ],
                temperature: 0.2,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar al modelo entrenado");
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();

    } catch (error) {
        console.error("Error al responder:", error.message);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
}

async function respuestaHumanizada(preguntaUsuario, datosSQL) {
    const mensajeSistema = `
        Eres un asistente de IA que responde preguntas de forma clara, amigable y profesional.

        Instrucciones:
        - Tienes la pregunta original de un usuario y los datos obtenidos de la base de datos en formato JSON.
        - Tu tarea es interpretar los datos y generar una respuesta útil, bien redactada y natural.
        - Si los datos están vacíos o no hay resultados, indícalo de forma educada.

        Ejemplo:
        Pregunta: "¿Cuántos usuarios hay registrados?"
        Datos: [{ total: 152 }]
        Respuesta esperada: "Actualmente hay 152 usuarios registrados en el sistema."

        Ahora responde amablemente la siguiente pregunta del usuario usando los datos proporcionados.
        `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenOPENAI}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: mensajeSistema },
                    { role: "user", content: `Pregunta: ${preguntaUsuario}\nDatos: ${JSON.stringify(datosSQL, null, 2)}` }
                ],
                temperature: 0.5,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar al modelo entrenado");
        }
        const data = await response.json();
        return data.choices[0].message.content.trim();

    } catch (error) {
        console.error("Error al responder:", error.message);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
}

async function ejecutarConsultaSQL(sqlGenerado, userInput) {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Default.aspx/ConsultaSql",
            data: JSON.stringify({ ConsultaSql: sqlGenerado }),
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            const datos = response.d.Data;
            console.log(datos);
            const respuesta = await respuestaHumanizada(userInput, datos);
            return respuesta;
        } else {
            return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
}


async function generarSentenciaSql() {
    const userInput = user.message;

    const promptSistema = `
        Eres un asistente experto en generar consultas SQL específicamente para Microsoft SQL Server.

        Tu tarea es transformar instrucciones en lenguaje natural en consultas T-SQL válidas, claras y eficientes, usando el siguiente esquema de base de datos:

        ${JSON.stringify(esquemaSimplificado, null, 2)}

        Ten en cuenta que los usuarios pueden usar sinónimos o formas informales para referirse a tablas o columnas. Usa el siguiente diccionario de sinónimos para interpretar correctamente las instrucciones y mapearlas al esquema real:

        DICCIONARIO DE SINÓNIMOS:
        - USUARIO: usuarios, personal, empleados, trabajadores
        - ROL: roles, permisos, tipo de acceso, perfil
        - PROPIETARIO: propietarios, dueños, clientes, personas con mascotas
        - VETERINARIA: veterinarias, clínicas, centros veterinarios, locales
        - PRODUCTO: productos, artículos, medicamentos, insumos
        - CATEGORIA: categorías, tipos de productos, grupo de productos
        - MASCOTA: mascotas, animales, pacientes
        - HISTORIA_CLINICA: historia clínica, historial, ficha médica
        - SERVICIO: servicios, atención, tipo de consulta
        - VENTA: ventas, compras, transacciones, registros de venta
        - DETALLE_VENTA: detalle de venta, productos vendidos
        - TIPO_MASCOTA: tipo de mascota, especie, animal

        CAMPOS COMUNES:
        - Nombres: nombre, nombres, nombre completo
        - Apellidos: apellido, apellidos
        - Correo: email, correo electrónico
        - Clave: contraseña, clave
        - Celular: teléfono, número, celular
        - Foto: imagen, fotografía
        - Direccion: dirección, ubicación, lugar
        - FechaRegistro: fecha de registro, fecha, cuándo fue creado
        - IdRol: rol, perfil, tipo de usuario
        - IdPropietario: dueño, propietario, cliente
        - IdVeterinaria: veterinaria, clínica
        - IdMascota: mascota, animal
        - NombreVeterinaria: nombre de la veterinaria, clínica, local
        - Nombre: nombre, nombre del producto o mascota
        - Codigo: código, identificador
        - Precio: precio, costo
        - Descripcion: descripción, detalle, información
        - Comentario: comentario, observación, nota
        - Servicio: servicio, atención brindada
        - Raza: raza, especie
        - Genero: género, sexo
        - FechaNacimiento: fecha de nacimiento, cumpleaños
        - ImagenMascota: foto de mascota, imagen
        - ImagenProdu: foto de producto, imagen
        - Stock: inventario, existencias
        - Cantidad: cantidad, número
        - TotalCosto: total, monto
        - ValorCodigo: valor correlativo, número del código

        IMPORTANTE: interpreta los requerimientos usando este diccionario como guía para entender sinónimos.

        REGLAS DE RESPUESTA:
        - Usa correctamente la sintaxis de T-SQL para SQL Server.
        - Utiliza JOIN si se necesitan datos de varias tablas.
        - Aplica condiciones WHERE, filtros TOP, funciones como GETDATE(), DATEDIFF(), etc., si corresponde.
        - IMPORTANTE: No utilices bloques de código Markdown como \`\`\`sql o \`\`\`. Devuelve solo la sentencia SQL en texto plano.
        - No incluyas explicaciones, encabezados, ni texto adicional.
        - Si la instrucción no puede ser respondida con una sentencia SELECT, responde solo con: NO_VALIDO.
        - Si la instrucción no está relacionada con el esquema, responde solo con: NO_EXISTE.

        Ejemplos:

        "original_query": "Mostrar los últimos 5 productos registrados."
        "sql_query": "SELECT TOP 5 * FROM PRODUCTOS ORDER BY IdProducto DESC;"

        "original_query": "Listar todas las mascotas registradas este mes."
        "sql_query": "SELECT * FROM MASCOTAS WHERE MONTH(FechaRegistro) = MONTH(GETDATE()) AND YEAR(FechaRegistro) = YEAR(GETDATE());"

        "original_query": "Ver el nombre y celular de los propietarios que compraron productos."
        "sql_query": "SELECT DISTINCT P.Nombres, P.Celular FROM PROPIETARIOS P INNER JOIN VENTAS V ON P.IdPropietario = V.IdPropietario;"

        "original_query": "Mostrar el nombre de las mascotas y su propietario."
        "sql_query": "SELECT M.Nombre, P.Nombres, P.Apellidos FROM MASCOTAS M INNER JOIN PROPIETARIOS P ON M.IdPropietario = P.IdPropietario;"

        "original_query": "Cuántas ventas se realizaron hoy en la veterinaria 'Veterinaria Central'."
        "sql_query": "SELECT COUNT(*) FROM VENTAS V INNER JOIN VETERINARIAS VT ON V.IdVeterinaria = VT.IdVeterinaria WHERE VT.NombreVeterinaria = 'Veterinaria Central' AND CAST(V.FechaRegistro AS DATE) = CAST(GETDATE() AS DATE);"

        "original_query": "Listar los productos más vendidos en la veterinaria 'Veterinaria Central'."
        "sql_query": "SELECT P.Nombre, SUM(DV.Cantidad) AS TotalVendidos FROM DETALLE_VENTA DV INNER JOIN PRODUCTOS P ON DV.IdProducto = P.IdProducto INNER JOIN VENTAS V ON DV.IdVenta = V.IdVenta INNER JOIN VETERINARIAS VT ON V.IdVeterinaria = VT.IdVeterinaria WHERE VT.NombreVeterinaria = 'Veterinaria Central' GROUP BY P.Nombre ORDER BY TotalVendidos DESC;"

        "original_query": "¿Qué producto es bueno para la garrapata?"
        "sql_query": "SELECT Nombre, Marca, Descripcion, Precio FROM PRODUCTOS WHERE Descripcion LIKE '%garrapata%' AND Activo = 1;"

        "original_query": "Mostrar productos de la categoría 'medicamentos'."
        "sql_query": "SELECT P.Nombre, P.Marca, P.Precio FROM PRODUCTOS P INNER JOIN CATEGORIAS C ON P.IdCategoria = C.IdCategoria WHERE C.Nombre = 'medicamentos' AND P.Activo = 1;"

        "original_query": "Listar productos con precio menor a 50."
        "sql_query": "SELECT Nombre, Marca, Precio FROM PRODUCTOS WHERE Precio < 50 AND Activo = 1;"

        "original_query": "Listar productos con poco stock (menos de 10 unidades)."
        "sql_query": "SELECT Nombre, Marca, Stock FROM PRODUCTOS WHERE Stock < 10 AND Activo = 1;"

        "original_query": "Mostrar productos disponibles en la veterinaria 'Veterinaria Central'."
        "sql_query": "SELECT P.Nombre, P.Marca, P.Precio FROM PRODUCTOS P INNER JOIN VETERINARIAS V ON P.IdVeterinaria = V.IdVeterinaria WHERE V.NombreVeterinaria = 'Veterinaria Central' AND P.Activo = 1;"

        Ahora genera la consulta para el siguiente requerimiento:
        `;

    try {
        const messages = [
            { role: "system", content: promptSistema },
            ...chatHistoryz.map(m => ({
                role: m.role,
                content: m.parts[0].text
            }))
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenOPENAI}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages,
                temperature: 0.2,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar al modelo entrenado");
        }
        const data = await response.json();
        let sqlGenerado = data.choices[0].message.content.trim();
        console.log("SQL generado:", sqlGenerado);
        sqlGenerado = sqlGenerado.replace(/```sql|```/g, "").trim();
        console.log("SQL Limpio:", sqlGenerado);

        if (sqlGenerado === "NO_VALIDO" || sqlGenerado === "NO_EXISTE") {
            //const tipoDetectado = detectarTipoMensaje(userInput);
            const respuestaContextual = await responderAnteFueraContexto(userInput);

            return respuestaContextual;
        }

        const respuestase = await ejecutarConsultaSQL(sqlGenerado, userInput);
        return respuestase;

        //return data.choices[0].message.content.trim();

    } catch (error) {
        console.error("Error al responder:", error.message);
        return "Tuvimos un problema al generar la consulta a la base de datos, intentá nuevamente más tarde.";
    }
}

async function enviarMensaje() {

    if (!esquemaSimplificado.length) {
        swal("Advertencia", "Intente nuevamente en 2 min aún no cargo la memoria.", "warning");
        obtenerEsquema();
        return;
    }

    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    user.message = userInput

    chatHistoryz.push({
        role: "user",
        parts: [{ text: user.message }],
    });

    if (chatHistoryz.length > 20) {
        chatHistoryz.splice(0, chatHistoryz.length - 20);
    }


    // Agregar el mensaje del usuario al chat
    agregarMensaje(userInput, "user-message");
    document.getElementById("user-input").value = "";

    // Mostrar indicador de carga
    document.getElementById("btn-icon").style.display = "none";
    document.getElementById("btn-loading").style.display = "inline";
    document.getElementById("btnenviar").disabled = true;

    try {
        const respuestase = await generarSentenciaSql();
        // Agregar la respuesta del bot al chat
        agregarMensaje(respuestase, "bot-message");

        chatHistoryz.push({
            role: "assistant",
            parts: [{ text: respuestase }],
        });

        if (chatHistoryz.length > 20) {
            chatHistoryz.splice(0, chatHistoryz.length - 20);
        }


    } catch (error) {
        console.error("Error al generar SQL:", error.message);
        agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
    } finally {
        // Ocultar indicador de carga
        document.getElementById("btn-icon").style.display = "inline";
        document.getElementById("btn-loading").style.display = "none";
        document.getElementById("btnenviar").disabled = false;
    }
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
    enviarMensaje();
});

// Permitir enviar mensajes con la tecla Enter
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMensaje();
    }
});
