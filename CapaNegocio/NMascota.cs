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

        public Respuesta<bool> EditarMascota(EMascota oMascota)
        {
            return DMascota.GetInstance().EditarMascota(oMascota);
        }

        public Respuesta<EMascota> MascotaDetalleHistorial(int IdMascota)
        {
            return DMascota.GetInstance().MascotaDetalleHistorial(IdMascota);
        }

        public Respuesta<EMascota> SoloMascota(int IdMascota)
        {
            var detalle = DMascota.GetInstance().MascotaDetalleHistorial(IdMascota);

            if (!detalle.Estado)
            {
                return new Respuesta<EMascota>
                {
                    Estado = false,
                    Mensaje = detalle.Mensaje,
                    Data = null
                };
            }

            // Armar el objeto sin historial
            var mascota = new EMascota
            {
                IdMascota = detalle.Data.IdMascota,
                Nombre = detalle.Data.Nombre,
                ImagenMascota = detalle.Data.ImagenMascota,
                Raza = detalle.Data.Raza,
                Genero = detalle.Data.Genero,
                IdTipoMascota = detalle.Data.IdTipoMascota,
                IdPropietario = detalle.Data.IdPropietario,
                FechaNacimiento = detalle.Data.FechaNacimiento,
                VFechaNacimiento = detalle.Data.VFechaNacimiento,
                Comentario = detalle.Data.Comentario,
                Activo = detalle.Data.Activo,
                FechaRegistro = detalle.Data.FechaRegistro,
                VFechaRegistro = detalle.Data.VFechaRegistro
                // NO copiamos ListaHistorialClinco
            };

            return new Respuesta<EMascota>
            {
                Estado = true,
                Mensaje = "Mascota obtenida correctamente",
                Data = mascota
            };
        }

    }
}
