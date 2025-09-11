using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.IO;

namespace CapaPresentacion
{
	public partial class PageMascotasadd : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<EPropietario> BuscarPropieNroci(string Nroci)
        {
            try
            {
                if (string.IsNullOrEmpty(Nroci))
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = "Debe ingresar un número de CI."
                    };
                }

                Respuesta<EPropietario> respuesta = NPropietario.GetInstance().BuscarPropietarioCi(Nroci);

                if (!respuesta.Estado)
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = respuesta.Mensaje
                    };
                }

                //return NPropietario.GetInstance().PropietarioIdMascotasToHisto(respuesta.Data.IdPropietario);

                //Respuesta<EPropietario> respcompleta = NPropietario.GetInstance().PropietarioIdMascotasToHisto(respuesta.Data.IdPropietario);

                return NPropietario.GetInstance().PropietarioIdMascotasToHisto(respuesta.Data.IdPropietario);
            }
            catch (Exception)
            {
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EditarMascota(EMascota oMascota, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oMascota == null || oMascota.IdMascota <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos inválidos" };
                }

                var detalle = NMascota.GetInstance().SoloMascota(oMascota.IdMascota);

                if (!detalle.Estado)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "La mascota no se encuentra registrada" };
                }

                var item = detalle.Data;

                string imageUrl = item.ImagenMascota;

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagemas/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.ImagenMascota))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.ImagenMascota);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            imageUrl = newImageUrl;
                        }
                    }
                }

                item.IdMascota = oMascota.IdMascota;
                item.Nombre = oMascota.Nombre;
                item.ImagenMascota = imageUrl;
                item.Raza = oMascota.Raza;
                item.Genero = oMascota.Genero;
                item.IdTipoMascota = oMascota.IdTipoMascota;
                item.IdPropietario = oMascota.IdPropietario;
                item.VFechaNacimiento = Convert.ToDateTime(oMascota.FechaNacimiento);
                item.Comentario = oMascota.Comentario;
                item.Activo = oMascota.Activo;

                Respuesta<bool> respuesta = NMascota.GetInstance().EditarMascota(item);
                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}