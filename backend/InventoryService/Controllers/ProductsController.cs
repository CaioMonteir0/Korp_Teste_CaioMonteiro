using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryService.Data;
using InventoryService.Models;

namespace InventoryService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly InventoryContext _ctx;

    public ProductsController(InventoryContext ctx)
    {
        _ctx = ctx;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_ctx.Products.ToList());

    [HttpPost]
    public IActionResult Create(Product p)
    {
        // Verifica se já existe um produto com o mesmo código
        var existing = _ctx.Products.FirstOrDefault(x => x.Code == p.Code);

        if (existing is not null)
        {
            // Atualiza a descrição e soma o saldo
            existing.Description = p.Description;
            existing.Balance += p.Balance;

            _ctx.SaveChanges();
            return Ok(existing);
        }

        // Se não existir, cria novo
        _ctx.Products.Add(p);
        _ctx.SaveChanges();
        return CreatedAtAction(nameof(GetAll), new { id = p.Id }, p);
    }
}