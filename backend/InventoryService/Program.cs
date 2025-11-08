var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BillingService.Data.BillingContext>(opt =>
    opt.UseSqlite("Data Source=billing.db"));

// Configure InventoryClient: assume InventoryService runs on http://inventory:5001 or http://localhost:5001
builder.Services.AddHttpClient<BillingService.Services.InventoryClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("InventoryBaseUrl") ?? "http://localhost:5100");
});

var app = builder.Build();

using(var scope = app.Services.CreateScope()){
    var ctx = scope.ServiceProvider.GetRequiredService<BillingService.Data.BillingContext>();
    ctx.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
