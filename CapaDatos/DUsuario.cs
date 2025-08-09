﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DUsuario
    {
        #region "PATRON SINGLETON"
        public static DUsuario _instancia = null;

        private DUsuario()
        {

        }

        public static DUsuario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DUsuario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarUsuario(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdVeterinaria", oUsuario.IdVeterinaria);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@Token", oUsuario.Token);

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

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", oUsuario.IdUsuario);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdVeterinaria", oUsuario.IdVeterinaria);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@Token", oUsuario.Token);
                        cmd.Parameters.AddWithValue("@Activo", oUsuario.Activo);

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

        public Respuesta<List<EUsuario>> ObtenerUsuariosZ()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUsuario()
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    IdVeterinaria = Convert.ToInt32(dr["IdVeterinaria"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    Veterinaria = new EVeterinaria()
                                    {
                                        NombreVeterinaria = dr["NombreVeterinaria"].ToString(),
                                        ImagenLogo = dr["ImagenLogo"].ToString(),
                                        Propietario = dr["Propietario"].ToString()
                                    },
                                    Rol = new ERol() { Descripcion = dr["DescripcionRol"].ToString() },
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EUsuario> LoginUsuarios(string Correo, string Clave, string Token)
        {
            try
            {
                EUsuario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LogeoUsuarios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@Correo", Correo);
                        comando.Parameters.AddWithValue("@Clave", Clave);
                        comando.Parameters.AddWithValue("@Token", Token);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read() && dr["IdUsuario"] != DBNull.Value)
                            {
                                obj = new EUsuario
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    IdVeterinaria = Convert.ToInt32(dr["IdVeterinaria"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Token = dr["Token"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    Veterinaria = new EVeterinaria()
                                    {
                                        NombreVeterinaria = dr["NombreVeterinaria"].ToString(),
                                        ImagenLogo = dr["ImagenLogo"].ToString(),
                                        Propietario = dr["Propietario"].ToString()
                                    },
                                    Rol = new ERol() { Descripcion = dr["DescripcionRol"].ToString() },
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EUsuario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Usuario obtenido correctamente" : "Credenciales incorrectas o usuario no encontrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<string> ObtenerToken(int Iduser)
        {
            try
            {
                var tokenSesion = string.Empty;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ConsultaToken", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdUsuario", Iduser);

                        SqlParameter outputParam = new SqlParameter("@Token", SqlDbType.NVarChar, 200) // Tamaño fijo en lugar de 'max'
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        tokenSesion = outputParam.Value.ToString();
                    }
                }

                bool encontrado = !string.IsNullOrEmpty(tokenSesion) && tokenSesion != "Vacio";

                return new Respuesta<string>
                {
                    Estado = encontrado,
                    Valor = encontrado ? tokenSesion : "",
                    Mensaje = encontrado ? "Token obtenido correctamente" : "No se encontró el token"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<string>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Valor = ""
                };
            }
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            try
            {
                List<ERol> rptListaRol = new List<ERol>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerRoles", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ERol()
                                {
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ERol>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERol>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EAdministrador> LoginAdmin(string Correo, string Clave)
        {
            try
            {
                EAdministrador obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LogeoAdmin", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        //comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@Correo", Correo);
                        comando.Parameters.AddWithValue("@Clave", Clave);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EAdministrador
                                {
                                    IdAdmin = Convert.ToInt32(dr["IdAdmin"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EAdministrador>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Usuario obtenido correctamente" : "Credenciales incorrectas o usuario no encontrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EAdministrador>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EAdministrador>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
