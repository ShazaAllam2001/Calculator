import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
        this.divide(x,y);
        break;
      case this.operators[1]:
        var temp = previous.split(this.operators[1]); 
        x = parseFloat(temp[0]);
        this.multiply(x,y);
        break;
      case this.operators[2]:
        var temp = previous.split(this.operators[2]);
        if(temp[0]==='') 
          x = -parseFloat(temp[1]);
        else 
          x = parseFloat(temp[0]); 
        this.subtract(x,y);
        break;
      case this.operators[3]:
        var temp = previous.split(this.operators[3]); 
        x = parseFloat(temp[0]);
        this.add(x,y);
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
        this.percent();
        break;
      case 'inverse':
        this.inverse();
        break;
      case 'square':
        this.square();
        break;
      case 'squareRoot':
        this.squareRoot();
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

  // request Calculations API
  add(x: number, y: number) {
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/add',{
      responseType: 'text',
      params:{
        x: x,
        y: y
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
    });
  }
  subtract(x: number, y: number) {
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/subtract',{
      responseType: 'text',
      params:{
        x: x,
        y: y
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
    });
  }
  multiply(x: number, y: number) {
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/multiply',{
      responseType: 'text',
      params:{
        x: x,
        y: y
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
    });
  }
  divide(x: number, y: number) {
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/divide',{
      responseType: 'text',
      params:{
        x: x,
        y: y
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
    });
  }
  percent() {
    var x = this.current;
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/percent',{
      responseType: 'text',
      params:{
        x: x,
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
        this.previous = this.current;
    });
  }
  inverse() {
    var x = this.current;
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/inverse',{
      responseType: 'text',
      params:{
        x: x,
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
        this.previous = this.current;
    });
  }
  square() {
    var x = this.current;
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/square',{
      responseType: 'text',
      params:{
        x: x,
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
        this.previous = this.current;
    });
  }
  squareRoot(){
    var x = this.current;
    var result: string | undefined;
    this.http.get('http://localhost:8080/operations/squareRoot',{
      responseType: 'text',
      params:{
        x: x,
      },
      observe: 'response'
    }).subscribe(response=>{
      result = response.body?.toString();
      if(result)
        this.current = result;
        this.previous = this.current;
    });
  }
}
