using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CalculatorController : ControllerBase
	{
		private readonly ICalculations _service;

		public CalculatorController(ICalculations service)
		{
			_service = service;
		}

		[HttpGet("Calculate")]
		public IActionResult Calculate([FromQuery] double a, [FromQuery] double b, [FromQuery] string operation)
		{
			try
			{
				double result = operation switch
				{
					"add" => _service.Add(a, b),
					"subtract" => _service.Subtract(a, b),
					"multiply" => _service.Multiply(a, b),
					"divide" => _service.Divide(a, b),
					"percentage" => _service.Percentage(a, b),
					_ => throw new Exception("Unknown operation")
				};
				return Ok(new { result });
			}
			catch (Exception ex)
			{
				return BadRequest(new { error = ex.Message });
			}
		}
	}
}
