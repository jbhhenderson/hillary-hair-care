using HillaryHairCare.Models;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Http.Json;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddNpgsql<HillaryHairCareDbContext>(builder.Configuration["HillaryHairCareDbConnectionString"]);

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/customers", (HillaryHairCareDbContext db) => 
{
    return db.Customers.ToList();
});

app.MapGet("/api/stylists", (HillaryHairCareDbContext db) => 
{
    return db.Stylists.ToList();
});

app.MapPost("/api/customers/add", (HillaryHairCareDbContext db, Customer newCustomer) => 
{
    db.Customers.Add(newCustomer);
    db.SaveChanges();
    return Results.Created($"/api/customers/{newCustomer.Id}", newCustomer);
});

app.Run();

