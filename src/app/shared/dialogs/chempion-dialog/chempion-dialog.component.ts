import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { forkJoin, of, tap } from 'rxjs';
import { Chempion } from 'src/app/core/models/chempion';
import { Role } from 'src/app/core/models/role';
import { ChempionService } from '../../services/chempion.service';
import { DictionariesService } from '../../services/dictionaries.service';
import { SnackBarService } from '../../services/snack-bar-service';

@Component({
  selector: 'app-chempion-dialog',
  templateUrl: './chempion-dialog.component.html',
  styleUrls: ['./chempion-dialog.component.scss']
})
export class ChempionDialogComponent implements OnInit {

  model!: Chempion | null;

  newChempion: boolean = true;

  //canSubmit: boolean = false;
  disableButtons: boolean = false; 
  
  @ViewChild(MatTable) chempionTable!: MatTable<any>;

  form!: FormGroup;

  constructor(//private viewContainerRef: ViewContainerRef,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<ChempionDialogComponent>,
              private chempionService: ChempionService,
              private dictionariesService: DictionariesService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder
              ) {
                this.newChempion = data == null;
                this.createEmptyForm();
               }

  ngOnInit(): void {
    this.initForm(this.data);
  }

  private initForm(id: number){
    let model$ = id == null ? of(null) : this.chempionService.getById(id);

    forkJoin([model$])
              .pipe(
                tap(([modelResult]) => {
                        this.model = modelResult;
                      })
              ).subscribe(result => {
                if (this.newChempion == false){
                  this.buildForm();
                }
              })
  }

  private buildForm(){
    this.fillForm(this.model);
  }

  private createEmptyForm(){
    this.form = this.formBuilder.group({
      version: [null, Validators.required],
      key: 0,
      name: [null, Validators.required],
      title: [null, Validators.required],
      blurb: [null, Validators.required],
      tags: [null, Validators.required],
      partype: [null, Validators.required],
      attack: [null, Validators.required],
      defense: [null, Validators.required],
      magic: [null, Validators.required],
      difficulty: [null, Validators.required],
      hp: [null, Validators.required],
      hpperlevel: [null, Validators.required],
      mp: [null, Validators.required],
      mpperlevel: [null, Validators.required],
      movespeed: [null, Validators.required],
      armor: [null, Validators.required],
      armorperlevel: [null, Validators.required],
      spellblock: [null, Validators.required],
      spellblockperlevel: [null, Validators.required],
      attackrange: [null, Validators.required],
      hpregen: [null, Validators.required],
      hpregenperlevel: [null, Validators.required],
      mpregen: [null, Validators.required], 
      mpregenperlevel: [null, Validators.required],
      crit: [null, Validators.required],
      critperlevel: [null, Validators.required],
      attackdamage: [null, Validators.required],
      attackdamageperlevel: [null, Validators.required],
      attackspeedperlevel: [null, Validators.required],
      attackspeed: [null, Validators.required],
    })
  }

  fillForm(model: Chempion | null){
    this.form.patchValue(model as Chempion);
  }

  private showChempionActionMessage(model: Chempion){
    let message = `The chempion has been successfully submited`;
    this.snackBarService.openSuccess(message, "Success");
  }

  submit(){
    this.disableButtons = true;
    console.log(this.model);
    if (this.newChempion == true){
      this.chempionService.create(this.form.value).subscribe( result => {
        console.log(result);
        this.showChempionActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
    else {
      this.chempionService.update(this.form.value).subscribe(result => {
        console.log(result);
        this.showChempionActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
  }

}
