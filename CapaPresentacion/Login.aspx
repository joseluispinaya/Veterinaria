<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html>
    <head runat="server">
        <meta charset="utf-8" />
        <title>Login user</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="Admin Dashboard" name="description" />
        <meta content="ThemeDesign" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <link rel="shortcut icon" href="assets/images/favicon.ico">

        <link href="assets/sweetalert/sweetalert.css" rel="stylesheet" type="text/css">
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css">
        <link href="assets/css/style.css" rel="stylesheet" type="text/css">

    </head>


    <body>

        <!-- Begin page -->
        <div class="accountbg"></div>
        <div class="wrapper-page">
            <div class="card card-pages">

                <div class="card-body">
                    <h3 class="text-center m-t-0 m-b-15">
                        <a href="#" class="logo logo-admin"><span>Mas</span>cota</a>
                    </h3>
                    <h4 class="text-muted text-center m-t-0"><b>Inicio de sesion</b></h4>

                    <form class="form-horizontal m-t-20">

                        <div class="form-group">
                            <div class="col-12">
                                <input class="form-control" id="username" type="text" value="pepito@yopmail.com" placeholder="Ingrese Correro">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-12">
                                <input class="form-control" id="password" type="password" value="803665" placeholder="Contraseña">
                            </div>
                        </div>

                        <div class="form-group text-center m-t-40">
                            <div class="col-12">
                                <button id="btnIniciarSesion" class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="button">Iniciar sesion</button>
                            </div>
                        </div>

                        <div class="form-group row m-t-30 m-b-0">
                            <div class="col-sm-7">
                                <a href="#" class="text-muted"><i class="fa fa-lock m-r-5"></i> Forgot your password?</a>
                            </div>
                            <div class="col-sm-5 text-right">
                                <a href="#" class="text-muted">Create an account</a>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>



        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/modernizr.min.js"></script>
        <script src="assets/js/detect.js"></script>
        <script src="assets/js/fastclick.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/wow.min.js"></script>
        <script src="assets/js/jquery.nicescroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>

        <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>
        <script src="assets/sweetalert/sweetalert.js"></script>
        <script src="assets/js/app.js"></script>
        <script src="js/Login.js" type="text/javascript"></script>

    </body>
</html>
