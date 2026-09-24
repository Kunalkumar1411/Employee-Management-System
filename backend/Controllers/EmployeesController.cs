using Microsoft.AspNetCore.Mvc;
using EMS.Backend.DTOs;
using EMS.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using EMS.Backend.DTOs;
using EMS.Backend.Services;

namespace EMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAll()
        {
            var employees = await _service.GetAllAsync();
            return Ok(employees);
        }

        // GET: api/employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetById(int id)
        {
            var employee = await _service.GetByIdAsync(id);
            if (employee == null)
                return NotFound(new { message = $"Employee with id {id} not found." });

            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> Create([FromBody] CreateEmployeeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, error, data) = await _service.CreateAsync(dto);
            if (!success)
                return BadRequest(new { message = error });

            return CreatedAtAction(nameof(GetById), new { id = data!.Id }, data);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, error) = await _service.UpdateAsync(id, dto);
            if (!success)
                return error == "Employee not found." ? NotFound(new { message = error }) : BadRequest(new { message = error });

            return NoContent();
        }

        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = $"Employee with id {id} not found." });

            return NoContent();
        }
    }
}