import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, from } from 'rxjs';
import { VehicleDetail } from 'src/app/model/VehicleDetail';
import * as moment from "moment";
import { CarDetailService } from 'src/app/service/car-detail.service';
import { FormBook } from 'src/app/model/FormBook';
import { Router } from "@angular/router";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  storeSubscription: Subscription;
  vehicleDetail: VehicleDetail;
  startDate: string;
  endDate: string;
  typeVehicle: number;
  constructor(private store: Store<any>,
    public carDetailService: CarDetailService,
    private router: Router) { }

  ngOnInit() {
    this.storeSubscription = this.store.select("datas").subscribe(data => {
      this.typeVehicle = data.typeVehicle;
      this.startDate = moment(data.startDate).format('YYYY-MM-DD HH-MM-SS');
      this.endDate = moment(data.endDate).format('YYYY-MM-DD HH-MM-SS');
      this.vehicleDetail = data.vehicleDetail;
    });
  }
  bookCar(){
    console.log(this.vehicleDetail);
    
    const param :FormBook = {
      endDate:this.endDate,
      startDate: this.startDate,
      type: this.typeVehicle,
      vehicle_id: this.vehicleDetail.id
    }
    console.log(param);
    
    this.carDetailService.bookCar(param).subscribe(res => {
      console.log(res);
      if(res == "OK"){
        this.router.navigateByUrl("/");
      }
    }
    );
  }

}
