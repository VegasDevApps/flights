import { Component } from '@angular/core';
import { PassengerService } from '../api/services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent {

  constructor(
    private passengerService: PassengerService,
    private fb: FormBuilder
  ){}

  form = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    isFemale: [true]
  });

  register(){
    console.log("Form values: ", this.form.value);
    this.passengerService.registerPassenger({ body: this.form.value })
      .subscribe(() => console.log("Form posted to server"));
  }
}
