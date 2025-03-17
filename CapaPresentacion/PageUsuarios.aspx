<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageUsuarios.aspx.cs" Inherits="CapaPresentacion.PageUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/inpfile.css" rel="stylesheet"/>
    <%--<style>
        table.dataTable thead th {
            padding: 8px !important;
            white-space: nowrap;
        }
        table.dataTable tbody td {
            padding: 6px !important;
            vertical-align: middle;
        }
        .dataTables_wrapper .dataTables_scrollBody {
            min-height: auto;
        }
        table.dataTable {
            border-collapse: collapse !important;
        }
    </style>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Usuarios
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary d-flex justify-content-between align-items-center">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Usuarios</h3>
                    <button type="button" id="btnNuevoUsuar" class="btn btn-sm btn-success">
                        <i class="fas fa-user-plus"></i> Nuevo Registro
                    </button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbUsuario" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Foto</th>
                                        <th>Rol</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Veterinaria</th>
                                        <th>Correo</th>
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

    <div class="modal fade bs-example-modal-lg" id="modalregusua" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Usuarios</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdUsuario" class="model" name="IdUsuario" value="0" type="hidden" />
                    <div class="row">
                    <div class="col-lg-9">
                        <div class="form-row">
                            <div class="form-group col-sm-4">
                                <label for="txtNombre">Nombre</label>
                                <input type="text" class="form-control input-sm model" id="txtNombres" name="Nombres">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="txtApellidos">Apellidos</label>
                                <input type="text" class="form-control input-sm model" id="txtApellidos"
                                    name="Apellidos">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="txtCorreo">Correo</label>
                                <input type="text" class="form-control input-sm model" id="txtCorreo" name="Correo">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-3">
                                <label for="txtCelular">Celular</label>
                                <input type="text" class="form-control input-sm model" id="txtCelular" name="Celular">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="cboVeter">Veterinaria</label>
                                <select class="form-control form-control-sm" id="cboVeter">
                                </select>
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
                            <div class="form-group col-sm-4">
                                <label for="cboRol">Rol</label>
                                <select class="form-control" id="cboRol">
                                </select>
                            </div>
                            <div class="form-group col-sm-8">
                                <label for="txtApelocs">Seleccione Foto</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoUr" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoUr">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-row h-100 d-flex align-items-center justify-content-center">
                            <div class="form-group col-sm-12 text-center">
                                <img id="imgUsuarioReg" src="Imagenes/sinimagen.png" alt="Foto usuario"
                                    style="height: 120px; max-width: 120px;">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageUsuarios.js" type="text/javascript"></script>
</asp:Content>
