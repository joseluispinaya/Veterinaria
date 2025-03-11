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
    public class DPropietario
    {
        #region "PATRON SINGLETON"
        public static DPropietario _instancia = null;

        private DPropietario()
        {

        }

        public static DPropietario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DPropietario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropietario(EPropietario oPropietario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPropietario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NroCi", oPropietario.NroCi);
                        cmd.Parameters.AddWithValue("@Nombres", oPropietario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oPropietario.Apellidos);
                        cmd.Parameters.AddWithValue("@Celular", oPropietario.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oPropietario.Direccion);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Nro CI"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarPropietario(EPropietario oPropietario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarPropietario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdPropietario", oPropietario.IdPropietario);
                        cmd.Parameters.AddWithValue("@NroCi", oPropietario.NroCi);
                        cmd.Parameters.AddWithValue("@Nombres", oPropietario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oPropietario.Apellidos);
                        cmd.Parameters.AddWithValue("@Celular", oPropietario.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oPropietario.Direccion);
                        cmd.Parameters.AddWithValue("@Activo", oPropietario.Activo);

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

        public Respuesta<List<EPropietario>> ObtenerPropietarios()
        {
            try
            {
                List<EPropietario> rptLista = new List<EPropietario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropietarios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPropietario()
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propietarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EPropietario>> ObtenerPropietariosyMascotas()
        {
            try
            {
                List<EPropietario> rptLista = new List<EPropietario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropietarios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                EPropietario propie = new EPropietario()
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    ListaMascota = new List<EMascota>() // Inicializamos la lista vacía
                                };
                                rptLista.Add(propie);
                            }
                        }
                    }
                    //Paso 2: Obtener las mascotas para cada propietario
                    foreach (var propie in rptLista)
                    {
                        using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerMascotasIdPropietNue", con))
                        {
                            productoCmd.CommandType = CommandType.StoredProcedure;
                            productoCmd.Parameters.AddWithValue("@IdPropietario", propie.IdPropietario);

                            using (SqlDataReader productoDr = productoCmd.ExecuteReader())
                            {
                                while (productoDr.Read())
                                {
                                    EMascota masco = new EMascota()
                                    {
                                        IdMascota = Convert.ToInt32(productoDr["IdMascota"]),
                                        Nombre = productoDr["Nombre"].ToString(),
                                        ImagenMascota = productoDr["ImagenMascota"].ToString(),
                                        Raza = productoDr["Raza"].ToString(),
                                        Genero = Convert.ToChar(productoDr["Genero"].ToString()),
                                        IdTipoMascota = Convert.ToInt32(productoDr["IdTipoMascota"]),
                                        IdPropietario = Convert.ToInt32(productoDr["IdPropietario"]),
                                        FechaNacimiento = Convert.ToDateTime(productoDr["FechaNacimiento"].ToString()).ToString("dd/MM/yyyy"),
                                        VFechaNacimiento = Convert.ToDateTime(productoDr["FechaNacimiento"].ToString()),
                                        Comentario = productoDr["Comentario"].ToString(),
                                        Activo = Convert.ToBoolean(productoDr["Activo"]),
                                        FechaRegistro = Convert.ToDateTime(productoDr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                        VFechaRegistro = Convert.ToDateTime(productoDr["FechaRegistro"].ToString()),
                                        TipoMascota = new ETipoMascota() { Descripcion = productoDr["DescripcionTipo"].ToString() },
                                    };

                                    propie.ListaMascota.Add(masco);
                                }
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propietarios y mascotas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropietario> BuscarPropietarioCi(string NroCi)
        {
            try
            {
                EPropietario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarPropietario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@NroCi", NroCi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropietario
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EPropietario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propietario obtenido correctamente" : "El nro de ci no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropietario> PropietarioIdMascotasTo(int Idpropi)
        {
            try
            {
                EPropietario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    con.Open();

                    // Obtener propietario
                    using (SqlCommand comando = new SqlCommand("usp_BuscarPropietarioId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdPropietario", Idpropi);

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropietario
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]),
                                    ListaMascota = new List<EMascota>() // Inicializamos la lista vacía
                                };
                            }
                        }
                    }

                    // Si se encontró un propietario, buscar sus mascotas
                    if (obj != null)
                    {
                        using (SqlCommand mascotaCmd = new SqlCommand("usp_ObtenerMascotasIdPropietNue", con))
                        {
                            mascotaCmd.CommandType = CommandType.StoredProcedure;
                            mascotaCmd.Parameters.AddWithValue("@IdPropietario", obj.IdPropietario);

                            using (SqlDataReader mascotaDr = mascotaCmd.ExecuteReader())
                            {
                                while (mascotaDr.Read())
                                {
                                    EMascota masco = new EMascota()
                                    {
                                        IdMascota = Convert.ToInt32(mascotaDr["IdMascota"]),
                                        Nombre = mascotaDr["Nombre"].ToString(),
                                        ImagenMascota = mascotaDr["ImagenMascota"].ToString(),
                                        Raza = mascotaDr["Raza"].ToString(),
                                        Genero = Convert.ToChar(mascotaDr["Genero"].ToString()),
                                        IdTipoMascota = Convert.ToInt32(mascotaDr["IdTipoMascota"]),
                                        IdPropietario = Convert.ToInt32(mascotaDr["IdPropietario"]),
                                        FechaNacimiento = Convert.ToDateTime(mascotaDr["FechaNacimiento"]).ToString("dd/MM/yyyy"),
                                        VFechaNacimiento = Convert.ToDateTime(mascotaDr["FechaNacimiento"]),
                                        Comentario = mascotaDr["Comentario"].ToString(),
                                        Activo = Convert.ToBoolean(mascotaDr["Activo"]),
                                        FechaRegistro = Convert.ToDateTime(mascotaDr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                        VFechaRegistro = Convert.ToDateTime(mascotaDr["FechaRegistro"]),
                                        TipoMascota = new ETipoMascota() { Descripcion = mascotaDr["DescripcionTipo"].ToString() }
                                    };

                                    obj.ListaMascota.Add(masco);
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EPropietario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propietario y sus mascotas obtenidos correctamente" : "El propietario no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropietario> PropietarioId(int Idpropi)
        {
            try
            {
                EPropietario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarPropietarioId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@IdPropietario", Idpropi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropietario
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EPropietario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propietario obtenido correctamente" : "El nro de ci no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
