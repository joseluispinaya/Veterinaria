
var table;
//let jsPDFInstance;

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
    $("#txtIdVeteriVe").val(datosUserv.IdVeterinaria);
    $("#txtnomvete").val(datosUserv.Veterinaria.NombreVeterinaria);
    $("#txtuserr").val(`${datosUserv.Nombres} ${datosUserv.Apellidos}`);
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

    const stockv = parseInt($("#txtproductostock").val().trim());
    const cantidadv = parseInt($("#txtproductocantidad").val().trim());

    var cantidadStr = $("#txtproductocantidad").val().trim();
    var idProdu = $("#txtIdProductoVen").val().trim();
    var precioStr = parseFloat($("#txtproductoprecio").val().trim());

    if (cantidadStr === "" || isNaN(cantidadStr) || parseInt(cantidadStr) <= 0) {
        swal("Mensaje", "Debe ingresar una cantidad válida (mayor a 0)", "warning")
        return;
    }

    if (cantidadv > stockv) {
        return swal("Mensaje", "La cantidad no puede ser mayor al stock disponible", "warning");
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

    controlarStock(parseInt(idProdu), parseInt(cantidadStr),true);

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
                $("<td>").text(item.ImporteTotal.toFixed(2))
            )
        )
    })

    $("#txtcantid").val(`${totallprodu} Und.`);
    //$("#txtcantid").val(totallprodu + " Und.");
    $("#txttotalm").val(total.toFixed(2));
}

$(document).on('click', 'button.btn-eliminar', function () {
    const _idProducto = $(this).data("idProductoa")

    // Buscar el producto antes de eliminarlo para obtener la cantidad
    let productoEliminado = ProductosParaVentaC.find(p => p.IdProducto === _idProducto);

    if (productoEliminado) {
        let cantidadEliminada = productoEliminado.Cantidad;

        // Llamar a la función controlarStock con restar = false (devolver stock)
        controlarStock(_idProducto, cantidadEliminada, false);

        // Filtrar la lista eliminando el producto
        ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto !== _idProducto);

        // Actualizar la tabla
        mosProdr_Precio();
    }


    //ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto != _idProducto);
    //mosProdr_Precio();
});

