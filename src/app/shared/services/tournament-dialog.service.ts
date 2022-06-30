import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, take } from "rxjs";
import { Tournament } from "src/app/core/models/tournament";
import { TournamentDialogComponent } from "../dialogs/tournament-dialog/tournament-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class TournamentDialogService{

    dialogRef!: MatDialogRef<TournamentDialogComponent>;

    constructor(private dialog: MatDialog){}

    open(tournament: Tournament | null){
        this.dialogRef = this.dialog.open(TournamentDialogComponent, {
            disableClose: true,
            width: '900px', 
            height: '450px',
            autoFocus: true,
            position: {top: '15px'},
            data: tournament?.id
        })
    }

    closed(): Observable<Tournament>{
        return this.dialogRef.afterClosed().pipe(take(1));
    }
}