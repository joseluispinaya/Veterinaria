

let map;
let marker;
var table;

const MODELO_BASE = {
    IdVeterinaria: 0,
    ImageFullVete: "",
    NombreVeterinaria: "",
    Propietario: "",
    Correo: "",
    Direccion: "",
    Celular: "",
    DiasAtencion: "",
    Horarios: "",
    Latitud: 0.0,
    Longitud: 0.0,
    Activo: true
}

$(document).ready(function () {
    listaVeterinarias();
    $("#cboEstado").prop("disabled", true);
})

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
    marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Mostrar las coordenadas iniciales en los inputs
    //updateInputs(position.lat, position.lng);

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

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        //marker.setPosition({ lat: clickedLat, lng: clickedLng });
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtlatitudMod").value = lat.toFixed(6);
    document.getElementById("txtlongitudMod").value = lng.toFixed(6);
}

// Funciones de veterinaria

function listaVeterinarias() {
    if ($.fn.DataTable.isDataTable("#tbVeterina")) {
        $("#tbVeterina").DataTable().destroy();
        $('#tbVeterina tbody').empty();
    }

    table = $("#tbVeterina").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageVeterinarias.aspx/ObtenerVeterinarias',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdVeterinaria", "visible": false, "searchable": false },
            {
                "data": "ImageFullVete", render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
            { "data": "NombreVeterinaria" },
            { "data": "Propietario" },
            { "data": "Correo" },
            { "data": "Celular" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Informe Veterinarias',
                exportOptions: {
                    columns: [2, 3, 4, 5, 6] // Ajusta según las columnas que desees exportar
                }
            },
            'pageLength'
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbVeterina tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const modelo = table.row(filaSeleccionada).data();

    $("#txtIdVeterina").val(modelo.IdVeterinaria);
    $("#txtNombrevete").val(modelo.NombreVeterinaria);
    $("#txtPropietario").val(modelo.Propietario);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtCelular").val(modelo.Celular);
    $("#txtDias").val(modelo.DiasAtencion);
    $("#txtHorarios").val(modelo.Horarios);

    $("#txtDireccion").val(modelo.Direccion);
    $("#txtlatitud").val(modelo.Latitud);
    $("#txtlongitud").val(modelo.Longitud);

    $("#imgLogoVet").attr("src", modelo.ImageFullVete == "" ? "Imagenes/sinimagen.png" : modelo.ImageFullVete);

    //$("#cboEstado").val(modelo.Activo == true ? 1 : 0);
    $("#cboEstado").val(modelo.Activo ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    // Verificar latitud y definir mensaje de ubicación
    const latitud = parseFloat(modelo.Latitud);
    const longitud = parseFloat(modelo.Longitud);
    const tieneUbicacion = !isNaN(latitud) && latitud !== 0;

    const mensajeUbicacion = tieneUbicacion ?
        "Ubicación establecida correctamente, ver ubicación" :
        "No cuenta con ubicación, debe agregar";

    const urlUbicacion = tieneUbicacion ?
        `https://www.google.com/maps?q=${latitud},${longitud}` :
        "#";

    $("#txturlubi").attr("href", urlUbicacion)
        .html(`<i class="fas fa-map-marker-alt m-r-5"></i> ${mensajeUbicacion}`);
})

function limpiarDatos() {
    $("#txtIdVeterina").val("0");
    $("#txtNombrevete").val("");
    $("#txtPropietario").val("");
    $("#txtCorreo").val("");
    $("#txtCelular").val("");
    $("#txtDias").val("");
    $("#txtHorarios").val("");

    $("#txtDireccion").val("");
    $("#txtlatitud").val("");
    $("#txtlongitud").val("");
    $('#imgLogoVet').attr('src', "Imagenes/sinimagen.png");

    $("#txtFotoV").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = (e) => $('#imgLogoVet').attr('src', e.target.result);
    file ? reader.readAsDataURL(file) : $('#imgLogoVet').attr('src', "Imagenes/sinimagen.png");

    let fileName = file ? file.name : 'Ningún archivo seleccionado';
    $(input).next('.custom-file-label').text(fileName);
}

$('#txtFotoV').change(function () {
    mostrarImagenSeleccionada(this);
});


function sendDataToServer(request) {
    $.ajax({
        type: "POST",
        url: "PageVeterinarias.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#laodvet").LoadingOverlay("show");
        },
        success: function (response) {
            $("#laodvet").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaVeterinarias();
                limpiarDatos();
                //$('#modaluser').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#laodvet").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarVet').prop('disabled', false);
        }
    });
}

function registerDataAjax() {
    var fileInput = document.getElementById('txtFotoV');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdVeterinaria"] = parseInt($("#txtIdVeterina").val());
    modelo["NombreVeterinaria"] = $("#txtNombrevete").val();
    modelo["Propietario"] = $("#txtPropietario").val();
    modelo["Correo"] = $("#txtCorreo").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["DiasAtencion"] = $("#txtDias").val();
    modelo["Horarios"] = $("#txtHorarios").val();
    modelo["Latitud"] = parseFloat(parseFloat($("#txtlatitud").val()).toFixed(6));
    modelo["Longitud"] = parseFloat(parseFloat($("#txtlongitud").val()).toFixed(6));
    //modelo["Latitud"] = parseFloat($("#txtlatitud").val());
    //modelo["Longitud"] = parseFloat($("#txtlongitud").val());

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            $('#btnGuardarVet').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oVeterinaria: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServer(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oVeterinaria: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServer(request);
    }
}

$('#btnModalGeo').on('click', function () {
    $("#modalgeorefe").modal("show");
})

$('#btnGuardarUbiVete').on('click', function () {

    if ($("#txtlatitudMod").val().trim() === "" || $("#txtlongitudMod").val().trim() === "") {
        swal("Mensaje", "Debe Seleccionar una Ubicacion", "warning");
        return;
    }

    var lati = $("#txtlatitudMod").val().trim();
    var lngi = $("#txtlongitudMod").val().trim();

    var exito = "Ubicacion establecida correctamente ver ubicacion";
    var url = `https://www.google.com/maps?q=${lati},${lngi}`;

    $("#txtlatitud").val(lati);
    $("#txtlongitud").val(lngi);

    // Mantener el ícono <i> y solo actualizar el texto después de él
    $("#txturlubi").attr("href", url).html(`<i class="fas fa-map-marker-alt m-r-5"></i> ${exito}`);

    //$("#txturlubi").val(url);

    $('#modalgeorefe').modal('hide');
})

$('#btnGuardarVet').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarVet').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        $('#btnGuardarVet').prop('disabled', false);
        return;
    }

    if ($("#txtlatitud").val().trim() === "" || $("#txtlongitud").val().trim() === "") {
        swal("Mensaje", "Debe Seleccionar una Ubicacion", "warning");
        $('#btnGuardarVet').prop('disabled', false);
        return;
    }


    if (parseInt($("#txtIdVeterina").val()) === 0) {
        //swal("Mensaje", "Guardado.", "success")
        //registerDataAjax();
        registerDataAjax();
    } else {
        swal("Mensaje", "Falta para Actualizar personal.", "warning")
        //editarDataAjaxU();
    }
})