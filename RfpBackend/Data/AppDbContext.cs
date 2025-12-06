using Microsoft.EntityFrameworkCore;
using RfpBackend.Models;

namespace RfpBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Rfp> Rfps { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Proposal> Proposals { get; set; }
    }
}
