let map;
let marker;
let geocoder; // Instancia de Geocoder

async function initMap() {
    const position = { lat: -11.0064, lng: -66.0730 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { Geocoder } = await google.maps.importLibrary("geocoding");


    geocoder = new Geocoder(); // Inicializar geocodificador

    map = new Map(document.getElementById("mapa"), {
        zoom: 15,
        center: position,
        mapId: "DEMOMAPA",
    });

    // Agregar marcador en la posición inicial usando AdvancedMarkerElement
    marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Obtener dirección inicial
    reverseGeocode(position.lat, position.lng);

    // Mostrar las coordenadas iniciales en los inputs
    //updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    //marker.addListener("dragend", function (event) {
    //    const newLat = event.latLng.lat();
    //    const newLng = event.latLng.lng();
    //    updateInputs(newLat, newLng);
    //});

    // Evento para actualizar inputs y obtener dirección al mover el marcador
    marker.addListener("dragend", () => {
        const newPosition = marker.position; // Devuelve un objeto { lat, lng }

        const newLat = newPosition.lat;
        const newLng = newPosition.lng;
        updateInputs(newLat, newLng);
        reverseGeocode(newLat, newLng); // Obtener dirección
    });

    // Evento para agregar marcador en un clic en el mapa
    //map.addListener("click", function (event) {
    //    const clickedLat = event.latLng.lat();
    //    const clickedLng = event.latLng.lng();

    //    marker.setPosition({ lat: clickedLat, lng: clickedLng }); // Mueve el marcador
    //    updateInputs(clickedLat, clickedLng);
    //});

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", (event) => {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        //marker.setPosition({ lat: clickedLat, lng: clickedLng });

        updateInputs(clickedLat, clickedLng);
        reverseGeocode(clickedLat, clickedLng); // Obtener dirección

    });
}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtlatitudModr").value = lat.toFixed(6);
    document.getElementById("txtlongitudModr").value = lng.toFixed(6);
}

// Función para obtener la dirección a partir de latitud y longitud
function reverseGeocode(lat, lng) {
    geocoder.geocode({ location: { lat: lat, lng: lng } })
        .then((response) => {
            if (response.results.length > 0) {
                const address = response.results[0].formatted_address; // Dirección formateada
                document.getElementById("txtubicacionvet").value = address; // Actualizar input
            } else {
                document.getElementById("txtubicacionvet").value = "Dirección no encontrada";
                console.warn("No se encontraron resultados de geocodificación.");
            }
        })
        .catch((error) => {
            console.error("Error al obtener la dirección:", error);
            document.getElementById("txtubicacionvet").value = "Error al obtener dirección";
        });
}