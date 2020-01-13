import { createAction, props, createReducer, on, Action } from "@ngrx/store";
import { Vehicle } from '../model/Vehicle';
import { VehicleDetail } from '../model/VehicleDetail';

export interface State {
  typeVehicle: number;
  location: string;
  startDate: string;
  endDate: string;
  listVehicle: Vehicle[];
  locations: any[];
  vehicleDetail: VehicleDetail;
}
export const initialState: State =
  localStorage.getItem("state") != null
    ? JSON.parse(localStorage.getItem("state"))
    : {
        typeVehicle: 1,
        location: "",
        startDate: "",
        endDate: "",
        listVehicle: [],
        locations: [],
        vehicleDetail: {}
      };

export const setTypeVehicle = createAction(
  "Set type vehicle",
  props<{ typeVehicle: number }>()
);
export const setLocation = createAction(
  "Set location",
  props<{ location: string }>()
);
export const setStartDate = createAction(
  "Set start date",
  props<{ startDate: string }>()
);
export const setEndDate = createAction(
  "Set end date",
  props<{ endDate: string }>()
);
export const setListVehicle = createAction(
  "Set list vehicle",
  props<{ listVehicle: Vehicle[] }>()
);
export const setLocations = createAction(
  "Set list location",
  props<{ locations: [] }>()
);
export const setVehicleDetail = createAction(
  "Set vehicle detail",
  props<{ vehicleDetail: {} }>()
);

const dataReducer = createReducer(
  initialState,
  on(setTypeVehicle, (state, { typeVehicle }) => {
    let updateState = { ...state, typeVehicle };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setLocation, (state, { location }) => {
    let updateState = { ...state, location };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setStartDate, (state, { startDate }) => {
    let updateState = { ...state, startDate };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setEndDate, (state, { endDate }) => {
    let updateState = { ...state, endDate };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setListVehicle, (state, { listVehicle }) => {
    let updateState = { ...state, listVehicle };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setLocations, (state, { locations }) => {
    let updateState = { ...state, locations };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  }),
  on(setVehicleDetail, (state, { vehicleDetail }) => {
    let updateState = { ...state, vehicleDetail };
    localStorage.setItem("state", JSON.stringify(updateState));
    return updateState;
  })
);
export function reducer(state: State | undefined, action: Action) {
  return dataReducer(state, action);
}
