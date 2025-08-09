using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NVeterinaria
    {
        #region "PATRON SINGLETON"
        public static NVeterinaria _instancia = null;

        private NVeterinaria()
        {

        }

        public static NVeterinaria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NVeterinaria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarVeterinaria(EVeterinaria oVeterinaria)
        {
            return DVeterinaria.GetInstance().RegistrarVeterinaria(oVeterinaria);
        }

        public Respuesta<bool> ModificarVeterinaria(EVeterinaria oVeterinaria)
        {
            return DVeterinaria.GetInstance().ModificarVeterinaria(oVeterinaria);
        }

        public Respuesta<List<EVeterinaria>> ObtenerVeterinarias()
        {
            return DVeterinaria.GetInstance().ObtenerVeterinarias();
        }

        public Respuesta<bool> ActualizarDocumento(int IdVeterinaria, string Pdf)
        {
            return DVeterinaria.GetInstance().ActualizarDocumento(IdVeterinaria, Pdf);
        }
    }
}
