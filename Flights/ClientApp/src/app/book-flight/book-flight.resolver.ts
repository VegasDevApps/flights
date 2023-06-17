import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, catchError, map, mergeMap, of, switchMap, take } from 'rxjs';
import { FlightRm } from '../api/models';
import { FlightService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class BookFlightResolver implements Resolve<FlightRm> {

  constructor(private flightService: FlightService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightRm> {
    const id = route.paramMap.get('flightId');

    if(id === null) {
      this.router.navigate(['/not-found']);
      return EMPTY;
    }

    return this.flightService.findFlight$Json({id}).pipe(map(f => {
      if(!f){
        this.router.navigate(['/not-found']);
        //return EMPTY;
      }
      return f;
    }), catchError(err => {
      this.router.navigate(['/not-found']);
      return EMPTY;
    }));

    // const id = route.paramMap.get('flightId');
    // console.log('Vegas: ', id);
    // if(id){
    //   this.flightService.findFlight$Json({id}).subscribe(f => {
    //     if(f) return f;
    //     this.router.navigate(['/not-found']);
    //     return EMPTY;
    //   })
    // }
    // this.router.navigate(['/not-found']);
    // return EMPTY;
  }
}
