using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SophosProyectoFinal.Models
{
    public partial class VideoStoreContext : DbContext
    {
        public VideoStoreContext()
        {
        }

        public VideoStoreContext(DbContextOptions<VideoStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alquiler> Alquilers { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Juego> Juegos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-8RIHTQBE; DataBase=VideoStore;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alquiler>(entity =>
            {
                entity.HasKey(e => e.IdRecibo)
                    .HasName("PK__Alquiler__3854E199D131B859");

                entity.ToTable("Alquiler");

                entity.Property(e => e.IdRecibo).HasColumnName("Id_Recibo");

                entity.Property(e => e.ApellidoCliente)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Apellido_Cliente");

                entity.Property(e => e.FechaAlquiler)
                    .HasColumnType("date")
                    .HasColumnName("Fecha_Alquiler");

                entity.Property(e => e.FechaRetorno)
                    .HasColumnType("date")
                    .HasColumnName("Fecha_Retorno");

                entity.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

                entity.Property(e => e.IdJuego).HasColumnName("Id_Juego");

                entity.Property(e => e.Juego)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCliente)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Nombre_Cliente");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.Llave)
                    .HasName("PK__Cliente__B8B4879F9DA6022E");

                entity.ToTable("Cliente");

                entity.Property(e => e.Llave).HasColumnName("llave");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Direccion)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Juego>(entity =>
            {
                entity.HasKey(e => e.IdJuego)
                    .HasName("PK__Juego__0B2AE53A423C5A59");

                entity.ToTable("Juego");

                entity.Property(e => e.IdJuego).HasColumnName("Id_Juego");

                entity.Property(e => e.Director)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NombreJuego)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Nombre_Juego");

                entity.Property(e => e.Plataforma)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Productor)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Protagonista)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
