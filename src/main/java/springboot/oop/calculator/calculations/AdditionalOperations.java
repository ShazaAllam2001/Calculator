package springboot.oop.calculator.calculations;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/AdditionalOperations")
public class AdditionalOperations extends BasicOperations implements IAdditionalOperations {
    @GetMapping("/percent")
    @Override
    public String percent(@RequestParam double x) { return divide(x,100); }

    @GetMapping("/inverse")
    @Override
    public String inverse(@RequestParam double x) { return divide(1,x); }

    @GetMapping("/square")
    @Override
    public String square(@RequestParam double x) { return multiply(x,x);}

    @GetMapping("/squareRoot")
    @Override
    public String squareRoot(@RequestParam double x) {
        double result = Math.sqrt(x);
        if(Double.isNaN(result)) {
            return "Can not get square root of a negative number!";
        }
        return String.valueOf(result);
    }

}
