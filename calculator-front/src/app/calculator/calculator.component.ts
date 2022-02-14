import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations/operations.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  operatorClicked: boolean;
  equalClicked: boolean;
  dotWritten: boolean;
  clearAllPrevious: boolean;
  operator: string;
  preOperator: string;
  operators = ['÷','×','-','+','='];

  constructor(public operations: OperationsService) {
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
        this.operations.previous = this.operations.current;
      this.operations.current = '0';
      this.operatorClicked = false;
      this.equalClicked = false;
      this.clearAllPrevious = false;
      this.dotWritten = false;
    }
  
    if(digit==='0') {
        if(this.operations.current!=='0')
          this.operations.current += digit;
    } else {
      if(this.operations.current!=='0')
        this.operations.current += digit;
      else
        this.operations.current = digit;     
    }
  }

  writeOperation(symbol: string) {
    this.preOperator = this.operator;
    this.operator = symbol;
    if(!this.operatorClicked) { 
      this.operatorClicked = true;
      if(this.operations.previous !== '') {
        if(this.preOperator !== '=' && (this.operations.previous !== this.operations.current))
          this.calculate();
      }
      this.operations.previous = this.operations.current + symbol;
    }
  }

  sign() {
    if (this.operations.current !== '') {
      this.operations.current =
        this.operations.current.charAt(0) === "-"
          ? this.operations.current.slice(1)
          : this.operations.current = '-' + this.operations.current;
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
      this.operations.current = '0';
    }
  }

  clearAll() {
    this.equalClicked = false;
    this.operations.previous = '';
    this.operations.current = '0';
  }

  backSpace() {
    if(this.clearAllPrevious) {
      this.clearAll();
    } else {
      if(this.operations.current.length > 1) {
        this.operations.current = this.operations.current.slice(0,-1);
      } else {
        this.operations.current = '0';
      }
    }  
  }

  calculate() {
    var previous = this.operations.previous;
    var y = parseFloat(this.operations.current);
    this.clearAllPrevious = true;
    switch(this.preOperator) {
      case this.operators[0]:
        var temp = previous.split(this.operators[0]); 
        var x = parseFloat(temp[0]);
        this.operations.divide(x,y);
        if(this.operations.current==="Can not divide by zero!") {
          this.clearAll();
          this.operations.current = "Can not divide by zero!";
        }
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
        if(this.operations.current==="Can not divide by zero!") {
          this.clearAll();
          this.operations.current = "Can not divide by zero!";
        }
        break;
      case 'square':
        this.operations.square();
        break;
      case 'squareRoot':
        this.operations.squareRoot();
        if(this.operations.current==="Can not get square root of a negative number!") {
          this.clearAll();
          this.operations.current = "Can not get square root of a negative number!";
        }
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
      this.operations.previous = this.operations.previous + this.operations.current + '=';
      if(this.operations.previous !== '') {
        if(this.preOperator !== '=')
          this.calculate();
      }
    }
  }

}
