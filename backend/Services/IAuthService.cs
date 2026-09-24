using EMS.Backend.DTOs;

namespace EMS.Backend.Services
{
    public interface IAuthService
    {
        Task<(bool Success, string? Error, AuthResponseDto? Data)> RegisterAsync(RegisterDto dto);
        Task<(bool Success, string? Error, AuthResponseDto? Data)> LoginAsync(LoginDto dto);
    }
}