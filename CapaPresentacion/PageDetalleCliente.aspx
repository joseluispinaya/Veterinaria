<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageDetalleCliente.aspx.cs" Inherits="CapaPresentacion.PageDetalleCliente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Detalle Cliente
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 text-right">
                            <button type="button" id="btnVolver" class="btn btn-sm btn-success">
                                <i class="fas fa-arrow-circle-right"></i> Volver
                            </button>
                            <button type="button" id="btnNuev" class="btn btn-sm btn-danger">
                                <i class="fas fa-user-plus"></i> Nuevo Registro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body user-card">
                    <div class="media-main">
                        <a class="float-left" href="#">
                            <img class="thumb-lg rounded-circle" src="assets/images/users/avatar-2.jpg" alt="">
                        </a>
                        <div class="info pl-3">
                            <h4 class="mt-3">Pauline I. Bird</h4>
                            <p class="text-muted">Family Member</p>
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <p class="text-muted info-text">
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                    </p>
                    <hr>
                </div>
                <!-- card-body -->
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Mascotas</h4>
                    <table id="tbMascode" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombres</th>
                                <th>Raza</th>
                                <th>Genero</th>
                                <th>Nacido</th>
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageDetalleCliente.js" type="text/javascript"></script>
</asp:Content>
