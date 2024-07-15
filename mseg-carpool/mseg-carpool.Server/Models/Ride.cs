namespace mseg_carpool.Server.Models
{
    public class Ride
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public int AvailableSeats { get; set; }
        public DateTime DateTime { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }


        
    }
}
