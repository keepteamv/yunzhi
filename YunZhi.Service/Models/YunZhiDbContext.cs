using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Models.Authorities;

namespace YunZhi.Service.Models
{
    public class YunZhiDbContext : DbContext
    {
        public YunZhiDbContext(DbContextOptions<YunZhiDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Authoritities

            modelBuilder.Entity<Operation>().ToTable("Operations");
            modelBuilder.Entity<OperationGroup>().ToTable("OperationGroups");
            modelBuilder.Entity<PermissionOperation>().ToTable("PermissionOperations");
            modelBuilder.Entity<Menu>().ToTable("Menus");
            modelBuilder.Entity<Permission>().ToTable("Permissions");
            modelBuilder.Entity<PermissionMenu>().ToTable("PermissionMenus");
            modelBuilder.Entity<Role>().ToTable("Roles");
            modelBuilder.Entity<RoleGroup>().ToTable("RoleGroups");
            modelBuilder.Entity<RoleGroupRole>().ToTable("RoleGroupRoles");
            modelBuilder.Entity<RoleGroupUser>().ToTable("RoleGroupUsers");
            modelBuilder.Entity<RolePermission>().ToTable("RolePermissions");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<UserGroup>().ToTable("UserGroups");
            modelBuilder.Entity<UserGroupRole>().ToTable("UserGroupRoles");
            modelBuilder.Entity<UserGroupUser>().ToTable("UserGroupUsers");
            modelBuilder.Entity<UserRole>().ToTable("UserRoles");

            #endregion
        }
    }
}