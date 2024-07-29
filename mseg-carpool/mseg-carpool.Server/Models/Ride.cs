using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace mseg_carpool.Server.Models
{


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
        public Users Users { get; set; }
        [JsonIgnore]
        public ICollection<Request> Requests { get; set; }
    }
}