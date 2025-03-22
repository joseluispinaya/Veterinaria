
var table;

function ObtenerFechaVentaIa() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

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
    $("#txtfechaafor").val(ObtenerFechaVentaIa());

    const datosUserv = JSON.parse(sessionStorage.getItem('usuarioSt'));
    if (datosUserv) {
        $("#txtIdVeteriVe").val(datosUserv.IdVeterinaria);
        $("#txtnomvete").val(datosUserv.Veterinaria.NombreVeterinaria);
        $("#txtuserr").val(`${datosUserv.Nombres} ${datosUserv.Apellidos}`);
    }
});

function listaProductosVenta() {
    if ($.fn.DataTable.isDataTable("#tbProductm")) {
        $("#tbProductm").DataTable().destroy();
        $('#tbProductm tbody').empty();
    }

    const request = { IdVete: parseInt($("#txtIdVeteriVe").val()) };

    table = $("#tbProductm").DataTable({
        responsive: true,
        ajax: {
            url: 'PageVenta.aspx/ProductosporVeterinaria',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: () => JSON.stringify(request),
            dataSrc: json => json.d.Estado ? json.d.Data : []
        },
        columns: [
            {
                data: null,
                render: () => '<button class="btn btn-primary btn-addp btn-sm ml-2"><i class="fas fa-check-square"></i></button>',
                orderable: false,
                searchable: false,
                width: "50px"
            },
            { data: "Codigo" },
            { data: "Nombre" },
            { data: "Descripcion" },
            { data: "Stock" }
        ],
        order: [[1, "desc"]],
        dom: "frtip",
        language: { url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json" }
    });
}

$('#btnBuscarProduct').on('click', function () {
    listaProductosVenta();
    $("#modalproduct").modal("show");
});

$("#tbProductm tbody").on("click", ".btn-addp", function (e) {
    e.preventDefault();
    const row = $(this).closest("tr").hasClass("child") ? $(this).closest("tr").prev() : $(this).closest("tr");
    const model = table.row(row).data();

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
    const cantidad = parseInt($("#txtproductocantidad").val().trim());
    const idProdu = parseInt($("#txtIdProductoVen").val().trim());
    const precio = parseFloat($("#txtproductoprecio").val().trim());

    if (isNaN(cantidad) || cantidad <= 0) {
        return swal("Mensaje", "Debe ingresar una cantidad válida (mayor a 0)", "warning");
    }

    if (idProdu === 0) {
        return swal("Mensaje", "Seleccione nuevamente el Producto.", "warning");
    }

    if (ProductosParaVentaC.some(p => p.IdProducto === idProdu)) {
        return swal("Mensaje", "El producto ya fue agregado para la venta", "warning");
    }

    ProductosParaVentaC.push({
        IdProducto: idProdu,
        NombreProducto: $("#txtproductonombre").val().trim(),
        Cantidad: cantidad,
        PrecioUnidad: precio,
        ImporteTotal: cantidad * precio
    });

    controlarStock(idProdu, cantidad, true);
    mosProdr_Precio();
    resetProductoForm();
});

function resetProductoForm() {
    $("#txtIdProductoVen").val("0");
    $("#txtproductonombre").val("");
    $("#txtproductodescripcion").val("");
    $("#txtproductostock").val("");
    $("#txtproductoprecio").val("");
    $("#txtproductocantidad").val("0");
}

function mosProdr_Precio() {
    const total = ProductosParaVentaC.reduce((sum, item) => sum + item.ImporteTotal, 0);
    const totalProductos = ProductosParaVentaC.reduce((sum, item) => sum + item.Cantidad, 0);

    $("#tbDetallePro tbody").html(ProductosParaVentaC.map(item => `
        <tr>
            <td><button class="btn btn-danger btn-eliminar btn-sm" data-id-productoa="${item.IdProducto}"><i class="fas fa-trash-alt"></i></button></td>
            <td>${item.NombreProducto}</td>
            <td>${item.Cantidad}</td>
            <td>${item.PrecioUnidad}</td>
            <td>${item.ImporteTotal.toFixed(2)}</td>
        </tr>`).join(""));

    $("#txtcantid").val(`${totalProductos} Und.`);
    $("#txttotalm").val(total.toFixed(2));
}

$(document).on('click', '.btn-eliminar', function () {
    const idProducto = $(this).data("id-productoa");
    const producto = ProductosParaVentaC.find(p => p.IdProducto === idProducto);

    if (producto) {
        controlarStock(idProducto, producto.Cantidad, false);
        ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto !== idProducto);
        mosProdr_Precio();
    }
});

function controlarStock($idproducto, $cantidad, $restar) {
    var request = {
        idproducto: $idproducto,
        cantidad: $cantidad,
        restar: $restar
    }

    $.ajax({
        type: "POST",
        url: "PageVenta.aspx/ControlarStock",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                //swal("Mensaje", response.d.Mensaje, "success");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

window.onbeforeunload = function () {
    if (ProductosParaVentaC.length > 0) {
        ProductosParaVentaC.forEach((item) => {
            controlarStock(item.IdProducto, item.Cantidad, false); // Se devuelve el stock
        });
    }
};