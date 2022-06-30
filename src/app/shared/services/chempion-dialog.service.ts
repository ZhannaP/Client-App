import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, take } from "rxjs";
import { Chempion } from "src/app/core/models/chempion";
import { ChempionDialogComponent } from "../dialogs/chempion-dialog/chempion-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class ChempionDialogService{

    dialogRef!: MatDialogRef<ChempionDialogComponent>;

    constructor(private dialog: MatDialog){}

    open(chempion: Chempion | null){
        this.dialogRef = this.dialog.open(ChempionDialogComponent, {
            disableClose: true,
            width: '900px', 
            height: '900px',
            autoFocus: true,
            position: {top: '15px'},
            data: chempion?.key
        })
    }

    closed(): Observable<Chempion>{
        return this.dialogRef.afterClosed().pipe(take(1));
    }
}