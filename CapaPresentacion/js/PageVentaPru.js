
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

function generarPDFHorizontal() {
    if (jsPDFInstance) {
        const props = {
            outputType: 'save',
            returnJsPDFDocObject: true,
            fileName: "Detalle de Venta",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
                type: 'PNG',
                width: 53.33,
                height: 26.66,
                margin: { top: 0, left: 0 }
            },
            business: {
                name: "Zonosis GAMR",
                address: "Barrio la cruz, Calle 5",
                phone: "(+591) 123-456-789",
                email: "gamr@gmail.com",
                website: "www.gamr.com",
            },
            contact: {
                label: "Detalle de Usuario:",
                name: "Client Name",
                address: "Barrio la chonta",
                phone: "(+355) 069 22 22 222",
                email: "client@website.al",
            },
            invoice: {
                label: "Informe #: ",
                num: 20,
                invDate: "Fecha Emision: 11/11/2024 12:12",
                invGenDate: "Fecha Registro: 02/02/2024 16:12",
                headerBorder: true,
                tableBodyBorder: true,
                header: [
                    { title: "#", style: { width: 10 } },
                    { title: "Title", style: { width: 30 } },
                    { title: "Descripcion", style: { width: 70 } },
                    { title: "Precio" },
                    { title: "Cantidad" },
                    { title: "Unid" },
                    { title: "Total" }
                ],
                table: Array.from(Array(5), (item, index) => ([
                    index + 1,
                    "Producto " + (index + 1),
                    "Descripción del producto " + (index + 1),
                    200.5,
                    4.5,
                    "m2",
                    400.5
                ])),
                invDescLabel: "Gracias por usar nuestro sistema",
            },

            additionalRows: [
                {
                    col1: "Subtotal",
                    col2: "Bs.",
                    col3: "4800.00",
                    style: { fontSize: 12 }
                },
                {
                    col1: "Descuento",
                    col2: "Bs.",
                    col3: "200.00",
                    style: { fontSize: 12 }
                },
                {
                    col1: "Total",
                    col2: "Bs.",
                    col3: "4600.00",
                    style: { fontSize: 14, fontStyle: "bold" }
                }
            ],

            footer: {
                text: "Este es un documento generado automáticamente.",
            },
            pageEnable: true,
            pageLabel: "Página ",
        };

        const pdfObject = jsPDFInstance(props);
        console.log(pdfObject);
    } else {
        console.error("jsPDF no está disponible en generarPDFHorizontal.");
    }
}

function GenerarPDFprueba() {
    if (!window.jsPDFInvoiceTemplate) {
        console.error("jsPDFInvoiceTemplate no está disponible.");
        return;
    }

    const props = {
        outputType: "save",
        returnJsPDFDocObject: true,
        fileName: "Factura_Prueba",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
            type: 'PNG',
            width: 53.33,
            height: 26.66,
            margin: { top: 0, left: 0 }
        },
        stamp: {
            inAllPages: true,
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG',
            width: 20,
            height: 20,
            margin: { top: 0, left: 0 }
        },
        business: {
            name: "Nombre de la Empresa",
            address: "Dirección de la Empresa",
            phone: "(+591) 123-456-789",
            email: "empresa@correo.com",
            website: "www.empresa.com",
        },
        contact: {
            label: "Factura para:",
            name: "Nombre del Cliente",
            address: "Dirección del Cliente",
            phone: "(+591) 987-654-321",
            email: "cliente@correo.com",
            otherInfo: "Información adicional del cliente",
        },
        invoice: {
            label: "Factura #: ",
            num: 101,
            invDate: "Fecha de pago: 15/11/2024",
            invGenDate: "Fecha de Factura: 15/11/2024",
            headerBorder: true,
            tableBodyBorder: true,
            header: [
                { title: "#", style: { width: 10 } },
                { title: "Título", style: { width: 30 } },
                { title: "Descripción", style: { width: 80 } },
                { title: "Precio" },
                { title: "Cantidad" },
                { title: "Unidad" },
                { title: "Total" }
            ],
            table: Array.from(Array(5), (item, index) => ([
                index + 1,
                "Producto " + (index + 1),
                "Descripción del producto " + (index + 1),
                (100 + index * 50).toFixed(2),
                (1 + index),
                "unid",
                ((100 + index * 50) * (1 + index)).toFixed(2)
            ])),
            additionalRows: [
                {
                    col1: 'Subtotal:',
                    col2: '10000',
                    col3: 'USD',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'IVA (13%):',
                    col2: '1300',
                    col3: 'USD',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'Total:',
                    col2: '10000',
                    col3: 'USD',
                    style: { fontSize: 14, fontStyle: 'bold' }
                }
            ],
            invDescLabel: "Nota de Factura:",
            invDesc: "Esta es una factura de prueba para verificar el funcionamiento de additionalRows.",
        },
        footer: {
            text: "Esta factura es válida sin firma ni sello.",
        },
        pageEnable: true,
        pageLabel: "Página ",
    };

    let pdfDoc = window.jsPDFInvoiceTemplate.default(props);
    //let pdfDoc = window.jsPDFInvoiceTemplate(props);
    console.log("PDF generado:", pdfDoc);
}

window.onbeforeunload = function () {
    if (ProductosParaVentaC.length > 0) {
        ProductosParaVentaC.forEach((item) => {
            controlarStock(item.IdProducto, item.Cantidad, false); // Se devuelve el stock
        });
    }
};