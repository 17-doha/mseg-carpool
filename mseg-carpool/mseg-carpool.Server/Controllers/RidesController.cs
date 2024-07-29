using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;

using Microsoft.AspNetCore.Cors;

using System.ComponentModel.DataAnnotations;


namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")] // Apply CORS policy to this controller
    public class RidesController : ControllerBase
    {

        private readonly ILogger<RidesController> logger;

        private readonly ApplicationDBcontext _context;
        public class RideDTo
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


        public RidesController(ApplicationDBcontext context, ILogger<RidesController> logger)
        {

            _context = context;
            this.logger = logger;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<object>>> GetRides(
            [FromQuery] string userId,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string? origin = null,
            [FromQuery] string? destination = null,
            [FromQuery] string? filterDate = null, // Format: yyyy-MM-dd
            [FromQuery] string? filterTime = null, // Format: HH:mm
            [FromQuery] int? minimumSeatsAvailable = 1)
        {
            int skip = (pageNumber - 1) * pageSize;

            var query = _context.Ride.AsQueryable();

            // Initial count
            var initialCount = await query.CountAsync();
            Console.WriteLine($"Initial total rides: {initialCount}");

            // Filter by userId
            query = query.Where(r => r.UserId != userId);
            var afterUserIdFilterCount = await query.CountAsync();
            Console.WriteLine($"Rides after userId filter: {afterUserIdFilterCount}");

            // Filter by DepartureTimeq //TODO ENABLE THIS FILTER
            //query = query.Where(r => r.DepartureTime > DateTime.Now);
            var afterDepartureTimeFilterCount = await query.CountAsync();
            Console.WriteLine($"Rides after DepartureTime filter: {afterDepartureTimeFilterCount}");

            // Filter by AvailableSeats
            query = query.Where(r => r.AvailableSeats >= minimumSeatsAvailable);
            var afterSeatsFilterCount = await query.CountAsync();
            Console.WriteLine($"Rides after AvailableSeats filter: {afterSeatsFilterCount}");

            // Apply additional filters if parameters are provided
            if (!string.IsNullOrEmpty(origin))
            {
                query = query.Where(r => r.Origin == origin);
                var afterOriginFilterCount = await query.CountAsync();
                Console.WriteLine($"Rides after origin filter: {afterOriginFilterCount}");
            }
            if (!string.IsNullOrEmpty(destination))
            {
                query = query.Where(r => r.Destination == destination);
                var afterDestinationFilterCount = await query.CountAsync();
                Console.WriteLine($"Rides after destination filter: {afterDestinationFilterCount}");
            }
            if (!string.IsNullOrEmpty(filterDate) && DateTime.TryParse(filterDate, out DateTime parsedDate))
            {
                query = query.Where(r => r.DepartureTime.Date == parsedDate.Date);
                var afterDateFilterCount = await query.CountAsync();
                Console.WriteLine($"Rides after date filter: {afterDateFilterCount}");
            }
            if (!string.IsNullOrEmpty(filterTime) && TimeSpan.TryParse(filterTime, out TimeSpan parsedTime))
            {
                // Create a time range to avoid milliseconds comparison
                var startTime = parsedTime;
                var endTime = parsedTime.Add(TimeSpan.FromMinutes(1));

                query = query.Where(r => r.DepartureTime.TimeOfDay >= startTime && r.DepartureTime.TimeOfDay < endTime);
                var afterTimeFilterCount = await query.CountAsync();
                Console.WriteLine($"Rides after time filter: {afterTimeFilterCount}");
            }

            // Log the count of rides before pagination
            var totalRidesBeforePagination = await query.CountAsync();
            Console.WriteLine($"Total rides before pagination: {totalRidesBeforePagination}");

            var rides = await query
                                .OrderBy(r => r.DepartureTime)
                                .Skip(skip)
                                .Take(pageSize)
                                .Select(r => new
                                {
                                    RideID = r.Id,
                                    r.Origin,
                                    r.Destination,
                                    departureDate = r.DepartureTime.Date,
                                    departureTime = r.DepartureTime.Hour,
                                    r.AvailableSeats,
                                    Driver = new
                                    {
                                        DriverID = r.User.Id,
                                        DriverName = r.User.Name,
                                        DriverEmail = r.User.Email,
                                        DriverMobileNo = r.User.MobileNumber,
                                        r.User.CarType,
                                        r.User.CarPlate,
                                        r.User.CarColor,
                                        r.User.Points
                                    }
                                })
                                .ToListAsync();

            // Log the count of rides after pagination
            Console.WriteLine($"Total rides after pagination: {rides.Count}");
            return Ok(rides);
        }


        [HttpGet("byDriver/{id}")]
        public IActionResult GetRideByAzureId(string id, [FromQuery] DateTime currentTime)
        {
            var rides = _context.Ride
                                 .Include(r => r.User) // Include the User table
                                 .Include(r => r.Requests) // Include the Requests table
                                 .Where(r => r.UserId == id && r.DepartureTime >= currentTime)
                                 .Select(r => new
                                 {
                                     r.Id,
                                     r.Origin,
                                     r.Destination,
                                     r.DepartureTime,
                                     Coordinates = r.Coordinates,
                                     DriverName = r.User.Name, // Assuming the User entity has a Name property
                                     AvailableSeats = r.Requests.Count(req => req.status == "Approved"),
                                     MainSeats = r.AvailableSeats + r.Requests.Count(req => req.status == "Approved"),
                                     Requests = r.Requests
                                                 .Where(req => req.status == "Approved")
                                                 .Select(req => new
                                                 {
                                                     req.coordinates // Assuming PickupPoints is a single string property
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
                r.MainSeats,
                r.AvailableSeats,
                PickupPoints = r.Requests
                               .Select(req => req.coordinates)
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
        [HttpGet("byUser/{id}")]
        public IActionResult GetRidesByUserId(string id, [FromQuery] DateTime currentTime)
        {
            var rides = _context.Ride
                .Include(r => r.User)
                .Include(r => r.Requests)
                .ThenInclude(req => req.User)
                .Where(r => r.Requests.Any(req => req.UserId == id && (req.status == "Pending" || req.status == "Approved") && r.DepartureTime >= currentTime))
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
                        r.User.Name,
                        r.User.Email,
                        r.User.MobileNumber,
                        r.User.Location,
                        r.User.CarType,
                        r.User.CarPlate,
                        r.User.CarColor
                    },
                    Requests = r.Requests
                        .Where(req => req.UserId == id && (req.status == "Pending" || req.status == "Approved"))
                        .Select(req => new
                        {
                            req.Id,
                            req.status,
                            req.UserId,
                            PickupPoints = r.Requests
                               .Select(req => req.coordinates)
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
                    AvailableSeats = r.Requests.Count(req => req.status == "Approved"),
                    MainSeats = r.AvailableSeats + r.Requests.Count(req => req.status == "Approved")

                    // BookedSeats = r.Requests.Count(req => req.status == "Approved")
                })
                .ToList();


            return Ok(rides);
        }



        [HttpPut("{id}")]

        public IActionResult UpdateRide(string id, RideDTo updatedRide)
        {
            // Fetch the existing ride by its Id
            var ride = _context.Ride
                                .Include(r => r.User)
                                .Include(r => r.Requests)
                                .FirstOrDefault(r => r.UserId == id);

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
            _context.SaveChanges();

            return Ok(ride);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRidet(int id)
        {
            var ride = _context.Ride
                                .Include(r => r.User)
                                .Include(r => r.Requests)
                                .FirstOrDefault(r => r.Id == id);

            if (ride == null)
            {
                return NotFound();
            }

            _context.Ride.Remove(ride);
            _context.SaveChanges();

            return NoContent(); // 204 No Content
        }

        // Get all rides and update points if departure time is before current time
        [HttpGet("points")]
        public ActionResult<IEnumerable<Ride>> GetRides([FromQuery] DateTime currentTime)
        {
            // Define the GMT+3 time zone
            TimeZoneInfo gmtPlus3 = TimeZoneInfo.CreateCustomTimeZone("GMT+3", TimeSpan.FromHours(3), "GMT+3", "GMT+3");
            DateTime gmtPlus3Time = TimeZoneInfo.ConvertTimeFromUtc(currentTime, gmtPlus3);

            // Fetch the rides with necessary includes
            var rides = _context.Ride
                                .Include(r => r.User)
                                .Include(r => r.Requests)
                                .ThenInclude(req => req.User)
                                .ToList();

            var updatedRides = new List<Ride>();

            foreach (var ride in rides)
            {
                if (ride.DepartureTime < gmtPlus3Time)
                {
                    // Update driver points
                    var driver = ride.User;
                    if (driver != null)
                    {
                        driver.Points += 40;
                        Console.WriteLine($"Driver {driver.Id} points updated to {driver.Points}");
                    }

                    // Update requesters points and set request status to "Completed"
                    foreach (var request in ride.Requests)
                    {
                        var requester = request.User;
                        if (requester != null)
                        {
                            requester.Points += 10;
                            Console.WriteLine($"Requester {requester.Id} points updated to {requester.Points}");
                        }

                        // Update the request status to "Completed"
                        request.status = "Completed";
                        Console.WriteLine($"Request {request.Id} status updated to Completed");
                    }

                    // Add the ride to the list of updated rides
                    updatedRides.Add(ride);
                }
            }

            // Save changes to the database
            try
            {
                var saveResult = _context.SaveChanges();
                Console.WriteLine($"{saveResult} records saved to the database");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving changes: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error saving changes to the database");
            }

            return Ok(updatedRides);
        }


        [HttpDelete("cancel-request/{rideId}/{azureId}")]
        public IActionResult CancelRequest(int rideId, string azureId)
        {
            // Find the request by linking the ride table with the request table
            var request = _context.Request
                                   .FirstOrDefault(r => r.RideId == rideId && r.UserId == azureId);

            // Check if the request exists
            if (request == null)
            {
                return NotFound();
            }

            // Remove the request from the Requests table
            _context.Request.Remove(request);
            _context.SaveChanges();

            return NoContent(); // 204 No Content
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<RideDto>> GetRideById(int id)
        {

            try
            {
                var ride = await _context.Ride.FindAsync(id);

                if (ride == null)
                {
                    return NotFound();
                }

                var rideDto = new RideDto
                {
                    Id = ride.Id,
                    Origin = ride.Origin,
                    Destination = ride.Destination,
                    AvailableSeats = ride.AvailableSeats,
                    DepartureTime = ride.DepartureTime,
                    Coordinates = ride.Coordinates,
                    UserId = ride.UserId
                };

                return Ok(rideDto);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while getting the ride with ID {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        // Create a new ride
        [HttpPost]
        public async Task<ActionResult<RideDto>> CreateRide(RideDto rideDto)
        {
            if (rideDto == null)
            {
                return BadRequest("Ride data is null.");
            }

            try
            {
                var ride = new Ride
                {
                    Origin = rideDto.Origin,
                    Destination = rideDto.Destination,
                    AvailableSeats = rideDto.AvailableSeats,
                    DepartureTime = rideDto.DepartureTime,
                    Coordinates = rideDto.Coordinates,
                    UserId = rideDto.UserId
                };

                _context.Ride.Add(ride);
                await _context.SaveChangesAsync();

                rideDto.Id = ride.Id;

                return CreatedAtAction(nameof(GetRideById), new { id = rideDto.Id }, rideDto);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating a ride.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }





        // Get requests for rides where the user is the driver
        [HttpGet("requests/{driverAzureId}")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestsForRidesByDriver(string driverAzureId)
        {
            var requests = await _context.Request
                .Include(r => r.Ride)  // Use lowercase 'ride' to match the property name
                .Include(r => r.User)
                .Where(r => r.Ride.UserId == driverAzureId)  // Use lowercase 'ride' to match the property name
                .ToListAsync();

            return Ok(requests);
        }

        // Accept a request by ID
        [HttpPut("requests/{id}/accept")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var request = await _context.Request
                .Include(r => r.Ride)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
            {
                return NotFound();
            }

            if (request.Ride.AvailableSeats <= 0)
            {
                return BadRequest("No available seats");
            }

            request.status = "Approved";
            request.Ride.AvailableSeats--;

            await _context.SaveChangesAsync();

            return NoContent();

        }


        // Delete a request by ID
        [HttpDelete("requests/{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.Request.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Request.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class RideDto
        {
            [Key]
            public int Id { get; set; }
            public string Origin { get; set; }
            public string Destination { get; set; }
            public int AvailableSeats { get; set; }
            public DateTime DepartureTime { get; set; }
            public string Coordinates { get; set; }
            public string? UserId { get; set; }

        }
    }
}
