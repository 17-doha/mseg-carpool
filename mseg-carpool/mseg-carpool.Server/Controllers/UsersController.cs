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
                return NotFound(); // Return 404 if user is not found
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
        public IActionResult CreateUser(Users user)
        {
            var createdUser = _context.User.Add(user).Entity;
            _context.SaveChanges();

            return Ok();//CreatedAtAction(nameof(GetUserById), new { Id = createdUser.Id }, createdUser);
        }

        
        // update user in DB
        [HttpPut("{azureId}")]
        public IActionResult UpdateUser(string azureId, Users updatedUser)
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

        [HttpGet("points/{azureId}")]
        public IActionResult GetUserPoints(string azureId)
        {
            // Fetch the user by azureId
            var user = _context.User
                               .Where(u => u.Id == azureId)
                               .Select(u => new { u.Id, u.Points })
                               .FirstOrDefault();

            if (user == null)
            {
                return NotFound(); // Return 404 if user is not found
            }

            return Ok(user); // Return the user object containing points
        }
    }
}