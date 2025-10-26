using Backend.Configuration;

public class Program
{
	public static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
		builder.WebHost.UseUrls("http://0.0.0.0:5000");

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		builder.Services.AddApplicationServices(builder.Configuration);

		var app = builder.Build();

// Configure the HTTP request pipeline.
		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}

//app.UseHttpsRedirection();
		app.UseAuthorization();
		app.UseRouting();
		app.MapControllers();

		app.Run();
	}
}
