
var table;

const MODELO_BASE = {
    IdPropietario: 0,
    NroCi: "",
    Nombres: "",
    Apellidos: "",
    Celular: "",
    Direccion: "",
    Activo: true
}

$(document).ready(function () {
    listaClientes();
})

function listaClientes() {
    if ($.fn.DataTable.isDataTable("#tbPropiet")) {
        $("#tbPropiet").DataTable().destroy();
        $('#tbPropiet tbody').empty();
    }

    table = $("#tbPropiet").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageClientes.aspx/ObtenerClientes',
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
            { "data": "IdPropietario", "visible": false, "searchable": false },
            { "data": "Nombres" },
            { "data": "Apellidos" },
            { "data": "NroCi" },
            { "data": "Celular" },
            { "data": "FechaRegistro" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            { "data": "NumeroMascotas" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
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
                filename: 'Informe Clientes',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7] // Ajusta según las columnas que desees exportar
                }
            },
            'pageLength'
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    modelo = modelo ?? { ...MODELO_BASE };

    const campos = {
        "txtIdProp": modelo.IdPropietario,
        "txtNroci": modelo.NroCi,
        "txtnombres": modelo.Nombres,
        "txtapellidos": modelo.Apellidos,
        "txtCelular": modelo.Celular,
        "txtDireccion": modelo.Direccion,
        "cboEstado": modelo.Activo ? 1 : 0,
    };

    Object.entries(campos).forEach(([id, valor]) => $("#" + id).val(valor));

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    $("#myModalLabel").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Editar Registro");
    $("#modalRegPro").modal("show");
}

$("#tbPropiet tbody").on("click", ".btn-editar", function (e) {
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

$("#tbPropiet tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'PageDetalleCliente.aspx?id=' + model.IdPropietario;
    window.location.href = url;

    //swal("Mensaje", "Se pasara el ID: " + model.IdPropietario, "success")
    //mostrarModal(model, false);
})

//$("#tbPropiet tbody").on("click", ".btn-eliminar", function (e) {
//    e.preventDefault();
//    let filaSeleccionada;

//    if ($(this).closest("tr").hasClass("child")) {
//        filaSeleccionada = $(this).closest("tr").prev();
//    } else {
//        filaSeleccionada = $(this).closest("tr");
//    }

//    const model = table.row(filaSeleccionada).data();
//    swal("Mensaje", "Se eliminara el ID: " + model.IdPropietario, "warning")
//})

$('#btnNuevoPropie').on('click', function () {
    //$("#modalRegPro").modal("show");
    mostrarModal(null, true);
})

function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPropietario"] = parseInt($("#txtIdProp").val());
    modelo["NroCi"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtnombres").val();
    modelo["Apellidos"] = $("#txtapellidos").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Activo"] = true;

    var request = {
        oPropietario: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageClientes.aspx/GurdarPropietario",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaClientes();
                $('#modalRegPro').modal('hide');
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

function dataActualizar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPropietario"] = parseInt($("#txtIdProp").val());
    modelo["NroCi"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtnombres").val();
    modelo["Apellidos"] = $("#txtapellidos").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oPropietario: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageClientes.aspx/ActualizarPropietario",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaClientes();
                $('#modalRegPro').modal('hide');
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


    if (parseInt($("#txtIdProp").val()) === 0) {
        dataRegistrar();
    } else {
        dataActualizar();
    }
})