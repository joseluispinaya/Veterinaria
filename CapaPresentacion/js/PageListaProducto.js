
var table;

$(document).ready(function () {
    listaProductos();
    cargarCategorias();
})

function cargarCategorias() {
    $("#cboCatego").html("");

    $.ajax({
        type: "POST",
        url: "PageAddProducto.aspx/ListaCategorias",
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
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCatego");
                    }

                })
            }

        }
    });
}

function listaProductos() {
    if ($.fn.DataTable.isDataTable("#tbProductos")) {
        $("#tbProductos").DataTable().destroy();
        $('#tbProductos tbody').empty();
    }

    var usuario = JSON.parse(sessionStorage.getItem('usuarioSt'));
    var request = { IdVete: usuario.IdVeterinaria }

    table = $("#tbProductos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageListaProducto.aspx/ObtenerProdporVeteri',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
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
            { "data": "IdProducto", "visible": false, "searchable": false },
            {
                "data": "ImageFulP",
                "orderable": false,
                "searchable": false,
                render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
            { "data": "Categoria.Descripcion" },
            { "data": "Nombre" },
            { "data": "Marca" },
            { "data": "MontoCadena" },
            { "data": "Stock" },
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
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-eye"></i></button>',
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
                filename: 'Informe Productos',
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

// Función auxiliar para validar tipo de archivo
function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionadaP(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgProd').attr('src', "Imageprodu/sinimagenpro.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        swal("Error", "El archivo seleccionado no es una imagen válida.", "error");
        $('#imgProd').attr('src', "Imageprodu/sinimagenpro.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgProd').attr('src', e.target.result);
    reader.readAsDataURL(file);

    // Mostrar nombre del archivo
    $(input).next('.custom-file-label').text(file.name);
}

$('#txtFotoPror').change(function () {
    mostrarImagenSeleccionadaP(this);
});

$("#tbProductos tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    $("#txtIdProduc").val(model.IdProducto);
    $("#txtMarca").val(model.Marca);
    $("#txtNombre").val(model.Nombre);
    $("#txtDescripcion").val(model.Descripcion);
    $("#cboCatego").val(model.IdCategoria);
    $("#txtIdVeteac").val(model.IdVeterinaria);
    $("#txtStock").val(model.Stock);
    $("#txtPrecio").val(model.Precio);
    $("#cboEstado").val(model.Activo ? 1 : 0);
    $("#imgProd").attr("src", model.ImageFulP);

    $("#txtFotoPror").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#modalregprodd").modal("show");
    //mostrarModal(model, false);
})

$("#tbProductos tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    $("#lblnompro").text(model.Nombre);
    $("#lblmarca").text(model.Marca);
    $("#lbldescri").val(model.Descripcion);
    $("#lblcatego").text(model.Categoria.Descripcion);
    $("#lblstock").text(model.Stock + " Und.");
    $("#lblprecio").text(model.MontoCadena);
    $("#imgprodet").attr("src", model.ImageFulP);

    $("#modaldetalle").modal("show");
})

function sendDataToServerActuProd(request) {
    $.ajax({
        type: "POST",
        url: "PageListaProducto.aspx/Actualizar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaProductos();
                $('#modalregprodd').modal('hide');

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
            $('#btnGuardarPro').prop('disabled', false);
        }
    });
}

function actualizarDataProduc() {
    var fileInput = document.getElementById('txtFotoPror');
    var file = fileInput.files[0];

    const modelo = {
        IdProducto: parseInt($("#txtIdProduc").val()),
        Marca: $("#txtMarca").val().trim(),
        Nombre: $("#txtNombre").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim(),
        IdCategoria: $("#cboCatego").val(),
        IdVeterinaria: parseInt($("#txtIdVeteac").val()),
        Stock: parseInt($("#txtStock").val().trim()),
        Precio: parseFloat($("#txtPrecio").val().trim()),
        Activo: ($("#cboEstado").val() == "1" ? true : false)
    }

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnGuardarPro').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oProduc: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerActuProd(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oProduc: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerActuProd(request);
    }
}

$('#btnGuardarPro').on('click', function () {
    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarPro').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje);
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    var cantidadStr = $("#txtStock").val().trim();

    // Verificar si la cantidad es un número válido, no vacío, mayor que 0
    if (cantidadStr === "" || isNaN(cantidadStr) || parseInt(cantidadStr) <= 0) {
        toastr.warning("", "Debe ingresar una cantidad válida (mayor a 0)");
        $("#txtStock").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    var precioStr = $("#txtPrecio").val().trim();

    // Verificar si el precio es un número válido, no vacío, y mayor que 0
    if (precioStr === "" || isNaN(precioStr) || parseFloat(precioStr) <= 0) {
        toastr.warning("", "Debe ingresar un monto válido (mayor a 0)");
        $("#txtPrecio").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdProduc").val()) === 0) {
        swal("Mensaje", "Seleccione nuevamente el Producto a editar.", "warning")
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    actualizarDataProduc();
});