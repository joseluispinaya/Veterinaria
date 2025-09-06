<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Bienvenido...
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-6 col-lg-3">
            <div class="card text-center" id="paso1">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Total Productos</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-down-bold-circle-outline text-danger m-r-10"></i><b>10</b></h2>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center" id="paso2">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Clientes</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>8</b></h2>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center" id="paso3">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Mascotas</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>6</b></h2>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Visitas</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-down-bold-circle-outline text-danger m-r-10"></i><b>12</b></h2>
                </div>
            </div>
        </div>
    </div>

    <%--<div class="row m-t-30">
        <div class="col-sm-6">
            <div class="form-group text-center">
                <button type="button" id="btnGia" class="btn btn-sm btn-success">
                    <i class="fas fa-pencil-alt"></i>Iniciar Guia
                </button>
                <button type="button" id="btnProer" class="btn btn-sm btn-warning m-l-10">
                    <i class="fas fa-bars"></i>Opcion
                </button>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group text-center">
                                <label for="imgProd">Imagen del producto</label><br />
                                <img id="imgProdddd" src="Imageprodu/sinimagenpro.png" alt="Foto usuario"
                                    style="height: 90px; max-width: 90px;">
                            </div>

                            <div class="input-group input-group-sm m-b-15">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="right" title="Aqui algom"><i class="fas fa-map-marker-alt"></i></button>
                                </div>
                                <input type="text" class="form-control" placeholder="ingrse algo" aria-label="Example text with button addon" aria-describedby="buttonaa">
                            </div>

                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="txtDescripcionv">Descripcion</label>
                                <input type="text" class="form-control" id="txtDescripcionv" name="Descripcion">
                            </div>

                            <div class="input-group input-group-sm m-b-15">
                                <input type="text" class="form-control" placeholder="ingrse algo" aria-label="ingrse algo"
                                    aria-describedby="button-addon2">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="bottom" title="Aqui dato"><i class="fas fa-map-marker-alt"></i></button>
                                </div>
                            </div>

                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="ingrse algox" aria-label="ingrse algox"
                                    aria-describedby="button-as">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="left" title="Aqui nombre">b</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>--%>
   
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.js.iife.js"></script>
    <script src="js/InicioP.js" type="text/javascript"></script>
</asp:Content>
