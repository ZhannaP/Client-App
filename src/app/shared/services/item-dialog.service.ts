import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, take } from "rxjs";
import { Item } from "src/app/core/models/item";
import { ItemDialogComponent } from "../dialogs/item-dialog/item-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class ItemDialogService{

    dialogRef!: MatDialogRef<ItemDialogComponent>;

    constructor(private dialog: MatDialog){}

    open(item: Item | null){
        this.dialogRef = this.dialog.open(ItemDialogComponent, {
            disableClose: true,
            width: '900px', 
            height: '450px',
            autoFocus: true,
            position: {top: '15px'},
            data: item?.id
        })
    }

    closed(): Observable<Item>{
        return this.dialogRef.afterClosed().pipe(take(1));
    }
}