

//$('#btnModalGeo').on('click', function () {
//    $("#modalgeorefe").modal("show");
//})

!function ($) {
    "use strict";

    var GoogleMap = function () { };

    // Crea el mapa y agrega marcador al hacer clic
    GoogleMap.prototype.createMarkers = function ($container) {
        var map = new GMaps({
            div: $container,
            lat: -11.0064,  // Riberalta, Beni, Bolivia
            lng: -66.0730,
            zoom: 15 // Nivel de zoom ajustado
        });

        var marker; // Variable para almacenar el marcador actual

        // Evento de clic en el mapa
        map.addListener('click', function (e) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            // Si ya hay un marcador, eliminarlo antes de agregar uno nuevo
            if (marker) {
                map.removeMarker(marker);
            }

            // Agregar nuevo marcador en la ubicación seleccionada
            marker = map.addMarker({
                lat: lat,
                lng: lng,
                title: 'Ubicación seleccionada'
            });

            // Asignar latitud y longitud a los inputs
            document.getElementById("txtlatitudModr").value = lat;
            document.getElementById("txtlongitudModr").value = lng;
        });

        return map;
    };

    // Inicializa el mapa cuando el documento esté listo
    GoogleMap.prototype.init = function () {
        var $this = this;
        $(document).on('ready', function () {
            console.log("Inicializando Google Map...");
            $this.createMarkers('#gmaps-markers'); // Solo para este div
        });
    };

    // Inicializando
    $.GoogleMap = new GoogleMap, $.GoogleMap.Constructor = GoogleMap

}(window.jQuery),

    // Ejecutar la inicialización
    function ($) {
        "use strict";
        $.GoogleMap.init()
    }(window.jQuery);