using System.ComponentModel.DataAnnotations;

namespace mseg_carpool.Server.Models
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; }
        public string PickupPoints { get; set; }
        public string? UsersId { get; set; }
        public Users Users { get; set; }

        public int? RideId { get; set; }
        public Ride ride { get; set; }  // Ensure this property is correctly named with lowercase 'r'
    }
}
