import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations/operations.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  previous: string;
  current: string;
  operatorClicked: boolean;
  equalClicked: boolean;
  dotWritten: boolean;
  clearAllPrevious: boolean;
  operator: string;
  preOperator: string;
  operators = ['÷','×','-','+','='];

  constructor(private operations: OperationsService) {
    this.previous = '';
    this.current = '0';
    this.operator = '';
    this.preOperator = '';
    this.operatorClicked = false;
    this.equalClicked = false;
    this.dotWritten = false;
    this.clearAllPrevious = false;
  }

  ngOnInit(): void {
  }

  writeDigit(digit: string) {
    if(this.operatorClicked || this.equalClicked) {
      if(this.equalClicked && !this.operatorClicked)
        this.previous = this.current;
      this.current = '0';
      this.operatorClicked = false;
      this.equalClicked = false;
      this.clearAllPrevious = false;
      this.dotWritten = false;
    }
  
    if(digit==='0') {
        if(this.current!=='0')
          this.current += digit;
    } else {
      if(this.current!=='0')
        this.current += digit;
      else
        this.current = digit;     
    }
  }

  writeOperation(symbol: string) {
    this.preOperator = this.operator;
    this.operator = symbol;
    if(!this.operatorClicked) { 
      this.operatorClicked = true;
      if(this.previous !== '') {
        if(this.preOperator !== '=' && (this.previous !== this.current))
          this.calculate();
      }
      this.previous = this.current + symbol;
    }
  }

  sign() {
    if (this.current !== '') {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : this.current = '-' + this.current;
    }
  }

  dot() {
    if (!this.dotWritten) {
      this.dotWritten = true;
      this.writeDigit('.');
    }
  }
  
  clear(){
    if(this.clearAllPrevious) {
      this.clearAll();
    } else {
      this.current = '0';
    }
  }

  clearAll() {
    this.equalClicked = false;
    this.previous = '';
    this.current = '0';
  }

  backSpace() {
    if(this.clearAllPrevious) {
      this.clearAll();
    } else {
      if(this.current.length > 1) {
        this.current = this.current.slice(0,-1);
      } else {
        this.current = '0';
      }
    }  
  }

  calculate() {
    var previous = this.previous;
    var y = parseFloat(this.current);
    this.clearAllPrevious = true;
    switch(this.preOperator) {
      case this.operators[0]:
        var temp = previous.split(this.operators[0]); 
        var x = parseFloat(temp[0]);
        this.operations.divide(x,y);
        break;
      case this.operators[1]:
        var temp = previous.split(this.operators[1]); 
        x = parseFloat(temp[0]);
        this.operations.multiply(x,y);
        break;
      case this.operators[2]:
        var temp = previous.split(this.operators[2]);
        if(temp[0]==='') 
          x = -parseFloat(temp[1]);
        else 
          x = parseFloat(temp[0]); 
        this.operations.subtract(x,y);
        break;
      case this.operators[3]:
        var temp = previous.split(this.operators[3]); 
        x = parseFloat(temp[0]);
        this.operations.add(x,y);
        break;
      case this.operators[4]:
        break;
      default:
        throw "Undefined operation!";
    }
  }

  applyOperarion(operation: string){
    this.clearAllPrevious = true;
    this.equalClicked = true;
    switch(operation) {
      case 'percent':
        this.operations.percent();
        break;
      case 'inverse':
        this.operations.inverse();
        break;
      case 'square':
        this.operations.square();
        break;
      case 'squareRoot':
        this.operations.squareRoot();
        break;
      default:
        throw "Undefined operation!";
    }
  }

  equal() {
    this.clearAllPrevious = true;
    this.preOperator = this.operator;
    this.operator = '=';
    if(!this.equalClicked) { 
      this.equalClicked = true;
      this.previous = this.previous + this.current + '=';
      if(this.previous !== '') {
        if(this.preOperator !== '=')
          this.calculate();
      }
    }
  }

}
