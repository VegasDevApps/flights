import { Component, OnInit } from '@angular/core';
import { FlightService } from '../api/services/flight.service';
import { FlightRm } from '../api/models';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
  
  searchResult: FlightRm[] = [];
  
  constructor(private flightService: FlightService, private fb: FormBuilder){}

  searchForm = this.fb.nonNullable.group({
    from: [''],
    destination: [''],
    fromDate: [''],
    toDate: [''],
    numberOfPassengers: [1]
  })

  ngOnInit(): void {
    this.search();
  }

  search(){
    const params = this.searchForm.value;
    this.flightService.searchFlight$Json(this.searchForm.value).subscribe({
      next: r => this.searchResult = r,
      error: this.handleError
    });
  }
  
  private handleError =(err: any) => {
    console.log("Response Error. Status: ", err.status);
    console.log("Response Error. Status Text: ", err.statusText);
    console.log(err);
  }
}