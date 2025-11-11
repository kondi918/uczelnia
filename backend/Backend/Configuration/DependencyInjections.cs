using Backend.Configuration.MongoDB;
using Backend.Services;

namespace Backend.Configuration
{
	public static class DependencyInjections
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
		{
			// MongoDB konfiguracja
			var mongoOptions = new MongoOptions();
			config.GetSection("Mongo").Bind(mongoOptions);
			services.AddSingleton(mongoOptions);
			services.AddSingleton<DbChecker>();
			services.AddScoped<ICalculations, Calculations>();

			return services;
		}
	}
}
