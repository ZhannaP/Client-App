import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { IInteractionDialogOptions } from 'src/app/core/interactionDialog/interactionDialogOptions';
import { Item } from 'src/app/core/models/item';
import { InteractionDialogResults, InteractionDialogService } from 'src/app/shared/services/interaction-dialog.service';
import { ItemDialogService } from 'src/app/shared/services/item-dialog.service';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: Item[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Item>;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private itemService: ItemService,
              private itemDialogService: ItemDialogService,
              private interactionDialogService: InteractionDialogService) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData(){
    forkJoin([
      this.itemService.getAll()
    ]).subscribe(([items]) => {
      this.items = items;
      this.tableData();
      console.log(items);
    })
  }

  openCreateDialog(){
    this.itemDialogService.open(null);
    this.itemDialogService.closed().subscribe(result => {
      //console.log("result55555: " + result)
      if (result == null || result == undefined) return;
      console.log("result: " + result)
      //this.addTableRow(result);
      //this.wardrobes.push({id: result.id, number: result.number, locationId: result.locationId, location: result.location, typeId: result.typeId, type: result.type});
      this.itemService.getById(Number(result)).subscribe(data => {
        this.items.push(data);
        this.table.renderRows();
      });
      //this.table.renderRows();
    });   
  }

  edit(element: Item){
    this.openEditDialog(element);
  }

  private openEditDialog(element: Item){
    this.itemService.getById(element.id).subscribe(model => {
      console.log("model id: " + model.id);
      this.itemDialogService.open(model);
      this.itemDialogService.closed().subscribe(result => {
        console.log(result);
        //if (result == null || result == undefined) return;
        this.updateTableRow(element);
      })
    })
  }

  private updateTableRow(element: Item){
    console.log("element Id: " + element.id)
    this.itemService.getById(element.id).subscribe(item => {
      element.id = item.id;
      element.name = item.name;
      element.description = item.description;
      element.boost = item.boost;
      console.log("item id: " + item.id);
      this.table.renderRows();
    })
  }

  private tableData(){
    this.displayedColumns.push('id');
    this.displayedColumns.push('name');
    this.displayedColumns.push('description');
    this.displayedColumns.push('boost');
    this.displayedColumns.push('actions');

    this.dataSource = new MatTableDataSource(this.items)
  }
  
  deleteItem(element: Item){
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
          this.itemService.delete(element.id).subscribe(response => {
            this.items.splice(this.items.findIndex(x => x.id == element.id), 1);
            this.table.renderRows();
          })
        }
        else{
          this.items.splice(this.items.findIndex(x => x.id = element.id), 1);
        }
    
        this.table.renderRows();
      }
    })
  }

}
