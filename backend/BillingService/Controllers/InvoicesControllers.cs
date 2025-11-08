using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BillingService.Data;
using BillingService.Models;
using BillingService.Services;

namespace BillingService.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {
        private readonly BillingContext _ctx;
        private readonly InventoryClient _inv;
        private static long _seq = 0;

        public InvoicesController(BillingContext ctx, InventoryClient inv) {
            _ctx = ctx; _inv = inv;
            if(_seq == 0){
                _seq = _ctx.Invoices.Any() ? _ctx.Invoices.Max(i => i.SequentialNumber) : 0;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _ctx.Invoices.Include(i=>i.Items).ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            var inv = await _ctx.Invoices.Include(i=>i.Items).FirstOrDefaultAsync(i=>i.Id==id);
            return inv==null? NotFound() : Ok(inv);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Invoice invoice) {
            invoice.SequentialNumber = Interlocked.Increment(ref _seq);
            invoice.Status = "Aberta";
            _ctx.Invoices.Add(invoice);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = invoice.Id }, invoice);
        }

        
        [HttpPost("{id}/print")]
        public async Task<IActionResult> Print(int id) {
            var invoice = await _ctx.Invoices.Include(i=>i.Items).FirstOrDefaultAsync(i=>i.Id==id);
            if(invoice == null) return NotFound();
            if(invoice.Status != "Aberta") return BadRequest("Só é possível imprimir notas com status 'Aberta'.");

            
            
            foreach(var item in invoice.Items) {
                var ok = await _inv.ReserveAsync(item.ProductId, item.Quantity);
                if(!ok) {
                    
                    return StatusCode(503, new { message = $"Falha ao reservar produto {item.ProductId}" });
                }
            }

            invoice.Status = "Fechada";
            await _ctx.SaveChangesAsync();
            return Ok(invoice);
        }
    }
}
