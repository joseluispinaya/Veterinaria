<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageDetalleMascota.aspx.cs" Inherits="CapaPresentacion.PageDetalleMascota" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }

        .titull {
            margin-top: 10px;
            margin-bottom: 5px;
        }

        .custom-form .form-control-sm {
            height: calc(1.3em + .3rem + 2px) !important;
            padding: .15rem .3rem !important;
            font-size: .875rem !important;
            line-height: 1.3 !important;
            border-radius: .2rem !important;
        }

        .custom-form .input-group-sm > .custom-select,
        .custom-form .input-group-sm > .form-control,
        .custom-form .input-group-sm > .input-group-append > .btn,
        .custom-form .input-group-sm > .input-group-append > .input-group-text,
        .custom-form .input-group-sm > .input-group-prepend > .btn,
        .custom-form .input-group-sm > .input-group-prepend > .input-group-text {
            padding: .15rem .3rem !important;
            height: calc(1.3em + .3rem + 2px) !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Detalle de la Mascota
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
     <div class="row" id="loadmasc">
     <div class="col-lg-12">
         <div class="card">
             <div class="card-body">
                 <h4 class="m-t-0 m-b-15">Detalle Mascota</h4>
                 <input id="txtIdMascotaSt" value="0" type="hidden" />
                 <input id="txtIdMascota" name="IdMascota" value="0" type="hidden" />
                 <input id="txtIdPropiee" value="0" type="hidden" />
                 <div class="row">
                     <div class="col-lg-8">
                         <div class="row">
                             <div class="col-sm-6">
                                <div class="media-main">
                                    <a class="float-left" href="#">
                                        <%--<img class="rounded" id="imgmascota" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 100px; max-width: 100px;">--%>
                                        <img id="imgmascota" src="Imagenes/sinimagen.png" alt="Foto usuario"
                                            style="height: 100px; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px;">
                                    </a>
                                    <div class="info pl-3">
                                        <h4 id="lblnombremas" class="mt-3">Nombre Mascota</h4>
                                        <p id="lblraza" class="text-muted">Raza</p>
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                             </div>
                             <div class="col-sm-6">
                                 <strong>Propietario:</strong>
                                 <label class="sin-margin-bottom" id="lblpropiet">Nombre propietario</label><br>
                                 <strong>Edad:</strong>
                                 <label class="sin-margin-bottom" id="lbledad">6 meses</label><br>
                                 <strong>Genero:</strong>
                                 <label class="sin-margin-bottom" id="lblgenero">Macho</label><br>
                                 <strong>Comentario:</strong>
                                 <label class="sin-margin-bottom" id="lblcomentarioo">perro muy amigable</label>
                             </div>
                         </div>
                     </div>
                     <div class="col-lg-4 text-center">
                         <button type="button" id="btnxNuevpp" class="btn btn-sm btn-success">
                             <i class="fas fa-edit"></i> Editar
                         </button>
                         <button type="button" id="btnNewHistorial" class="btn btn-sm btn-primary">
                             <i class="fas fa-paw"></i> Add Historial
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
                    <h3 class="card-title m-0"><i class="fas fa-notes-medical"></i> Lista de Historial Clinico</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">

                            <table id="tbHistorial" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Fecha</th>
                                        <th>Servicio</th>
                                        <th>Descripcion</th>
                                        <th>Comentario</th>
                                        <th>Veterinaria</th>
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

    <div id="modalAddHistoria" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabelh"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title m-0" id="myLargeModalLabelh">Registrar Historial</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <input id="txtIdHistoriall" name="IdHistorial" value="0" type="hidden" />
                <input id="txtIdVeteValo" value="0" type="hidden" />
                <div class="row">
                    <div class="col-lg-12">
                        <div class="custom-form">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm m-b-15">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="cboServicio">Servicio</label>
                                        </div>
                                        <select class="custom-select form-control-sm" id="cboServicio"></select>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm m-b-15">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="txtfecharegistroh">Fecha</label>
                                        </div>
                                        <input id="txtfecharegistroh" readonly type="text"
                                            class="form-control form-control-sm">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="txtDescripcion">Descripcion</label>
                            <input type="text" class="form-control input-sm model" id="txtDescripcion"
                                name="Descripcion">
                        </div>

                        <div class="form-group">
                            <label for="txtComentario">Comentario</label>
                            <textarea class="form-control" rows="3" id="txtComentario"></textarea>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btnGuardarHisto" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageDetalleMascota.js" type="text/javascript"></script>
</asp:Content>
