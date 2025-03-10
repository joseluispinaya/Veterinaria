

$('#btnIniciarSesion').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnIniciarSesion').prop('disabled', true);
    

    if ($("#username").val().trim() === "" || $("#password").val().trim() === "") {

        swal("Mensaje", "Debe Ingrese un Correo y Contraseña", "warning");
        $('#btnIniciarSesion').prop('disabled', false);
        return;
    }
    //swal("Mensaje", "Logeado exitoso", "success")

    loginUsuarioLoad();
})

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Iniciar",
        data: JSON.stringify({ Usuario: $("#username").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {

            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {

                sessionStorage.setItem('tokenSesion', response.d.Valor);
                // Almacenar el objeto usuario completo en sessionStorage
                sessionStorage.setItem('usuarioSt', JSON.stringify(response.d.Data));
                $("#username").val("");
                $("#password").val("");
                window.location.href = 'Inicio.aspx';
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                //swal("Mensaje!", "No se encontro el usuario verifique correo y contraseña", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnIniciarSesion').prop('disabled', false);
        }
    });
}