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
	public partial class PageServicios : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<bool> RegistrarCategoria(ECategoria categoria)
        {
            try
            {
                Respuesta<bool> respuesta = NTiposGeneral.GetInstance().RegistrarCategoria(categoria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EditarCategoria(ECategoria categoria)
        {
            try
            {
                Respuesta<bool> respuesta = NTiposGeneral.GetInstance().EditarCategoria(categoria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> RegistrarServicio(EServicio servicio)
        {
            try
            {
                Respuesta<bool> respuesta = NTiposGeneral.GetInstance().RegistrarServicio(servicio);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EditarServicio(EServicio servicio)
        {
            try
            {
                Respuesta<bool> respuesta = NTiposGeneral.GetInstance().EditarServicio(servicio);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}