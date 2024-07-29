using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidesController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;

        public RidesController(ApplicationDBcontext context)
        {
            _context = context;
        }

        // Get Rides
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ride>>> GetRides()
        {
            var rides = await _context.Ride.ToListAsync();
            return Ok(rides);
        }

        // Create a new ride
        [HttpPost]
        public async Task<ActionResult<Ride>> CreateRide(Ride ride)
        {
            _context.Ride.Add(ride);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRideById), new { id = ride.Id }, ride);
        }

        // Get a ride by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Ride>> GetRideById(int id)
        {
            var ride = await _context.Ride.FindAsync(id);

            if (ride == null)
            {
                return NotFound();
            }

            return Ok(ride);
        }

        // Update a specific ride by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRide(int id, Ride updatedRide)
        {
            if (id != updatedRide.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedRide).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Ride.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Delete a Ride by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(int id)
        {
            var ride = await _context.Ride.FindAsync(id);
            if (ride == null)
            {
                return NotFound();
            }

            _context.Ride.Remove(ride);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Get requests for rides where the user is the driver
        [HttpGet("requests/{driverAzureId}")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestsForRidesByDriver(string driverAzureId)
        {
            var requests = await _context.Request
                .Include(r => r.ride)  // Use lowercase 'ride' to match the property name
                .Include(r => r.Users)
                .Where(r => r.ride.UsersId == driverAzureId)  // Use lowercase 'ride' to match the property name
                .ToListAsync();

            return Ok(requests);
        }

        // Accept a request by ID
        [HttpPut("requests/{id}/accept")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var request = await _context.Request
                .Include(r => r.ride)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
            {
                return NotFound();
            }

            if (request.ride.AvailableSeats <= 0)
            {
                return BadRequest("No available seats");
            }

            request.Status = "Approved";
            request.ride.AvailableSeats--;

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
    }
}
