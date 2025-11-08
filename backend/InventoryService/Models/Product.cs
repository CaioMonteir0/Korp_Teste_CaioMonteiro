namespace InventoryService.Models {
    public class Product {
        public int Id { get; set; }           // DB PK
        public string Code { get; set; }     // código produto (único)
        public string Description { get; set; }
        public int Balance { get; set; }     // saldo em estoque
    }
}
