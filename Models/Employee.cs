using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Employeeemanagement.Models
{
    public class Employee
    {
        
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; } = "";

        [Range(1, double.MaxValue, ErrorMessage = "Salary must be greater than 0")]
        public decimal Salary { get; set; }
    }
}
