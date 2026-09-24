using System.ComponentModel.DataAnnotations;

namespace EMS.Backend.DTOs
{
    public class UpdateEmployeeDto
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Salary { get; set; }

        public DateTime HireDate { get; set; }

        [Required]
        public string Department { get; set; } = string.Empty;  
    }
}