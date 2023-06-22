import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // console.log('AUTH: ', this.authService.currentUser);
      // if(!this.authService.currentUser?.email){
      //   console.log('AUTH:  False');
      //   return this.router.parseUrl('/register-passenger');

      // }

      // return true;

      return this.authService.currentUser$.pipe(map(u => {
        console.log(u);
        if(u?.email) return true;
        
        this.router.navigate(['/register-passenger', { requestedUrl: state.url }]);
        return false;
      }));
    }
  
}
