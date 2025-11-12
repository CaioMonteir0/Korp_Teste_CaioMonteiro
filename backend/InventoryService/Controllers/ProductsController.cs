using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryService.Data;
using InventoryService.Models;
using System.Text.Json;


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
    public IActionResult GetAll([FromQuery] int? id)
    {
        // Verifica se o parâmetro 'id' foi fornecido na query string (ex: /api/products?id=1)
        if (id.HasValue)
        {
            // Se o ID for fornecido, tenta encontrar o produto específico
            var product = _ctx.Products.FirstOrDefault(p => p.Id == id.Value);

            if (product == null)
            {
                
                return NotFound($"Produto com ID {id.Value} não encontrado.");
            }

            // Retorna o produto individual
            return Ok(product);
        }
        else
        {
            // Se nenhum ID for fornecido, retorna a lista completa de produtos 
            return Ok(_ctx.Products.ToList());
        }
    }

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

        _ctx.Products.Add(p);
        _ctx.SaveChanges();
        return CreatedAtAction(nameof(GetAll), new { id = p.Id }, p);
    }
    //desconto de saldo ao reservar
    [HttpPost("{id}/reserve")]
    public IActionResult Reserve(int id, [FromBody] JsonElement body)
    {
        var qty = body.GetProperty("quantity").GetInt32();
        var product = _ctx.Products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            return NotFound($"Produto {id} não encontrado.");

        if (product.Balance < qty)
            return BadRequest($"Estoque insuficiente para o produto {id}.");

        product.Balance -= qty;
        _ctx.SaveChanges();

        return Ok(new { message = $"Produto {id} reservado com sucesso." });
    }

    //remoção de produtos
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _ctx.Products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            return NotFound($"Produto {id} nao encontrado.");

        _ctx.Remove(product);
        _ctx.SaveChanges();
        return NoContent();
    }


}