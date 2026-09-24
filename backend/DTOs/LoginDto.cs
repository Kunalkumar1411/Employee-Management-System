using System.ComponentModel.DataAnnotations;

namespace EMS.Backend.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty; // will accept email here

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}