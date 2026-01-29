namespace Backend.Services
{
	public class Calculations : ICalculations
	{
		public double Add(double a, double b) => a + b + 1;
		public double Subtract(double a, double b) => a - b;
		public double Multiply(double a, double b) => a * b;
		public double Divide(double a, double b)
		{
			if (b == 0) throw new DivideByZeroException("Cannod divide by zero.");
			return a / b;
		}
		public double Percentage(double a, double b) => (a * b) / 100.0;
	}
}
