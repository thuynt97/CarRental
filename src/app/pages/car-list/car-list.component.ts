import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import * as dataVehicle from "../../common/data";
import { CarListService } from "src/app/service/car-list.service";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as moment from "moment";
import { SearchCarService } from "src/app/service/search-car.service";
import { FormSearch } from "src/app/model/FormSearch";
import { Router } from "@angular/router";
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from "@angular/cdk/overlay/typings/overlay-directives";
import { Vehicle } from "src/app/model/Vehicle";
import { VehicleDetail } from "src/app/model/VehicleDetail";
import { setVehicleDetail } from "src/app/common/store.reducer";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.css"]
})
export class CarListComponent implements OnInit {
  seatCars = dataVehicle.seatCar;
  gearCars = dataVehicle.gearCar;
  gearCarName: string;
  catalogueCars: any[] = [];
  locations;
  locationName: string;
  gearBikes = dataVehicle.gearBike;
  catalogueBikes;
  advancedCarForm: FormGroup = new FormGroup({
    seatCar: new FormControl(),
    gearCar: new FormControl(),
    catalogueCar: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl()
  });
  advancedBikeForm: FormGroup = new FormGroup({
    gearBike: new FormControl(),
    catalogueBike: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl()
  });
  storeSubscription: Subscription;
  startDateString;
  startDate: Date;
  endDate: Date;
  defaultLocation;

  max = 100;
  min = 0;
  step = 1;

  typeVehicle: number;
  indexTabChange: number;
  listVehicle: Vehicle[];
  vehicleDetail: VehicleDetail;

  constructor(
    public carListService: CarListService,
    private store: Store<any>,
    public searchCarService: SearchCarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchCarService
      .getCatalogCar()
      .subscribe(catalogs => (this.catalogueCars = catalogs));
    this.searchCarService
      .getCatalogBike()
      .subscribe(catalogs => (this.catalogueBikes = catalogs));

    this.storeSubscription = this.store.select("datas").subscribe(data => {
      this.typeVehicle = data.typeVehicle;
      this.defaultLocation = data.location;
      this.startDateString = data.startDate;
      this.startDate = new Date(this.startDateString);
      this.endDate = new Date(data.endDate);
      this.listVehicle = data.listVehicle;
      this.locations = data.locations;
      this.setDataForm(data);
    });
    const location = this.locations.find(
      location => location.id === this.defaultLocation
    );
    if (location) {
      this.locationName = location.name;
    }
    if (this.typeVehicle === 1) {
      this.indexTabChange = 0;
    } else if (this.typeVehicle === 2) {
      this.indexTabChange = 1;
    }
  }
  setDataForm(data) {
    if (data.typeVehicle) {
      this.advancedCarForm.get("location").setValue(data.location);
      this.advancedCarForm.get("startDate").setValue(new Date(data.startDate));
      this.advancedCarForm.get("endDate").setValue(new Date(data.endDate));
    } else if (data.typeVehicle === 2) {
      this.advancedBikeForm.get("location").setValue(data.location);
      this.advancedBikeForm.get("startDate").setValue(new Date(data.startDate));
      this.advancedBikeForm.get("endDate").setValue(new Date(data.endDate));
    }
  }
  getDetailCar(id: number) {
    if (this.typeVehicle === 1) {
      this.carListService.getListCarDetailById(id).subscribe(vehicleDetail => {
        this.vehicleDetail = vehicleDetail;
        this.saveDateToStore(this.vehicleDetail);
      });
    } else if (this.typeVehicle === 2) {
      this.carListService.getListBikeDetailById(id).subscribe(vehicleDetail => {
        this.vehicleDetail = vehicleDetail;
        this.saveDateToStore(this.vehicleDetail);
      });
    }
    this.router.navigateByUrl("/car-detail");
  }

  getListCar() {
    const formValue = this.advancedCarForm.value;
    
    

    const advancedCarForm: FormSearch = {
      cata: formValue.catalogueCar ? formValue.catalogueCar : "",
      gear: formValue.gearCar ? formValue.gearCar : 0,
      location: formValue.location ? formValue.location : 0,
      moneyHigh: 500000,
      moneyLow: 0,
      seat: formValue.seatCar ? formValue.seatCar : 0,
      startDate: formValue.startDate
        ? moment(formValue.startDate.toISOString()).format(
            "YYYY-MM-DD HH-MM-SS"
          )
        : moment(this.startDateString.toISOString()).format(
            "YYYY-MM-DD HH-MM-SS"
          )
    };
    console.log(advancedCarForm);
    this.searchCarService
      .getListCar(advancedCarForm)
      .subscribe(res => (this.listVehicle = res));
  }
  getListBike() {
    const formValue = this.advancedBikeForm.value;
    const advancedBikeForm: FormSearch = {
      cata: formValue.catalogueCar ? formValue.catalogueCar : "",
      gear: formValue.gearCar ? formValue.gearCar : 0,
      location: formValue.location ? formValue.location : 0,
      moneyHigh: 2000000,
      moneyLow: 0,
      seat: formValue.seatCar ? formValue.seatCar : 0,
      startDate: formValue.startDate
        ? moment(formValue.startDate.toISOString()).format(
            "YYYY-MM-DD HH-MM-SS"
          )
        : moment(this.startDateString.toISOString()).format(
            "YYYY-MM-DD HH-MM-SS"
          )
    };
    console.log(advancedBikeForm);
    this.searchCarService
      .getListBike(advancedBikeForm)
      .subscribe(res => (this.listVehicle = res));
  }
  saveDateToStore(vehicleDetail) {
    this.store.dispatch(setVehicleDetail({ vehicleDetail }));
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent.index);
    if(tabChangeEvent.index === 0) {
      this.getListCar();

    } else if(tabChangeEvent.index === 1) {
      this.getListBike();
    }
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
