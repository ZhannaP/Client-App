import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { IInteractionDialogOptions } from 'src/app/core/interactionDialog/interactionDialogOptions';
import { Team } from 'src/app/core/models/team';
import { InteractionDialogResults, InteractionDialogService } from 'src/app/shared/services/interaction-dialog.service';
import { TeamDialogService } from 'src/app/shared/services/team-dialog.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  teams: Team[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Team>;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private teamService: TeamService,
              private teamDialogService: TeamDialogService,
              private interactionDialogService: InteractionDialogService) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData(){
    forkJoin([
      this.teamService.getAll()
    ]).subscribe(([teams]) => {
      this.teams = teams;
      this.tableData();
      console.log(teams);
    })
  }

  openCreateDialog(){
    this.teamDialogService.open(null);
    this.teamDialogService.closed().subscribe(result => {
      //console.log("result55555: " + result)
      if (result == null || result == undefined) return;
      console.log("result: " + result)
      //this.addTableRow(result);
      //this.wardrobes.push({id: result.id, number: result.number, locationId: result.locationId, location: result.location, typeId: result.typeId, type: result.type});
      this.teamService.getById(Number(result)).subscribe(data => {
        this.teams.push(data);
        this.table.renderRows();
      });
      //this.table.renderRows();
    });   
  }

  edit(element: Team){
    this.openEditDialog(element);
  }

  private openEditDialog(element: Team){
    this.teamService.getById(element.id).subscribe(model => {
      console.log("model id: " + model.id);
      this.teamDialogService.open(model);
      this.teamDialogService.closed().subscribe(result => {
        console.log(result);
        //if (result == null || result == undefined) return;
        this.updateTableRow(element);
      })
    })
  }

  private updateTableRow(element: Team){
    console.log("element Id: " + element.id)
    this.teamService.getById(element.id).subscribe(item => {
      element.id = item.id;
      element.name = item.name;
      element.rating = item.rating;
      element.tournamentId = item.tournamentId;
      element.tournament = item.tournament;
      console.log("item id: " + item.id);
      this.table.renderRows();
    })
  }

  private tableData(){
    this.displayedColumns.push('id');
    this.displayedColumns.push('name');
    this.displayedColumns.push('rating');
    this.displayedColumns.push('tournamentId');
    this.displayedColumns.push('actions');

    this.dataSource = new MatTableDataSource(this.teams)
  }

  deleteTeam(element: Team){
    let options: IInteractionDialogOptions = {
      title: 'Delete chempion',
      message: 'You realy want to delete this chempion?',
      okButtonText: 'Ok',
      noButtonText: 'No',
      attentionType: AttentionTypes.danger
    }

    this.interactionDialogService.open(options);
    this.interactionDialogService.closed().subscribe(result => {
      if (result == InteractionDialogResults.Yes){
        if (element.id != null){
          this.teamService.delete(element.id).subscribe(response => {
            this.teams.splice(this.teams.findIndex(x => x.id == element.id), 1);
            this.table.renderRows();
          })
        }
        else{
          this.teams.splice(this.teams.findIndex(x => x.id = element.id), 1);
        }
    
        this.table.renderRows();
      }
    })
  }

}
