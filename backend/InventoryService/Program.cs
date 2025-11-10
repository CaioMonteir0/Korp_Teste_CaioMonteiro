using InventoryService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- Banco de dados ---
builder.Services.AddDbContext<InventoryContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=inventory.db"));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAngular", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<InventoryContext>();
    ctx.Database.EnsureCreated();

    if (!ctx.Products.Any())
    {
        ctx.Products.AddRange(
            new InventoryService.Models.Product { Code = "P001", Description = "Caneta", Balance = 50 },
            new InventoryService.Models.Product { Code = "P002", Description = "Lápis", Balance = 100 }
        );
        ctx.SaveChanges();
    }
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.MapControllers();
app.Run();
