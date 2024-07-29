using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidesController : ControllerBase
    {
        private readonly ApplicationDBcontext dbcontext;
        private readonly ILogger<RidesController> logger;

        public RidesController(ApplicationDBcontext dbcontext, ILogger<RidesController> logger)
        {
            this.dbcontext = dbcontext;
            this.logger = logger;
        }

        // Get Rides
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RideDto>>> GetRides()
        {
            try
            {
                var rides = await dbcontext.Ride.Select(r => new RideDto
                {
                    Id = r.Id,
                    Origin = r.Origin,
                    Destination = r.Destination,
                    AvailableSeats = r.AvailableSeats,
                    DepartureTime = r.DepartureTime,
                    Coordinates = r.Coordinates,
                    UserId = r.UserId
                }).ToListAsync();

                return Ok(rides);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while getting rides.");
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

                dbcontext.Ride.Add(ride);
                await dbcontext.SaveChangesAsync();

                rideDto.Id = ride.Id;

                return CreatedAtAction(nameof(GetRideById), new { id = rideDto.Id }, rideDto);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating a ride.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        // Get a specific ride by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<RideDto>> GetRideById(int id)
        {
            try
            {
                var ride = await dbcontext.Ride.FindAsync(id);

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

        // Update a specific ride by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRide(int id, RideDto updatedRideDto)
        {
            try
            {
                var ride = await dbcontext.Ride.FindAsync(id);

                if (ride == null)
                {
                    return NotFound();
                }

                ride.Origin = updatedRideDto.Origin;
                ride.Destination = updatedRideDto.Destination;
                ride.AvailableSeats = updatedRideDto.AvailableSeats;
                ride.DepartureTime = updatedRideDto.DepartureTime;
                ride.Coordinates = updatedRideDto.Coordinates;
                ride.UserId = updatedRideDto.UserId;

                await dbcontext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while updating the ride with ID {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        // Delete a ride by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(int id)
        {
            try
            {
                var ride = await dbcontext.Ride.FindAsync(id);

                if (ride == null)
                {
                    return NotFound();
                }

                dbcontext.Ride.Remove(ride);
                await dbcontext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"An error occurred while deleting the ride with ID {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("search")]
        public ActionResult<IEnumerable<RideDto>> SearchRides(Users riderInfo)
        {
            // Implement search logic here, currently returning empty list
            return Ok(new List<RideDto>());
        }

        [HttpPost("{id}/join")]
        public IActionResult JoinRide(int id, Users rider)
        {
            // Implement join logic here, currently returning Ok
            return Ok();
        }

        [HttpPost("{id}/leave")]
        public IActionResult LeaveRide(int id, Users rider)
        {
            // Implement leave logic here, currently returning Ok
            return Ok();
        }
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
