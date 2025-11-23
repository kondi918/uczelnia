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
					"+" => _service.Add(a, b),
					"-" => _service.Subtract(a, b),
					"*" => _service.Multiply(a, b),
					"/" => _service.Divide(a, b),
					"%" => _service.Percentage(a, b),
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
