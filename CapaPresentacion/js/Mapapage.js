let map;

async function initMap() {
    const position = { lat: -11.0064, lng: -66.0730 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapa"), {
        zoom: 15,
        center: position,
        mapId: "DEMOMAPA",
    });

    // Agregar marcador en la posición inicial
    marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true, // Permitir mover el marcador
    });

    // Mostrar las coordenadas iniciales en los inputs
    updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    marker.addListener("dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        updateInputs(newLat, newLng);
    });

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", function (event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.setPosition({ lat: clickedLat, lng: clickedLng }); // Mueve el marcador
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtlatitudModr").value = lat.toFixed(6);
    document.getElementById("txtlongitudModr").value = lng.toFixed(6);
}