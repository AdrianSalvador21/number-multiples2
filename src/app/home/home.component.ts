import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MultiplesNumberService } from '@core/multiples-number.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mainValue: number;
  multiples_3: number[] = [];
  multiples_5: number[] = [];
  multiples_7: number[] = [];
  main_multiple_array: any[] = [];

  constructor(
    public afs: AngularFirestore,
    public mnService: MultiplesNumberService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

  multiple(value: any, multiple: any) {
    const rest = value % multiple;
    return rest === 0;
  }

  // generate arrays
  getMultiples(value: number) {
    this.multiples_3 = [];
    this.multiples_5 = [];
    this.multiples_7 = [];

    for (let i = 1; i <= value; i++) {
      if (this.multiple(i, 3)) {
        this.multiples_3.push(i);
        continue;
      }

      if (this.multiple(i, 5)) {
        this.multiples_5.push(i);
        continue;
      }

      if (this.multiple(i, 7)) {
        this.multiples_7.push(i);
      }
    }
    this.main_multiple_array = [...this.multiples_3, ...this.multiples_5, ...this.multiples_7];
    this.main_multiple_array = this.main_multiple_array.sort(this.numberSort);
    this.saveData(this.main_multiple_array, value, this.multiples_3, this.multiples_5, this.multiples_7);
  }

  numberSort(a: any, b: any) {
    return a - b;
  }

  // reset values and generate array
  calculate() {
    this.multiples_3 = [];
    this.multiples_5 = [];
    this.multiples_7 = [];
    this.getMultiples(this.mainValue);
  }

  // set list class
  setListItemClass(item: any) {
    return {
      'bg-green': this.multiples_3.includes(item),
      'bg-red': this.multiples_5.includes(item),
      'bg-blue': this.multiples_7.includes(item),
    };
  }

  // save firebase data
  saveData(data: any, value: any, multiples_3: any, multiples_5: any, multiples_7: any) {
    this.mnService
      .addMNRegister({
        data,
        mainValue: value,
        multiples_3,
        multiples_5,
        multiples_7,
        date: new Date(),
        uid: this.credentialsService.credentials.token,
      })
      .then((result) => {
        console.log(result);
      });
  }
}
