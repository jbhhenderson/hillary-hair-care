using HillaryHairCare.Models;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;


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
    return db.Customers.OrderBy(c => c.Id).ToList();
});

app.MapPost("/api/customers/add", (HillaryHairCareDbContext db, Customer newCustomer) => 
{
    db.Customers.Add(newCustomer);
    db.SaveChanges();
    return Results.Created($"/api/customers/{newCustomer.Id}", newCustomer);
});

app.MapGet("/api/stylists", (HillaryHairCareDbContext db) => 
{
    return db.Stylists.OrderBy(s => s.Id).ToList();
});

app.MapPost("/api/stylists/add", (HillaryHairCareDbContext db, Stylist newStylist) => 
{
    db.Stylists.Add(newStylist);
    db.SaveChanges();
    return Results.Created($"/api/customers/{newStylist.Id}", newStylist);
});

app.MapPut("/api/stylists/change-employment-status/{stylistId}", (HillaryHairCareDbContext db, int stylistId) =>
{
    Stylist foundStylist =  db.Stylists.SingleOrDefault(s => s.Id == stylistId);
    foundStylist.IsEmployee = !foundStylist.IsEmployee;
    db.SaveChanges();
    return Results.NoContent();
});

app.MapGet("/api/appointments", (HillaryHairCareDbContext db) => 
{
    return db.Appointments
    .Include(a => a.Customer)
    .Include(a => a.Stylist)
    .Include(a => a.Services)
    .OrderBy(a => a.Time)
    .ToList();
}); 

app.Run();

