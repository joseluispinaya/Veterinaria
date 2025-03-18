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
	public partial class PageVenta : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EProducto>> ProductosporVeterinaria(int IdVete)
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductosporVeteri(IdVete);

                // Si la lista de productos es null, inicializarla como una lista vacía para evitar errores
                List<EProducto> productosFiltrados = (Lista.Data ?? new List<EProducto>())
                    .Where(p => p.Stock > 0 && p.Activo)
                    .ToList();

                return new Respuesta<List<EProducto>>()
                {
                    Estado = true,
                    Data = productosFiltrados,
                    Mensaje = productosFiltrados.Count > 0 ? "Productos obtenidos correctamente" : "No hay productos disponibles"
                };
            }
            catch (Exception ex)
            {
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