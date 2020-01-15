import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-car',
  templateUrl: './history-car.component.html',
  styleUrls: ['./history-car.component.css']
})
export class HistoryCarComponent implements OnInit {

  vehiclesConfirm: any[]=[];
  constructor() { }

  ngOnInit() {
    this.vehiclesConfirm = JSON.parse(localStorage.getItem("VehiclesConfirm"));
  }

}
