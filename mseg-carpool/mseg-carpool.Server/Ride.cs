namespace mseg_carpool.Server
{
    public enum RideStatus
    {
        Pending,
        Active,
        Completed,
        Cancelled
    }

    public class Ride
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public int AvailableSeats { get; set; }
        public Driver RideDriver { get; set; }
        public List<User> Riders { get; set; }
        public DateTime DepartureTime { get; set; }
        public RideStatus Status { get; set; }
    }
}