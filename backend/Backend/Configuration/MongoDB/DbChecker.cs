using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Configuration.MongoDB
{
	public class DbChecker
	{
		private readonly MongoOptions _options;

		public DbChecker(MongoOptions options)
		{
			_options = options;
		}

		public async Task<bool> CanConnectAsync()
		{
			try
			{
				var client = new MongoClient(_options.ConnectionString);
				var db = client.GetDatabase(_options.Database);
				await db.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
				return true;
			}
			catch
			{
				return false;
			}
		}
	}
}
