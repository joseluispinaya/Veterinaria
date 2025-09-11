
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

function ObtenerFechaNac() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    $("#txtnacido").datepicker();
    $("#txtnacido").val(ObtenerFechaNac());
    tipoMasco();

})

function tipoMasco() {
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

function buscarPro(nroci) {

    $.ajax({
        type: "POST",
        url: "PageMascotasadd.aspx/BuscarPropieNroci",
        data: JSON.stringify({ Nroci: nroci }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loaddet").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddet").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;
                //$("#txtIdclien").val(datos.IdPropietario);
                $("#txtIdclienSt").val(datos.IdPropietario);

                $("#txtNrociSt").val(datos.NroCi);

                $("#texnomn").text(datos.Nombres);
                $("#texapelli").text(datos.Apellidos);
                $("#texdirec").text(datos.Direccion);
                $("#lblnromasco").text(datos.NumeroMascotas + " Masc.");

                tablaMascotas(datos.ListaMascota);

            } else {
                $("#txtNrociSt").val("");
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddet").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function tablaMascotas(mascotasList) {
    if ($.fn.DataTable.isDataTable("#tbMascodett")) {
        $("#tbMascodett").DataTable().destroy();
        $('#tbMascodett tbody').empty();
    }

    table = $("#tbMascodett").DataTable({
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
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                orderable: false,
                searchable: false,
                width: "80px"
            }
        ],
        order: [[0, "desc"]],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBusclie').on('click', function () {

    var nroCi = $("#txtclienCi").val().trim();

    if (nroCi === "") {
        swal("Mensaje", "Ingrese Nro Ci para Buscar al cliente", "warning");
        return;
    }
    buscarPro(nroCi);
});

// Función auxiliar para validar tipo de archivo
function esImagenValidamm(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionadaMa(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgMascoReg').attr('src', "Imagenes/sinimagen.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagenValidamm(file)) {
        swal("Error", "El archivo seleccionado no es una imagen válida.", "error");
        $('#imgMascoReg').attr('src', "Imagenes/sinimagen.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgMascoReg').attr('src', e.target.result);
    reader.readAsDataURL(file);

    // Mostrar nombre del archivo
    $(input).next('.custom-file-label').text(file.name);
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
        "txtnacido": modelo.FechaNacimiento === "" ? ObtenerFechaNac() : modelo.FechaNacimiento,
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
$("#tbMascodett tbody").on("click", ".btn-editar", function (e) {
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

$("#tbMascodett tbody").on("click", ".btn-detalle", function (e) {
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

                //$("#txtNrociSt").val(datos.NroCi);
                var nroCi = $("#txtNrociSt").val().trim();
                buscarPro(nroCi);

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

function sendDataEditServerMas(request) {
    $.ajax({
        type: "POST",
        url: "PageMascotasadd.aspx/EditarMascota",
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
                var nroCi = $("#txtNrociSt").val().trim();
                buscarPro(nroCi);

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

function editarDataMas() {
    var fileInput = document.getElementById('txtFotoMa');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdMascota"] = parseInt($("#txtIdMascota").val());
    modelo["Nombre"] = $("#txtNombre").val();
    modelo["Raza"] = $("#txtRaza").val();
    modelo["FechaNacimiento"] = $("#txtnacido").val();
    modelo["IdPropietario"] = parseInt($("#txtIdclien").val());
    modelo["Comentario"] = $("#txtComentario").val();
    modelo["Genero"] = ($("#cboSexo").val() == "1" ? "M" : "H");
    modelo["IdTipoMascota"] = $("#cboTipomas").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

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

            sendDataEditServerMas(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oMascota: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataEditServerMas(request);
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

    var nroCi = $("#txtNrociSt").val().trim();

    if (nroCi === "") {
        swal("Mensaje", "Ocurrio un problema vuelva a buscar al propietario por su C.I.", "warning");
        $('#btnGuardarCambiosM').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdMascota").val()) === 0) {
        registerDataMas();
    } else {
        editarDataMas();
    }
})

// registro de mascota