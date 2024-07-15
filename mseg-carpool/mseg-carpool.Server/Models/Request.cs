namespace mseg_carpool.Server.Models
{
    public class Request
    {
        public int Id { get; set; }
        public string status { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public int? RideId { get; set; }
        public Ride Ride { get; set; }

    }
}
