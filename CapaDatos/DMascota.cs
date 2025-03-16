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
    public class DMascota
    {
        #region "PATRON SINGLETON"
        public static DMascota _instancia = null;

        private DMascota()
        {

        }

        public static DMascota GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DMascota();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarMascota(EMascota oMascota)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarMascota", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oMascota.Nombre);
                        cmd.Parameters.AddWithValue("@ImagenMascota", oMascota.ImagenMascota);
                        cmd.Parameters.AddWithValue("@Raza", oMascota.Raza);
                        cmd.Parameters.AddWithValue("@Genero", oMascota.Genero);
                        cmd.Parameters.AddWithValue("@IdTipoMascota", oMascota.IdTipoMascota);
                        cmd.Parameters.AddWithValue("@IdPropietario", oMascota.IdPropietario);
                        cmd.Parameters.AddWithValue("@FechaNacimiento", oMascota.VFechaNacimiento);
                        cmd.Parameters.AddWithValue("@Comentario", oMascota.Comentario);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<EMascota> MascotaDetalleHistorial(int IdMascota)
        {
            try
            {
                EMascota obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    con.Open();

                    // Obtener Mascota
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerMascotasIdDetalle", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdMascota", IdMascota);

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EMascota
                                {
                                    IdMascota = Convert.ToInt32(dr["IdMascota"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    ImagenMascota = dr["ImagenMascota"].ToString(),
                                    Raza = dr["Raza"].ToString(),
                                    Genero = Convert.ToChar(dr["Genero"].ToString()),
                                    IdTipoMascota = Convert.ToInt32(dr["IdTipoMascota"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    FechaNacimiento = Convert.ToDateTime(dr["FechaNacimiento"]).ToString("dd/MM/yyyy"),
                                    VFechaNacimiento = Convert.ToDateTime(dr["FechaNacimiento"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]),
                                    TipoMascota = new ETipoMascota() { Descripcion = dr["DescripcionTipo"].ToString() },
                                    Propietario = new EPropietario() { Nombres = dr["Nombres"].ToString(), Apellidos = dr["Apellidos"].ToString() },
                                    ListaHistorialClinco = new List<EHistorialClinco>() // Inicializamos la lista vacía
                                };
                            }
                        }
                    }

                    // Si se encontró una mascota, buscar sus historial
                    if (obj != null)
                    {
                        using (SqlCommand historialCmd = new SqlCommand("usp_ObtenerHistoriaClinicaIdMasco", con))
                        {
                            historialCmd.CommandType = CommandType.StoredProcedure;
                            historialCmd.Parameters.AddWithValue("@IdMascota", obj.IdMascota);

                            using (SqlDataReader historialDr = historialCmd.ExecuteReader())
                            {
                                while (historialDr.Read())
                                {
                                    EHistorialClinco masco = new EHistorialClinco()
                                    {
                                        IdHistoria = Convert.ToInt32(historialDr["IdHistoria"]),
                                        IdVeterinaria = Convert.ToInt32(historialDr["IdVeterinaria"]),
                                        Idservicio = Convert.ToInt32(historialDr["Idservicio"]),
                                        IdMascota = Convert.ToInt32(historialDr["IdMascota"]),
                                        Descripcion = historialDr["Descripcion"].ToString(),
                                        Comentario = historialDr["Comentario"].ToString(),
                                        Activo = Convert.ToBoolean(historialDr["Activo"]),
                                        FechaRegistro = Convert.ToDateTime(historialDr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                        VFechaRegistro = Convert.ToDateTime(historialDr["FechaRegistro"]),
                                        Veterinaria = new EVeterinaria() { NombreVeterinaria = historialDr["NombreVeterinaria"].ToString() },
                                        Oservicio = new EServicio() { Servicio = historialDr["Servicio"].ToString() }
                                    };

                                    obj.ListaHistorialClinco.Add(masco);
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EMascota>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Mascota y sus historial obtenidos correctamente" : "La mascota no se encuentra registrada"
                };
            }
            catch (SqlException ex)
            {
                return new Respuesta<EMascota>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EMascota>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