function buscarPropietario() {

    $.ajax({
        type: "POST",
        url: "PageVenta.aspx/BuscarPropie",
        data: JSON.stringify({ Nroci: $("#txtclienCi").val().trim() }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loadClib").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadClib").LoadingOverlay("hide");

            if (response.d.Estado) {
                $("#txtIdClienVen").val(response.d.Data.IdPropietario);
                $("#txtCliente").val(`${response.d.Data.Nombres} ${response.d.Data.Apellidos}`);
                $("#txtdireccioncli").val(response.d.Data.Direccion);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadClib").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnBuscarcli').on('click', function () {

    if ($("#txtclienCi").val().trim() === "") {
        swal("Mensaje", "Ingrese Nro Ci para Buscar al cliente", "warning");
        return;
    }
    buscarPropietario();
});

function dataGuardarVentaCliente() {

    var totalProductos = 0;
    var totalCosto = parseFloat($("#txttotalm").val()) || 0;

    var DETALLE = "";
    var VENTA = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";

    ProductosParaVentaC.forEach((item) => {

        totalProductos += parseInt(item.Cantidad);

        DATOS_VENTA = DATOS_VENTA + "<DATOS>" +
            "<IdVenta>0</IdVenta>" +
            "<IdProducto>" + item.IdProducto + "</IdProducto>" +
            "<Cantidad>" + item.Cantidad + "</Cantidad>" +
            "<PrecioUnidad>" + item.PrecioUnidad + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.ImporteTotal + "</ImporteTotal>" +
            "</DATOS>"
    });

    VENTA = "<VENTA>" +
        "<IdVeterinaria>" + $("#txtIdVeteriVe").val() + "</IdVeterinaria>" +
        "<IdPropietario>" + $("#txtIdClienVen").val() + "</IdPropietario>" +
        "<CantidadProducto>" + ProductosParaVentaC.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totalProductos + "</CantidadTotal>" +
        "<TotalCosto>" + totalCosto.toFixed(2) + "</TotalCosto>" +
        "</VENTA>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";
    DETALLE = "<DETALLE>" + VENTA + DETALLE_VENTA + "</DETALLE>"

    var request = { xml: DETALLE };

    $.ajax({
        type: "POST",
        url: "PageVenta.aspx/GuardarVentaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loadingvent").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadingvent").LoadingOverlay("hide");
            if (response.d.Estado) {
                // Reseteo de campos y tabla después de un éxito
                ProductosParaVentaC = [];
                mosProdr_Precio();

                cargarDetalleVenta(response.d.Valor);
                //CLIENTE
                $("#txtIdClienVen").val("0");
                $("#txtclienCi").val("");
                $("#txtCliente").val("");
                $("#txtdireccioncli").val("");

                //PRODUCTO
                $("#txtIdProductoVen").val("0");
                $("#txtproductonombre").val("");
                $("#txtproductodescripcion").val("");
                $("#txtproductostock").val("");
                $("#txtproductoprecio").val("");
                $("#txtproductocantidad").val("0");

                //PRECIOS
                //let mensaje = `${response.d.Mensaje} Nro Venta: ${response.d.Valor}`;
                swal("Registrado!", response.d.Mensaje, "success");

            } else {
                swal("Lo sentimos!", response.d.Mensaje, "error");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingvent").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnguardarventa').prop('disabled', false);
        }
    });
}

$('#btnguardarventa').on('click', function () {

    $('#btnguardarventa').prop('disabled', true);

    if (ProductosParaVentaC.length < 1) {
        swal("Mensaje", "Debe ingresar productos para la venta", "warning");
        $('#btnguardarventa').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdClienVen").val()) === 0) {
        swal("Mensaje", "Debe Agregar un Cliente para la venta", "warning")
        $('#btnguardarventa').prop('disabled', false);
        return;
    }

    const idVet = parseInt($("#txtIdVeteriVe").val().trim());

    if (isNaN(idVet) || idVet === 0) {
        swal("Mensaje", "Ocurrio un error Inicie sesion nuevamente", "warning")
        $('#btnguardarventa').prop('disabled', false);
        return;
    }

    dataGuardarVentaCliente();
})

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

function ReporteVenta(dataVenta) {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Nota_Ventas_2025",
        orientationLandscape: false,
        //compress: true,
        logo: {
            src: "../Imagenes/logoveter.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: dataVenta.Veterinaria.NombreVeterinaria,
            address: dataVenta.Veterinaria.Direccion,
            phone: dataVenta.Veterinaria.Celular,
            email: dataVenta.Veterinaria.Propietario,
            email_1: "veterinarias@gmail.com",
            website: "www.Veterinarias.com",
        },
        contact: {
            label: "Nota de Venta para:",
            name: dataVenta.Propietario.Nombres,
            address: dataVenta.Propietario.Apellidos,
            phone: dataVenta.Propietario.Celular,
            email: dataVenta.Propietario.Direccion,
            otherInfo: dataVenta.Propietario.NroCi,
        },
        invoice: {
            label: "Nro de Venta #: ",
            num: dataVenta.Codigo,
            invDate: dataVenta.FechaRegistro,
            invGenDate: dataVenta.FechaRegistro,
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Producto", "Cantidad", "Precio", "Total"],
            table: dataVenta.ListaDetalleVenta.map((item, index) => [
                item.NombreProducto,
                item.Cantidad,
                item.PrecioCadena,
                item.TotCadena
            ]),
            invTotalLabel: "Total:",
            invTotal: dataVenta.TotveCadena,
            invCurrency: "BOB",
            row1: {
                col1: 'Cantidad:',
                col2: dataVenta.TotcanttCadena,
                col3: 'Unds',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            invDescLabel: "Gracias por usar nuestro sistema",
            invDesc: "Gracia por preferirnos y realizar su compra en nuetra red de veterinarias unidas Riberalta-Beni-Bolivia.",
        },
        footer: {
            text: "Este es un documento generado automáticamente.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log(pdfObject);
}

function cargarDetalleVenta(IdVe) {

    //var request = { IdVenta: parseInt($("#txtIdVentaa").val()) }
    //var request = { IdVenta: 1 }
    var request = { IdVenta: IdVe }

    $.ajax({
        type: "POST",
        url: "PageVenta.aspx/DetalleVenta",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var detalle = response.d.Data;
                console.log(detalle)
                ReporteVenta(detalle)
                //swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function GenerarPDFprueba() {
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Nota_Prueba 2025",
        orientationLandscape: false,
        //compress: true,
        logo: {
            src: "../Imagenes/logoveter.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "Business Name",
            address: "Albania, Tirane ish-Dogana, Durres 2001",
            phone: "(+355) 069 11 11 111",
            email: "email@example.com",
            email_1: "info@example.al",
            website: "www.example.al",
        },
        contact: {
            label: "Invoice issued for:",
            name: "Client Name",
            address: "Albania, Tirane, Astir",
            phone: "(+355) 069 22 22 222",
            email: "client@website.al",
            otherInfo: "www.website.al",
        },
        invoice: {
            label: "Invoice #: ",
            num: 19,
            invDate: "Payment Date: 01/01/2021 18:12",
            invGenDate: "Invoice Date: 02/02/2021 10:17",
            headerBorder: false,
            tableBodyBorder: false,
            header: ["#", "Descripcion", "Price", "Quantity", "Unit", "Total"],
            table: Array.from(Array(10), (item, index) => ([
                index + 1,
                "There are many variations ",
                200.5,
                4.5,
                "m2",
                400.5
            ])),
            invTotalLabel: "Total:",
            invTotal: "145,250.50",
            invCurrency: "ALL",
            row1: {
                col1: 'VAT:',
                col2: '20',
                col3: '%',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            row2: {
                col1: 'SubTotal:',
                col2: '116,199.90',
                col3: 'ALL',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            invDescLabel: "Invoice Note",
            invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log(pdfObject);
}

$('#btnRegisclie').on('click', function () {

    //cargarDetalleVenta(1);
});

window.onbeforeunload = function () {
    if (ProductosParaVentaC.length > 0) {
        ProductosParaVentaC.forEach((item) => {
            controlarStock(item.IdProducto, item.Cantidad, false); // Se devuelve el stock
        });
    }
};