using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBDServer
    {
        #region "PATRON SINGLETON"
        public static ConexionBDServer conexion = null;

        public ConexionBDServer() { }

        public static ConexionBDServer GetInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBDServer();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDBserv()
        {
            SqlConnection conexion = new SqlConnection
            {
                //"Data Source=SQL1001.site4now.net;Initial Catalog=db_ab9f8c_educacion;User Id=db_ab9f8c_educacion_admin;Password=Zero2025
                ConnectionString = @"Data Source=SQL1001.site4now.net;Initial Catalog=db_ab9f8c_educacion;User Id=db_ab9f8c_educacion_admin;Password=Zero2025"
                //ConnectionString = "Data Source=.;Initial Catalog=EducacionDB;Integrated Security=True"
            };
            return conexion;
        }
    }
}
