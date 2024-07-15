namespace mseg_carpool.Server.Models
{
    public class User
    {

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string DefaultLocation { get; set; }
        public string CarType { get; set; }
        public string CarPlate { get; set; }
        public string CarColor { get; set; }

        public int Points { get; set; }
    }
}
