import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AutorizacionService } from './auth.service'; 

@Injectable()
export class MyGuard implements CanActivate {
  loggedIn = false;

	constructor(private autorizacionService:AutorizacionService){
		this.autorizacionService.isLogged()
			.subscribe((result)=>{
				if(result && result.uid) {
					this.loggedIn = true;
				}else {
					this.loggedIn = false;
				}
			}, (error)=>{
				this.loggedIn = false;
			})
	}

	canActivate(){
		return this.loggedIn;
	}
}
