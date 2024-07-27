using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using mseg_carpool.Server.Models;
using System.Collections.Generic;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidesController : ControllerBase
    {
        private readonly ApplicationDBcontext dbcontext;
        public class RideDto
        {
            public string Origin { get; set; }
            public string Destination { get; set; }
            public int AvailableSeats { get; set; }
            public DateTime DepartureTime { get; set; }
        }
        public class RequestDto
        {
            public string status { get; set; }
           
        }

        public RidesController(ApplicationDBcontext dbcontext)
        {
            this.dbcontext=dbcontext;
        }
        [HttpGet("byDriver/{id}")]
        public IActionResult GetRideByAzureId(string id, [FromQuery] DateTime currentTime)
        {
            var rides = dbcontext.Ride
                                 .Include(r => r.Users) // Include the User table
                                 .Include(r => r.Requests) // Include the Requests table
                                 .Where(r => r.UsersId == id && r.DepartureTime >= currentTime)
                                 .Select(r => new
                                 {
                                     r.Id,
                                     r.Origin,
                                     r.Destination,
                                     r.DepartureTime,
                                     Coordinates = r.Coordinates,
                                     DriverName = r.Users.Name, // Assuming the User entity has a Name property
                                     ConfirmedRequestsCount = r.Requests.Count(req => req.status == "Approved"),
                                     MainSeats = r.AvailableSeats + r.Requests.Count(req => req.status == "Approved"),
                                     AvailableSeats = r.AvailableSeats - r.Requests.Count(req => req.status == "Approved"),
                                     Requests = r.Requests
                                                 .Where(req => req.status == "Approved")
                                                 .Select(req => new
                                                 {
                                                     req.pickupPoints // Assuming PickupPoints is a single string property
                                                 }).ToList()
                                 })
                                 .ToList();

            if (rides == null || !rides.Any())
            {
                return NotFound();
            }

            // Process coordinates and pickup points splitting in memory
            var processedRides = rides.Select(r => new
            {
                r.Id,
                r.Origin,
                r.Destination,
                r.DepartureTime,
                CoordinatesLong = r.Coordinates != null ? r.Coordinates.Split(',')[0] : null,
                CoordinatesLat = r.Coordinates != null ? r.Coordinates.Split(',')[1] : null,
                r.DriverName,
                r.ConfirmedRequestsCount,
                r.MainSeats,
                r.AvailableSeats,
                PickupPoints = r.Requests
                               .Select(req => req.pickupPoints)
                               .Where(pp => !string.IsNullOrEmpty(pp))
                               .Select(pp =>
                               {
                                   var parts = pp.Split(',');
                                   return new
                                   {
                                       PickupPointLong = parts.Length > 1 ? parts[1] : null, // Extract longitude
                                       PickupPointLat = parts.Length > 0 ? parts[0] : null  // Extract latitude
                                   };
                               })
                               .ToList()
            }).ToList();

            return Ok(processedRides);
        }



        //get the rides that i have requested and their request status is Pending or Approved and get also the info of the driver
        [HttpGet("{id}")]
        public IActionResult GetRidesByUserId(string id)
        {
            var rides = dbcontext.Ride
                .Include(r => r.Users)
                .Include(r => r.Requests)
                .ThenInclude(req => req.Users)
                .Where(r => r.Requests.Any(req => req.UsersId == id && (req.status == "Pending" || req.status == "Approved")))
                .ToList() // Fetch the data from the database first
                .Select(r => new
                {
                    r.Id,
                    r.Origin,
                    r.Destination,
                    r.DepartureTime,
                    CoordinatesLong = r.Coordinates != null ? r.Coordinates.Split(',')[0] : null,
                    CoordinatesLat = r.Coordinates != null ? r.Coordinates.Split(',')[1] : null,
                    User = new
                    {
                        r.Users.Name,
                        r.Users.Email,
                        r.Users.MobileNumber,
                        r.Users.Location,
                        r.Users.CarType,
                        r.Users.CarPlate,
                        r.Users.CarColor
                    },
                    Requests = r.Requests
                        .Where(req => req.UsersId == id && (req.status == "Pending" || req.status == "Approved"))
                        .Select(req => new
                        {
                            req.Id,
                            req.status,
                            req.UsersId,
                            PickupPoints = r.Requests
                               .Select(req => req.pickupPoints)
                               .Where(pp => !string.IsNullOrEmpty(pp))
                               .Select(pp =>
                               {
                                   var parts = pp.Split(',');
                                   return new
                                   {
                                       PickupPointLong = parts.Length > 1 ? parts[1] : null, // Extract longitude
                                       PickupPointLat = parts.Length > 0 ? parts[0] : null  // Extract latitude
                                   };
                               })
                               .ToList()
                            
                        })
                        .ToList(),
                    ApprovedRequestsCount = r.Requests.Count(req => req.status == "Approved"),
                    MainSeats = r.AvailableSeats + r.Requests.Count(req => req.status == "Approved"),
                    AvailableSeats = r.AvailableSeats - r.Requests.Count(req => req.status == "Approved")
                })
                .ToList();


            return Ok(rides);
        }



        [HttpPut("{id}")]
       
        public IActionResult UpdateRide(string id, RideDto updatedRide)
        {
            // Fetch the existing ride by its Id
            var ride = dbcontext.Ride
                                .Include(r => r.Users)
                                .Include(r => r.Requests)
                                .FirstOrDefault(r => r.UsersId == id);

            if (ride == null)
            {
                return NotFound();
            }

            // Update the properties of the existing ride with the values from updatedRide
            ride.Origin = updatedRide.Origin ?? ride.Origin;
            ride.Destination = updatedRide.Destination ?? ride.Destination;
            ride.AvailableSeats = updatedRide.AvailableSeats != 0 ? updatedRide.AvailableSeats : ride.AvailableSeats;
            ride.DepartureTime = updatedRide.DepartureTime != default ? updatedRide.DepartureTime : ride.DepartureTime;


            // Save the changes to the database
            dbcontext.SaveChanges();

            return Ok(ride);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRidet(int id)
        {
            var ride = dbcontext.Ride
                                .Include(r => r.Users)
                                .Include(r => r.Requests)
                                .FirstOrDefault(r => r.Id == id);

            if (ride == null)
            {
                return NotFound();
            }

            dbcontext.Ride.Remove(ride);
            dbcontext.SaveChanges();

            return NoContent(); // 204 No Content
        }
        //Get Rides all rides
        [HttpGet]
        public ActionResult<IEnumerable<Ride>> GetRides([FromQuery] DateTime currentTime)
        {
            // Define the GMT+3 time zone
            TimeZoneInfo gmtPlus3 = TimeZoneInfo.CreateCustomTimeZone("GMT+3", TimeSpan.FromHours(3), "GMT+3", "GMT+3");
            DateTime gmtPlus3Time = TimeZoneInfo.ConvertTimeFromUtc(currentTime, gmtPlus3);

            var rides = dbcontext.Ride
                                  .Include(r => r.Users)
                                  .Include(r => r.Requests)
                                  .ToList();

            foreach (var ride in rides)
            {
                if (ride.DepartureTime < gmtPlus3Time)
                {
                    // Update driver points
                    var driver = ride.Users;
                    if (driver != null)
                    {
                        driver.Points += 40;
                    }

                    // Update requesters points and set request status to "Completed"
                    foreach (var request in ride.Requests)
                    {
                        var requester = request.Users;
                        if (requester != null)
                        {
                            requester.Points += 10;
                        }

                        // Update the request status to "Completed"
                        request.status = "Completed";
                    }
                }
            }

            // Save changes to the database
            dbcontext.SaveChanges();

            return Ok(rides);
        }

        [HttpDelete("cancel-request/{rideId}/{azureId}")]
        public IActionResult CancelRequest(int rideId, string azureId)
        {
            // Find the request by linking the ride table with the request table
            var request = dbcontext.Request
                                   .FirstOrDefault(r => r.RideId == rideId && r.UsersId == azureId);

            // Check if the request exists
            if (request == null)
            {
                return NotFound();
            }

            // Remove the request from the Requests table
            dbcontext.Request.Remove(request);
            dbcontext.SaveChanges();

            return NoContent(); // 204 No Content
        }


        // Create a new ride
        [HttpPost]
        public ActionResult<Ride> CreateRide(Ride ride)
        {
            return Ok(null);
        }








    }
}