using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YunZhi.WebAPI.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    ParentId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    IsInside = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "OperationGroups",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationGroups", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    PermissionType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Remarks = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Remarks = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    RealName = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    AvatarUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Sequence);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    OperationGroupId = table.Column<string>(nullable: true),
                    OperationGroupSequence = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    Tips = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_Operations_OperationGroups_OperationGroupSequence",
                        column: x => x.OperationGroupSequence,
                        principalTable: "OperationGroups",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PermissionMenus",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    PermissionId = table.Column<string>(nullable: true),
                    PermissionSequence = table.Column<int>(nullable: true),
                    MenuId = table.Column<string>(nullable: true),
                    MenuSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionMenus", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_PermissionMenus_Menus_MenuSequence",
                        column: x => x.MenuSequence,
                        principalTable: "Menus",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PermissionMenus_Permissions_PermissionSequence",
                        column: x => x.PermissionSequence,
                        principalTable: "Permissions",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    RoleId = table.Column<string>(nullable: true),
                    RoleSequence = table.Column<int>(nullable: true),
                    PermissionId = table.Column<string>(nullable: true),
                    PermissionSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionSequence",
                        column: x => x.PermissionSequence,
                        principalTable: "Permissions",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleSequence",
                        column: x => x.RoleSequence,
                        principalTable: "Roles",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroupRoles",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    UserGroupId = table.Column<string>(nullable: true),
                    UserGroupSequence = table.Column<int>(nullable: true),
                    RoleId = table.Column<string>(nullable: true),
                    RoleSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupRoles", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_UserGroupRoles_Roles_RoleSequence",
                        column: x => x.RoleSequence,
                        principalTable: "Roles",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserGroupRoles_UserGroups_UserGroupSequence",
                        column: x => x.UserGroupSequence,
                        principalTable: "UserGroups",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroupUsers",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    UserGroupId = table.Column<string>(nullable: true),
                    UserGroupSequence = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    UserSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupUsers", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_UserGroupUsers_UserGroups_UserGroupSequence",
                        column: x => x.UserGroupSequence,
                        principalTable: "UserGroups",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserGroupUsers_Users_UserSequence",
                        column: x => x.UserSequence,
                        principalTable: "Users",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    UserSequence = table.Column<int>(nullable: true),
                    RoleId = table.Column<string>(nullable: true),
                    RoleSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleSequence",
                        column: x => x.RoleSequence,
                        principalTable: "Roles",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserSequence",
                        column: x => x.UserSequence,
                        principalTable: "Users",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PermissionOperations",
                columns: table => new
                {
                    Sequence = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Id = table.Column<string>(maxLength: 32, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    PermissionId = table.Column<string>(nullable: true),
                    PermissionSequence = table.Column<int>(nullable: true),
                    OperationId = table.Column<string>(nullable: true),
                    OperationSequence = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionOperations", x => x.Sequence);
                    table.ForeignKey(
                        name: "FK_PermissionOperations_Operations_OperationSequence",
                        column: x => x.OperationSequence,
                        principalTable: "Operations",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PermissionOperations_Permissions_PermissionSequence",
                        column: x => x.PermissionSequence,
                        principalTable: "Permissions",
                        principalColumn: "Sequence",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Operations_OperationGroupSequence",
                table: "Operations",
                column: "OperationGroupSequence");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionMenus_MenuSequence",
                table: "PermissionMenus",
                column: "MenuSequence");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionMenus_PermissionSequence",
                table: "PermissionMenus",
                column: "PermissionSequence");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionOperations_OperationSequence",
                table: "PermissionOperations",
                column: "OperationSequence");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionOperations_PermissionSequence",
                table: "PermissionOperations",
                column: "PermissionSequence");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionSequence",
                table: "RolePermissions",
                column: "PermissionSequence");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RoleSequence",
                table: "RolePermissions",
                column: "RoleSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRoles_RoleSequence",
                table: "UserGroupRoles",
                column: "RoleSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRoles_UserGroupSequence",
                table: "UserGroupRoles",
                column: "UserGroupSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupUsers_UserGroupSequence",
                table: "UserGroupUsers",
                column: "UserGroupSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupUsers_UserSequence",
                table: "UserGroupUsers",
                column: "UserSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleSequence",
                table: "UserRoles",
                column: "RoleSequence");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserSequence",
                table: "UserRoles",
                column: "UserSequence");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionMenus");

            migrationBuilder.DropTable(
                name: "PermissionOperations");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "UserGroupRoles");

            migrationBuilder.DropTable(
                name: "UserGroupUsers");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "OperationGroups");
        }
    }
}
