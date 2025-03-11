<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageClientes.aspx.cs" Inherits="CapaPresentacion.PageClientes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Clientes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary d-flex justify-content-between align-items-center">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Clientes</h3>
                    <button type="button" id="btnNuevoPropie" class="btn btn-sm btn-success">
                        <i class="fas fa-user-plus"></i> Nuevo Registro
                    </button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbPropiet" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Nro CI</th>
                                        <th>Contacto</th>
                                        <th>Registrado</th>
                                        <th>Estado</th>
                                        <th>Mascotas</th>
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

    <div id="modalRegPro" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabel">Registro</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdProp" name="IdPropietario" value="0" type="hidden" />
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtnombres">Nombre</label>
                            <input type="text" class="form-control input-sm model" id="txtnombres" name="Nombres">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtapellidos">Apellidos</label>
                            <input type="text" class="form-control input-sm model" id="txtapellidos" name="Apellidos">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtNroci">Nro CI</label>
                            <input type="text" class="form-control input-sm model" id="txtNroci" name="Nro CI">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtCelular">Celular</label>
                            <input type="text" class="form-control input-sm model" id="txtCelular" name="Celular">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-sm-8">
                            <label for="txtDireccion">Direccion</label>
                            <input type="text" class="form-control input-sm model" id="txtDireccion" name="Direccion">
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="cboEstado">Estado</label>
                            <select class="form-control form-control-sm" id="cboEstado">
                                <option value="1">Activo</option>
                                <option value="0">No Activo</option>
                            </select>
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
    <script src="js/PageClientes.js" type="text/javascript"></script>
</asp:Content>
