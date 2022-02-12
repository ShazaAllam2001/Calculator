package springboot.oop.calculator.calculations;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/BasicOperations")
public class BasicOperations implements IBasicOperations {
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

}
