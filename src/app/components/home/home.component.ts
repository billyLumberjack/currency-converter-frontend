import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencies = ['USD' , 'CHF' , 'BTC'];
  rate = 0.5;

  sourceAmount: number = 3;
  destinationAmount: number = this.sourceAmount * this.rate;

  constructor() { }

  ngOnInit(): void {
  }

  sourceAmountChanged(newSourceAmount: number): void{
    this.sourceAmount = newSourceAmount;
    this.destinationAmount = this.sourceAmount * this.rate;
  }

  destinationAmountChanged(newDestinationAmount: number): void{
    this.destinationAmount = newDestinationAmount;
    this.sourceAmount = this.destinationAmount / this.rate;
  }

}
