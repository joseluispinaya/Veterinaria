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

        //nuevo campo para pdf
        public string DocumentoPdf { get; set; }
        public bool OpcionPdf => !string.IsNullOrEmpty(DocumentoPdf);
        public string DocMostrar => string.IsNullOrEmpty(DocumentoPdf)
            ? $"/Archivopdf/VeteSinPdf.pdf"
            : DocumentoPdf;

        public string ImageFullVete => string.IsNullOrEmpty(ImagenLogo)
            ? $"/Imagenes/sinimagen.png"
            : ImagenLogo;

    }
}
