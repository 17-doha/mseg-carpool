using mseg_carpool.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Ride
{
    [Key]
    public int Id { get; set; }
    public string Origin { get; set; }
    public string Destination { get; set; }
    public int AvailableSeats { get; set; }
    public DateTime DepartureTime { get; set; }
    public string Coordinates { get; set; }
    public string? UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
    [JsonIgnore]
    public ICollection<Request> Requests { get; set; }
}