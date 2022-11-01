using System;
using System.Collections.Generic;

namespace SophosProyectoFinal.Models
{
    public partial class Alquiler
    {
        public int IdRecibo { get; set; }
        public string NombreCliente { get; set; } = null!;
        public string ApellidoCliente { get; set; } = null!;
        public int? IdCliente { get; set; }
        public string Juego { get; set; } = null!;
        public int? IdJuego { get; set; }
        public DateTime? FechaAlquiler { get; set; }
        public DateTime? FechaRetorno { get; set; }
        public double? Total { get; set; }
    }
}
