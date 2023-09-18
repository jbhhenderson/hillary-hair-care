using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models;

public class Appointment 
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public int CustomerId { get; set; }
    public DateTime Time { get; set; }
    public Stylist Stylist { get; set; }
    public Customer Customer { get; set; }
    public List<Service> Services { get; set; }
    public decimal? TotalPrice {
        get {
            decimal? totalPrice = 0M;
            foreach(Service service in Services)
            {
                totalPrice += service.Price;
            };
            return totalPrice;
        }
    }
}