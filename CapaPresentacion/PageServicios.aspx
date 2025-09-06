<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageServicios.aspx.cs" Inherits="CapaPresentacion.PageServicios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Registro de Servicios y Categorias
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="row m-b-20">
                        <div class="col-sm-6 text-center">
                            <h4 class="m-t-0">Servicios</h4>
                        </div>
                        <div class="col-sm-6">
                            <button type="button" id="btnNuevoServ" class="btn btn-xs btn-success"><i class="fas fa-edit m-r-10"></i>Nuevo Registro</button>
                        </div>
                    </div>
                    

                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbServicios" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descripcion</th>
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
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="row m-b-20">
                        <div class="col-sm-6 text-center">
                            <h4 class="m-t-0">Categorias</h4>
                        </div>
                        <div class="col-sm-6">
                            <button type="button" id="btnNuevoCateg" class="btn btn-xs btn-success"><i class="fas fa-edit m-r-10"></i>Nuevo Registro</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbCategorias" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descripcion</th>
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

    <div id="modalCategoria" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabeld" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabeld">Detalle de Categoria</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body" id="loaddest">
                    <input id="txtIdcatego" value="0" type="hidden" />
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtDescripcion">Descripcion</label>
                            <input type="text" class="form-control input-sm" id="txtDescripcion" name="Descripcion">
                        </div>
                        <div class="form-group col-sm-6">
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
                    <button id="btnGuardarCate" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalServici" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabeldser" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabeldser">Detalle de Servicio</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body" id="loadser">
                    <input id="txtIdservicio" value="0" type="hidden" />
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtDescripcionser">Descripcion</label>
                            <input type="text" class="form-control input-sm model" id="txtDescripcionser" name="Descripcion serv">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="cboEstadose">Estado</label>
                            <select class="form-control form-control-sm" id="cboEstadose">
                                <option value="1">Activo</option>
                                <option value="0">No Activo</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarServicio" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageServicios.js" type="text/javascript"></script>
</asp:Content>
