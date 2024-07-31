using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace mseg_carpool.Server.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string Location { get; set; }
        public string? CarModel { get; set; }
        public string? CarType { get; set; }
        public string? CarPlate { get; set; }
        public string? CarColor { get; set; }
        public int Points { get; set; }


    }

}