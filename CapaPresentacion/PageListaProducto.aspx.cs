using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.IO;

namespace CapaPresentacion
{
	public partial class PageListaProducto : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProdporVeteri(int IdVete)
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductosporVeteri(IdVete);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProductos()
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductos();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EProducto oProduc, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oProduc == null || oProduc.IdProducto <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos inválidos" };
                }

                // Obtener el usuario existente
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductos();

                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdProducto == oProduc.IdProducto);
                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Producto no encontrado" };
                }

                // Manejar la imagen, si se proporciona una nueva
                string imageUrl = item.ImagenProdu;  // Mantener la foto actual por defecto

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imageprodu/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.ImagenProdu))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.ImagenProdu);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            imageUrl = newImageUrl;
                        }
                    }
                }

                // Actualizar los datos del usuario
                item.IdProducto = oProduc.IdProducto;
                item.Marca = oProduc.Marca;
                item.Nombre = oProduc.Nombre;
                item.Descripcion = oProduc.Descripcion;
                item.IdCategoria = oProduc.IdCategoria;
                item.IdVeterinaria = oProduc.IdVeterinaria;
                item.Stock = oProduc.Stock;
                item.ImagenProdu = imageUrl;
                item.Precio = oProduc.Precio;
                item.Activo = oProduc.Activo;

                // Guardar cambios
                Respuesta<bool> respuesta = NProducto.GetInstance().ActualizarProducto(item);
                return respuesta;
            }
            catch (IOException ioEx)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Error al manejar la imagen: " + ioEx.Message };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}