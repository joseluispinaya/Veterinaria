
//$(document).ready(function () {
//    if (!sessionStorage.getItem("reloaded")) {
//        sessionStorage.setItem("reloaded", "true");
//        location.reload();
//    }
//});

$('#btnIniciarSesion').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnIniciarSesion').prop('disabled', true);

    const email = $("#username").val().trim();
    const password = $("#password").val().trim();
    
    if (email === "" || password === "") {
        swal("Mensaje", "Debe ingresar un correo y contraseña", "warning");
        $('#btnIniciarSesion').prop('disabled', false);
        return;
    }
    //swal("Mensaje", "Logeado exitoso", "success")

    loginUsuarioLoad(email, password);
})

function loginUsuarioLoad(email, password) {
    $.ajax({
        type: "POST",
        url: "Login.aspx/Iniciar",
        data: JSON.stringify({ Usuario: email, Clave: password }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");

            if (!response.d.Estado) {
                if (response.d.Valor === "admin") {
                    loginSistemaAdmin(email, password); // intenta login como admin
                } else {
                    swal("Mensaje", response.d.Mensaje, "warning");
                    $('#btnIniciarSesion').prop('disabled', false);
                }
                return;
            }

            // Usuario normal autenticado
            sessionStorage.setItem('tokenSesion', response.d.Valor);
            sessionStorage.setItem('usuarioSt', JSON.stringify(response.d.Data));
            $("#username").val("");
            $("#password").val("");
            $('#btnIniciarSesion').prop('disabled', false);
            window.location.href = 'Inicio.aspx';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema, intente más tarde.", "error");
            console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            $('#btnIniciarSesion').prop('disabled', false);
        }
    });
}

function loginSistemaAdmin(email, password) {
    $.ajax({
        type: "POST",
        url: "Login.aspx/LogeoAdmin",
        data: JSON.stringify({ Usuario: email, Clave: password }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");

            if (response.d.Estado) {
                sessionStorage.setItem('adminlz', JSON.stringify(response.d.Data));
                $("#username").val("");
                $("#password").val("");

                $('#btnIniciarSesion').prop('disabled', false);
                window.location.href = 'MasterAdmin/InicioAdmin.aspx';
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                $('#btnIniciarSesion').prop('disabled', false);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema, intente más tarde.", "error");
            console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            $('#btnIniciarSesion').prop('disabled', false);
        }
    });
}

function loginUsuarioLoadOrigonal() {

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