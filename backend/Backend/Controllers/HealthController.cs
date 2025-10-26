using Backend.Configuration.MongoDB;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[ApiController]
	[Route("health")]
	public class HealthController : ControllerBase
	{
		private readonly DbChecker _dbChecker;
		private readonly IWebHostEnvironment _env;

		public HealthController(DbChecker dbChecker, IWebHostEnvironment env)
		{
			_dbChecker = dbChecker;
			_env = env;
		}

		[HttpGet("getStatus")]
		public async Task<IActionResult> GetStatus()
		{
			var dbOk = await _dbChecker.CanConnectAsync();
			var payload = new
			{
				status = dbOk ? "ok" : "error",
				database = dbOk,
				environment = _env.EnvironmentName
			};
			return dbOk ? Ok(payload) : StatusCode(503, payload);
		}
	}

}
