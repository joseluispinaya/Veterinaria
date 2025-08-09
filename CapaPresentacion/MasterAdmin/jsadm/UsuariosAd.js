
var table;

const MODELO_BASE = {
    IdUsuario: 0,
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Celular: "",
    IdVeterinaria: 0,
    IdRol: 0,
    Activo: true,
    ImageFull: ""
}

$(document).ready(function () {
    listaUsuarios();
    cargarRoles();
    cargarVeterinarias();
})

function listaUsuarios() {
    if ($.fn.DataTable.isDataTable("#tbUsuario")) {
        $("#tbUsuario").DataTable().destroy();
        $('#tbUsuario tbody').empty();
    }

    table = $("#tbUsuario").DataTable({
        responsive: true,
        "ajax": {
            "url": '/PageUsuarios.aspx/ObtenerUsuarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull", render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
            { "data": "Rol.Descripcion" },
            { "data": "Nombres" },
            { "data": "Apellidos" },
            { "data": "Veterinaria.NombreVeterinaria" },
            { "data": "Correo" },
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
                filename: 'Informe Usuarios',
                exportOptions: {
                    columns: [2, 3, 4, 5, 6, 7] // Ajusta según las columnas que desees exportar
                }
            },
            'pageLength'
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarVeterinarias() {
    $("#cboVeter").html("");

    $.ajax({
        type: "POST",
        url: "/PageVeterinarias.aspx/ObtenerVeterinarias",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                $.each(data.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdVeterinaria }).text(row.NombreVeterinaria).appendTo("#cboVeter");
                    }

                })
            }

        }
    });
}

function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "/PageUsuarios.aspx/ObtenerRol",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                $.each(data.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
                    }

                })
            }

        }
    });
}

function mostrarImagenSeleccionadaU(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = (e) => $('#imgUsuarioReg').attr('src', e.target.result);
    file ? reader.readAsDataURL(file) : $('#imgUsuarioReg').attr('src', "/Imagenes/sinimagen.png");

    let fileName = file ? file.name : 'Ningún archivo seleccionado';
    $(input).next('.custom-file-label').text(fileName);
}

$('#txtFotoUr').change(function () {
    mostrarImagenSeleccionadaU(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    modelo = modelo ?? { ...MODELO_BASE };

    const campos = {
        "txtIdUsuario": modelo.IdUsuario,
        "txtNombres": modelo.Nombres,
        "txtApellidos": modelo.Apellidos,
        "txtCorreo": modelo.Correo,
        "txtCelular": modelo.Celular,
        "cboVeter": modelo.IdVeterinaria || $("#cboVeter option:first").val(),
        "cboRol": modelo.IdRol || $("#cboRol option:first").val(),
        "cboEstado": modelo.Activo ? 1 : 0,
    };

    Object.entries(campos).forEach(([id, valor]) => $("#" + id).val(valor));

    $("#imgUsuarioReg").attr("src", modelo.ImageFull || "/Imagenes/sinimagen.png");
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#txtFotoUr").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#myLargeModalLabel").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Editar Registro");
    $("#modalregusua").modal("show");
}

$("#tbUsuario tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
})

$('#btnNuevoUsuar').on('click', function () {
    mostrarModal(null, true);
})

function sendDataToServerUsr(request) {
    $.ajax({
        type: "POST",
        url: "/PageUsuarios.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUsuarios();
                $('#modalregusua').modal('hide');

                //let smss = `${response.d.Mensaje} Clave: ${response.d.Valor}`;
                //swal("Mensaje", smss, "success");
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
            $('#btnGuardarCambios').prop('disabled', false);
        }
    });
}

function registerDataUser() {
    var fileInput = document.getElementById('txtFotoUr');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["Nombres"] = $("#txtNombres").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Correo"] = $("#txtCorreo").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["IdVeterinaria"] = $("#cboVeter").val();
    modelo["IdRol"] = $("#cboRol").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarCambios').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerUsr(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerUsr(request);
    }
}

function esCorreoValido(correo) {
    // Expresión regular mejorada para validar correos electrónicos
    var emailRegex = /^[a-zA-Z0-9._%+-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return correo !== "" && emailRegex.test(correo);
}

$('#btnGuardarCambios').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    var correo = $("#txtCorreo").val().trim();

    if (!esCorreoValido(correo)) {
        toastr.warning("", "Debe ingresar un Correo válido");
        $("#txtCorreo").focus();
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }


    if (parseInt($("#txtIdUsuario").val()) === 0) {
        registerDataUser();
    } else {
        swal("Mensaje", "Falta para Actualizar personal.", "warning")
        //editarDataAjaxU();
    }
})

function enviarSms() {

    var request = {
        celular: $("#txtcelularz").val().trim(),
        correo: $("#txtCorreoz").val().trim()
    };

    $.ajax({
        type: "POST",
        url: "/PageUsuarios.aspx/EnvioSms",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadwat").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadwat").LoadingOverlay("hide");
            if (response.d.Estado) {

                $("#txtMensaje").val(response.d.Data);
                let smss = `${response.d.Mensaje} Clave: ${response.d.Valor}`;
                swal("Mensaje", smss, "success");
                //swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadwat").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnEnviar').prop('disabled', false);
        }
    });
}

$('#btnEnviar').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnEnviar').prop('disabled', true);

    enviarSms();
})