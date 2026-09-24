using EMS.Backend.DTOs;
using EMS.Backend.Models;
using EMS.Backend.Repositories;
using EMS.Backend.DTOs;
using EMS.Backend.Models;
using EMS.Backend.Repositories;
namespace EMS.Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
        {
            var employees = await _repository.GetAllAsync();
            return employees.Select(MapToDto);
        }

        public async Task<EmployeeDto?> GetByIdAsync(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            return employee == null ? null : MapToDto(employee);
        }

        public async Task<(bool Success, string? Error, EmployeeDto? Data)> CreateAsync(CreateEmployeeDto dto)
        {
            if (await _repository.EmailExistsAsync(dto.Email))
                return (false, "Email already exists.", null);

            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Salary = dto.Salary,
                HireDate = dto.HireDate,
                Department = dto.Department
            };

            var created = await _repository.AddAsync(employee);
            var full = await _repository.GetByIdAsync(created.Id);

            return (true, null, MapToDto(full!));
        }

        public async Task<(bool Success, string? Error)> UpdateAsync(int id, UpdateEmployeeDto dto)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null)
                return (false, "Employee not found.");

            if (await _repository.EmailExistsAsync(dto.Email, id))
                return (false, "Email already exists.");

            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Email = dto.Email;
            employee.Phone = dto.Phone;
            employee.Salary = dto.Salary;
            employee.HireDate = dto.HireDate;
            employee.Department = dto.Department;

            await _repository.UpdateAsync(employee);
            return (true, null);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        private static EmployeeDto MapToDto(Employee e)
        {
            return new EmployeeDto
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                Phone = e.Phone,
                Salary = e.Salary,
                HireDate = e.HireDate,
                Department = e.Department
            };
        }
    }
}