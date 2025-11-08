namespace BillingService.Models
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }   // id do produto no InventoryService
        public int Quantity { get; set; }    // quantidade usada
    }
}
