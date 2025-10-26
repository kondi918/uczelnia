using Backend.Configuration.MongoDB;

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

			return services;
		}
	}
}
