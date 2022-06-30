import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { IInteractionDialogOptions } from 'src/app/core/interactionDialog/interactionDialogOptions';
import { Chempion } from 'src/app/core/models/chempion';
import { ChempionDialogService } from 'src/app/shared/services/chempion-dialog.service';
import { ChempionService } from 'src/app/shared/services/chempion.service';
import { InteractionDialogResults, InteractionDialogService } from 'src/app/shared/services/interaction-dialog.service';

@Component({
  selector: 'app-chempions-list',
  templateUrl: './chempions-list.component.html',
  styleUrls: ['./chempions-list.component.scss']
})
export class ChempionsListComponent implements OnInit {

  chempions: Chempion[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Chempion>;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private chempionService: ChempionService,
              private chempionDialogService: ChempionDialogService,
              private interactionDialogService: InteractionDialogService) {}

  ngOnInit(): void {
    this.initData();
  }

  private initData(){
    forkJoin([
      this.chempionService.getAll()
    ]).subscribe(([chempions]) => {
      this.chempions = chempions;
      this.tableData();
      console.log(chempions)
    })

    // this.chempionService.getAll().subscribe(list => {
    //   console.log(list);
    // })
  }

  search(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateDialog(){
    this.chempionDialogService.open(null);
    this.chempionDialogService.closed().subscribe(result => {
      //console.log("result55555: " + result)
      if (result == null || result == undefined) return;
      console.log("result: " + result)
      //this.addTableRow(result);
      //this.wardrobes.push({id: result.id, number: result.number, locationId: result.locationId, location: result.location, typeId: result.typeId, type: result.type});
      this.chempionService.getById(Number(result)).subscribe(data => {
        this.chempions.push(data);
        this.table.renderRows();
      });
      //this.table.renderRows();
    });   
  }

  edit(element: Chempion){
    this.openEditDialog(element);
  }

  private openEditDialog(element: Chempion){
    this.chempionService.getById(element.key).subscribe(model => {
      console.log("model id: " + model.id);
      this.chempionDialogService.open(model);
      this.chempionDialogService.closed().subscribe(result => {
        console.log(result);
        //if (result == null || result == undefined) return;
        this.updateTableRow(element);
      })
    })
  }

  private updateTableRow(element: Chempion){
    console.log("element Id: " + element.id)
    this.chempionService.getById(element.key).subscribe(item => {
      element.version = item.version;
      element.id = item.id;
      element.name = item.name;
      element.key = item.key;
      element.title = item.title;
      element.blurb = item.blurb;
      element.tags = item.tags;
      element.partype = item.partype;
      element.attack = item.attack;
      element.defense = item.defense;
      element.magic = item.magic;
      element.difficulty = item.difficulty;
      element.hp = item.hp;
      element.hpperlevel = item.hpperlevel;
      element.movespeed = item.movespeed;
      element.armor = item.armor;
      element.armorperlevel = item.armorperlevel;
      element.spellblock = item.spellblock;
      element.spellblockperlevel = item.spellblockperlevel;
      element.attackrange = item.attackrange;
      element.hpregen = item.hpregen;
      element.hpregenperlevel = item.hpregenperlevel;
      element.mpregen = item.mpregen;
      element.mpregenperlevel = item.mpregenperlevel;
      element.crit = item.crit;
      element.critperlevel = item.critperlevel;
      element.attackdamage = item.attackdamage;
      element.attackdamageperlevel = item.attackdamageperlevel;
      element.attackspeedperlevel = item.attackspeedperlevel;
      element.attackspeed = item.attackspeed;
      console.log("item id: " + item.id);
      this.table.renderRows();
    })
  }

  private tableData(){
    this.displayedColumns.push('id');
    this.displayedColumns.push('name');
    this.displayedColumns.push('description');
    this.displayedColumns.push('roleId');
    this.displayedColumns.push('actions');

    this.dataSource = new MatTableDataSource(this.chempions)
  }

  deleteChempion(element: Chempion){
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
          this.chempionService.delete(element.key).subscribe(response => {
            this.chempions.splice(this.chempions.findIndex(x => x.id == element.id), 1);
            this.table.renderRows();
          })
        }
        else{
          this.chempions.splice(this.chempions.findIndex(x => x.id = element.id), 1);
        }
    
        this.table.renderRows();
      }
    })
  }

}
