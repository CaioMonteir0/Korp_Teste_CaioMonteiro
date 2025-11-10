var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BillingService.Data.BillingContext>(opt =>
    opt.UseSqlite("Data Source=billing.db"));


builder.Services.AddHttpClient<BillingService.Services.InventoryClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("InventoryBaseUrl") ?? "http://localhost:5100");
});

builder.Services.AddCors(opt => {
    opt.AddPolicy("AllowAngular", p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
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
app.UseCors("AllowAngular");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
