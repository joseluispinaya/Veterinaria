<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageListaProducto.aspx.cs" Inherits="CapaPresentacion.PageListaProducto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/inpfile.css" rel="stylesheet"/>
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }

        .titull {
            margin-top: 10px;
            margin-bottom: 5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Lista de Productos
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-bars"></i> Lista de productos</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbProductos" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Foto</th>
                                        <th>Categoria</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="modalregprodd" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Actualizar producto</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdProduc" name="IdProducto" value="0" type="hidden" />
                    <input id="txtIdVeteac" name="IdVeterinaria" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombre">Nombre</label>
                                    <input type="text" class="form-control input-sm model" id="txtNombre" name="Nombre">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtMarca">Marca</label>
                                    <input type="text" class="form-control input-sm model" id="txtMarca" name="Marca">
                                </div>
                                
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-8">
                                    <label for="cboCatego">Categoria</label>
                                    <select class="form-control form-control-sm" id="cboCatego">
                                    </select>
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="cboEstado">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="txtStock">Stock</label>
                                        <input type="text" class="form-control input-sm model" id="txtStock" value="0" name="Stock">
                                    </div>
                                    <div class="form-group">
                                        <label for="txtPrecio">Precio</label>
                                        <input type="text" class="form-control input-sm model" id="txtPrecio" value="0" name="Precio">
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <label for="txtDescripcion">Descripcion</label>
                                        <textarea class="form-control" rows="4" id="txtDescripcion"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-group">
                                <label for="txtApelocs">Seleccione Foto</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoPror" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoPror">Ningún archivo seleccionado</label>
                                </div>
                            </div>

                            <div class="form-group text-center">
                                <img id="imgProd" src="Imageprodu/sinimagenpro.png" alt="Foto usuario" style="height: 120px; max-width: 120px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarPro" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modaldetalle" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabeld" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title m-0" id="myLargeModalLabeld">Detalle del producto</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="media-main">
                            <a class="float-left" href="#">
                                <%--<img id="imgprodet" class="thumb-lg rounded-circle" src="Imageprodu/sinimagenpro.png" alt="">--%>
                                <img id="imgprodet" src="Imageprodu/sinimagenpro.png" alt="Foto usuario" style="height: 100px; max-width: 100px;">
                            </a>
                            <div class="info pl-3">
                                <h4 id="lblnompro" class="mt-3">Nombre prod</h4>
                                <p id="lblmarca" class="text-muted">Marca</p>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="row">
                            <div class="col-lg-12 text-center m-t-15">
                                <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                                <%--<button type="button" id="btnxNfuevpp" class="btn btn-sm btn-secondary">
                                    <i class="fas fa-edit"></i> Cerrar
                                </button>--%>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <strong>Categoria:</strong>
                        <label class="sin-margin-bottom" id="lblcatego">MEDICAMENTO</label><br>
                        <strong>Stock:</strong>
                        <label class="sin-margin-bottom" id="lblstock">15 unids</label><br>
                        <strong>Precio:</strong>
                        <label class="sin-margin-bottom" id="lblprecio">35 Bs</label>

                        <div class="form-group">
                            <label for="lbldescri">Descripcion</label>
                            <textarea class="form-control" rows="2" id="lbldescri" readonly="readonly"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <%--<div class="modal-footer">
                <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btnGuardarddCa" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
            </div>--%>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageListaProducto.js" type="text/javascript"></script>
</asp:Content>
