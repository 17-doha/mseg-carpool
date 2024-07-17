using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using mseg_carpool.Server.Models;

namespace mseg_carpool.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // Uncomment when authentication is implemented in frontend
    // [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{azureId}")]
        public IActionResult GetUserByAzureId(string azureId)
        {
            var user = _userRepository.GetUserByAzureId(azureId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // create user in DB
        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            var createdUser = _userRepository.CreateUser(user);

            return CreatedAtAction(nameof(GetUserByAzureId), new { azureId = createdUser.AzureId }, createdUser);
        }

        // update user in DB
        [HttpPut("{azureId}")]
        public IActionResult UpdateUser(string azureId, User updatedUser)
        {
            var user = _userRepository.GetUserByAzureId(azureId);

            if (user == null)
            {
                return NotFound();
            }

         _userRepository.UpdateUser(updatedUser);

            return NoContent();
        }

        // delete user from DB
        [HttpDelete("{azureId}")]
        public IActionResult DeleteUser(string azureId)
        {
            var user = _userRepository.GetUserByAzureId(azureId);

            if (user == null)
            {
                return NotFound();
            }

         _userRepository.DeleteUser(azureId);

            return NoContent();
        }
    }
}