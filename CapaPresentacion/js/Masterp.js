
//Masterp

$(document).ready(function () {
    const tokenSesion = sessionStorage.getItem('tokenSesion');
    const usuarioL = sessionStorage.getItem('usuarioSt');
    //console.log(usuarioL);

    if (tokenSesion && usuarioL) {
        const usuParaenviar = JSON.parse(usuarioL);
        //console.log(usuParaenviar);
        const idUsu = usuParaenviar.IdUsuario;

        obtenerDetalleUsuarioR(idUsu);

    } else {
        window.location.href = 'Login.aspx';
    }

});

$(document).on('click', '#close', async function (e) {
    e.preventDefault();
    await cerrarSesion();
});

//$(document).on('click', '#close', function (e) {
//    e.preventDefault();
//    CerrarSesionDo();
//});


function obtenerDetalleUsuarioRP(idUsu) {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerToken",
        data: JSON.stringify({ IdUsu: idUsu }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            window.location.href = 'Login.aspx';
        },
        success: function (response) {

            if (response.d.Estado) {
                const tokenSession = sessionStorage.getItem('tokenSesion');

                if (tokenSession !== response.d.Valor) {
                    CerrarSesionDo();
                } else {

                    const usuarioL = sessionStorage.getItem('usuarioSt');

                    if (usuarioL) {
                        var usuario = JSON.parse(usuarioL);
                        $("#nombreusuariome").append(usuario.Apellidos);
                        $("#rolnomme").text(usuario.Rol.Descripcion);
                        $("#imgUsuarioMe").attr("src", usuario.ImageFull);
                        $("#imageUserMe").attr("src", usuario.ImageFull);
                        $("#rolusuariome").append(usuario.Rol.Descripcion);
                    } else {
                        console.error('No se encontró información del usuario en sessionStorage.');
                        window.location.href = 'Login.aspx';
                    }
                }
            } else {
                window.location.href = 'Login.aspx';
            }

        }
    });
}

async function obtenerDetalleUsuarioR(idUsu) {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/ObtenerToken",
            data: JSON.stringify({ IdUsu: idUsu }),
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            const tokenSession = sessionStorage.getItem('tokenSesion');
            if (tokenSession !== response.d.Valor) {
                await cerrarSesion();
            } else {
                
                const usuarioL = sessionStorage.getItem('usuarioSt');

                if (usuarioL) {
                    var usuario = JSON.parse(usuarioL);
                    $("#nombreusuariome").append(usuario.Apellidos);
                    $("#rolnomme").text(usuario.Rol.Descripcion);
                    $("#imgUsuarioMe").attr("src", usuario.ImageFull);
                    $("#imageUserMe").attr("src", usuario.ImageFull);
                    $("#rolusuariome").append(usuario.Rol.Descripcion);
                } else {
                    console.error('No se encontró información del usuario en sessionStorage.');
                    window.location.href = 'Login.aspx';
                }
            }
        } else {
            window.location.href = 'Login.aspx';
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        window.location.href = 'Login.aspx'; 
    }
}

async function cerrarSesion() {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/CerrarSesion",
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            sessionStorage.clear(); // Limpia el almacenamiento de sesión
            window.location.replace('Login.aspx'); // Redirige al login
        }
    } catch (error) {
        console.error('Error al cerrar la sesión:', error);
    }
}

function CerrarSesionDo() {
    //console.log("registra",request);

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/CerrarSesion",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                //window.location.href = 'IniciarSesion.aspx';
                sessionStorage.clear();
                window.location.replace('Login.aspx');
                setTimeout(function () {
                    location.reload();
                }, 600);
                //history.pushState(null, null, 'Login.aspx');
                //history.replaceState(null, null, 'Login.aspx');
                //window.location.replace('Login.aspx');
            }
        }
    });
}