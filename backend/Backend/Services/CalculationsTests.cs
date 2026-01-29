using Backend.Services;
using Moq;
using Xunit;

namespace Backend.Tests
{
    public class CalculationsTests
    {
        private readonly ICalculations _calculations;

        public CalculationsTests()
        {
            _calculations = new Calculations();
        }

        [Fact]
        public void Add_ShouldReturnCorrectSum()
        {
            // Arrange
            var a = 5.0;
            var b = 3.0;
            var expected = 8.0;

            // Act
            var result = _calculations.Add(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(10.0, 5.0, 5.0)]
        [InlineData(2.5, 1.5, 1.0)]
        public void Add_ShouldReturnCorrectSum_Theory(double a, double b, double expected)
        {
            // Act
            var result = _calculations.Add(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void Subtract_ShouldReturnCorrectDifference()
        {
            // Arrange
            var a = 10.0;
            var b = 3.0;
            var expected = 7.0;

            // Act
            var result = _calculations.Subtract(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(5.0, 2.0, 3.0)]
        [InlineData(-1.0, -4.0, 3.0)]
        public void Subtract_ShouldReturnCorrectDifference_Theory(double a, double b, double expected)
        {
            // Act
            var result = _calculations.Subtract(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void Multiply_ShouldReturnCorrectProduct()
        {
            // Arrange
            var a = 3.0;
            var b = 4.0;
            var expected = 12.0;

            // Act
            var result = _calculations.Multiply(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(6.0, 7.0, 42.0)]
        [InlineData(-1.0, -3.0, 3.0)]
        public void Multiply_ShouldReturnCorrectProduct_Theory(double a, double b, double expected)
        {
            // Act
            var result = _calculations.Multiply(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void Divide_ShouldReturnCorrectQuotient()
        {
            // Arrange
            var a = 10.0;
            var b = 2.0;
            var expected = 5.0;

            // Act
            var result = _calculations.Divide(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(8.0, 4.0, 2.0)]
        [InlineData(-9.0, -3.0, 3.0)]
        public void Divide_ShouldReturnCorrectQuotient_Theory(double a, double b, double expected)
        {
            // Act
            var result = _calculations.Divide(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void Divide_ShouldThrowDivideByZeroException()
        {
            // Arrange
            var a = 5.0;
            var b = 0.0;

            // Act & Assert
            Assert.Throws<DivideByZeroException>(() => _calculations.Divide(a, b));
        }

        [Fact]
        public void Percentage_ShouldReturnCorrectPercentage()
        {
            // Arrange
            var a = 200.0;
            var b = 50.0; // 50% of 200 is 100
            var expected = 100.0;

            // Act
            var result = _calculations.Percentage(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(300.0, 25.0, 75.0)]
        [InlineData(-100.0, 50.0, -50.0)]
        public void Percentage_ShouldReturnCorrectPercentage_Theory(double a, double b, double expected)
        {
            // Act
            var result = _calculations.Percentage(a, b);

            // Assert
            Assert.Equal(expected, result);
        }

    }
}
