namespace Backend.Services
{
	public interface ICalculations
	{
		double Add(double a, double b);
		double Subtract(double a, double b);
		double Multiply(double a, double b);
		double Divide(double a, double b);
		double Percentage(double a, double b);
	}
}
