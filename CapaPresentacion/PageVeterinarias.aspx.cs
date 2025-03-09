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
    }
}