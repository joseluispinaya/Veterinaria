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
	public partial class PageListaProducto : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProdporVeteri(int IdVete)
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductosporVeteri(IdVete);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProductos()
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductos();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}