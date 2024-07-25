using System.ComponentModel.DataAnnotations;

namespace mseg_carpool.Server.Models
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        public string status { get; set; }
        public string coordinates { get; set; }

        public string? UserId { get; set; }
        public User User { get; set; }

        public int? RideId { get; set; }
        public Ride Ride { get; set; }

    }
}