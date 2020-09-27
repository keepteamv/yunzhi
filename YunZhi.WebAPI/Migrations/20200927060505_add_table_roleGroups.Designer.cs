﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YunZhi.Service.Models;

namespace YunZhi.WebAPI.Migrations
{
    [DbContext(typeof(YunZhiDbContext))]
    [Migration("20200927060505_add_table_roleGroups")]
    partial class add_table_roleGroups
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.Menu", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsInside")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ParentId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Path")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Sort")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.Operation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<string>("Code")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("OperationGroupId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("Tips")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("OperationGroupId");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.OperationGroup", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("OperationGroups");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.Permission", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("PermissionType")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.PermissionMenu", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("MenuId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("PermissionId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("MenuId");

                    b.HasIndex("PermissionId");

                    b.ToTable("PermissionMenus");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.PermissionOperation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("OperationId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("PermissionId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("OperationId");

                    b.HasIndex("PermissionId");

                    b.ToTable("PermissionOperations");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Remarks")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RoleGroup", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Remarks")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("RoleGroups");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RoleGroupRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("RoleGroupId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("RoleGroupId");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleGroupRoles");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RoleGroupUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("RoleGroupId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("RoleGroupId");

                    b.HasIndex("UserId");

                    b.ToTable("RoleGroupUsers");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RolePermission", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PermissionId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("RolePermissions");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Password")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("RealName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserGroup", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Remarks")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserGroupRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserGroupId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserGroupId");

                    b.ToTable("UserGroupRoles");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserGroupUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserGroupId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("UserGroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroupUsers");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4")
                        .HasMaxLength(32);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(32) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.Operation", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.OperationGroup", "OperationGroup")
                        .WithMany("Operations")
                        .HasForeignKey("OperationGroupId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.PermissionMenu", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.Menu", "Menu")
                        .WithMany()
                        .HasForeignKey("MenuId");

                    b.HasOne("YunZhi.Service.Models.Authorities.Permission", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.PermissionOperation", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.Operation", "Operation")
                        .WithMany()
                        .HasForeignKey("OperationId");

                    b.HasOne("YunZhi.Service.Models.Authorities.Permission", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RoleGroupRole", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.RoleGroup", "RoleGroup")
                        .WithMany()
                        .HasForeignKey("RoleGroupId");

                    b.HasOne("YunZhi.Service.Models.Authorities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RoleGroupUser", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.RoleGroup", "RoleGroup")
                        .WithMany()
                        .HasForeignKey("RoleGroupId");

                    b.HasOne("YunZhi.Service.Models.Authorities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.RolePermission", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.Permission", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId");

                    b.HasOne("YunZhi.Service.Models.Authorities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserGroupRole", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("YunZhi.Service.Models.Authorities.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserGroupUser", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId");

                    b.HasOne("YunZhi.Service.Models.Authorities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("YunZhi.Service.Models.Authorities.UserRole", b =>
                {
                    b.HasOne("YunZhi.Service.Models.Authorities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("YunZhi.Service.Models.Authorities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
