using System;
using System.Collections.Generic;

namespace SophosProyectoFinal.Models
{
    public partial class Juego
    {
        public int IdJuego { get; set; }
        public string NombreJuego { get; set; } = null!;
        public int Año { get; set; }
        public double Precio { get; set; }
        public string Protagonista { get; set; } = null!;
        public string Director { get; set; } = null!;
        public string Productor { get; set; } = null!;
        public string Plataforma { get; set; } = null!;
    }
}
