<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageDetalleCliente.aspx.cs" Inherits="CapaPresentacion.PageDetalleCliente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/inpfile.css" rel="stylesheet"/>
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }
        .titull {
            margin-top: 10px;
            margin-bottom: 5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Detalle Cliente
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="loaddet">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-t-0 m-b-15">Detalle del Cliente</h4>
                    <input id="txtIdclienSt" value="0" type="hidden" />
                    <input id="txtIdclien" name="IdPropietario" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col-sm-5">
                                    <strong>Nombres:</strong>
                                    <label class="sin-margin-bottom" id="texnomn">Jose luis</label><br>
                                    <strong>Apellidos:</strong>
                                    <label class="sin-margin-bottom" id="texapelli">Balderrama</label>
                                </div>
                                <div class="col-sm-4">
                                    <strong>Direccion:</strong>
                                    <label class="sin-margin-bottom" id="texdirec">Barrio la chonta</label><br>
                                    <strong>Nro mascotas:</strong>
                                    <label class="sin-margin-bottom" id="lblnromasco">6 Mas</label>
                                </div>
                                <div class="col-sm-3">
                                    <strong>Nro CI:</strong>
                                    <label class="sin-margin-bottom" id="lblcip">76453233</label><br>
                                    <strong>Contacto:</strong>
                                    <label class="sin-margin-bottom" id="lblnrocel">69394012</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 text-center">
                            <button type="button" id="btnxNuevpp" class="btn btn-sm btn-success">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button type="button" id="btnNewMasco" class="btn btn-sm btn-primary">
                                <i class="fas fa-paw"></i> + Mascota
                            </button>
                            <button type="button" id="btnVolverr" class="btn btn-sm btn-danger">
                                <i class="fas fa-arrow-circle-right"></i> Volver
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-paw"></i> Lista de Mascotas</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbMascode" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Raza</th>
                                        <th>Genero</th>
                                        <th>Edad</th>
                                        <th>Historial</th>
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

    <%--<div class="row" id="loaddet">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body user-card">
                    <div class="media-main">
                        <a class="float-left" href="#">
                            <img class="thumb-lg rounded-circle" src="Imgusers/logomas.png" alt="">
                        </a>
                        <div class="info pl-3">
                            <h4 id="texnomn" class="mt-3">Pauline I. Bird</h4>
                            <p id="texapelli" class="text-muted">Family Member</p>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <input id="txtIdclienSt" value="0" type="hidden" />
                    <input id="txtIdclien" name="IdPropietario" value="0" type="hidden" />
                    <p class="titull">
                        Detalle del Cliente
                    </p>
                    <strong>Nro CI :</strong>
                    <label class="sin-margin-bottom" id="lblcip">73999544</label><br>
                    <strong>Nro Contacto :</strong>
                    <label class="sin-margin-bottom" id="lblnrocel">73999544</label><br>
                    <strong>Direccion :</strong>
                    <p id="texdirec" class="text-muted">
                        Direccion cliente
                    </p>
                    <div class="row">
                    <div class="col-lg-12 text-center">
                        <button type="button" id="btnxNuevpp" class="btn btn-sm btn-success">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button type="button" id="btnNewMasco" class="btn btn-sm btn-primary">
                            <i class="fas fa-paw"></i> + Mascota
                        </button>
                        <button type="button" id="btnVolverr" class="btn btn-sm btn-danger">
                            <i class="fas fa-arrow-circle-right"></i> Volver
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-15 m-t-0">Mascotas</h4>
                    <table id="tbMascode" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombres</th>
                                <th>Raza</th>
                                <th>Genero</th>
                                <th>Edad</th>
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
    </div>--%>

    <div class="modal fade bs-example-modal-lg" id="modalregmasco" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Mascota</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdMascota" name="IdMascota" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="form-row">
                                <div class="form-group col-sm-4">
                                    <label for="txtNombre">Nombre</label>
                                    <input type="text" class="form-control input-sm model" id="txtNombre" name="Nombres">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtRaza">Raza</label>
                                    <input type="text" class="form-control input-sm model" id="txtRaza" name="Raza">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="cboSexo">Sexo</label>
                                    <select class="form-control form-control-sm" id="cboSexo">
                                        <option value="1">Macho</option>
                                        <option value="0">Hembra</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-4">
                                    <label for="txtnacido">Nacido en</label>
                                    <input type="text" class="form-control input-sm" id="txtnacido">
                                </div>
                                <div class="form-group col-sm-5">
                                    <label for="cboTipomas">Tipo Mascota</label>
                                    <select class="form-control form-control-sm" id="cboTipomas">
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
                                    <label for="txtComentario">Comentario</label>
                                    <input type="text" class="form-control model" id="txtComentario" name="Comentario">
                                </div>
                                <div class="form-group col-sm-8">
                                    <label for="txtApelocsa">Seleccione Imagen</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="txtFotoMa" accept="image/*">
                                        <label class="custom-file-label" for="txtFotoMa">Ningún archivo seleccionado</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-row h-100 d-flex align-items-center justify-content-center">
                                <div class="form-group col-sm-12 text-center">
                                    <img id="imgMascoReg" src="Imagenes/sinimagen.png" alt="Foto usuario"
                                        style="height: 120px; max-width: 120px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambiosM" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageDetalleCliente.js" type="text/javascript"></script>
</asp:Content>
