/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from './time-place-rm';
export interface BookingRm {
  airLine?: null | string;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flightId?: string;
  numberOfBookedSeats?: number;
  passengerEmail?: null | string;
  price?: null | string;
}
