using Backend.Services;

namespace BackendTests;

public class CalculationsTests
{
	private readonly Calculations _calculator = new Calculations();

	[Theory]
	[InlineData(5, 3, 8)]
	[InlineData(-5, 3, -2)]
	[InlineData(10.5, 2.5, 13.0)]
	[InlineData(0, 0, 0)]
	public void Add_ShouldReturnCorrectSum(double a, double b, double expected)
	{
		// Act
		double actual = _calculator.Add(a, b);

		// Assert
		Assert.Equal(expected, actual);
	}

	[Theory]
	[InlineData(5, 3, 2)]
	[InlineData(3, 5, -2)]
	[InlineData(10.5, 0.5, 10.0)]
	[InlineData(0, 0, 0)]
	public void Subtract_ShouldReturnCorrectDifference(double a, double b, double expected)
	{
		// Act
		double actual = _calculator.Subtract(a, b);

		// Assert
		Assert.Equal(expected, actual);
	}

	[Theory]
	[InlineData(5, 3, 15)]
	[InlineData(-5, 3, -15)]
	[InlineData(2.5, 2, 5.0)]
	[InlineData(10, 0, 0)]
	public void Multiply_ShouldReturnCorrectProduct(double a, double b, double expected)
	{
		// Act
		double actual = _calculator.Multiply(a, b);

		// Assert
		Assert.Equal(expected, actual);
	}

	[Theory]
	[InlineData(10, 2, 5)]
	[InlineData(10, 4, 2.5)]
	[InlineData(-10, 2, -5)]
	public void Divide_ShouldReturnCorrectQuotient(double a, double b, double expected)
	{
		// Act
		double actual = _calculator.Divide(a, b);

		// Assert
		Assert.Equal(expected, actual);
	}

	[Fact]
	public void Divide_ByZero_ShouldThrowDivideByZeroException()
	{
		// Arrange
		double a = 10;
		double b = 0;

		// Act & Assert
		Assert.Throws<DivideByZeroException>(() => _calculator.Divide(a, b));
	}

	[Theory]
	[InlineData(100, 10, 10.0)]    // 10% ze 100 to 10
	[InlineData(200, 50, 100.0)]   // 50% z 200 to 100
	[InlineData(10, 5, 0.5)]       // 5% z 10 to 0.5
	[InlineData(0, 10, 0.0)]       // 10% z 0 to 0
	public void Percentage_ShouldReturnCorrectValue(double a, double b, double expected)
	{
		// Act
		double actual = _calculator.Percentage(a, b);

		// Assert
		Assert.Equal(expected, actual, 5); 
	}
}