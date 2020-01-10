import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import * as dataVehicle from "../../common/data";
import { SearchCarService } from "src/app/service/search-car.service";
import { Store } from "@ngrx/store";
import {
  setStartDate,
  setEndDate,
  setLocation
} from "src/app/common/store.reducer";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-car",
  templateUrl: "./search-car.component.html",
  styleUrls: ["./search-car.component.css"]
})
export class SearchCarComponent implements OnInit {
  formSearchCar: FormGroup = new FormGroup({
    typeVehicle: new FormControl(),
    location: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  typeVehicle = dataVehicle.type;
  catalogs: []= [];
  locations: any[] = [];

  constructor(
    private store: Store<any>,
    public searchCarService: SearchCarService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.searchCarService.getCatalog().subscribe((res) => console.log(res));
    this.searchCarService.getLocation().subscribe((res) => console.log(res));
  }
  saveDateToStore(location, startDate, endDate) {
    this.store.dispatch(setLocation({ location }));
    this.store.dispatch(setStartDate({ startDate }));
    this.store.dispatch(setEndDate({ endDate }));
  }
  searchCar() {
    console.log(this.formSearchCar.value);
    this.saveDateToStore(
      this.formSearchCar.value.location,
      this.formSearchCar.value.startDate,
      this.formSearchCar.value.endDate
    );
    this.searchCarService.searchCar(this.formSearchCar.value).subscribe((res) => console.log(res));
    this.router.navigateByUrl("/cars");
  }
}
