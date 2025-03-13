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
	public partial class PageAddProducto : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}
        [WebMethod]
        public static Respuesta<List<ECategoria>> ListaCategorias()
        {
            try
            {
                Respuesta<List<ECategoria>> Lista = NTiposGeneral.GetInstance().ListaCategorias();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los roles: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}