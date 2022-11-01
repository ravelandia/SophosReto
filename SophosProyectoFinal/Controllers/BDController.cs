using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SophosProyectoFinal.Models;

namespace SophosProyectoFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BDController : ControllerBase
    {

        private readonly VideoStoreContext _dbcontext;

        public BDController(VideoStoreContext context)
        {
            _dbcontext=context;
        }

        /*
            OBTINE TODOS LOS ALQUILERES POR ORDEN DE FECHA ALQUILADA
         */
        [HttpGet]
        [Route("Alquiler")]
        public async Task<IActionResult> Alquiler()
        {
            List<Alquiler> lista=await _dbcontext.Alquilers.OrderByDescending(c=>c.FechaAlquiler).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        /*
            OBTINE TODOS LOS CLIENTES
         */
        [HttpGet]
        [Route("Cliente")]
        public async Task<IActionResult> Cliente()
        {
            List<Cliente> lista = await _dbcontext.Clientes.OrderBy(c => c.IdCliente).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
        /*
            OBTINE TUN CLIENTE EN ESPECIFICO
         */
        [HttpGet]
        [Route("Cliente/{idCliente}")]
        public async Task<ActionResult> Informacion(int idCliente)
        {
            Cliente cliente = _dbcontext.Clientes.Find(idCliente);

            return StatusCode(StatusCodes.Status200OK, cliente);
        }

        [HttpPost]
        [Route("NuevoCliente")]
        public async Task<IActionResult> NuevoCliente([FromBody] Cliente request)
        {
            await _dbcontext.Clientes.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("EliminarCliente/{llave}")]
        public async Task<ActionResult<Cliente>> EliminarCliente(int llave)
        {
            var cliente = await _dbcontext.Clientes.FindAsync(llave);
            if(cliente == null)
            {
                return NotFound();
            }
            
            _dbcontext.Clientes.Remove(cliente);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Cliente Eliminado");
        }
        [HttpPut]
        [Route("EditarCliente")]
        public async Task<IActionResult> EditarCliente([FromBody] Cliente request)
        {
             _dbcontext.Clientes.Update(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpGet]
        [Route("Juego")]
        public async Task<ActionResult<Juego>> Juego()
        {
            var lista =  _dbcontext.Juegos.OrderBy(c=>c.Plataforma);

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPut]
        [Route("EditarPrecioJuego")]
        public async Task<IActionResult> EditarPrecioJuego([FromBody] Juego request)
        {
            _dbcontext.Juegos.Update(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        [HttpDelete]
        [Route("EliminarJuego/{idJuego}")]
        public async Task<ActionResult<Juego>> EliminarJuego(int idJuego)
        {
            var juego = await _dbcontext.Juegos.FindAsync(idJuego);
            if (juego == null)
            {
                return NotFound();
            }

            _dbcontext.Juegos.Remove(juego);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Juego Eliminado");
        }

        [HttpPost]
        [Route("NuevoJuego")]
        public async Task<IActionResult> NuevoJuego([FromBody] Juego request)
        {
            await _dbcontext.Juegos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPost]
        [Route("NuevoAlquiler")]
        public async Task<IActionResult> NuevoAlquiler([FromBody] Alquiler request)
        {
            await _dbcontext.Alquilers.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        /*
         select Juego, count(*) Frecuencia from Alquiler
            group by Juego
            having COUNT(*)>=1
            order by Frecuencia desc;
         */
        [HttpGet]
        [Route("JuegoFrecuente")]
        public async Task<IActionResult> JuegoFrecuente()
        {
            List<Alquiler> lista = await _dbcontext.Alquilers.ToListAsync();
            var frecuencia = lista.GroupBy(c => c.Juego).Select(c => new { Juego = c.Key, Frecuencia = c.Count() }).OrderByDescending(c => c.Frecuencia).ToList();
            var listaJuegos = _dbcontext.Juegos.OrderBy(c => c.Plataforma);
            List<Juego> listaJuegosFrecuentes = new List<Juego>();
            foreach (var item in frecuencia)
            {
                foreach (var juego in listaJuegos)
                {
                    if (item.Juego == juego.NombreJuego)
                    {
                        listaJuegosFrecuentes.Add(juego);
                    }
                }
            }
            
            return StatusCode(StatusCodes.Status200OK, listaJuegosFrecuentes);
        }

        [HttpGet]
        [Route("ClienteFrecuente")]
        public async Task<IActionResult> ClienteFrecuente()
        {
            List<Alquiler> lista = await _dbcontext.Alquilers.ToListAsync();
            var frecuencia = lista.GroupBy(c => c.IdCliente).Select(c => new { Cliente = c.Key, Frecuencia = c.Count() }).OrderByDescending(c => c.Frecuencia).ToList();
            var listaClientes = _dbcontext.Clientes.OrderBy(c => c.IdCliente);
            List<Cliente> listaClientesFrecuentes = new List<Cliente>();
            foreach (var item in frecuencia)
            {
                foreach (var cliente in listaClientes)
                {
                    if (item.Cliente == cliente.IdCliente)
                    {
                        listaClientesFrecuentes.Add(cliente);
                    }
                }
            }
            return StatusCode(StatusCodes.Status200OK, listaClientesFrecuentes);
        }

        [HttpGet]
        [Route("AlquilerDelDia")]
        public async Task<IActionResult> AlquilerDelDia()
        {
            string fecha = DateTime.Now.ToString("yyyy-MM-dd");
            List<Alquiler> lista = await _dbcontext.Alquilers.Where(c => c.FechaAlquiler.ToString() == fecha).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Juego/Directores")]
        public async Task<IActionResult> JuegoDirectores()
        {
            List<Juego> lista = await _dbcontext.Juegos.ToListAsync();
            List<string> listaDirectores = new List<string>();
            foreach (var item in lista)
            {
                if (!listaDirectores.Contains(item.Director))
                {
                    listaDirectores.Add(item.Director);
                }
            }
            return StatusCode(StatusCodes.Status200OK, listaDirectores);
        }

        [HttpGet]
        [Route("Juego/Directores/{director}")]
        public async Task<IActionResult> JuegoDirectores(string director)
        {
            List<Juego> lista = await _dbcontext.Juegos.Where(c => c.Director.Equals(director)).ToListAsync();
            
            return StatusCode(StatusCodes.Status200OK, lista);
        }
        
        [HttpGet]
        [Route("Juego/Plataforma/{plataforma}")]
        public async Task<IActionResult> JuegoPlataforma(string plataforma)
        {
            List<Juego> lista = await _dbcontext.Juegos.Where(c => c.Plataforma.Equals(plataforma)).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Juego/Lanzamiento")]
        public async Task<IActionResult> JuegoLanzamiento()
        {
            List<Juego> lista = await _dbcontext.Juegos.ToListAsync();
            List<string> listaLanzamiento = new List<string>();
            foreach (var item in lista)
            {
                if (!listaLanzamiento.Contains(item.Año.ToString()))
                {
                    listaLanzamiento.Add(item.Año.ToString());
                }
            }
            return StatusCode(StatusCodes.Status200OK, listaLanzamiento);
        }

        [HttpGet]
        [Route("Juego/Lanzamiento/{fecha}")]
        public async Task<IActionResult> JuegoLanzamiento(string fecha)
        {
            List<Juego> lista = await _dbcontext.Juegos.Where(c => c.Año.ToString().Equals(fecha)).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        
        [HttpGet]
        [Route("Juego/MenosJugado/{edadMinima}/{edadMaxima}")]
        public async Task<IActionResult> JuegoMenosJugado (int edadMinima,int edadMaxima){
            List<Alquiler> listaAlquileres=await _dbcontext.Alquilers.ToListAsync();
            List<Cliente> lista=await _dbcontext.Clientes.Where(c=>c.Edad>=edadMinima && c.Edad<=edadMaxima).ToListAsync();
            List<Juego> listaJuegos=await _dbcontext.Juegos.ToListAsync();
            List<Juego> listaJuegosJugados=new List<Juego>();
            foreach (var item in listaAlquileres)
            {
                foreach (var cliente in lista)
                {
                    if (item.IdCliente==cliente.IdCliente)
                    {
                        foreach (var juego in listaJuegos)
                        {
                            if (item.Juego==juego.NombreJuego)
                            {
                                listaJuegosJugados.Add(juego);
                            }
                        }
                    }
                }
            }
            //juegos menos frecuentes
            var frecuencia = listaJuegosJugados.GroupBy(c => c.IdJuego).Select(c => new { IdJuego = c.Key, Frecuencia = c.Count() }).OrderBy(c => c.Frecuencia).ToList();
            listaJuegos=new List<Juego>();
            //añadir sin que se repitan los juegos
            foreach (var item in frecuencia)
            {
                foreach (var juego in listaJuegosJugados)
                {
                    if (item.IdJuego==juego.IdJuego && !listaJuegos.Contains(juego))
                    {
                        listaJuegos.Add(juego);
                    }
                }
            }

            return StatusCode(StatusCodes.Status200OK, listaJuegos);
        }



    }
}
