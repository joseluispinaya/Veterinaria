<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageVenta.aspx.cs" Inherits="CapaPresentacion.PageVenta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .custom-style-form .custom-style-form-control {
            height: calc(1.3em + .3rem + 2px) !important;
            padding: .15rem .3rem !important;
            font-size: .875rem !important;
            line-height: 1.3 !important;
            border-radius: .2rem !important;
        }

        .custom-style-form .custom-style-input-group > .custom-style-select,
        .custom-style-form .custom-style-input-group > .custom-style-form-control,
        .custom-style-form .custom-style-input-group > .input-group-append > .btn,
        .custom-style-form .custom-style-input-group > .input-group-append > .custom-style-label,
        .custom-style-form .custom-style-input-group > .input-group-prepend > .btn,
        .custom-style-form .custom-style-input-group > .input-group-prepend > .custom-style-label {
            padding: .15rem .3rem !important;
            height: calc(1.3em + .3rem + 2px) !important;
        }

        /* Nuevo estilo agregado dentro de custom-style-form */
        .custom-style-form .col-custom-label-sm {
            padding-top: calc(.25rem + 1px) !important;
            padding-bottom: calc(.25rem + 1px) !important;
            font-size: .800rem !important;
            line-height: 1.5 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Venta
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header py-2 px-4">
                <h3 class="card-title text-dark m-0"><i class="fas fa-cart-plus"></i> Registrar Nueva Venta</h3>
            </div>
            <div class="card-body custom-style-form"> <!-- AÑADIDO ESTA CLASE -->
                <div class="row">
                    <div class="col-sm-4">
                        <div class="input-group custom-style-input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text custom-style-label" for="txtnomvete" style="font-size: .875rem;">Veterinaria</label>
                            </div>
                            <input id="txtnomvete" readonly type="text" class="form-control custom-style-form-control" value="La Granja">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group custom-style-input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text custom-style-label" for="txtuserr" style="font-size: .875rem;">Usuario</label>
                            </div>
                            <input id="txtuserr" readonly type="text" class="form-control custom-style-form-control" value="Pinaya jose">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group custom-style-input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text custom-style-label" for="txtfechaa" style="font-size: .875rem;">Fecha de Venta</label>
                            </div>
                            <input id="txtfechaa" readonly type="text" class="form-control custom-style-form-control" value="17/03/2025">
                        </div>
                    </div>
                </div>                
                <hr />
                <div class="row">
                    <div class="col-sm-5">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="m-0">Detalle cliente</h5>
                        
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="txtclienCi" class="col-custom-label-sm" style="margin-bottom: 0;">Número CI:</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtclienCi" name="Nro CI" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="txtCliente" class="col-custom-label-sm" style="margin-bottom: 0;">Nombre Cliente:</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtCliente" name="Nombre" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                        
                                <div class="form-group text-center">
                                    <button type="button" id="btnBuscarcli" class="btn btn-sm btn-success">
                                        <i class="fas fa-search"></i> Buscar
                                    </button>
                                
                                    <button type="button" id="btnRegisclie" class="btn btn-sm btn-primary m-l-10">
                                        <i class="fas fa-edit"></i> Nuevo Registro
                                    </button>
                                </div>
                        
                            </div>
                        </div>
                    </div>

                    <!-- Detalle Producto SIN ESTILOS -->
                    <div class="col-sm-7">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="m-0">Detalle Producto</h5>
                        
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group" style="margin-bottom: 0;">
                                            <label for="txtproductonombre" class="col-custom-label-sm" style="margin-bottom: 0;">Nombre:</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtproductonombre" readonly name="Nombre pro">
                                        </div>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="form-group" style="margin-bottom: 0;">
                                            <label for="txtproductodescripcion" class="col-custom-label-sm" style="margin-bottom: 0;">Descripcion</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtproductodescripcion" readonly name="Descripcion">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group" style="margin-bottom: 0;">
                                            <label for="btnBuscarProduct" class="invisible">Descripción</label>
                                            <button type="button" id="btnBuscarProduct" class="btn btn-block btn-xs btn-success">
                                                <i class="fas fa-search"></i> Buscar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="txtproductostock" class="col-custom-label-sm" style="margin-bottom: 0;">En Stock:</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtproductostock" readonly name="Stock">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="txtproductoprecio" class="col-custom-label-sm" style="margin-bottom: 0;">Precio</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtproductoprecio" readonly name="Precio">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="txtproductocantidad" class="col-custom-label-sm" style="margin-bottom: 0;">Cantidad</label>
                                            <input type="text" class="form-control custom-style-form-control model" id="txtproductocantidad" name="Cantidad" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="btnAgregar" class="invisible">Agregar</label>
                                            <button type="button" id="btnAgregar" class="btn btn-block btn-xs btn-success">
                                                <i class="fas fa-cart-plus"></i> Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>

                <%--<hr />--%>

                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-12">
                        <div class="table-responsive">
                            <table id="tbDetallePro" class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Cantidad</th>
                                        <th>Producto</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>Ivemoc</td>
                                        <td>para matar vichos</td>
                                        <td>20</td>
                                        <td>40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <hr />
                <div class="row">
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="input-group custom-style-input-group">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text custom-style-label" for="txtcantid" style="font-size: .875rem;">Total Produc</label>
                                    </div>
                                    <input id="txtcantid" readonly type="text" class="form-control custom-style-form-control" value="12">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group custom-style-input-group">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text custom-style-label" for="txttotalm" style="font-size: .875rem;">Total Bs/</label>
                                    </div>
                                    <input id="txttotalm" readonly type="text" class="form-control custom-style-form-control" value="150">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group custom-style-input-group">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text custom-style-label" for="txtmontop" style="font-size: .875rem;">Monto Pago Bs/</label>
                                    </div>
                                    <input id="txtmontop" type="text" class="form-control custom-style-form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-5">
                                <div class="form-group">
                                    <%--<label for="btnCalcular" class="invisible">Cambio</label>--%>
                                    <button type="button" id="btnCalculadr" class="btn btn-xs btn-warning">
                                        <i class="fas fa-hand-holding-usd"></i> Calcular Cambio
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div class="form-group">
                                    <button type="button" id="btnCalcular" class="btn btn-xs btn-success">
                                        <i class="fas fa-hand-holding-usd"></i> Guardar Venta
                                    </button>
                                </div>
                                <%--<div class="input-group custom-style-input-group">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text custom-style-label" for="txtcambiod" style="font-size: .875rem;">Cambio Bs/</label>
                                    </div>
                                    <input id="txtcambiod" readonly type="text" class="form-control custom-style-form-control" value="150">
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- Fin de custom-style-form -->
        </div>
    </div>
</div>

    <div class="modal fade bs-example-modal-lg" id="modalproduct" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabelv" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title m-0" id="myLargeModalLabelv">Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-12">

                        <table id="tbProductm" class="table table-striped table-bordered nowrap" cellspacing="0"
                            width="100%">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button class="btn btn-primary btn-sm">
                                            <i class="fas fa-check-square"></i>
                                        </button>
                                    </td>
                                    <td>000002</td>
                                    <td>Iermentina</td>
                                    <td>Para matar a los vichos</td>
                                    <td>20</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageVenta.js" type="text/javascript"></script>
</asp:Content>
