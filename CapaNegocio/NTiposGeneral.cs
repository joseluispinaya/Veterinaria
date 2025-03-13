using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NTiposGeneral
    {
        #region "PATRON SINGLETON"
        private static NTiposGeneral daoEmpleado = null;
        private NTiposGeneral() { }
        public static NTiposGeneral GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NTiposGeneral();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<List<ETipoMascota>> ListaTipoMascota()
        {
            return DTiposGeneral.GetInstance().ListaTipoMascota();
        }

        public Respuesta<List<ECategoria>> ListaCategorias()
        {
            return DTiposGeneral.GetInstance().ListaCategorias();
        }
    }
}
