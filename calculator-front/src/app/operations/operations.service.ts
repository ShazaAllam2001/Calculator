import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  URL: string = 'https://online-calculator-api-shaza.herokuapp.com/';
  previous: string;
  current: string;

  constructor(private http: HttpClient) {
    this.previous = '';
    this.current = '0';
  }

  add(x: number, y: number) {
    var result: string | undefined;
    this.http.get(this.URL + 'BasicOperations/add',{
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
    this.http.get(this.URL + 'BasicOperations/subtract',{
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
    this.http.get(this.URL + 'BasicOperations/multiply',{
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
    this.http.get(this.URL + 'BasicOperations/divide',{
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
    this.http.get(this.URL + 'AdditionalOperations/percent',{
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
    this.http.get(this.URL + 'AdditionalOperations/inverse',{
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
    this.http.get(this.URL + 'AdditionalOperations/square',{
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
    this.http.get(this.URL + 'AdditionalOperations/squareRoot',{
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
