import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import * as dataVehicle from "../../common/data";
import { SearchCarService } from "src/app/service/search-car.service";
import { Store } from "@ngrx/store";
import {
  setStartDate,
  setEndDate,
  setLocation,
  setListVehicle,
  setTypeVehicle,
  setLocations
} from "src/app/common/store.reducer";
import { Router } from "@angular/router";
import * as moment from "moment";
import { FormSearch } from 'src/app/model/FormSearch';
import { Vehicle } from 'src/app/model/Vehicle';


@Component({
  selector: "app-search-car",
  templateUrl: "./search-car.component.html",
  styleUrls: ["./search-car.component.css"]
})
export class SearchCarComponent implements OnInit {
  formSearchCar: FormGroup = new FormGroup({
    typeVehicle: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date())
  });

  typeVehicle = dataVehicle.type;
  locations: any[] = [];
  listVehicle: Vehicle[] = [];

  constructor(
    private store: Store<any>,
    public searchCarService: SearchCarService,
    private router: Router
  ) {}

   ngOnInit() {
     this.searchCarService
      .getLocation()
      .subscribe(locations => (this.locations = locations));
  }
  saveDateToStore(typeVehicle, location, startDate, endDate, listVehicle, locations) {
    this.store.dispatch(setTypeVehicle({ typeVehicle }));
    this.store.dispatch(setLocation({ location }));
    this.store.dispatch(setStartDate({ startDate }));
    this.store.dispatch(setEndDate({ endDate }));
    this.store.dispatch(setListVehicle({ listVehicle }));
    this.store.dispatch(setLocations({ locations }));
  }
  search() {
    const startDate = moment(
      this.formSearchCar.value.startDate.toISOString()
    ).format("YYYY-MM-DD HH-MM-SS");

    const formSearch: FormSearch = {
      cata: "",
      gear: 0,
      location: this.formSearchCar.value.location,
      moneyHigh: 500000,
      moneyLow: 0,
      seat: 0,
      startDate: startDate
    };
    if (this.formSearchCar.value.typeVehicle === 1) {
      this.searchCarService.getListCar(formSearch).subscribe(res => {
        this.listVehicle = res;
        this.saveDateToStore(
          this.formSearchCar.value.typeVehicle,
          this.formSearchCar.value.location,
          this.formSearchCar.value.startDate,
          this.formSearchCar.value.endDate,
          this.listVehicle,
          this.locations
        );
        
      });
    } else if (this.formSearchCar.value.typeVehicle === 2) {
      this.searchCarService.getListBike(formSearch).subscribe(res => {
        this.listVehicle = res;
        this.saveDateToStore(
          this.formSearchCar.value.typeVehicle,
          this.formSearchCar.value.location,
          this.formSearchCar.value.startDate,
          this.formSearchCar.value.endDate,
          this.listVehicle,
          this.locations
        );
      });
    }

    this.router.navigateByUrl("/cars");
  }
}
