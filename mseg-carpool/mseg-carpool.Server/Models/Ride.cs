using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int? Driver { get; set; }
        public User User { get; set; }
    }
}