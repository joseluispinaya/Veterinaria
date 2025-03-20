using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;
using System.Xml.Linq;
using System.Xml;

namespace CapaDatos
{
    public class DVenta
    {
        #region "PATRON SINGLETON"
        public static DVenta _instancia = null;

        private DVenta()
        {

        }

        public static DVenta GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DVenta();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<int> RegistrarVentaIdclie(string Detalle)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVentaIdPropie", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Parámetro de entrada XML
                        cmd.Parameters.Add("@Detalle", SqlDbType.Xml).Value = Detalle;

                        // Parámetro de salida
                        var outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        // Abrir la conexión y ejecutar el procedimiento almacenado
                        con.Open();
                        cmd.ExecuteNonQuery();

                        // Obtener el valor del parámetro de salida de manera segura
                        int resultado = outputParam.Value != DBNull.Value ? Convert.ToInt32(outputParam.Value) : 0;

                        // Configurar la respuesta basada en el resultado
                        respuesta.Estado = resultado > 0;
                        respuesta.Valor = resultado.ToString();
                        respuesta.Mensaje = resultado > 0 ? "Registro realizado correctamente." : "Error al registrar, intente más tarde.";
                        respuesta.Data = resultado;
                    }
                }
            }
            catch (SqlException ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Error en la base de datos: {ex.Message}";
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error inesperado: {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<EVenta> ObtenerDetalleVenta(int IdVenta)
        {
            try
            {
                EVenta rptDetalleVenta = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleVenta", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdVenta", IdVenta);

                        con.Open();
                        using (XmlReader dr = cmd.ExecuteXmlReader())
                        {
                            if (dr.Read())
                            {
                                XDocument doc = XDocument.Load(dr);
                                var detalleVentaElement = doc.Element("DETALLE_VENTA");

                                if (detalleVentaElement != null)
                                {
                                    rptDetalleVenta = new EVenta
                                    {
                                        Codigo = detalleVentaElement.Element("Codigo").Value,
                                        CantidadTotal = int.Parse(detalleVentaElement.Element("CantidadTotal").Value),
                                        TotalCosto = float.Parse(detalleVentaElement.Element("TotalCosto").Value),
                                        FechaRegistro = detalleVentaElement.Element("FechaRegistro").Value
                                    };

                                    // Obtener información de la veterinaria
                                    var veterinariaElement = detalleVentaElement.Element("DETALLE_VETERINARIA");
                                    if (veterinariaElement != null)
                                    {
                                        rptDetalleVenta.Veterinaria = new EVeterinaria
                                        {
                                            ImagenLogo = veterinariaElement.Element("ImagenLogo").Value,
                                            NombreVeterinaria = veterinariaElement.Element("NombreVeterinaria").Value,
                                            Propietario = veterinariaElement.Element("Propietario").Value,
                                            Direccion = veterinariaElement.Element("Direccion").Value,
                                            Celular = veterinariaElement.Element("Celular").Value
                                        };
                                    }

                                    // Obtener información del propietario
                                    var propietarioElement = detalleVentaElement.Element("DETALLE_PROPIETARIO");
                                    if (propietarioElement != null)
                                    {
                                        rptDetalleVenta.Propietario = new EPropietario
                                        {
                                            NroCi = propietarioElement.Element("NroCi").Value,
                                            Nombres = propietarioElement.Element("Nombres").Value,
                                            Apellidos = propietarioElement.Element("Apellidos").Value,
                                            Celular = propietarioElement.Element("Celular").Value,
                                            Direccion = propietarioElement.Element("Direccion").Value
                                        };
                                    }

                                    // Obtener lista de productos
                                    var detalleProductosElement = detalleVentaElement.Element("DETALLE_PRODUCTO");
                                    if (detalleProductosElement != null)
                                    {
                                        rptDetalleVenta.ListaDetalleVenta = detalleProductosElement.Elements("PRODUCTO")
                                            .Select(producto => new EDetalleVenta
                                            {
                                                IdProducto = int.Parse(producto.Element("IdProducto").Value),
                                                Cantidad = int.Parse(producto.Element("Cantidad").Value),
                                                NombreProducto = producto.Element("Nombre").Value,
                                                PrecioUnidad = float.Parse(producto.Element("PrecioUnidad").Value),
                                                ImporteTotal = float.Parse(producto.Element("ImporteTotal").Value)
                                            }).ToList();
                                    }
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EVenta>
                {
                    Estado = rptDetalleVenta != null,
                    Data = rptDetalleVenta,
                    Mensaje = rptDetalleVenta != null ? "Detalle obtenido correctamente" : "No se encontraron detalles para la venta especificada"
                };
            }
            catch (SqlException ex)
            {
                return new Respuesta<EVenta>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EVenta>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> ControlarStock(int IdProducto, int Cantidad, bool Restar)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ControlarStock", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProducto", IdProducto);
                        cmd.Parameters.AddWithValue("@Cantidad", Cantidad);
                        cmd.Parameters.AddWithValue("@Restar", Restar);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}
