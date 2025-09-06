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

        public Respuesta<List<EServicio>> ListaServicios()
        {
            return DTiposGeneral.GetInstance().ListaServicios();
        }

        public Respuesta<bool> RegistrarCategoria(ECategoria categoria)
        {
            return DTiposGeneral.GetInstance().RegistrarCategoria(categoria);
        }

        public Respuesta<bool> EditarCategoria(ECategoria categoria)
        {
            return DTiposGeneral.GetInstance().EditarCategoria(categoria);
        }

        public Respuesta<bool> RegistrarServicio(EServicio categoria)
        {
            return DTiposGeneral.GetInstance().RegistrarServicio(categoria);
        }

        public Respuesta<bool> EditarServicio(EServicio categoria)
        {
            return DTiposGeneral.GetInstance().EditarServicio(categoria);
        }
    }
}
