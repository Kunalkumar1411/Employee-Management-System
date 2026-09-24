using System.ComponentModel.DataAnnotations;
public class CreateEmployeeDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public decimal Salary { get; set; }

    public DateTime HireDate { get; set; }

    [Required]
    public string Department { get; set; } = string.Empty;
}