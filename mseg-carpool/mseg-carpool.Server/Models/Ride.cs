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
        public string coordinates { get; set; } // 'originlat,originlng,destlat,destlng'
        public int AvailableSeats { get; set; }

        public DateTime DepartureTime { get; set; }

        public string? UserId { get; set; }
        public User User { get; set; }
    }
}