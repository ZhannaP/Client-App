import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { IInteractionDialogOptions } from 'src/app/core/interactionDialog/interactionDialogOptions';
import { Tournament } from 'src/app/core/models/tournament';
import { InteractionDialogResults, InteractionDialogService } from 'src/app/shared/services/interaction-dialog.service';
import { TournamentDialogService } from 'src/app/shared/services/tournament-dialog.service';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournaments: Tournament[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Tournament>;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private tournamentService: TournamentService,
              private tournamentDialogService: TournamentDialogService,
              private interactionDialogService: InteractionDialogService) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData(){
    forkJoin([
      this.tournamentService.getAll()
    ]).subscribe(([tournaments]) => {
      this.tournaments = tournaments;
      this.tableData();
      console.log(tournaments);
    })
  }

  search(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateDialog(){
    this.tournamentDialogService.open(null);
    this.tournamentDialogService.closed().subscribe(result => {
      //console.log("result55555: " + result)
      if (result == null || result == undefined) return;
      console.log("result: " + result)
      //this.addTableRow(result);
      //this.wardrobes.push({id: result.id, number: result.number, locationId: result.locationId, location: result.location, typeId: result.typeId, type: result.type});
      this.tournamentService.getById(Number(result)).subscribe(data => {
        this.tournaments.push(data);
        this.table.renderRows();
      });
      //this.table.renderRows();
    });   
  }

  edit(element: Tournament){
    this.openEditDialog(element);
  }

  private openEditDialog(element: Tournament){
    this.tournamentService.getById(element.id).subscribe(model => {
      console.log("model id: " + model.id);
      this.tournamentDialogService.open(model);
      this.tournamentDialogService.closed().subscribe(result => {
        console.log(result);
        //if (result == null || result == undefined) return;
        this.updateTableRow(element);
      })
    })
  }

  private updateTableRow(element: Tournament){
    console.log("element Id: " + element.id)
    this.tournamentService.getById(element.id).subscribe(item => {
      element.id = item.id;
      element.name = item.name;
      element.registrationTime = item.registrationTime;
      element.startTime = item.startTime;
      element.cancalled = item.cancalled;
      element.nameKeySecondary = item.nameKeySecondary;
      element.name = item.nameKey;
      console.log("item id: " + item.id);
      this.table.renderRows();
    })
  }

  private tableData(){
    this.displayedColumns.push('id');
    this.displayedColumns.push('name');
    //this.displayedColumns.push('registrationTime');
    //this.displayedColumns.push('startTime');
    this.displayedColumns.push('actions');

    this.dataSource = new MatTableDataSource(this.tournaments)
  }

  deleteTournament(element: Tournament){
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
          this.tournamentService.delete(element.id).subscribe(response => {
            this.tournaments.splice(this.tournaments.findIndex(x => x.id == element.id), 1);
            this.table.renderRows();
          })
        }
        else{
          this.tournaments.splice(this.tournaments.findIndex(x => x.id = element.id), 1);
        }
    
        this.table.renderRows();
      }
    })
  }

}
