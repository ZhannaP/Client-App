import { Component, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/core/constants/routeConstants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  chempions: string = `/${RouteConstants.CHEMPIONS}`;
  items: string = `/${RouteConstants.ITEMS}`;
  teams: string = `/${RouteConstants.TEAMS}`;
  tournaments: string = `/${RouteConstants.TOURNAMENTS}`;

  constructor() { }

  ngOnInit(): void {
  }

}
