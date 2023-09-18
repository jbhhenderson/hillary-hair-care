using Microsoft.EntityFrameworkCore;
using HillaryHairCare.Models;

public class HillaryHairCareDbContext : DbContext
{

    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }

    public HillaryHairCareDbContext(DbContextOptions<HillaryHairCareDbContext> context) : base(context)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // seed data with stylist types
            modelBuilder.Entity<Stylist>().HasData(new Stylist[]
            {
                new Stylist {Id = 1, Name = "Jackson", IsEmployee = true},
                new Stylist {Id = 2, Name = "Sam", IsEmployee = true},
                new Stylist {Id = 3, Name = "Will", IsEmployee = false},
                new Stylist {Id = 4, Name = "Braxton", IsEmployee = false}
            });
            
            modelBuilder.Entity<Customer>().HasData(new Customer[]
            {
                new Customer {Id = 1, Name = "Mildred"},
                new Customer {Id = 2, Name = "Molly"},
                new Customer {Id = 3, Name = "JoNell"},
                new Customer {Id = 4, Name = "Ali"}
            });
            
            modelBuilder.Entity<Service>().HasData(new Service[]
            {
                new Service {Id = 1, Name = "Haircut", Price = 15M},
                new Service {Id = 2, Name = "Shave", Price = 10M},
                new Service {Id = 3, Name = "Hair Coloring", Price = 20M}
            });
            
            modelBuilder.Entity<Appointment>().HasData(new Appointment[]
            {
                new Appointment {Id = 1, StylistId = 1, CustomerId = 3},
                new Appointment {Id = 2, StylistId = 2, CustomerId = 1}
            });
        }
}