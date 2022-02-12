package springboot.oop.calculator.calculations;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/AdditionalOperations")
public class AdditionalOperations extends BasicOperations implements IAdditionalOperations {
    @GetMapping("/percent")
    @Override
    public double percent(@RequestParam double x) { return divide(x,100); }

    @GetMapping("/inverse")
    @Override
    public double inverse(@RequestParam double x) { return divide(1,x); }

    @GetMapping("/square")
    @Override
    public double square(@RequestParam double x) { return multiply(x,x);}

    @GetMapping("/squareRoot")
    @Override
    public double squareRoot(@RequestParam double x) {
        return Math.sqrt(x);
    }

}
