using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EDetalleVenta
    {
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public string NombreProducto { get; set; }
        public float PrecioUnidad { get; set; }
        public float ImporteTotal { get; set; }

        public string PrecioCadena => $"Bs/ {PrecioUnidad:F2}";
        public string TotCadena => $"Bs/ {ImporteTotal:F2}";
    }
}
