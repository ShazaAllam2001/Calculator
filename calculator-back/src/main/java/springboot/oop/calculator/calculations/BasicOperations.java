package springboot.oop.calculator.calculations;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/BasicOperations")
public class BasicOperations implements IBasicOperations {
    @GetMapping("/add")
    @Override
    public String add(@RequestParam double x, @RequestParam double y) {return String.valueOf(x+y);}

    @GetMapping("/subtract")
    @Override
    public String subtract(@RequestParam double x, @RequestParam double y) {
        return String.valueOf(x-y);
    }

    @GetMapping("/multiply")
    @Override
    public String multiply(@RequestParam double x, @RequestParam double y) {
        return String.valueOf(x*y);
    }

    @GetMapping("/divide")
    @Override
    public String divide(@RequestParam double x, @RequestParam double y) {
        if(x==0 && y==0) {
            return "Undefined!";
        } else if(y==0) {
            return "Can not divide by zero!";
        }
        return String.valueOf(x/y);
    }

}
