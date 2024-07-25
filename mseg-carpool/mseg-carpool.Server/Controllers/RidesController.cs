using Microsoft.AspNetCore.Mvc;
using mseg_carpool.Server.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")] // Apply CORS policy to this controller
    public class RidesController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;

        public RidesController(ApplicationDBcontext context)
        {
            _context = context;
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

            var query = _context.Ride
                                .Where(r => r.UserId != userId && r.DepartureTime > DateTime.Now && r.AvailableSeats >= minimumSeatsAvailable)
                                .AsQueryable();

            // Apply filters if parameters are provided
            if (!string.IsNullOrEmpty(origin))
            {
                query = query.Where(r => r.Origin == origin);
            }
            if (!string.IsNullOrEmpty(destination))
            {
                query = query.Where(r => r.Destination == destination);
            }
            if (!string.IsNullOrEmpty(filterDate) && DateTime.TryParse(filterDate, out DateTime parsedDate))
            {
                query = query.Where(r => r.DepartureTime.Date == parsedDate.Date);
            }
            if (!string.IsNullOrEmpty(filterTime) && TimeSpan.TryParse(filterTime, out TimeSpan parsedTime))
            {
                // Create a time range to avoid milliseconds comparison
                var startTime = parsedTime;
                var endTime = parsedTime.Add(TimeSpan.FromMinutes(1));

                query = query.Where(r => r.DepartureTime.TimeOfDay >= startTime && r.DepartureTime.TimeOfDay < endTime);
            }

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

            return Ok(rides);
        }


        // Create a new ride
        [HttpPost]
        public ActionResult<Ride> CreateRide(Ride ride)
        {
            return Ok(null);
        }

        // Update a specific ride by ID
        [HttpPut("{id}")]
        public IActionResult UpdateRide(int id, Ride updatedRide)
        {
            return Ok(null);
        }

        // Delete a Ride by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteRide(int id)
        {
            return Ok(null);
        }

        [HttpPost("search")]
        public ActionResult<IEnumerable<Ride>> SearchRides(User riderInfo)
        {
            // implement search logic
            return Ok(null);
        }

        [HttpPost("{id}/join")]
        public IActionResult JoinRide(int id, User rider)
        {
            // implement join logic
            return Ok(null);
        }

        [HttpPost("{id}/leave")]
        public IActionResult LeaveRide(int id, User rider)
        {
            // implement leave logic
            return Ok(null);
        }

    }
}