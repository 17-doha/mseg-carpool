using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using mseg_carpool.Server.Models;
using Microsoft.AspNetCore.Cors;


namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")] // Apply CORS policy to this controller
    // Uncomment when authentication is implemented in frontend
    // [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;

        public UsersController(ApplicationDBcontext context)
        {
            _context = context;
        }


        [HttpGet("{azureId}")]
        public IActionResult GetUserById(string Id)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == Id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("check_profile")]
        public IActionResult CheckProfile([FromQuery] string Id)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == Id);

            if (user == null || string.IsNullOrEmpty(user.MobileNumber) || string.IsNullOrEmpty(user.Location))
            {
                return Ok(false);
            }

            return Ok(true);
        }


        // create user in DB
        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            var createdUser = _context.User.Add(user).Entity;
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { Id = createdUser.Id }, createdUser);
        }

        
        // update user in DB
        [HttpPut("{azureId}")]
        public IActionResult UpdateUser(string azureId, User updatedUser)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            _context.Update(updatedUser);

            return NoContent();
        }

        // delete user from DB
        [HttpDelete("{azureId}")]
        public IActionResult DeleteUser(string azureId)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == azureId);  

            if (user == null)
            {
                return NotFound();
            }

            _context.Remove(user);

            return NoContent();
        }
    }
}