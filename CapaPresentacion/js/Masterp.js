﻿
//Masterp

$(document).ready(function () {
    const tokenSesion = sessionStorage.getItem('tokenSesion');
    const usuarioL = sessionStorage.getItem('usuarioSt');
    //console.log(usuarioL);

    if (tokenSesion && usuarioL) {
        var usuParaenviar = JSON.parse(usuarioL);
        console.log(usuParaenviar);
        var idUsu = usuParaenviar.IdUsuario;

        obtenerDetalleUsuarioR(idUsu);

    } else {
        window.location.href = 'Login.aspx';
    }

});

$(document).on('click', '#close', async function (e) {
    e.preventDefault(); // Evitar comportamiento predeterminado de un enlace
    await cerrarSesion();
});

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