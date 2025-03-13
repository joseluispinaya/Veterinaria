using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NProducto
    {
        #region "PATRON SINGLETON"
        private static NProducto daoEmpleado = null;
        private NProducto() { }
        public static NProducto GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NProducto();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarProducto(EProducto producto)
        {
            return DProducto.GetInstance().RegistrarProducto(producto);
        }

        public Respuesta<bool> ActualizarProducto(EProducto producto)
        {
            return DProducto.GetInstance().ActualizarProducto(producto);
        }

        public Respuesta<List<EProducto>> ObtenerProductosporVeteri(int IdVeter)
        {
            return DProducto.GetInstance().ObtenerProductosporVeteri(IdVeter);
        }

        public Respuesta<List<EProducto>> ObtenerProductos()
        {
            return DProducto.GetInstance().ObtenerProductos();
        }
    }
}
