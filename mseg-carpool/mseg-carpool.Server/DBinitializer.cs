using mseg_carpool.Server.Models; // Adjust this using directive to where your models are located
using Microsoft.EntityFrameworkCore;

namespace mseg_carpool.Server
{
    public class DBinitializer
    {
        public static void Initialize(ApplicationDBcontext context)
        {
            // Ensures the database is created
            context.Database.EnsureCreated();

            // Check if the database has been seeded
            if (!context.User.Any())
            {
                var users = new User[]
                {
                   new User
                {
                    Id = "1",
                    AzureId = "azure-id-1",
                    Name = "John Doe",
                    Email = "johndoe@example.com",
                    MobileNumber = "1234567890",
                    Location = "City A",
                    CarType = "Sedan",
                    CarPlate = "ABC123",
                    CarColor = "Blue",
                    Points = 100
                },
                new User
                {
                    Id = "2",
                    AzureId = "azure-id-2",
                    Name = "Jane Smith",
                    Email = "janesmith@example.com",
                    MobileNumber = "0987654321",
                    Location = "City B",
                    CarType = "SUV",
                    CarPlate = "XYZ789",
                    CarColor = "Red",
                    Points = 150
                }
                // Add more users as needed
            };


                foreach (User u in users)
                {
                    context.User.Add(u);
                }
                context.SaveChanges();
            }          

            if (!context.Ride.Any())
            {
                var jane = context.User.FirstOrDefault(u => u.Name == "Jane Smith");
                var john = context.User.FirstOrDefault(u => u.Name == "John Doe");

                var rides = new Ride[]
                {
                new Ride{Origin = "Zamalek", Destination = "Location B", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(1), UserId = jane.Id},
                new Ride{Origin = "Location B", Destination = "Zamalek", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(2), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location C", AvailableSeats = 4, DepartureTime = DateTime.Now.AddDays(3), UserId = jane.Id},
                new Ride{Origin = "Location C", Destination = "5th Settlement", AvailableSeats = 1, DepartureTime = DateTime.Now.AddDays(4), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location E", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(5), UserId = john.Id},
                new Ride{Origin = "Location E", Destination = "5th Settlement", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(6), UserId = john.Id},
                new Ride{Origin = "Smart Village", Destination = "Location G", AvailableSeats = 4, DepartureTime = DateTime.Now.AddDays(7), UserId = jane.Id},
                new Ride{Origin = "Location G", Destination = "5th Settlement", AvailableSeats = 1, DepartureTime = DateTime.Now.AddDays(8), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location H", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(9), UserId = john.Id},
                new Ride{Origin = "Location H", Destination = "5th Settlement", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(10), UserId = john.Id},
                new Ride{Origin = "Smart Village", Destination = "Location I", AvailableSeats = 4, DepartureTime = DateTime.Now.AddDays(11), UserId = jane.Id},
                new Ride{Origin = "Location I", Destination = "5th Settlement", AvailableSeats = 1, DepartureTime = DateTime.Now.AddDays(12), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location J", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(13), UserId = john.Id},
                new Ride{Origin = "Location J", Destination = "5th Settlement", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(14), UserId = john.Id},
                new Ride{Origin = "Smart Village", Destination = "Location K", AvailableSeats = 4, DepartureTime = DateTime.Now.AddDays(15), UserId = jane.Id},
                new Ride{Origin = "Location K", Destination = "5th Settlement", AvailableSeats = 1, DepartureTime = DateTime.Now.AddDays(16), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location L", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(17), UserId = john.Id},
                new Ride{Origin = "Location L", Destination = "5th Settlement", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(18), UserId = john.Id},
                new Ride{Origin = "Smart Village", Destination = "Location M", AvailableSeats = 4, DepartureTime = DateTime.Now.AddDays(19), UserId = jane.Id},
                new Ride{Origin = "Location M", Destination = "5th Settlement", AvailableSeats = 1, DepartureTime = DateTime.Now.AddDays(20), UserId = jane.Id},
                new Ride{Origin = "Smart Village", Destination = "Location N", AvailableSeats = 3, DepartureTime = DateTime.Now.AddDays(21), UserId = john.Id},
                new Ride{Origin = "Location N", Destination = "5th Settlement", AvailableSeats = 2, DepartureTime = DateTime.Now.AddDays(22), UserId = john.Id}


                    };

                foreach (Ride r in rides)
                {
                    context.Ride.Add(r);
                }
                context.SaveChanges();
            }

            if (!context.Request.Any())
            {
                var jane = context.User.FirstOrDefault(u => u.Name == "Jane Smith");
                // Assuming you know the ID of the ride Jane wants to request
                // For demonstration, let's say it's the first ride created by John Doe
                var johnsRideId = context.Ride.Where(r => r.User.Name == "John Doe").Select(r => r.Id).FirstOrDefault();

                if (jane != null && johnsRideId != default)
                {
                    var request = new Request
                    {
                        status = "Pending",
                        UserId = jane.Id, // Assuming Request has a PassengerId to link to the User
                        RideId = johnsRideId, // Directly using the Ride's ID
                                              // Populate other necessary properties
                    };
                    
                    context.Request.Add(request);
                    
                    context.SaveChanges();
                }
            }
        }
    }
}
