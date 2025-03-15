using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EHistorialClinco
    {
        public int IdHistoria { get; set; }
        public int IdVeterinaria { get; set; }
        public int Idservicio { get; set; }
        public int IdMascota { get; set; }
        public string Descripcion { get; set; }
        public string Comentario { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public EVeterinaria Veterinaria { get; set; }
        public EServicio Oservicio { get; set; }
    }
}
