import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttentionTypes } from 'src/app/core/interactionDialog/attentionTypes';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-interaction-dialog',
  templateUrl: './interaction-dialog.component.html',
  styleUrls: ['./interaction-dialog.component.scss']
})
export class InteractionDialogComponent implements OnInit {

  attentionTypes = AttentionTypes;
  message = '';
  detailsVisible: boolean = false;
  details = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.prepareMessage();
  }

  prepareMessage(){
    let items = this.commonService.getArayFromStringsWithNewLineSymbols(this.data.message);

    items.forEach(element => {
      if(element.trim() != ''){
        this.message += `<p>${element}</p>`;
      }
    });

    this.details = `<p>${this.data.details}</p>`;
  }
}
