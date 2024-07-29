﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mseg_carpool.Server;

#nullable disable

namespace mseg_carpool.Server.Migrations
{
    [DbContext(typeof(ApplicationDBcontext))]
    partial class ApplicationDBcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Ride", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AvailableSeats")
                        .HasColumnType("int");

                    b.Property<string>("Coordinates")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Origin")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UsersId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UsersId");

                    b.ToTable("Ride");
                });

            modelBuilder.Entity("mseg_carpool.Server.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("RideId")
                        .HasColumnType("int");

<<<<<<< HEAD
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("coordinates")
=======
                    b.Property<string>("UsersId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("pickupPoints")
>>>>>>> New-Ahmed
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RideId");

<<<<<<< HEAD
                    b.HasIndex("UserId");
=======
                    b.HasIndex("UsersId");
>>>>>>> New-Ahmed

                    b.ToTable("Request");
                });

<<<<<<< HEAD
            modelBuilder.Entity("mseg_carpool.Server.Models.User", b =>
=======
            modelBuilder.Entity("mseg_carpool.Server.Models.Users", b =>
>>>>>>> New-Ahmed
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CarColor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CarModel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CarPlate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CarType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobileNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Ride", b =>
<<<<<<< HEAD
=======
                {
                    b.HasOne("mseg_carpool.Server.Models.Users", "Users")
                        .WithMany("Rides")
                        .HasForeignKey("UsersId");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("mseg_carpool.Server.Models.Request", b =>
>>>>>>> New-Ahmed
                {
                    b.HasOne("Ride", "ride")
                        .WithMany("Requests")
                        .HasForeignKey("RideId");

<<<<<<< HEAD
                    b.Navigation("User");
                });

            modelBuilder.Entity("mseg_carpool.Server.Models.Request", b =>
                {
                    b.HasOne("Ride", "Ride")
                        .WithMany("Requests")
                        .HasForeignKey("RideId");

                    b.HasOne("mseg_carpool.Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Ride");

                    b.Navigation("User");
=======
                    b.HasOne("mseg_carpool.Server.Models.Users", "Users")
                        .WithMany("Requests")
                        .HasForeignKey("UsersId");

                    b.Navigation("Users");

                    b.Navigation("ride");
                });

            modelBuilder.Entity("Ride", b =>
                {
                    b.Navigation("Requests");
                });

            modelBuilder.Entity("mseg_carpool.Server.Models.Users", b =>
                {
                    b.Navigation("Requests");

                    b.Navigation("Rides");
>>>>>>> New-Ahmed
                });

            modelBuilder.Entity("Ride", b =>
                {
                    b.Navigation("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
