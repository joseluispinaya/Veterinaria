

$(document).ready(function () {
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

function mostrarImagenSeleccionadaP(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = (e) => $('#imgProd').attr('src', e.target.result);
    file ? reader.readAsDataURL(file) : $('#imgProd').attr('src', "Imagenes/sinimagen.png");

    let fileName = file ? file.name : 'Ningún archivo seleccionado';
    $(input).next('.custom-file-label').text(fileName);
}

$('#txtFotoPror').change(function () {
    mostrarImagenSeleccionadaP(this);
});