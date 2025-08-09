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
	public partial class PageVeterinarias : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EVeterinaria>> ObtenerVeterinarias()
        {
            try
            {
                Respuesta<List<EVeterinaria>> Lista = NVeterinaria.GetInstance().ObtenerVeterinarias();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EVeterinaria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los usuarios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EVeterinaria oVeterinaria, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EVeterinaria obj = new EVeterinaria
                {
                    ImagenLogo = imageUrl,
                    NombreVeterinaria = oVeterinaria.NombreVeterinaria,
                    Propietario = oVeterinaria.Propietario,
                    Correo = oVeterinaria.Correo,
                    Direccion = oVeterinaria.Direccion,
                    Celular = oVeterinaria.Celular,
                    DiasAtencion = oVeterinaria.DiasAtencion,
                    Horarios = oVeterinaria.Horarios,
                    Latitud = oVeterinaria.Latitud,
                    Longitud = oVeterinaria.Longitud
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NVeterinaria.GetInstance().RegistrarVeterinaria(obj);
                return respuesta;
            }
            catch (Exception ex)
            {
                // Manejar excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarVet(EVeterinaria oVeterinaria, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oVeterinaria == null || oVeterinaria.IdVeterinaria <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos de veterinaria inválidos" };
                }

                // Obtener el usuario existente
                Respuesta<List<EVeterinaria>> Lista = NVeterinaria.GetInstance().ObtenerVeterinarias();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdVeterinaria == oVeterinaria.IdVeterinaria);
                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "veterinaria no encontrado" };
                }

                // Manejar la imagen, si se proporciona una nueva
                string imageUrl = item.ImagenLogo;  // Mantener la foto actual por defecto

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.ImagenLogo))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.ImagenLogo);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            imageUrl = newImageUrl;
                        }
                    }
                }

                // Actualizar los datos del usuario
                item.IdVeterinaria = oVeterinaria.IdVeterinaria;
                item.ImagenLogo = imageUrl;
                item.NombreVeterinaria = oVeterinaria.NombreVeterinaria;
                item.Propietario = oVeterinaria.Propietario;
                item.Correo = oVeterinaria.Correo;
                item.Direccion = oVeterinaria.Direccion;
                item.Celular = oVeterinaria.Celular;
                item.DiasAtencion = oVeterinaria.DiasAtencion;
                item.Horarios = oVeterinaria.Horarios;
                item.Latitud = oVeterinaria.Latitud;
                item.Longitud = oVeterinaria.Longitud;
                item.Activo = oVeterinaria.Activo;

                // Guardar cambios
                Respuesta<bool> respuesta = NVeterinaria.GetInstance().ModificarVeterinaria(item);

                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarPdf(int IdVeterinaria, byte[] pdfBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (IdVeterinaria <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos inválidos" };
                }
                Respuesta<List<EVeterinaria>> Lista = NVeterinaria.GetInstance().ObtenerVeterinarias();
                var listaVett = Lista.Data;

                var oVeterinaria = listaVett.FirstOrDefault(x => x.IdVeterinaria == IdVeterinaria);
                if (oVeterinaria == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "No se encontró la veterinaria" };
                }
                string docpdf = oVeterinaria.DocumentoPdf;
                if (pdfBytes != null && pdfBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(pdfBytes))
                    {
                        string folder = "/Archivopdf/";
                        string newPdf = Utilidadesj.GetInstance().UploadPdf(stream, folder);

                        if (!string.IsNullOrEmpty(newPdf))
                        {
                            // Eliminar el pdf anterior si existe
                            if (!string.IsNullOrEmpty(oVeterinaria.DocumentoPdf))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(oVeterinaria.DocumentoPdf);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            docpdf = newPdf;
                        }
                    }
                }
                Respuesta<bool> respuesta = NVeterinaria.GetInstance().ActualizarDocumento(IdVeterinaria, docpdf);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}