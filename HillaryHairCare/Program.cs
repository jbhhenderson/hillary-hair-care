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

app.MapDelete("/api/customers/remove/{customerId}", (HillaryHairCareDbContext db, int customerId) =>
{
    Customer foundCustomer = db.Customers.SingleOrDefault(c => c.Id == customerId);
    db.Customers.Remove(foundCustomer);
    db.SaveChanges();
    return Results.NoContent();
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

app.MapGet("/api/appointments/{appointmentId}", (HillaryHairCareDbContext db, int appointmentId) => 
{
     return db.Appointments
    .Include(a => a.Customer)
    .Include(a => a.Stylist)
    .Include(a => a.Services)
    .SingleOrDefault(a => a.Id == appointmentId);
}); 

app.MapPut("/api/appointments/update/{appointmentId}", (HillaryHairCareDbContext db, Appointment newAppointment, int appointmentId) => 
{
    Appointment foundAppointment = db.Appointments.Include(a => a.Services).SingleOrDefault(a => a.Id == appointmentId);

    List<int> serviceIds = newAppointment.Services.Select(s => s.Id).ToList();

    List<Service> foundServices = db.Services.Where(s => serviceIds.Contains(s.Id)).ToList();

    foundAppointment.Services.Clear();

    foundAppointment.Services = foundServices;

    foundAppointment.Time = newAppointment.Time;

    foundAppointment.StylistId = newAppointment.StylistId;

    db.SaveChanges();

    return Results.NoContent();

});

app.MapGet("/api/services", (HillaryHairCareDbContext db) => 
{
    return db.Services.OrderBy(s => s.Id).ToList();
});

app.Run();

