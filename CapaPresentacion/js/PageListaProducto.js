
var table;

$(document).ready(function () {
    listaProductos();
})

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
                "data": "ImageFulP", render: function (data) {
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
                    '<button class="btn btn-info btn-detalle btn-sm mr-2"><i class="fas fa-eye"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "120px"
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
