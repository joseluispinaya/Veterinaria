
$(document).ready(function () {
    const adminlogi = sessionStorage.getItem('adminlz');

    if (adminlogi) {
        obtenerAdminn();
    } else {
        window.location.replace('../Login.aspx');
        //window.location.href = 'Login.aspx';
    }

});

function obtenerAdminn() {
    const adminlogi = sessionStorage.getItem('adminlz');
    if (adminlogi) {
        const usuario = JSON.parse(adminlogi);

        $("#nombreusuariome").append(usuario.Apellidos);
        $("#rolnomme").text(usuario.Apellidos);
        $("#rolusuariome").append(usuario.Nombres);


    } else {
        console.error('No se encontró información del usuario en sessionStorage.');
        window.location.replace('../Login.aspx');
        //window.location.href = 'Login.aspx';
    }
}

$('#close').on('click', function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace('../Login.aspx');
});