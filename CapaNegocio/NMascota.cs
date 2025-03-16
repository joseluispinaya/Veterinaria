using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NMascota
    {
        #region "PATRON SINGLETON"
        private static NMascota daoEmpleado = null;
        private NMascota() { }
        public static NMascota GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NMascota();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarMascota(EMascota oMascota)
        {
            return DMascota.GetInstance().RegistrarMascota(oMascota);
        }

        public Respuesta<EMascota> MascotaDetalleHistorial(int IdMascota)
        {
            return DMascota.GetInstance().MascotaDetalleHistorial(IdMascota);
        }

    }
}
