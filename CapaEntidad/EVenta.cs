using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EVenta
    {
        public int IdVenta { get; set; }
        public string Codigo { get; set; }
        //public int CantidadProducto { get; set; }
        public int CantidadTotal { get; set; }
        public float TotalCosto { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public EVeterinaria Veterinaria { get; set; }
        public EPropietario Propietario { get; set; }
        public List<EDetalleVenta> ListaDetalleVenta { get; set; }
    }
}
