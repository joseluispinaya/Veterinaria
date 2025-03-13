<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageListaProducto.aspx.cs" Inherits="CapaPresentacion.PageListaProducto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageListaProducto.js" type="text/javascript"></script>
</asp:Content>
