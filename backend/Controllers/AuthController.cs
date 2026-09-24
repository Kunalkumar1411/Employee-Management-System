using Microsoft.AspNetCore.Mvc;
using EMS.Backend.DTOs;
using EMS.Backend.Services;

namespace EMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, error, data) = await _authService.RegisterAsync(dto);
            if (!success)
                return BadRequest(new { message = error });

            return Ok(data);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, error, data) = await _authService.LoginAsync(dto);
            if (!success)
                return Unauthorized(new { message = error });

            return Ok(data);
        }
    }
}