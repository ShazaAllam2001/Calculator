import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  previous: string;
  current: string;

  constructor(private http: HttpClient) {
    this.previous = '';
    this.current = '0';
  }

  add(x: number, y: number) {
    var result: string | undefined;
    this.http.get('http://localhost:8080/BasicOperations/add',{
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
    this.http.get('http://localhost:8080/BasicOperations/subtract',{
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
    this.http.get('http://localhost:8080/BasicOperations/multiply',{
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
    this.http.get('http://localhost:8080/BasicOperations/divide',{
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
    this.http.get('http://localhost:8080/AdditionalOperations/percent',{
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
    this.http.get('http://localhost:8080/AdditionalOperations/inverse',{
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
    this.http.get('http://localhost:8080/AdditionalOperations/square',{
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
    this.http.get('http://localhost:8080/AdditionalOperations/squareRoot',{
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
