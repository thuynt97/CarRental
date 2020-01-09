import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import * as dataVehicle from "../../common/data";
import { SearchCarService } from "src/app/service/search-car.service";
import { Store } from "@ngrx/store";
import { setStartDate, setEndDate } from "src/app/common/store.reducer";
import { Router } from '@angular/router';

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
  locations = dataVehicle.location;

  constructor(
    private store: Store<any>,
    public searchCarService: SearchCarService,
    private router: Router
  ) {}

  ngOnInit() {}
  saveDateToStore(startDate, endDate) {
    this.store.dispatch(setStartDate({ startDate }));
    this.store.dispatch(setEndDate({ endDate }));
  }
  searchCar() {
    console.log(this.formSearchCar.value);
    this.saveDateToStore(
      this.formSearchCar.value.startDate,
      this.formSearchCar.value.endDate
    );
    this.router.navigateByUrl("/cars");
    // this.searchCarService.addHero({
    //   "id": "aaa",
    //   "name": "Leeks - Large",
    //   "thumbnail": "https://robohash.org/architectodoloresquo.jpg?size=350x200&set=set1",
    //   "price": 150.05,
    //   "quantity": 87,
    //   "status": true
    // }).subscribe((res) => console.log(res));
  }
  // updateOrders(event) {
  //   // const index = this.typeVehicle.find(item => item.id == event.target.value);
  //   console.log(event);
  //   // console.log(index);
  // }
}
