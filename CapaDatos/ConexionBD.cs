using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        public static ConexionBD conexion = null;

        public ConexionBD() { }

        public static ConexionBD GetInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDB()
        {
            SqlConnection conexion = new SqlConnection
            {
                //ConnectionString = @"Data Source=SQL5113.site4now.net;Initial Catalog=db_abd9a0_inmobiliaria;User Id=db_abd9a0_inmobiliaria_admin;Password=Elzero2025"
                ConnectionString = "Data Source=.;Initial Catalog=VeterinariaDb;Integrated Security=True"
            };

            return conexion;
        }
    }
}
