using Microsoft.AspNetCore.Mvc;
using mseg_carpool.Server.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace mseg_carpool.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;

        public RequestsController(ApplicationDBcontext context)
        {
            _context = context;
        }

        public class RequestCreateDto
        {
            public string UserId { get; set; }
            public int RideId { get; set; }
            public string status { get; set; }
            public string coordinates { get; set; }
        }


        // POST api/<RequestsController>
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(RequestCreateDto requestDto)
        {
            var user = await _context.User.FindAsync(requestDto.UserId);
            var ride = await _context.Ride.FindAsync(requestDto.RideId);

            if (user == null || ride == null)
            {
                return NotFound("User or Ride not found.");
            }

            var request = new Request
            {
                UserId = requestDto.UserId,
                RideId = requestDto.RideId,
                status = requestDto.status,
                coordinates = requestDto.coordinates
            };

            _context.Request.Add(request);
            await _context.SaveChangesAsync();

            return Ok();

            //return CreatedAtAction(nameof(Get), new { id = request.Id }, request); // implement get
        }

        // GET: api/<RequestsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _context.Request.ToListAsync();
        }

    }
}
