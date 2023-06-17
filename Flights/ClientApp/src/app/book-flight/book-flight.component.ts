import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { FlightRm } from '../api/models';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  flightId = 'not loaded';
  flight: FlightRm = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ){}

  ngOnInit(): void {
    //this.route.paramMap.subscribe(p => this.findFlight(p.get("flightId")));
    this.route.data.subscribe(({ flight }) => {
      if(flight) this.flight = flight;
    })
  }

  // private findFlight = (flightId: string | null) => {
  //   this.flightId = flightId ?? 'not passed';

  //   this.flightService.findFlight$Json({ id: this.flightId }).subscribe({
  //     next: r => this.flight = r,
  //     error: this.handleError
  //   });
  // }

  // private handleError = (err: any) => {
  //   console.log("Response Error. Status: ", err.status);
  //   console.log("Response Error. Status Text: ", err.statusText);
  //   console.log(err);
  //   this.router.navigate(['/search-flights']);
  // }
}
