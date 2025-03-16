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
    public class DHistorialClinco
    {
        #region "PATRON SINGLETON"
        public static DHistorialClinco _instancia = null;

        private DHistorialClinco()
        {

        }

        public static DHistorialClinco GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DHistorialClinco();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarHistoria(EHistorialClinco historialcli)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarHistorialClini", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdVeterinaria", historialcli.IdVeterinaria);
                        cmd.Parameters.AddWithValue("@Idservicio", historialcli.Idservicio);
                        cmd.Parameters.AddWithValue("@IdMascota", historialcli.IdMascota);
                        cmd.Parameters.AddWithValue("@Descripcion", historialcli.Descripcion);
                        cmd.Parameters.AddWithValue("@Comentario", historialcli.Comentario);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar Intente más tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarHistoria(EHistorialClinco historialcli)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarHistorialClin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdHistoria", historialcli.IdHistoria);
                        cmd.Parameters.AddWithValue("@IdVeterinaria", historialcli.IdVeterinaria);
                        cmd.Parameters.AddWithValue("@Idservicio", historialcli.Idservicio);
                        cmd.Parameters.AddWithValue("@IdMascota", historialcli.IdMascota);
                        cmd.Parameters.AddWithValue("@Descripcion", historialcli.Descripcion);
                        cmd.Parameters.AddWithValue("@Comentario", historialcli.Comentario);
                        cmd.Parameters.AddWithValue("@Activo", historialcli.Activo);

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
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al actualizar Intente más tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}
