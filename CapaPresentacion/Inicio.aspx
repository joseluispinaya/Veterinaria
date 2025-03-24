<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
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
                    <h4 class="card-title text-muted font-weight-light mb-0">Total Carreras</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-down-bold-circle-outline text-danger m-r-10"></i><b>10</b></h2>
                    <%--<p class="text-muted m-b-0 m-t-20"><b>48%</b> From Last 24 Hours</p>--%>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Docentes</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>8</b></h2>
                    <%--<p class="text-muted m-b-0 m-t-20"><b>42%</b> Orders in Last 10 months</p>--%>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Estudiantes</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i
                        class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>6</b></h2>
                    <%--<p class="text-muted m-b-0 m-t-20"><b>22%</b> From Last 24 Hours</p>--%>
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
                    <%--<p class="text-muted m-b-0 m-t-20"><b>35%</b> From Last 1 Month</p>--%>
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
                    Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                </p>
                <hr>
                <ul class="social-links list-inline m-b-0">
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Twitter"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="1234567890"><i class="fas fa-phone"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="@skypename"><i class="fab fa-skype"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="email@email.com"><i class="far fa-envelope"></i></a>
                    </li>
                </ul>
            </div> <!-- card-body -->
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card">
            <div class="card-body user-card">
                <div class="media-main">
                    <a class="float-left" href="#">
                        <img class="thumb-lg rounded-circle" src="assets/images/users/avatar-4.jpg" alt="">
                    </a>
                    <div class="info pl-3">
                        <h4 class="mt-3">Sabrina Weatherford</h4>
                        <p class="text-muted">Support Team</p>
                    </div>
                </div>
                <div class="clearfix"></div>

                <p class="text-muted info-text">
                    Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                </p>
                <hr>
                <ul class="social-links list-inline m-b-0">
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Twitter"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="1234567890"><i class="fas fa-phone"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="@skypename"><i class="fab fa-skype"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="email@email.com"><i class="far fa-envelope"></i></a>
                    </li>
                </ul>
            </div> <!-- card-body -->
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card">
            <div class="card-body user-card">
                <div class="media-main">
                    <a class="float-left" href="#">
                        <img class="thumb-lg rounded-circle" src="assets/images/users/avatar-3.jpg" alt="">
                    </a>
                    <div class="info pl-3">
                        <h4 class="mt-3">John M. Wiest</h4>
                        <p class="text-muted">Graphics Designer</p>
                    </div>
                </div>
                <div class="clearfix"></div>

                <p class="text-muted info-text">
                    Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                </p>
                <hr>
                <ul class="social-links list-inline m-b-0">
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="Twitter"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="1234567890"><i class="fas fa-phone"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="@skypename"><i class="fab fa-skype"></i></a>
                    </li>
                    <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="#" data-original-title="email@email.com"><i class="far fa-envelope"></i></a>
                    </li>
                </ul>
            </div> <!-- card-body -->
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/InicioP.js" type="text/javascript"></script>
</asp:Content>
