
//DEMO_MAP_ID.

//let mape;
//let marker;

//async function initMap() {
//    const position = { lat: -11.0064, lng: -66.0730 };
//    const { Map } = await google.maps.importLibrary("maps");
//    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//    mape = new Map(document.getElementById("mapaz"), {
//        zoom: 13,
//        center: position,
//        mapId: "DEMOMAPA",
//    });
//}


let mape;
let markers = []; // Arreglo para almacenar los marcadores

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
