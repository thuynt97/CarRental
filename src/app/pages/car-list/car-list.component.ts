import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import * as dataVehicle from "../../common/data";
import { CarListService } from "src/app/service/car-list.service";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.css"]
})
export class CarListComponent implements OnInit {
  seatCars = dataVehicle.seatCar;
  gearCars = dataVehicle.gearCar;
  catalogueCars;
  locations = dataVehicle.location;
  gearBikes = dataVehicle.gearBike;
  catalogueBikes = dataVehicle.catalogueBike;
  advancedCarForm: FormGroup = new FormGroup({
    seatCar: new FormControl(),
    gearCar: new FormControl(),
    catalogueCar: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  advancedBikeForm: FormGroup = new FormGroup({
    gearBike: new FormControl(),
    catalogueBike: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  storeSubscription: Subscription;
  startDate: Date;
  endDate: Date;

  constructor(
    public carListService: CarListService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.storeSubscription = this.store.select("dates").subscribe(datetime => {


      this.startDate = new Date(moment(datetime.startDate).format("MM/DD/YYYY"));
      console.log(this.startDate);

      this.endDate = new Date(moment(datetime.endDate).format("MM/DD/YYYY"));

      console.log(this.endDate);

    });
  }

  getListCar(event: any) {
    console.log(this.advancedCarForm.value);

    // const parram : any = {

    // };
    // this.carListService.getListCarAdvanced(parram).subscribe(
    // console.log(parram)
    // );
  }
  getListBike(event: any) {
    console.log(this.advancedBikeForm.value);

    // const parram : any = {

    // };
    // this.carListService.getListCarAdvanced(parram).subscribe(
    // console.log(parram)
    // );
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
