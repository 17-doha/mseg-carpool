using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;
using System.Threading.Tasks;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // Uncomment when authentication is implemented in frontend
    // [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBcontext dbcontext;

        public UsersController(ApplicationDBcontext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet("{azureId}")]
        public async Task<IActionResult> GetUserByAzureId(string azureId)
        {
            var user = await dbcontext.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // Create user in DB
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDto userDto)
        {
            var user = new Users
            {
                Name = userDto.Name,
                MobileNumber = userDto.MobileNumber,
                Location = userDto.Location,
                CarType = userDto.CarType,
                CarPlate = userDto.CarPlate,
                CarColor = userDto.CarColor
               
            };

            dbcontext.User.Add(user);
            await dbcontext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserByAzureId), new { azureId = user.Id }, user);
        }

        // Update user details in DB
        [HttpPut("User/{azureId}")]
        public async Task<IActionResult> UpdateUserDetails(string azureId, UserUpdateDto updatedUserDto)
        {
            var user = await dbcontext.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            // Update user details
            user.Name = updatedUserDto.Name;
            user.MobileNumber = updatedUserDto.MobileNumber;
            user.Location = updatedUserDto.Location;

            await dbcontext.SaveChangesAsync();

            return NoContent();
        }

        // Update car details in DB
        [HttpPut("Car/{azureId}")]
        public async Task<IActionResult> UpdateCarDetails(string azureId, CarUpdateDto updatedCarDto)
        {
            var user = await dbcontext.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            // Update car details
            user.CarType = updatedCarDto.CarType;
            user.CarPlate = updatedCarDto.CarPlate;
            user.CarColor = updatedCarDto.CarColor;
            user.CarModel = updatedCarDto.CarModel;

            await dbcontext.SaveChangesAsync();

            return NoContent();
        }

        // Get car details of user
        [HttpGet("{azureId}/car-details")]
        public async Task<IActionResult> GetCarDetails(string azureId)
        {
            var user = await dbcontext.User.SingleOrDefaultAsync(u => u.Id == azureId);

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
            var user = await dbcontext.User.SingleOrDefaultAsync(u => u.Id == azureId);

            if (user == null)
            {
                return NotFound();
            }

            dbcontext.User.Remove(user);
            await dbcontext.SaveChangesAsync();

            return NoContent();
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
