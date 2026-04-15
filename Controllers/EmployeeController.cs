using Microsoft.AspNetCore.Mvc;
using Employeeemanagement.Models;

namespace Employeeemanagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private static List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John", Role = "Developer", Salary = 50000 },
            new Employee { Id = 2, Name = "Priya", Role = "Tester", Salary = 40000 }
        };

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await Task.FromResult(Ok(employees));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return await Task.FromResult(NotFound());

            return await Task.FromResult(Ok(emp));
        }

        [HttpPost]
        public async Task<IActionResult> Add(Employee emp)
        {
            if (string.IsNullOrWhiteSpace(emp.Name))
                return await Task.FromResult(BadRequest("Name is required"));

            if (string.IsNullOrWhiteSpace(emp.Role))
                return await Task.FromResult(BadRequest("Role is required"));

            if (emp.Salary <= 0)
                return await Task.FromResult(BadRequest("Salary must be greater than 0"));

            // ✅ FIXED ID GENERATION (no duplicates)
            emp.Id = employees.Any() ? employees.Max(e => e.Id) + 1 : 1;

            employees.Add(emp);

            return await Task.FromResult(
                CreatedAtAction(nameof(GetById), new { id = emp.Id }, emp)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Employee updated)
        {
            var emp = employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return await Task.FromResult(NotFound());

            if (string.IsNullOrWhiteSpace(updated.Name))
                return await Task.FromResult(BadRequest("Name is required"));

            if (string.IsNullOrWhiteSpace(updated.Role))
                return await Task.FromResult(BadRequest("Role is required"));

            if (updated.Salary <= 0)
                return await Task.FromResult(BadRequest("Salary must be greater than 0"));

            emp.Name = updated.Name;
            emp.Role = updated.Role;
            emp.Salary = updated.Salary;

            return await Task.FromResult(Ok(emp));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var emp = employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return await Task.FromResult(NotFound());

            employees.Remove(emp);
            return await Task.FromResult(Ok("Deleted"));
        }
    }
}