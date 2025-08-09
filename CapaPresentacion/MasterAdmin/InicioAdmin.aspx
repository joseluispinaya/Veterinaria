<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/AdminVet.Master" AutoEventWireup="true" CodeBehind="InicioAdmin.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.InicioAdmin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Bienvenido...
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-sm-6 col-lg-3">
        <div class="card text-center">
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
        <div class="card text-center">
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
        <div class="card text-center">
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
