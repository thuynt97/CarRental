import { createAction, props, createReducer, on, Action} from '@ngrx/store';


export interface State {
  location: string;
  startDate: string;
  endDate: string;
}

export const initialState: State = {
  location: "",
  startDate: "",
  endDate: "",
};

export const setLocation = createAction("Set location", props<{location : string}>());
export const setStartDate = createAction("Set start date", props<{startDate : string}>());
export const setEndDate = createAction("Set end date", props<{endDate : string}>());

const dateReducer = createReducer(
  initialState,
  on(setLocation, (state, { location }) => ({...state, location})) ,
  on(setStartDate, (state, { startDate }) => ({...state, startDate})) ,
  on(setEndDate, (state, { endDate }) => ({...state, endDate}))
);

export function reducer(state: State | undefined, action: Action) {
  return dateReducer(state, action);
}