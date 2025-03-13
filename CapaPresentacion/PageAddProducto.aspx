<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageAddProducto.aspx.cs" Inherits="CapaPresentacion.PageAddProducto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/inpfile.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Registro de nuevo Producto
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header bg-primary py-2 px-4">
                <h3 class="card-title m-0"><i class="fas fa-bars"></i> Llene los datos del productos</h3>
            </div>
            <div class="card-body">
                <input id="txtIdProduc" name="IdProducto" value="0" type="hidden" />
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-row">
                            <div class="form-group col-sm-4">
                                <label for="txtNombre">Nombre</label>
                                <input type="text" class="form-control input-sm model" id="txtNombres" name="Nombres">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="txtMarca">Marca</label>
                                <input type="text" class="form-control input-sm model" id="txtMarca" name="Marca">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="cboCatego">Categoria</label>
                                <select class="form-control form-control-sm" id="cboCatego">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-3">
                                <label for="txtCodigo">Codigo</label>
                                <input type="text" class="form-control input-sm" id="txtCodigo" value="Auto Generado"
                                    readonly>
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="txtStock">Stock</label>
                                <input type="text" class="form-control input-sm model" id="txtStock" name="Stock">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="txtPrecio">Precio</label>
                                <input type="text" class="form-control input-sm model" id="txtPrecio" name="Precio">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="cboEstado">Estado</label>
                                <select class="form-control form-control-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-5">
                                <label for="txtDescripcion">Descripcion</label>
                                <input type="text" class="form-control model" id="txtDescripcion"
                                    name="Descripcion">
                            </div>
                            <div class="form-group col-sm-7">
                                <label for="txtApelocs">Seleccione Foto</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoPror" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoPror">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group text-center">
                            <label for="imgProd">Imagen del producto</label><br />
                            <img id="imgProd" src="Imagenes/sinimagen.png" alt="Foto usuario"
                                style="height: 120px; max-width: 120px;">
                        </div>

                        <div class="form-group text-center m-t-30">
                            <button type="button" id="btnGuardarPro" class="btn btn-sm btn-success">
                                <i class="fas fa-pencil-alt"></i> Guardar
                            </button>
                            <button type="button" id="btnCancelarp" class="btn btn-sm btn-danger m-l-10">
                                <i class="fas fa-edit"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageAddProducto.js" type="text/javascript"></script>
</asp:Content>
