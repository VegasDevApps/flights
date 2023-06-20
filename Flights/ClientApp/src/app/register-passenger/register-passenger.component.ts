import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../api/services';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(
    private passengerService: PassengerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    
  }

  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.min(10), Validators.max(100)])],
    firstName: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(35)])],
    lastName: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(35)])],
    isFemale: [true, Validators.required]
  });

  checkPassenger(): void {
    const email = this.getEmailFromForm();
    if(email){
       this.passengerService.findPassenger({email}).subscribe({
        next: _ => {
          console.log('This passenger exists. Logging in now');
          this.login(email ); 
        },
        error: err => {
          if(err.status !== 404){
            console.error(err);
          }
        }
       })
    }
  }

  register(){

    if(this.form.invalid) return;

    console.log("Form values: ", this.form.value);
    this.passengerService.registerPassenger({ body: this.form.value }) 
      .subscribe({
        next: () => {
          const email = this.getEmailFromForm();
          if(email){
            this.login(email);
          }
        },
        error: console.error
       });
  }

  private getEmailFromForm(): string | null{
    return this.form.get('email') ? this.form.get('email')!.value : null;
  }

  private login(email: string){
    this.authService.loginUser({ email });
    this.router.navigate(['/search-flights']);
  }
}
 