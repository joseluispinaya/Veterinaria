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

        [WebMethod]
        public static Respuesta<EPropietario> BuscarPropie(string Nroci)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EPropietario> respuesta = NPropietario.GetInstance().BuscarPropietarioCi(Nroci);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = "El número de CI no se encuentra registrado"
                    };
                }

                return new Respuesta<EPropietario>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Propietario encontrado"
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
        public static Respuesta<int> GuardarVentaIdCliente(string xml)
        {
            try
            {
                Respuesta<int> respuesta = NVenta.GetInstance().RegistrarVentaIdclie(xml);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<EVenta> DetalleVenta(int IdVenta)
        {
            try
            {
                Respuesta<EVenta> oVenta = NVenta.GetInstance().ObtenerDetalleVentaIa(IdVenta);
                return oVenta;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EVenta>() { Estado = false, Data = null, Mensaje = ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ControlarStock(int idproducto, int cantidad, bool restar)
        {
            try
            {
                Respuesta<bool> respuesta = NVenta.GetInstance().ControlarStock(idproducto, cantidad, restar);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}