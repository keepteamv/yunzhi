using Microsoft.EntityFrameworkCore.Migrations;

namespace YunZhi.WebAPI.Migrations
{
    public partial class update_table_operation_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "Operations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "OperationGroups",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sort",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "Sort",
                table: "OperationGroups");
        }
    }
}
