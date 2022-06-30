import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { IInteractionDialogOptions } from 'src/app/core/interactionDialog/interactionDialogOptions';
import { InteractionDialogComponent } from '../dialogs/interaction-dialog/interaction-dialog.component';

export enum InteractionDialogResults {
  Yes = 1,
  No = 2,
  Cancel = 3
}

@Injectable({
  providedIn: 'root'
})
export class InteractionDialogService {

  dialogRef!: MatDialogRef<InteractionDialogComponent>;
  result!: InteractionDialogResults;

  constructor(private dialog: MatDialog) { }

  open(options: IInteractionDialogOptions) {
    this.dialogRef = this.dialog.open(InteractionDialogComponent, {
      width: `${options.dialogWidth ?? 600}px`,
      position: { top: `${options.dialogTop ?? 100}px` },
      data: {
        title: options.title ?? 'Confirmation',
        message: options.message,
        details: options.details,
        noButtonText: options.noButtonText ?? 'No',
        noButtonVisible: options.noButtonVisible ?? true,
        okButtonText: options.okButtonText ?? 'Ok',
        okButtonVisible: options.okButtonVisible ?? true,
        cancelButtonText: options.cancelButtonText ?? 'Cancel',
        cancelButtonVisible: options.cancelButtonVisible ?? false,
        attentionType: options.attentionType ?? AttentionTypes.info,
      }
    });
  }

  public closed(): Observable<InteractionDialogResults> {
    return this.dialogRef.afterClosed().pipe(take(1));
  }
}
