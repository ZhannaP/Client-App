import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, of, tap } from 'rxjs';
import { Item } from 'src/app/core/models/item';
import { ItemService } from '../../services/item.service';
import { SnackBarService } from '../../services/snack-bar-service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  model!: Item | null;
  
  newItem: boolean = true;
  disableButtons: boolean = false;

  form!: FormGroup;

  constructor(private viewContainerRef: ViewContainerRef,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<ItemDialogComponent>,
              private itemService: ItemService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder) {
                this.newItem = data == null;
                this.createEmptyForm();
               }

  ngOnInit(): void {
    this.initForm(this.data);
  }

  private initForm(id: number){
    let model$ = id == null ? of(null) : this.itemService.getById(id);

    forkJoin([model$])
    .pipe(
      tap(([modelResult]) => {
        this.model = modelResult;
      })
    ).subscribe(result => {
      if (this.newItem == false){
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
      description: [null, Validators.required],
      boost: [null, Validators.required]
    })
  }

  fillForm(model: Item | null){
    this.form.patchValue(model as Item);
  }

  private showItemActionMessage(model: Item){
    let message = `The item has been successfully submited`;
    this.snackBarService.openSuccess(message, "Success");
  }

  submit(){
    this.disableButtons = true;
    console.log(this.model);
    if (this.newItem == true){
      this.itemService.create(this.form.value).subscribe( result => {
        console.log(result);
        this.showItemActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
    else {
      this.itemService.update(this.form.value).subscribe(result => {
        console.log(result);
        this.showItemActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
  }

}
