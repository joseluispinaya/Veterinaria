

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idreseee = urlParams.get('id');

    if (idreseee !== null) {
        cargarDatos(idreseee);
        
    } else {
        swal("Mensaje", "No hay parametro de busqueda por url.", "warning");
        window.location.href = 'PageClientes.aspx';
        //window.close();
    }

})

function cargarDatos(idProp) {
    swal("Mensaje", "Llego el Id: " + idProp, "success");
}