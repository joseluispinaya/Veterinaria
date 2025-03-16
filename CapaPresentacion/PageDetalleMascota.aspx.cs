using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class PageDetalleMascota : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EServicio>> ObtenerServicios()
        {
            try
            {
                Respuesta<List<EServicio>> Lista = NTiposGeneral.GetInstance().ListaServicios();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EServicio>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los servicios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<EMascota> DetalleMascota(int IdMascota)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EMascota> respuesta = NMascota.GetInstance().MascotaDetalleHistorial(IdMascota);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EMascota>
                    {
                        Estado = false,
                        Mensaje = "La mascota no se encuentra en el sistema"
                    };
                }

                return new Respuesta<EMascota>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Detalle de la Mascota encontrada"
                };
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EMascota>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GurdarHistoria(EHistorialClinco oHistorial)
        {
            try
            {
                Respuesta<bool> respuesta = NHistorialClinco.GetInstance().RegistrarHistoria(oHistorial);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarHistoria(EHistorialClinco oHistorial)
        {
            try
            {
                Respuesta<bool> respuesta = NHistorialClinco.GetInstance().ActualizarHistoria(oHistorial);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}