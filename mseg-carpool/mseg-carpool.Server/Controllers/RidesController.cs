using Microsoft.AspNetCore.Mvc;
using mseg_carpool.Server.Models;
using System.Collections.Generic;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidesController : ControllerBase
    {
        private readonly List<Ride> _rides;

        public RidesController()
        {
        }

        // Get Rides
        [HttpGet]
        public ActionResult<IEnumerable<Ride>> GetRides()
        {
            return Ok(null);
        }

        // Create a new ride
        [HttpPost]
        public ActionResult<Ride> CreateRide(Ride ride)
        {
            return Ok(null);
        }

        // Return Ok(null);
        [HttpGet("{id}")]
        public ActionResult<Ride> GetRideById(int id)
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