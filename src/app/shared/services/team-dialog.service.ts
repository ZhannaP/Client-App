import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, take } from "rxjs";
import { Team } from "src/app/core/models/team";
import { TeamDialogComponent } from "../dialogs/team-dialog/team-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class TeamDialogService{

    dialogRef!: MatDialogRef<TeamDialogComponent>;

    constructor(private dialog: MatDialog){}

    open(team: Team | null){
        this.dialogRef = this.dialog.open(TeamDialogComponent, {
            disableClose: true,
            width: '900px', 
            height: '450px',
            autoFocus: true,
            position: {top: '15px'},
            data: team?.id
        })
    }

    closed(): Observable<Team>{
        return this.dialogRef.afterClosed().pipe(take(1));
    }
}