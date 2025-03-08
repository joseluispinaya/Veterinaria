using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EVeterinaria
    {
        public int IdVeterinaria { get; set; }
        public string ImagenLogo { get; set; }
        public string NombreVeterinaria { get; set; }
        public string Propietario { get; set; }
        public string Correo { get; set; }
        public string Direccion { get; set; }
        public string Celular { get; set; }
        public string DiasAtencion { get; set; }
        public string Horarios { get; set; }
        public float Latitud { get; set; }
        public float Longitud { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }

        public string ImageFullVete => string.IsNullOrEmpty(ImagenLogo)
            ? $"/Imagenes/sinimagen.png"
            : ImagenLogo;

    }
}
