using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPropietario
    {
        #region "PATRON SINGLETON"
        public static NPropietario _instancia = null;

        private NPropietario()
        {

        }

        public static NPropietario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NPropietario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropietario(EPropietario oPropietario)
        {
            return DPropietario.GetInstance().RegistrarPropietario(oPropietario);
        }

        public Respuesta<bool> ActualizarPropietario(EPropietario oPropietario)
        {
            return DPropietario.GetInstance().ActualizarPropietario(oPropietario);
        }

        public Respuesta<List<EPropietario>> ObtenerPropietarios()
        {
            return DPropietario.GetInstance().ObtenerPropietarios();
        }

        public Respuesta<List<EPropietario>> ObtenerPropietariosyMascotas()
        {
            return DPropietario.GetInstance().ObtenerPropietariosyMascotas();
        }

        public Respuesta<EPropietario> BuscarPropietarioCi(string NroCi)
        {
            return DPropietario.GetInstance().BuscarPropietarioCi(NroCi);
        }

        public Respuesta<EPropietario> PropietarioIdMascotasTo(int Idpropi)
        {
            return DPropietario.GetInstance().PropietarioIdMascotasTo(Idpropi);
        }

        public Respuesta<EPropietario> PropietarioIdMascotasToHisto(int Idpropi)
        {
            return DPropietario.GetInstance().PropietarioIdMascotasToHisto(Idpropi);
        }

        public Respuesta<EPropietario> PropietarioId(int Idpropi)
        {
            return DPropietario.GetInstance().PropietarioId(Idpropi);
        }
    }
}
