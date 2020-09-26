using Microsoft.EntityFrameworkCore;
using PanasonicInspect.Service.Models.Authorities;

namespace PanasonicInspect.Service.Models
{
    public class PanasonicInspectDbContext : DbContext
    {
        public PanasonicInspectDbContext(DbContextOptions<PanasonicInspectDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}