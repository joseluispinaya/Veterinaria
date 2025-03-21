﻿<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageVeterinarias.aspx.cs" Inherits="CapaPresentacion.PageVeterinarias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/inpfile.css" rel="stylesheet"/>

    <style>
        .nav.nav-tabs + .tab-content {
            margin-bottom: 10px !important;
            padding: 20px !important; /* Ajusta el valor de padding según lo necesites */
        }
        .buttons-excel {
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Veterinarias
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-sm-12">
        <div class="card card-primary">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="page-header m-t-0">Veterinarias</h4>
                    </div>
                </div>

                <div class="row">
                    <%--<div class="col-lg-3">
                        <h5 class="m-b-30">Simple List Group</h5>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <span class="badge badge-primary badge-pill">14</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <span class="badge badge-danger badge-pill">25</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span class="badge badge-warning badge-pill">5</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span class="badge badge-dark badge-pill">9</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <span class="badge badge-success badge-pill">10</span>
                            </li>
                        </ul>
                    </div>--%>

                    <div class="col-lg-12">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">
                                    <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                    <span class="d-none d-sm-block">Registro Veterinaria</span>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
                                    <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                    <span class="d-none d-sm-block">Lista de Veterinarias</span>
                                </a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab" aria-controls="message" aria-selected="false">
                                    <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                    <span class="d-none d-sm-block">Detalles</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="setting-tab" data-toggle="tab" href="#setting" role="tab" aria-controls="setting" aria-selected="false">
                                    <span class="d-block d-sm-none"><i class="fa fa-cog"></i></span>
                                    <span class="d-none d-sm-block">Reportes</span>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <input id="txtIdVeterina" name="IdVeterinaria" value="0" type="hidden" />
                                <h5 class="m-t-0">Registro de Veterinaria</h5>

                                <div class="row" id="laodvet">
                                    <div class="col-sm-8">
                                        <div class="form-row">
                                            <div class="form-group col-sm-4">
                                                <label for="txtNombrevete">Nombre Veterinaria</label>
                                                <input type="text" class="form-control input-sm model" id="txtNombrevete" name="Nombre veterinaria">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="txtPropietario">Propietario</label>
                                                <input type="text" class="form-control input-sm model" id="txtPropietario" name="Propietario">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="txtCorreo">Correo</label>
                                                <input type="text" class="form-control input-sm model" id="txtCorreo" name="Correo">
                                            </div>
                                        </div>
                                        
                                        <div class="form-row">
                                            <div class="form-group col-sm-4">
                                                <label for="txtCelular">Celular</label>
                                                <input type="text" class="form-control input-sm model" id="txtCelular" name="Celular">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="txtDias">Dias de atencion</label>
                                                <input type="text" class="form-control input-sm model" id="txtDias" name="Dias de atencion">
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <label for="txtHorarios">Horarios</label>
                                                <input type="text" class="form-control input-sm model" id="txtHorarios" name="Horarios">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-sm-3">
                                                <label for="cboEstado">Estado</label>
                                                <select class="form-control form-control-sm" id="cboEstado">
                                                    <option value="1">Activo</option>
                                                    <option value="0">No Activo</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-sm-9">
                                                <label for="txtDireccion">Direccion</label>
                                                <input type="text" class="form-control input-sm model" id="txtDireccion" name="Direccion">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <a id="txturlubi" href="#" class="text-muted" target="_blank"><i class="fas fa-map-marker-alt m-r-5"></i>No cuenta con ubicacion debe agregar</a>
                                        </div>

                                        <div class="form-inline">
                                            <div class="form-group">
                                                <label class="sr-only" for="txtlatitud">Latitud</label>
                                                <input type="text" class="form-control input-sm" id="txtlatitud" readonly>
                                            </div>

                                            <div class="form-group m-l-10">
                                                <label class="sr-only" for="txtlongitud">Longitud</label>
                                                <input type="text" class="form-control input-sm" id="txtlongitud" readonly>
                                            </div>

                                            <button type="button" id="btnModalGeo" class="btn btn-sm btn-info m-l-10">
                                                <i class="fas fa-map-marker-alt"></i> Agregar ubicacion
                                            </button>
                                        </div>

                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="txtApelos">Seleccione Foto</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="txtFotoV" accept="image/*">
                                                <label class="custom-file-label" for="txtFotoV">Ningún archivo seleccionado</label>
                                            </div>
                                        </div>
                                        <div class="form-group text-center">
                                            <img id="imgLogoVet" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                                        </div>

                                        <div class="form-group text-center m-t-30">
                                            <button type="button" id="btnGuardarVet" class="btn btn-sm btn-success">
                                                <i class="fas fa-pencil-alt"></i> Guardar
                                            </button>

                                            <button type="button" id="btnNuevoVet" class="btn btn-sm btn-danger m-l-10">
                                                <i class="fas fa-edit"></i> Nuevo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="form-group text-center">
                                    <h5 class="m-t-0"><i class="fas fa-hospital-alt"></i> Lista de Veterinarias</h5>
                                </div>

                                <div class="row">
                                    <div class="col-lg-12">
                                        <table id="tbVeterina" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Foto</th>
                                                    <th>Nombre</th>
                                                    <th>Propietario</th>
                                                    <th>Correo</th>
                                                    <th>Contacto</th>
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
                            
                            <div class="tab-pane fade" id="message" role="tabpanel" aria-labelledby="message-tab">
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                            </div>
                            <div class="tab-pane fade" id="setting" role="tabpanel" aria-labelledby="setting-tab">
                                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

    <div class="modal fade bs-example-modal-lg" id="modalgeorefe" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Ubicacion geografica</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <h4 class="m-t-0 m-b-15">Seleccione su Ubicacion</h4>
                            <div id="mapa" class="gmaps"></div>

                            <div class="row m-t-15">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="txtlatitudMod">Latitud</label>
                                        <input type="text" class="form-control input-sm" id="txtlatitudMod" readonly>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="txtlongitudMod">Longitud</label>
                                        <input type="text" class="form-control input-sm" id="txtlongitudMod" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarUbiVete" type="button" class="btn btn-sm btn-primary">Guardar ubicacion</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">

    <script src="js/PageVeterinarias.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>

    <%--<script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap&libraries=places">
    </script>--%>

    <%--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>--%>
    <%--<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&libraries=places&callback=initMap"></script>--%>

    
    <%--<script src="assets/plugins/gmaps/gmaps.min.js"></script>--%>
    
</asp:Content>
