
var table;
var tabledes;

const MODELO_BASE = {
    IdCategoria: 0,
    Descripcion: "",
    Activo: true
}

const MODELO_BASESER = {
    Idservicio: 0,
    Servicio: "",
    Activo: true
}

$(document).ready(function () {
    cargarCategorias();
    cargarServicios();
})

function cargarCategorias() {
    if ($.fn.DataTable.isDataTable("#tbCategorias")) {
        $("#tbCategorias").DataTable().destroy();
        $('#tbCategorias tbody').empty();
    }

    tabledes = $("#tbCategorias").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageAddProducto.aspx/ListaCategorias',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdCategoria", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editarde btn-xs"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "30px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdcatego").val(modelo.IdCategoria);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#cboEstado").val(modelo.Activo ? 1 : 0);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#myLargeModalLabeld").text("Nueva Categoria");
    } else {
        $("#myLargeModalLabeld").text("Editar Categoria");
    }

    $("#modalCategoria").modal("show");
}

$("#tbCategorias tbody").on("click", ".btn-editarde", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = tabledes.row(filaSeleccionada).data();
    mostrarModal(model, false);
})

$('#btnNuevoCateg').on('click', function () {
    mostrarModal(null, true);
    //$("#modalrol").modal("show");
})

function registerDataCatego() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdCategoria"] = parseInt($("#txtIdcatego").val());
    modelo["Descripcion"] = $("#txtDescripcion").val();


    var request = {
        categoria: modelo
    }

    $.ajax({
        type: "POST",
        url: "PageServicios.aspx/RegistrarCategoria",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loaddest").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddest").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCategorias();
                $('#modalCategoria').modal('hide');

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddest").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataCateg() {

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdCategoria"] = parseInt($("#txtIdcatego").val());
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        categoria: modelo
    }

    $.ajax({
        type: "POST",
        url: "PageServicios.aspx/EditarCategoria",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loaddest").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddest").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCategorias();
                $('#modalCategoria').modal('hide');

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddest").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnGuardarCate').on('click', function () {

    if ($("#txtDescripcion").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Descripcion");
        $("#txtDescripcion").focus();
        return;
    }

    if (parseInt($("#txtIdcatego").val()) === 0) {
        registerDataCatego();
    } else {
        editarDataCateg();
    }
})

// inicio servicio
function cargarServicios() {
    if ($.fn.DataTable.isDataTable("#tbServicios")) {
        $("#tbServicios").DataTable().destroy();
        $('#tbServicios tbody').empty();
    }

    table = $("#tbServicios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageDetalleMascota.aspx/ObtenerServicios',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "Idservicio", "visible": false, "searchable": false },
            { "data": "Servicio" },
            {
                "data": "Activo", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-xs"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "30px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarModalSer(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASESER;

    $("#txtIdservicio").val(modelo.Idservicio);
    $("#txtDescripcionser").val(modelo.Servicio);
    $("#cboEstadose").val(modelo.Activo ? 1 : 0);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado
    $("#cboEstadose").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#myLargeModalLabeldser").text("Nuevo Servicio");
    } else {
        $("#myLargeModalLabeldser").text("Editar Servicio");
    }

    $("#modalServici").modal("show");
}

$("#tbServicios tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    mostrarModalSer(model, false);
})

$('#btnNuevoServ').on('click', function () {
    mostrarModalSer(null, true);
    //$("#modalrol").modal("show");
})

function registerDataServicios() {

    const modelo = structuredClone(MODELO_BASESER);
    modelo["Idservicio"] = parseInt($("#txtIdservicio").val());
    modelo["Servicio"] = $("#txtDescripcionser").val();


    var request = {
        servicio: modelo
    }

    $.ajax({
        type: "POST",
        url: "PageServicios.aspx/RegistrarServicio",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadser").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadser").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarServicios();
                $('#modalServici').modal('hide');

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadser").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataServic() {

    const modelo = structuredClone(MODELO_BASESER);
    modelo["Idservicio"] = parseInt($("#txtIdservicio").val());
    modelo["Servicio"] = $("#txtDescripcionser").val();
    modelo["Activo"] = ($("#cboEstadose").val() == "1" ? true : false);

    var request = {
        servicio: modelo
    }

    $.ajax({
        type: "POST",
        url: "PageServicios.aspx/EditarServicio",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadser").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadser").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarServicios();
                $('#modalServici').modal('hide');

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadser").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnGuardarServicio').on('click', function () {

    if ($("#txtDescripcionser").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Descripcion");
        $("#txtDescripcionser").focus();
        return;
    }

    if (parseInt($("#txtIdservicio").val()) === 0) {
        registerDataServicios();
    } else {
        editarDataServic();
    }
})

//fin servicios