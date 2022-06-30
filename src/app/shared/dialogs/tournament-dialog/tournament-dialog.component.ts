import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, of, tap } from 'rxjs';
import { Tournament } from 'src/app/core/models/tournament';
import { SnackBarService } from '../../services/snack-bar-service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tournament-dialog',
  templateUrl: './tournament-dialog.component.html',
  styleUrls: ['./tournament-dialog.component.scss']
})
export class TournamentDialogComponent implements OnInit {

  model!: Tournament | null;

  newTournament: boolean = true;
  disableButtons: boolean = false;

  form!: FormGroup;

  constructor(private viewContainerREf: ViewContainerRef,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<TournamentDialogComponent>,
              private tornamentService: TournamentService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder) {
                this.newTournament = data == null;
                this.createEmptyForm();
               }

  ngOnInit(): void {
    this.initForm(this.data);
  }

  private initForm(id: number){
    let model$ = id == null ? of(null) : this.tornamentService.getById(id);

    forkJoin([model$])
    .pipe(
      tap(([modelResult]) => {
        this.model = modelResult;
      })
    ).subscribe(result => {
      if (this.newTournament == false){
        this.buildForm();
      }
    })
  }

  private buildForm(){
    this.fillForm(this.model);
  }

  private createEmptyForm(){
    this.form = this.formBuilder.group({
      id: 0,
      name: [null, Validators.required],
      registrationTime: [null, Validators.required],
      startTime: [null, Validators.required],
      cancalled: [null, Validators.required],
      nameKeySecondary: [null, Validators.required],
      nameKey: [null, Validators.required]
    })
  }

  fillForm(model: Tournament | null){
    this.form.patchValue(model as Tournament);
  }

  private showTournamentActionMessage(model: Tournament){
    let message = `The tournament has been successfully submited`;
    this.snackBarService.openSuccess(message, "Success");
  }

  submit(){
    this.disableButtons = true;
    console.log(this.model);
    if (this.newTournament == true){
      this.tornamentService.create(this.form.value).subscribe( result => {
        console.log(result);
        this.showTournamentActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
    else {
      this.tornamentService.update(this.form.value).subscribe(result => {
        console.log(result);
        this.showTournamentActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
  }

}
