
var table;

function ObtenerFechahi() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idMascota = urlParams.get('id');

    if (idMascota !== null && idMascota.trim() !== "") {
        $("#txtfecharegistroh").val(ObtenerFechahi());
        cargarListServicios();
        cargarDatosMascota(idMascota);
    } else {
        swal({
            title: "Mensaje",
            text: "No hay parámetro de búsqueda válido en la URL",
            type: "warning",
            timer: 2000,
            showConfirmButton: false
        });

        setTimeout(function () {
            window.location.href = 'PageClientes.aspx';
        }, 3000);
    }
});

function cargarListServicios() {
    $("#cboServicio").html("");

    $.ajax({
        type: "POST",
        url: "PageDetalleMascota.aspx/ObtenerServicios",
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
                        $("<option>").attr({ "value": row.Idservicio }).text(row.Servicio).appendTo("#cboServicio");
                    }

                })
            }

        }
    });
}

function cargarDatosMascota(idMascota) {
    var request = {
        IdMascota: idMascota
    };

    $.ajax({
        type: "POST",
        url: "PageDetalleMascota.aspx/DetalleMascota",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loadmasc").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadmasc").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;
                var gen = datos.Genero === "H" ? "Hembra" : "Macho";
                $("#txtIdMascotaSt").val(idMascota);
                $("#txtIdMascota").val(idMascota);
                $("#txtIdPropiee").val(datos.IdPropietario);

                $("#lblnombremas").text(datos.Nombre);
                $("#lblraza").text(datos.Raza);
                $("#lblpropiet").text(datos.Propietario.Nombres + " " + datos.Propietario.Apellidos);
                $("#lbledad").text(datos.Edad);
                $("#lblgenero").text(gen);
                $("#lblcomentarioo").text(datos.Comentario);
                $("#imgmascota").attr("src", datos.ImageFulMa);

                var historialList = datos.ListaHistorialClinco;
                console.log(historialList);
                actualizarTablaHistorial(historialList);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadmasc").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function actualizarTablaHistorial(historialList) {
    if ($.fn.DataTable.isDataTable("#tbHistorial")) {
        $("#tbHistorial").DataTable().destroy();
        $('#tbHistorial tbody').empty();
    }

    table = $("#tbHistorial").DataTable({
        responsive: true,
        data: historialList,
        columns: [
            { data: "IdHistoria", visible: false, searchable: false },
            { data: "FechaRegistro" },
            { data: "Oservicio.Servicio" },
            { data: "Descripcion" },
            { data: "Comentario" },
            { data: "Veterinaria.NombreVeterinaria" },
            {
                defaultContent: '<button class="btn btn-primary btn-editar btn-sm" title="Editar"><i class="fas fa-pencil-alt"></i></button>',
                orderable: false,
                searchable: false,
                width: "50px"
            }
        ],
        order: [[0, "desc"]],
        dom: "rt",
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbHistorial tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var idVete = model.IdVeterinaria;
    var usuarioVet = JSON.parse(sessionStorage.getItem('usuarioSt'));

    if (parseInt(idVete) !== parseInt(usuarioVet.IdVeterinaria)) {
        swal("Mensaje", "No puede modificar la historia clínica de otra veterinaria.", "warning");
        return;
    }

    //if (idVete !== usuarioVet.IdVeterinaria) {
    //    swal("Mensaje", "No puede modificar la historia clínica de otra veterinaria.", "warning");
    //    return;
    //}

    $("#txtIdHistoriall").val(model.IdHistoria);
    $("#txtIdVeteValo").val(model.IdVeterinaria);

    $("#txtDescripcion").val(model.Descripcion);
    $("#txtComentario").val(model.Comentario);
    $("#cboServicio").val(model.Idservicio);

    $("#myLargeModalLabelh").text("Editar Historial");

    $("#modalAddHistoria").modal("show");
    //mostrarModal(model, false);
})


$('#btnNewHistorial').on('click', function () {
    $("#txtIdHistoriall").val("0");
    $("#txtIdVeteValo").val("0");
    $("#txtDescripcion").val("");
    $("#txtComentario").val("");

    // Seleccionar la primera opción del select
    $("#cboServicio").val($("#cboServicio option:first").val());
    $("#myLargeModalLabelh").text("Nuevo Historial");
    //mostrarModal(null, true);
    $('#modalAddHistoria').modal('show');
});

function dataRegistrarHis() {

    var usuario = JSON.parse(sessionStorage.getItem('usuarioSt'));

    const modelo = {
        IdHistoria: parseInt($("#txtIdHistoriall").val()),
        //IdVeterinaria: parseInt($("#txtIdVeteValo").val()),
        IdVeterinaria: parseInt(usuario.IdVeterinaria),
        Idservicio: $("#cboServicio").val(),
        IdMascota: parseInt($("#txtIdMascotaSt").val()),
        Descripcion: $("#txtDescripcion").val().trim(),
        Comentario: $("#txtComentario").val().trim()
        //Activo: ($("#cboEstado").val() == "1" ? true : false)
    }

    var request = {
        oHistorial: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageDetalleMascota.aspx/GurdarHistoria",
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
                $('#modalAddHistoria').modal('hide');
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const idMascota = urlParams.get('id');
                cargarDatosMascota(idMascota);
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
            $('#btnGuardarHisto').prop('disabled', false);
        }
    });
}

function dataActualizarHis() {

    const modelo = {
        IdHistoria: parseInt($("#txtIdHistoriall").val()),
        IdVeterinaria: parseInt($("#txtIdVeteValo").val()),
        Idservicio: $("#cboServicio").val(),
        IdMascota: parseInt($("#txtIdMascotaSt").val()),
        Descripcion: $("#txtDescripcion").val().trim(),
        Comentario: $("#txtComentario").val().trim(),
        Activo: true
    }

    var request = {
        oHistorial: modelo
    };

    $.ajax({
        type: "POST",
        url: "PageDetalleMascota.aspx/ActualizarHistoria",
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
                $('#modalAddHistoria').modal('hide');
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const idMascota = urlParams.get('id');
                cargarDatosMascota(idMascota);
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
            $('#btnGuardarHisto').prop('disabled', false);
        }
    });
}


$('#btnGuardarHisto').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarHisto').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        $('#btnGuardarHisto').prop('disabled', false);
        return;
    }

    if ($("#txtComentario").val().trim() === "") {
        toastr.warning("", "Debe ingresar un comentario");
        $('#btnGuardarHisto').prop('disabled', false);
        return;
    }


    if (parseInt($("#txtIdHistoriall").val()) === 0) {
        dataRegistrarHis();
    } else {
        dataActualizarHis();
    }
})

$('#btnVolverr').on('click', function () {

    var idPropiet = $("#txtIdPropiee").val().trim();

    if (parseInt(idPropiet) <= 0) {
        swal("Mensaje", "Ocurrio un erro para regresar a los detalles del Cliente", "warning")
        return;
    }

    var url = 'PageDetalleCliente.aspx?id=' + idPropiet;
    window.location.href = url;
    //window.location.href = 'PageClientes.aspx';
})