
const MODELO_BASE = {
    IdProducto: 0,
    Marca: "",
    Nombre: "",
    Descripcion: "",
    IdCategoria: 0,
    IdVeterinaria: 0,
    Stock: 0,
    Precio: 0.0,
    Activo: true,
    ImageFulP: ""
}

$(document).ready(function () {
    cargarCategorias();
    $("#cboEstado").prop("disabled", true);
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

function sendDataToServerProd(request) {
    $.ajax({
        type: "POST",
        url: "PageAddProducto.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadp").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadp").LoadingOverlay("hide");
            if (response.d.Estado) {

                swal({
                    title: "Mensaje",
                    text: "Registrado con exito",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(function () {
                    window.location.href = 'PageListaProducto.aspx';
                }, 3000);

                //swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadp").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarPro').prop('disabled', false);
        }
    });
}

function registerDataProduc() {
    var fileInput = document.getElementById('txtFotoPror');
    var file = fileInput.files[0];
    var usuario = JSON.parse(sessionStorage.getItem('usuarioSt'));

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProducto"] = parseInt($("#txtIdProduc").val());
    modelo["Marca"] = $("#txtMarca").val().trim();
    modelo["Nombre"] = $("#txtNombre").val().trim();
    modelo["Descripcion"] = $("#txtDescripcion").val().trim();
    modelo["IdCategoria"] = $("#cboCatego").val();
    modelo["IdVeterinaria"] = parseInt(usuario.IdVeterinaria);
    modelo["Stock"] = parseInt($("#txtStock").val().trim());
    //modelo["Stock"] = $("#txtStock").val();
    modelo["Precio"] = parseFloat($("#txtPrecio").val().trim());
    //modelo["Precio"] = $("#txtPrecio").val();

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

            sendDataToServerProd(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oProduc: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerProd(request);
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
    //swal("Mensaje", "Registrado correctamente", "success");
    //$('#btnGuardarPro').prop('disabled', false);
    // Si pasa todas las validaciones, registrar el producto
    registerDataProduc();
});

$('#btnIrlista').on('click', function () {
    window.location.href = 'PageListaProducto.aspx';
})
