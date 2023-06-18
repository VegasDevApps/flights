import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { BookDto, FlightRm } from '../api/models'; 
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  //flightId = 'not loaded';
  flight: FlightRm = {};

  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(254)])] 
  })

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flightService: FlightService,
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

  private handleError(err: any){
    console.log("Response Error. Status: ", err.status);
    console.log("Response Error. Status Text: ", err.statusText);
    console.log(err);
    this.router.navigate(['/search-flights']);
  }

   book(){

    if(this.form.invalid) return;

    console.log(`Booking ${this.form.get('number')?.value} passengers for the flight ${this.flight.id}`);
    const booking: BookDto = {
      flightId: this.flight.id,
      passengerEmail: this.authService.currentUser?.email,
      numberOfSeats: this.form.get('number')?.value ?? 0
    }
    this.flightService.bookFlight({ body: booking }).subscribe({
      next: () => this.router.navigate(['/my-booking']),
      error: err => this.handleError(err)
    })
  }

  get number() {
    return this.form.controls.number;
  }
}
