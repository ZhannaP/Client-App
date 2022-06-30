import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  unsubscribeObservable(observable: Subscription): void{
    if (observable != null) {
      observable.unsubscribe();
    }
  }

  unsubscribeObservables(observables: Subscription[]): void{
    observables.forEach(item => {
      this.unsubscribeObservable(item);
    });
  }

  getArayFromStringsWithNewLineSymbols(line: string): string[] {
    let splitString = '{+split+}';
    let convertedLine = '';
    convertedLine = String(line);
    //convertedLine = convertedLine.replace(/\\r\\n/g, splitString);
    convertedLine = convertedLine.replace(/\r\n|\n/g, splitString);


    var items = convertedLine.split(splitString).filter(function (el) { return el.length != 0 });
    return items;
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}
