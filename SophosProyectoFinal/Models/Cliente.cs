﻿using System;
using System.Collections.Generic;

namespace SophosProyectoFinal.Models
{
    public partial class Cliente
    {
        public int Llave { get; set; }
        public int IdCliente { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public double? Saldo { get; set; }
        public string Direccion { get; set; } = null!;
        public int? Edad { get; set; }
    }
}
