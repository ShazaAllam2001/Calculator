package springboot.oop.calculator.calculations;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/operations")
public class Operations implements IOperations {

    @GetMapping("/add")
    @Override
    public double add(@RequestParam double x, @RequestParam double y) {return x+y;}

    @GetMapping("/subtract")
    @Override
    public double subtract(@RequestParam double x, @RequestParam double y) {
        return x-y;
    }

    @GetMapping("/multiply")
    @Override
    public double multiply(@RequestParam double x, @RequestParam double y) {
        return x*y;
    }

    @GetMapping("/divide")
    @Override
    public double divide(@RequestParam double x, @RequestParam double y) {
        if(x==0 && y==0) {
            throw new RuntimeException("Undefined!");
        } else if(y==0) {
            throw new RuntimeException("Can not divide by zero!");
        }
        return x/y;
    }

    @GetMapping("/percent")
    @Override
    public double percent(@RequestParam double x) {
        return x/100;
    }

    @GetMapping("/inverse")
    @Override
    public double inverse(@RequestParam double x) { return 1/x; }

    @GetMapping("/square")
    @Override
    public double square(@RequestParam double x) { return x*x;}

    @GetMapping("/squareRoot")
    @Override
    public double squareRoot(@RequestParam double x) {
        return Math.sqrt(x);
    }

}
