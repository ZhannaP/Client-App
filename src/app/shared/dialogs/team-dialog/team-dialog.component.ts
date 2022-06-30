import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, of, tap } from 'rxjs';
import { Team } from 'src/app/core/models/team';
import { Tournament } from 'src/app/core/models/tournament';
import { SnackBarService } from '../../services/snack-bar-service';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {

  model!: Team | null;
  tornaments: Tournament[] = [];

  newTeam: boolean = true;
  disableButtons: boolean = false;

  form!: FormGroup;

  constructor(private viewContainerRef: ViewContainerRef,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<TeamDialogComponent>,
              private teamService: TeamService,
              private tournamentService: TournamentService,
              private snackBarService: SnackBarService,
              private formBuilder: FormBuilder
              ) {
                this.newTeam = data == null;
                this.createEmptyForm();
               }

  ngOnInit(): void {
    this.initForm(this.data)
  }

  private initForm(id: number){
    let model$ = id == null ? of(null) : this.teamService.getById(id);
    let tournaments$ = this.tournamentService.getAll();

    forkJoin([model$,
              tournaments$])
              .pipe(
                tap(([modelResult,
                      tournamentResult]) => {
                        this.model = modelResult,
                        this.tornaments = tournamentResult;
                      })
              ).subscribe(result => {
                if (this.newTeam == false){
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
      rating: [null, Validators.required],
      tournamentId: [null, Validators.required]
    })
  }

  fillForm(model: Team | null){
    this.form.patchValue(model as Team);
  }

  private showTeamActionMessage(model: Team){
    let message = `The team has been successfully submited`;
    this.snackBarService.openSuccess(message, "Success");
  }

  submit(){
    this.disableButtons = true;
    console.log(this.model);
    if (this.newTeam == true){
      this.teamService.create(this.form.value).subscribe( result => {
        console.log(result);
        this.showTeamActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
    else {
      this.teamService.update(this.form.value).subscribe(result => {
        console.log(result);
        this.showTeamActionMessage(this.form.value);
        this.dialogRef.close(result);
      },
        error => {
          this.disableButtons = false;
        })
    }
  }

}
