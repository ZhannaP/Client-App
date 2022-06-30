import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSuccess(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 2500,
      panelClass: 'snack-bar-success',
      verticalPosition: 'top'
    })
  }

  openDanger(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 7000,
      panelClass: 'snack-bar-danger',
      verticalPosition: 'top'
    })
  }
}
