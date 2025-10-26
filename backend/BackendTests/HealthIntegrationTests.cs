namespace BackendTests
{
	public class HealthIntegrationTests 
	{
		private readonly string _backendUrl;

		public HealthIntegrationTests()
		{
			_backendUrl = Environment.GetEnvironmentVariable("BACKEND_URL") ?? "http://localhost:5000";
			Console.WriteLine($"Backend URL: {_backendUrl}");
		}

		[Fact]
		public async Task Health_Endpoint_Should_Return_OK()
		{
			using var client = new HttpClient();
			var response = await client.GetAsync($"{_backendUrl}/health/GetStatus");
			var content = await response.Content.ReadAsStringAsync();

			Console.WriteLine(content); // wypisze odpowiedü backendu w logach
			Assert.Equal("OK", response.StatusCode.ToString());
		}
	}
}