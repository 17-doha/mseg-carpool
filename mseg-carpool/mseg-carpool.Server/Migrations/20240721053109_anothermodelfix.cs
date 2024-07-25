using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mseg_carpool.Server.Migrations
{
    /// <inheritdoc />
    public partial class anothermodelfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Ride_rideId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "Driver",
                table: "Ride");

            migrationBuilder.DropColumn(
                name: "Passenger",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "Ride",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "rideId",
                table: "Request",
                newName: "RideId");

            migrationBuilder.RenameIndex(
                name: "IX_Request_rideId",
                table: "Request",
                newName: "IX_Request_RideId");

            migrationBuilder.AlterColumn<int>(
                name: "RideId",
                table: "Request",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Ride_RideId",
                table: "Request",
                column: "RideId",
                principalTable: "Ride",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Ride_RideId",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "RideId",
                table: "Request",
                newName: "rideId");

            migrationBuilder.RenameIndex(
                name: "IX_Request_RideId",
                table: "Request",
                newName: "IX_Request_rideId");

            migrationBuilder.AddColumn<string>(
                name: "Driver",
                table: "Ride",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "rideId",
                table: "Request",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passenger",
                table: "Request",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Ride",
                table: "Request",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Ride_rideId",
                table: "Request",
                column: "rideId",
                principalTable: "Ride",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
