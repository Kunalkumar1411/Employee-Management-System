using Microsoft.EntityFrameworkCore;
using EMS.Backend.Data;
using EMS.Backend.Models;

namespace EMS.Backend.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
{
    return await _context.Employees.ToListAsync();
}

public async Task<Employee?> GetByIdAsync(int id)
{
    return await _context.Employees
        .FirstOrDefaultAsync(e => e.Id == id);
}

        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            var rows = await _context.SaveChangesAsync();
            return rows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            var rows = await _context.SaveChangesAsync();
            return rows > 0;
        }

        public async Task<bool> EmailExistsAsync(string email, int? excludeId = null)
        {
            return await _context.Employees
                .AnyAsync(e => e.Email == email && e.Id != excludeId);
        }
    }
}