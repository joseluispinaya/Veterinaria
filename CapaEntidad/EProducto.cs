using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace CapaEntidad
{
    public class EProducto
    {
        public int IdProducto { get; set; }
        public string Codigo { get; set; }
        public int ValorCodigo { get; set; }
        public string Marca { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int IdCategoria { get; set; }
        public int IdVeterinaria { get; set; }
        public int Stock { get; set; }
        public string ImagenProdu { get; set; }
        public float Precio { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public ECategoria Categoria { get; set; }
        public EVeterinaria Veterinaria { get; set; }
        public string ImageFulP => string.IsNullOrEmpty(ImagenProdu)
            ? $"/Imagenes/sinimagen.png"
            : ImagenProdu;
    }
}
