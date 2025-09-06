
function iniciarGuia() {
    const driver = window.driver.js.driver;

    const driverObj = driver({
        showProgress: true,
        steps: [
            { element: '#paso1', popover: { title: 'Card Productos', description: 'En esta se encuentran el total de los productos registrados' } },
            { element: '#paso2', popover: { title: 'Card Clientes', description: 'En esta se encuentran el total de los clientes registrados' } },
            { element: '#paso3', popover: { title: 'Card Mascotas', description: 'En esta se encuentran el total de los mascotas registrados' } },
        ]
    });

    driverObj.drive();

}

$('#btnGia').on('click', function () {
    iniciarGuia();
})