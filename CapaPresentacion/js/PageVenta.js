
var table;

function ObtenerFechaVenta() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    $("#txtproductocantidad").val("0");
    $("#txtfechaa").val(ObtenerFechaVenta());

    const datosUserv = JSON.parse(sessionStorage.getItem('usuarioSt'));
    $("#txtIdVeteriVe").val(datosUserv.IdVeterinaria);
    $("#txtnomvete").val(datosUserv.Veterinaria.NombreVeterinaria);
    $("#txtuserr").val(datosUserv.Nombres + " " + datosUserv.Apellidos);
})

function listaProductosVenta() {
    if ($.fn.DataTable.isDataTable("#tbProductm")) {
        $("#tbProductm").DataTable().destroy();
        $('#tbProductm tbody').empty();
    }

    //var usuario = JSON.parse(sessionStorage.getItem('usuarioSt'));
    //var request = { IdVete: usuario.IdVeterinaria };
    var request = { IdVete: parseInt($("#txtIdVeteriVe").val()) }

    table = $("#tbProductm").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageVenta.aspx/ProductosporVeterinaria',
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
            {
                "data": null,
                "render": function () {
                    return `<button class="btn btn-primary btn-addp btn-sm ml-2">
                                <i class="fas fa-check-square"></i>
                            </button>`;
                },
                "orderable": false,
                "searchable": false,
                "width": "50px"
            },
            { "data": "Codigo" },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "Stock" }
        ],
        "order": [[1, "desc"]],
        "dom": "frtip",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function listaProductosVentaPrueb() {
    if ($.fn.DataTable.isDataTable("#tbProductm")) {
        $("#tbProductm").DataTable().destroy();
        $('#tbProductm tbody').empty();
    }

    //var usuario = JSON.parse(sessionStorage.getItem('usuarioSt'));
    //var request = { IdVete: usuario.IdVeterinaria };
    var request = { IdVete: parseInt($("#txtIdVeteriVe").val()) }

    table = $("#tbProductm").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageVenta.aspx/ProductosporVeterinaria',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "beforeSend": function () {
                $(".modal-content").LoadingOverlay("show");
            },
            "dataSrc": function (json) {
                $(".modal-content").LoadingOverlay("hide");
                if (json.d.Estado) {
                    return json.d.Data; // Retorna los datos si todo está bien
                } else {
                    return [];
                }
            },
            "error": function (xhr, ajaxOptions, thrownError) {
                $(".modal-content").LoadingOverlay("hide");
                console.error("Error en la solicitud:", xhr.status, xhr.responseText, thrownError);
            },
            "complete": function () {
                $(".modal-content").LoadingOverlay("hide");
            }
        },
        "columns": [
            {
                "data": null,
                "render": function () {
                    return `<button class="btn btn-primary btn-addp btn-sm ml-2">
                                <i class="fas fa-check-square"></i>
                            </button>`;
                },
                "orderable": false,
                "searchable": false,
                "width": "50px"
            },
            { "data": "Codigo" },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "Stock" }
        ],
        "order": [[1, "desc"]],
        "dom": "Bfrtip",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBuscarProduct').on('click', function () {
    listaProductosVenta();
    $("#modalproduct").modal("show");
})

$("#tbProductm tbody").on("click", ".btn-addp", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    $("#txtIdProductoVen").val(model.IdProducto);
    $("#txtproductonombre").val(model.Nombre);
    $("#txtproductodescripcion").val(model.Descripcion);
    $("#txtproductostock").val(model.Stock);
    $("#txtproductoprecio").val(model.Precio);
    $("#txtproductocantidad").val("0");
    $('#modalproduct').modal('hide');
});

let ProductosParaVentaC = [];

$('#btnAgregar').on('click', function () {

    var cantidadStr = $("#txtproductocantidad").val().trim();
    var idProdu = $("#txtIdProductoVen").val().trim();
    var precioStr = parseFloat($("#txtproductoprecio").val().trim());

    if (cantidadStr === "" || isNaN(cantidadStr) || parseInt(cantidadStr) <= 0) {
        swal("Mensaje", "Debe ingresar una cantidad válida (mayor a 0)", "warning")
        return;
    }

    if (parseInt(idProdu) === 0) {
        swal("Mensaje", "Ocurrio un error Seleccione nuevamente el Producto.", "warning")
        return;
    }

    let producto_encontradov = ProductosParaVentaC.filter(p => p.IdProducto == idProdu)
    if (producto_encontradov.length > 0) {
        swal("Mensaje", "El producto ya fue agregado para la venta", "warning")
        return;
    }

    let productod = {
        IdProducto: parseInt(idProdu),
        NombreProducto: $("#txtproductonombre").val().trim(),
        Cantidad: parseInt(cantidadStr),
        PrecioUnidad: precioStr,
        //PrecioUnidad: parseFloat($("#txtproductoprecio").val().trim()),
        ImporteTotal: (parseFloat(cantidadStr) * precioStr)
    }

    ProductosParaVentaC.push(productod)
    mosProdr_Precio();

    $("#txtIdProductoVen").val("0");
    $("#txtproductonombre").val("");
    $("#txtproductodescripcion").val("");
    $("#txtproductostock").val("");
    $("#txtproductoprecio").val("");
    $("#txtproductocantidad").val("0");


})

function mosProdr_Precio() {
    let total = 0;
    let subtotal = 0;
    var totallprodu = 0;

    $("#tbDetallePro tbody").html("");

    ProductosParaVentaC.forEach((item) => {

        total = total + parseFloat(item.ImporteTotal)
        totallprodu = totallprodu + parseInt(item.Cantidad)

        $("#tbDetallePro tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProductoa", item.IdProducto)
                ),
                $("<td>").text(item.NombreProducto),
                $("<td>").text(item.Cantidad),
                $("<td>").text(item.PrecioUnidad),
                $("<td>").text(item.ImporteTotal)
            )
        )
    })

    $("#txtcantid").val(totallprodu + " Und.");
    $("#txttotalm").val(total.toFixed(2));
}

$(document).on('click', 'button.btn-eliminar', function () {
    const _idProducto = $(this).data("idProductoa")
    ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto != _idProducto);

    mosProdr_Precio();
});