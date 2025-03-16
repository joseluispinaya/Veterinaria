
var table;

const MODELO_BASE = {
    IdMascota: 0,
    Nombre: "",
    Raza: "",
    Genero: "M",
    IdTipoMascota: 0,
    IdPropietario: 0,
    FechaNacimiento: "",
    Comentario: "",
    Activo: true,
    ImageFulMa: ""
}

$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idreseee = urlParams.get('id');

    if (idreseee !== null) {
        $("#txtnacido").datepicker();
        $("#txtnacido").val(ObtenerFecha());
        cargarTipoMasco();
        cargarDatos(idreseee);
        
    } else {
        swal("Mensaje", "No hay parametro de busqueda por url.", "warning");
        window.location.href = 'PageClientes.aspx';
        //window.close();
    }

})

function cargarTipoMasco() {
    $("#cboTipomas").html("");

    $.ajax({
        type: "POST",
        url: "PageDetalleCliente.aspx/ObtenerTipoMascotas",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdTipoMascota }).text(row.Descripcion).appendTo("#cboTipomas");
                    }

                })
            }

        }
    });
}

function cargarDatos(idProp) {
    var request = {
        IdPropi: idProp
    };

    $.ajax({
        type: "POST",
        url: "PageDetalleCliente.aspx/DetalleClientePrueba",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loaddet").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddet").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;
                $("#txtIdclienSt").val(idProp);

                $("#txtIdclien").val(idProp);
                $("#texnomn").text(datos.Nombres);
                $("#texapelli").text(datos.Apellidos);
                $("#lblcip").text(datos.NroCi);
                $("#lblnrocel").text(datos.Celular);
                $("#texdirec").text(datos.Direccion);
                $("#lblnromasco").text(datos.NumeroMascotas + " Masc.");

                var mascotasList = datos.ListaMascota;
                //console.log(mascotasList);
                actualizarTablaMascotas(mascotasList);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddet").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function actualizarTablaMascotas(mascotasList) {
    if ($.fn.DataTable.isDataTable("#tbMascode")) {
        $("#tbMascode").DataTable().destroy();
        $('#tbMascode tbody').empty();
    }

    //if ($.fn.DataTable.isDataTable("#tbMascode")) {
    //    table.clear().destroy();
    //}

    table = $("#tbMascode").DataTable({
        responsive: true,
        data: mascotasList,
        columns: [
            { data: "IdMascota", visible: false, searchable: false },
            {
                data: "ImageFulMa",
                render: function (data) {
                    return `<img style="height:40px" src="${data}" class="rounded mx-auto d-block"/>`;
                },
                orderable: false,
                searchable: false,
                width: "50px"
            },
            { data: "Nombre" },
            { data: "TipoMascota.Descripcion" },
            { data: "Raza" },
            {
                data: "Genero",
                render: function (data) {
                    return data === "H" ? "Hembra" : "Macho";
                }
            },
            //{ data: "ImageFulMa" },
            { data: "Edad" },
            { data: "NumeroHistorial" },
            {
                data: "Activo",
                render: function (data) {
                    return data ? '<span class="badge badge-primary">Activo</span>' :
                        '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                defaultContent: '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                                '<button class="btn btn-info btn-detalle btn-sm mr-2"><i class="fas fa-address-book"></i></button>' +
                                '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                orderable: false,
                searchable: false,
                width: "120px"
            }
        ],
        order: [[0, "desc"]],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarImagenSeleccionadaMa(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = (e) => $('#imgMascoReg').attr('src', e.target.result);
    file ? reader.readAsDataURL(file) : $('#imgMascoReg').attr('src', "Imagenes/sinimagen.png");

    let fileName = file ? file.name : 'Ningún archivo seleccionado';
    $(input).next('.custom-file-label').text(fileName);
}

$('#txtFotoMa').change(function () {
    mostrarImagenSeleccionadaMa(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    modelo = modelo ?? { ...MODELO_BASE };

    const campos = {
        "txtIdMascota": modelo.IdMascota,
        "txtNombre": modelo.Nombre,
        "txtRaza": modelo.Raza,
        //"txtnacido": modelo.FechaNacimiento,
        "txtnacido": modelo.FechaNacimiento === "" ? ObtenerFecha() : modelo.FechaNacimiento,
        "txtIdclien": modelo.IdPropietario,
        "txtComentario": modelo.Comentario,
        "cboSexo": modelo.Genero === "M" ? 1 : 0,
        "cboTipomas": modelo.IdTipoMascota || $("#cboTipomas option:first").val(),
        "cboEstado": modelo.Activo ? 1 : 0,
    };
    //$("#txtnacido").val(modelo.FechaNacimiento == "" ? ObtenerFecha() : modelo.FechaNacimiento);

    Object.entries(campos).forEach(([id, valor]) => $("#" + id).val(valor));

    $("#imgMascoReg").attr("src", modelo.ImageFulMa || "Imagenes/sinimagen.png");
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#txtFotoMa").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#myLargeModalLabel").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Editar Registro");
    $("#modalregmasco").modal("show");
}

// Manejo de eventos en la tabla
$("#tbMascode tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    //swal("Mensaje", "La mascota su ID: " + model.IdMascota, "success")
    mostrarModal(model, false);
});

$("#tbMascode tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'PageDetalleMascota.aspx?id=' + model.IdMascota;
    window.location.href = url;
})


$('#btnNewMasco').on('click', function () {
    mostrarModal(null, true);
})

function sendDataToServerMas(request) {
    $.ajax({
        type: "POST",
        url: "PageDetalleCliente.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                $('#modalregmasco').modal('hide');
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const idCliee = urlParams.get('id');
                cargarDatos(idCliee);

                //$('#modalregmasco').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambiosM').prop('disabled', false);
        }
    });
}

function registerDataMas() {
    var fileInput = document.getElementById('txtFotoMa');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdMascota"] = parseInt($("#txtIdMascota").val());
    modelo["Nombre"] = $("#txtNombre").val();
    modelo["Raza"] = $("#txtRaza").val();
    modelo["FechaNacimiento"] = $("#txtnacido").val();
    //modelo["IdPropietario"] = parseInt($("#txtIdclien").val());
    modelo["IdPropietario"] = parseInt($("#txtIdclienSt").val());
    modelo["Comentario"] = $("#txtComentario").val();
    modelo["Genero"] = ($("#cboSexo").val() == "1" ? "M" : "H");
    modelo["IdTipoMascota"] = $("#cboTipomas").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarCambiosM').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oMascota: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerMas(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oMascota: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerMas(request);
    }
}

$('#btnGuardarCambiosM').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambiosM').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        $('#btnGuardarCambiosM').prop('disabled', false);
        return;
    }


    if (parseInt($("#txtIdMascota").val()) === 0) {
        registerDataMas();
    } else {
        swal("Mensaje", "Falta para Actualizar personal.", "warning")
        $('#btnGuardarCambiosM').prop('disabled', false);
        //editarDataAjaxU();
    }
})

$('#btnVolverr').on('click', function () {
    window.location.href = 'PageClientes.aspx';
})