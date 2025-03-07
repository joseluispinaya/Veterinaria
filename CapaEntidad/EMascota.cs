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
        public string ImageFulMa => string.IsNullOrEmpty(ImagenMascota)
            ? $"/Imagenes/sinimagen.png"
            : ImagenMascota;
    }
}
