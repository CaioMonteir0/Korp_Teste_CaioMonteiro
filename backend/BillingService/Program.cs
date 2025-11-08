using BillingService.Data;
using BillingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Banco de dados SQLite
builder.Services.AddDbContext<BillingContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// HttpClient configurado com URL do InventoryService
var inventoryBaseUrl = builder.Configuration.GetSection("InventoryService")["BaseUrl"];
builder.Services.AddHttpClient<InventoryClient>(client =>
{
    client.BaseAddress = new Uri(inventoryBaseUrl ?? "http://localhost:5100");
});

// CORS para Angular
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAngular", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<BillingContext>();
    ctx.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.MapControllers();
app.Run();
