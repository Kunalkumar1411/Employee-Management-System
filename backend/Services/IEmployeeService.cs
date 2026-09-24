using EMS.Backend.DTOs;

namespace EMS.Backend.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetAllAsync();
        Task<EmployeeDto?> GetByIdAsync(int id);
        Task<(bool Success, string? Error, EmployeeDto? Data)> CreateAsync(CreateEmployeeDto dto);
        Task<(bool Success, string? Error)> UpdateAsync(int id, UpdateEmployeeDto dto);
        Task<bool> DeleteAsync(int id);
    }
}