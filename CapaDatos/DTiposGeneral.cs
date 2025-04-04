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
    public class DTiposGeneral
    {
        #region "PATRON SINGLETON"
        public static DTiposGeneral _instancia = null;

        private DTiposGeneral()
        {

        }

        public static DTiposGeneral GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DTiposGeneral();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<List<ETipoMascota>> ListaTipoMascota()
        {
            try
            {
                List<ETipoMascota> rptListaRol = new List<ETipoMascota>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTipoMascotas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ETipoMascota()
                                {
                                    IdTipoMascota = Convert.ToInt32(dr["IdTipoMascota"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETipoMascota>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Tipo de mascotas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoMascota>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ECategoria>> ListaCategorias()
        {
            try
            {
                List<ECategoria> rptListaRol = new List<ECategoria>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Categorias obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EServicio>> ListaServicios()
        {
            try
            {
                List<EServicio> rptListaRol = new List<EServicio>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerServicios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new EServicio()
                                {
                                    Idservicio = Convert.ToInt32(dr["Idservicio"]),
                                    Servicio = dr["Servicio"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EServicio>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Servicios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EServicio>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
