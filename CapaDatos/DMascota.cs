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
    }
}
