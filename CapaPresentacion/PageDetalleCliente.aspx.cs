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
	public partial class PageDetalleCliente : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ETipoMascota>> ObtenerTipoMascotas()
        {
            try
            {
                Respuesta<List<ETipoMascota>> Lista = NTiposGeneral.GetInstance().ListaTipoMascota();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoMascota>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Tipos: " + ex.Message,
                    Data = null
                };
            }
        }

        //no se esta usando
        [WebMethod]
        public static Respuesta<EPropietario> DetalleCliente(int IdPropi)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EPropietario> respuesta = NPropietario.GetInstance().PropietarioIdMascotasTo(IdPropi);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = "El cliente no se encuentra en el sistema"
                    };
                }

                return new Respuesta<EPropietario>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Detalle del Cliente encontrado"
                };
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        //prueba
        [WebMethod]
        public static Respuesta<EPropietario> DetalleClientePrueba(int IdPropi)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EPropietario> respuesta = NPropietario.GetInstance().PropietarioIdMascotasToHisto(IdPropi);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = "El cliente no se encuentra en el sistema"
                    };
                }

                return new Respuesta<EPropietario>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Detalle del Cliente encontrado"
                };
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }


        [WebMethod]
        public static Respuesta<bool> Guardar(EMascota oMascota, byte[] imageBytes)
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
                        string folder = "/Imagemas/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EMascota obj = new EMascota
                {
                    ImagenMascota = imageUrl,
                    Nombre = oMascota.Nombre,
                    Raza = oMascota.Raza,
                    Genero = oMascota.Genero,
                    IdTipoMascota = oMascota.IdTipoMascota,
                    IdPropietario = oMascota.IdPropietario,
                    VFechaNacimiento = Convert.ToDateTime(oMascota.FechaNacimiento),
                    Comentario = oMascota.Comentario
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NMascota.GetInstance().RegistrarMascota(obj);
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