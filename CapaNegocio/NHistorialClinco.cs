using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NHistorialClinco
    {
        #region "PATRON SINGLETON"
        private static NHistorialClinco daoEmpleado = null;
        private NHistorialClinco() { }
        public static NHistorialClinco GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NHistorialClinco();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarHistoria(EHistorialClinco historialcli)
        {
            return DHistorialClinco.GetInstance().RegistrarHistoria(historialcli);
        }

        public Respuesta<bool> ActualizarHistoria(EHistorialClinco historialcli)
        {
            return DHistorialClinco.GetInstance().ActualizarHistoria(historialcli);
        }
    }
}
