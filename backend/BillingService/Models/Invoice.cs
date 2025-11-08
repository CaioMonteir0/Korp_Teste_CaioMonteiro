namespace BillingService.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public long SequentialNumber { get; set; }   // numeração sequencial
        public string Status { get; set; } = "Aberta"; // "Aberta" ou "Fechada"
        public List<InvoiceItem> Items { get; set; } = new(); 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
