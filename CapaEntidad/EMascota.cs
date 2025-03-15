using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EMascota
    {
        public int IdMascota { get; set; }
        public string Nombre { get; set; }
        public string ImagenMascota { get; set; }
        public string Raza { get; set; }
        public char Genero { get; set; }
        public int IdTipoMascota { get; set; }
        public int IdPropietario { get; set; }
        public string FechaNacimiento { get; set; }
        public DateTime VFechaNacimiento { get; set; }
        public string Comentario { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public ETipoMascota TipoMascota { get; set; }
        public EPropietario Propietario { get; set; }

        public List<EHistorialClinco> ListaHistorialClinco { get; set; }
        public int NumeroHistorial => ListaHistorialClinco == null ? 0 : ListaHistorialClinco.Count;

        public string ImageFulMa => string.IsNullOrEmpty(ImagenMascota)
            ? $"/Imagenes/sinimagen.png"
            : ImagenMascota;

        public string Edad
        {
            get
            {
                var diff = DateTime.Now.Subtract(VFechaNacimiento);
                var days = diff.Days;

                if (days < 30)
                    return days + " dias";
                else if (days >= 30 && days <= 31)
                    return "1 mes";
                else if (days < 365)
                    return Math.Floor(diff.TotalDays / 30) + " meses";
                else if (days == 365)
                    return "1 Año";
                else
                    return Math.Floor(diff.TotalDays / 365) + " Años";
            }
        }

    }
}
