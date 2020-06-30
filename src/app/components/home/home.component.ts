import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencies = ['USD' , 'CHF' , 'BTC'];
  rate = 0.5;

  amountToConvert: number = 3;
  convertedAmount: number = this.amountToConvert * this.rate;

  constructor() { }

  ngOnInit(): void {
  }

}
