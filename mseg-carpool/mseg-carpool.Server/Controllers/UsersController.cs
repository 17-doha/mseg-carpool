using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;
using System.Threading.Tasks;
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

       
        public UsersController(ApplicationDBcontext _context)
        {
            this._context = _context;
     
        }


        [HttpGet("{azureId}")]
       
        public IActionResult GetUserById(string azureId)
        {
            
            var user = _context.User.FirstOrDefault(u => u.Id == azureId);

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
        // Create user in DB
        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            var createdUser = _context.User.Add(user).Entity;
            _context.SaveChanges();
            return Ok();//CreatedAtAction(nameof(GetUserById), new { Id = createdUser.Id }, createdUser);
        }

        // Update user details in DB
        [HttpPut("User/{azureId}")]
        public async Task<IActionResult> UpdateUserDetails(string azureId, UserUpdateDto updatedUserDto)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            // Update user details
            user.Name = updatedUserDto.Name;
            user.MobileNumber = updatedUserDto.MobileNumber;
            user.Location = updatedUserDto.Location;

            await _context.SaveChangesAsync();

            
            return NoContent();
        }

        // Update car details in DB
        [HttpPut("Car/{azureId}")]
        public async Task<IActionResult> UpdateCarDetails(string azureId, CarUpdateDto updatedCarDto)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            // Update car details
            user.CarType = updatedCarDto.CarType;
            user.CarPlate = updatedCarDto.CarPlate;
            user.CarColor = updatedCarDto.CarColor;
            user.CarModel = updatedCarDto.CarModel;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Get car details of user
        [HttpGet("{azureId}/car-details")]
        public async Task<IActionResult> GetCarDetails(string azureId)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            var carDetails = new
            {
                user.CarType,
                user.CarPlate,
                user.CarColor,
                user.CarModel
            };

            return Ok(carDetails);
        }

        // Delete user from DB
        [HttpDelete("{azureId}")]
        public async Task<IActionResult> DeleteUser(string azureId)
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

namespace mseg_carpool.Server.Models
{
    public class UserDto
    {
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string Location { get; set; }
        public string CarType { get; set; }
        public string CarPlate { get; set; }
        public string CarColor { get; set; }
        public string CarModel { get; set; }
    }

    public class UserUpdateDto
    {
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string Location { get; set; }
    }

    public class CarUpdateDto
    {
        public string CarType { get; set; }
        public string CarPlate { get; set; }
        public string CarColor { get; set; }
        public string CarModel { get; set; }    

        
    }
}
