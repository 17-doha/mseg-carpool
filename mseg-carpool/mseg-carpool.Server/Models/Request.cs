using System.ComponentModel.DataAnnotations;

namespace mseg_carpool.Server.Models
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        public string status { get; set; }

        public int? Passenger { get; set; }
        public User User { get; set; }

        public int? Ride { get; set; }
        public Ride ride { get; set; }

    }
}
