using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using UserManagement.Domain.Models;
using UserManagement.IService.ServiceInterface;
using UserManagement.Domain.DTO;
using UserManagement.Service.Services;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;
        public UserController(IUserService userService, IConfiguration config, IEmailService emailService)
        {
            _userService = userService;
            _config = config;
            _emailService = emailService;
        }
        [HttpGet("GetAllUsers")]
        public async Task <IActionResult> GetAllUsers()
        {
            try
            {
                var result = await _userService.GetAllUsers();
                return Ok(result);
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AddUser")]
        public async Task<string> AddUser([FromForm]UserDTO user)
        {
            var result = await _userService.AddUser(user);
            return result;

        }
        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserDTO user)
        {
            /*  var result= await _userService.UpdateUser(user);*/
            return Ok(false);
        }
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
           var result = await _userService.DeleteUser(id);
            return Ok(result);
        }
        [HttpPost("ValidateUser")]
        public async Task<IActionResult> Validate([FromBody] LoginDTO login)
        {
            if (!ModelState.IsValid) return BadRequest();
            var result = await _userService.Validate(login);
            if (result == false)
            {
                return Unauthorized();
            }


            JWTService t = new JWTService(_config);

            var token = t.GenerateToken(login);

            return Ok();
        }



        [HttpPost("SendEmail")]
        public Task SendEmail(string email)
        {
            return _emailService.SendEmail(email);
        }
       
    }
}
