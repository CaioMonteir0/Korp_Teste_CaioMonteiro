using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryService.Data;
using InventoryService.Models;

namespace InventoryService.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase {
        private readonly InventoryContext _ctx;
        public ProductsController(InventoryContext ctx) => _ctx = ctx;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _ctx.Products.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            var p = await _ctx.Products.FindAsync(id);
            return p == null ? NotFound() : Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product p) {
            if (string.IsNullOrEmpty(p.Code) || string.IsNullOrEmpty(p.Description))
                return BadRequest("Código e Descrição obrigatórios.");
            _ctx.Products.Add(p);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = p.Id }, p);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product p) {
            var exists = await _ctx.Products.FindAsync(id);
            if (exists == null) return NotFound();
            exists.Description = p.Description;
            exists.Code = p.Code;
            exists.Balance = p.Balance;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        // Endpoint usado por Faturamento para descontar saldo
        [HttpPost("{id}/reserve")]
        public async Task<IActionResult> Reserve(int id, [FromQuery] int qty) {
           
            using var tx = await _ctx.Database.BeginTransactionAsync();
            var prod = await _ctx.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (prod == null) return NotFound();
            if (prod.Balance < qty) return BadRequest("Saldo insuficiente.");
            prod.Balance -= qty;
            await _ctx.SaveChangesAsync();
            await tx.CommitAsync();
            return Ok(prod);
        }
    }
}
