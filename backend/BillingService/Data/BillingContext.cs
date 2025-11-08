using Microsoft.EntityFrameworkCore;
using BillingService.Models;
namespace BillingService.Data {
    public class BillingContext : DbContext {
        public BillingContext(DbContextOptions<BillingContext> opts) : base(opts) {}
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
    }
}
