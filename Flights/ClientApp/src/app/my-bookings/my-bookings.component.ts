import { Component, OnInit } from '@angular/core';
import { BookingRm } from '../api/models/booking-rm';
import { BookingService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs';
import { BookDto } from '../api/models';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings!: BookingRm[];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.bookingService.listBooking$Json({email: user?.email!}).subscribe(bs => this.bookings = bs);
    })
  }

  cancel(booking: BookingRm){
    const dto: BookDto = {
      flightId: booking.flightId,
      passengerEmail: booking.passengerEmail,
      numberOfSeats: booking.numberOfBookedSeats,
    }
    this.bookingService.cancelBooking({ body: dto }).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b != booking)
      }
    });
  }
 
}
