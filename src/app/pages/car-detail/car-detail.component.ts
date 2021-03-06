import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription, from } from "rxjs";
import { VehicleDetail } from "src/app/model/VehicleDetail";
import * as moment from "moment";
import { CarDetailService } from "src/app/service/car-detail.service";
import { FormBook } from "src/app/model/FormBook";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { LoginComponent } from "../login/login.component";
import { TokenStorage } from "src/app/common/token.storage";
import { setVehicleConfirm } from 'src/app/common/store.reducer';

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"]
})
export class CarDetailComponent implements OnInit {
  storeSubscription: Subscription;
  vehicleDetail: VehicleDetail;
  startDate: string;
  endDate: string;
  typeVehicle: number;
  vehiclesConfirm: any[] = [];
  constructor(
    private store: Store<any>,
    public carDetailService: CarDetailService,
    private router: Router,
    public dialog: MatDialog,
    private storage: TokenStorage
  ) {}

  ngOnInit() {
    this.storeSubscription = this.store.select("datas").subscribe(data => {
      this.typeVehicle = data.typeVehicle;
      this.startDate = moment(data.startDate).format("YYYY-MM-DD HH-MM-SS");
      this.endDate = moment(data.endDate).format("YYYY-MM-DD HH-MM-SS");
      this.vehicleDetail = data.vehicleDetail;
    });
  }
  bookCar() {

    const param: FormBook = {
      endDate: this.endDate,
      startDate: this.startDate,
      type: this.typeVehicle,
      vehicle_id: this.vehicleDetail.id
    };

    if (this.storage.getToken() != null) {
      this.carDetailService.bookCar(param).subscribe(res => {
        console.log(res);
        if (res) {
          this.vehiclesConfirm.push(res.vehicle);
          const formVehicle = {
            vehiclesConfirm: this.vehiclesConfirm,
            startDate: res.startDate
          }
          window.localStorage.setItem("VehiclesConfirm", JSON.stringify(this.vehiclesConfirm));
          this.router.navigateByUrl("/history-car");
        }
      });
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: "350px",
        height: "450px"
      });

      dialogRef.afterClosed().subscribe(() => window.location.reload());
    }
  }
}
