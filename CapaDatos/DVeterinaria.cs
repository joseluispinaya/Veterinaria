using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DVeterinaria
    {
        #region "PATRON SINGLETON"
        public static DVeterinaria _instancia = null;

        private DVeterinaria()
        {

        }

        public static DVeterinaria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DVeterinaria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarVeterinaria(EVeterinaria oVeterinaria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVeterinaria", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@ImagenLogo", oVeterinaria.ImagenLogo);
                        cmd.Parameters.AddWithValue("@NombreVeterinaria", oVeterinaria.NombreVeterinaria);
                        cmd.Parameters.AddWithValue("@Propietario", oVeterinaria.Propietario);
                        cmd.Parameters.AddWithValue("@Correo", oVeterinaria.Correo);
                        cmd.Parameters.AddWithValue("@Direccion", oVeterinaria.Direccion);
                        cmd.Parameters.AddWithValue("@Celular", oVeterinaria.Celular);
                        cmd.Parameters.AddWithValue("@DiasAtencion", oVeterinaria.DiasAtencion);
                        cmd.Parameters.AddWithValue("@Horarios", oVeterinaria.Horarios);
                        cmd.Parameters.AddWithValue("@Latitud", oVeterinaria.Latitud);
                        cmd.Parameters.AddWithValue("@Longitud", oVeterinaria.Longitud);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ModificarVeterinaria(EVeterinaria oVeterinaria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarVeterinaria", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdVeterinaria", oVeterinaria.IdVeterinaria);
                        cmd.Parameters.AddWithValue("@ImagenLogo", oVeterinaria.ImagenLogo);
                        cmd.Parameters.AddWithValue("@NombreVeterinaria", oVeterinaria.NombreVeterinaria);
                        cmd.Parameters.AddWithValue("@Propietario", oVeterinaria.Propietario);
                        cmd.Parameters.AddWithValue("@Correo", oVeterinaria.Correo);
                        cmd.Parameters.AddWithValue("@Direccion", oVeterinaria.Direccion);
                        cmd.Parameters.AddWithValue("@Celular", oVeterinaria.Celular);
                        cmd.Parameters.AddWithValue("@DiasAtencion", oVeterinaria.DiasAtencion);
                        cmd.Parameters.AddWithValue("@Horarios", oVeterinaria.Horarios);
                        cmd.Parameters.AddWithValue("@Latitud", oVeterinaria.Latitud);
                        cmd.Parameters.AddWithValue("@Longitud", oVeterinaria.Longitud);
                        cmd.Parameters.AddWithValue("@Activo", oVeterinaria.Activo);

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
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar ingrese otro Correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EVeterinaria>> ObtenerVeterinarias()
        {
            try
            {
                List<EVeterinaria> rptLista = new List<EVeterinaria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerVeterinarias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EVeterinaria()
                                {
                                    IdVeterinaria = Convert.ToInt32(dr["IdVeterinaria"]),
                                    ImagenLogo = dr["ImagenLogo"].ToString(),
                                    NombreVeterinaria = dr["NombreVeterinaria"].ToString(),
                                    Propietario = dr["Propietario"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    DiasAtencion = dr["DiasAtencion"].ToString(),
                                    Horarios = dr["Horarios"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    DocumentoPdf = dr["DocumentoPdf"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EVeterinaria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Veterinarias obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EVeterinaria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> ActualizarDocumento(int IdVeterinaria, string Pdf)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_AddUpdatePdfVete", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdVeterinaria", IdVeterinaria);
                        cmd.Parameters.AddWithValue("@DocumentoPdf", Pdf);

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
