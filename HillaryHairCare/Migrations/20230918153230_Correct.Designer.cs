﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillaryHairCare.Migrations
{
    [DbContext(typeof(HillaryHairCareDbContext))]
    [Migration("20230918153230_Correct")]
    partial class Correct
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.Property<int>("AppointmentsId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("AppointmentsId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("AppointmentService");

                    b.HasData(
                        new
                        {
                            AppointmentsId = 1,
                            ServicesId = 1
                        },
                        new
                        {
                            AppointmentsId = 1,
                            ServicesId = 2
                        },
                        new
                        {
                            AppointmentsId = 2,
                            ServicesId = 2
                        },
                        new
                        {
                            AppointmentsId = 2,
                            ServicesId = 3
                        });
                });

            modelBuilder.Entity("HillaryHairCare.Models.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("StylistId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Appointments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CustomerId = 3,
                            StylistId = 1,
                            Time = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            CustomerId = 1,
                            StylistId = 2,
                            Time = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("HillaryHairCare.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Mildred"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Molly"
                        },
                        new
                        {
                            Id = 3,
                            Name = "JoNell"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Ali"
                        });
                });

            modelBuilder.Entity("HillaryHairCare.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("Services");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Haircut",
                            Price = 15m
                        },
                        new
                        {
                            Id = 2,
                            Name = "Shave",
                            Price = 10m
                        },
                        new
                        {
                            Id = 3,
                            Name = "Hair Coloring",
                            Price = 20m
                        });
                });

            modelBuilder.Entity("HillaryHairCare.Models.Stylist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsEmployee")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Stylists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsEmployee = true,
                            Name = "Jackson"
                        },
                        new
                        {
                            Id = 2,
                            IsEmployee = true,
                            Name = "Sam"
                        },
                        new
                        {
                            Id = 3,
                            IsEmployee = false,
                            Name = "Will"
                        },
                        new
                        {
                            Id = 4,
                            IsEmployee = false,
                            Name = "Braxton"
                        });
                });

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.HasOne("HillaryHairCare.Models.Appointment", null)
                        .WithMany()
                        .HasForeignKey("AppointmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HillaryHairCare.Models.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
