using Microsoft.EntityFrameworkCore;
using InventoryService.Models;

namespace InventoryService.Data {
    public class InventoryContext : DbContext {
        public InventoryContext(DbContextOptions<InventoryContext> opts) : base(opts) {}
        public DbSet<Product> Products { get; set; }
    }
}
