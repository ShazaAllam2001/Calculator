package springboot.oop.calculator.calculations;

public interface IOperations {
    // Add operation
    public double add(double x, double y);

    // Subtract operation
    public double subtract(double x, double y);

    // multiply operation
    public double multiply(double x, double y);

    // divide operation
    public double divide(double x, double y);

    // percent operation
    public double percent(double x);

    // inverse operation
    public double inverse(double x);

    // square operation
    public double square(double x);

    // square root operation
    public double squareRoot(double x);

}
