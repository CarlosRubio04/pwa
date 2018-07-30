import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	loginParams:any = {};
  loggedIn = false;
  loggedUser:any = null;
  constructor(private autorizacionService:AutorizacionService, private router:Router) { 

    this.autorizacionService.isLogged()
    .subscribe((result)=>{
      if(result && result.uid) {
        this.loggedIn = true;
        setTimeout(()=> {
          this.loggedUser = this.autorizacionService.getUser().currentUser.email;
          console.log(this.loggedUser);
          this.router.navigate(['/home']);
        }, 500);
      }else {
        this.loggedIn = false;
      }
    }, (error)=>{
      this.loggedIn = false;
    }); 
  }

  login() {
  	this.autorizacionService.login(this.loginParams.email, this.loginParams.password);
  }
  facebookLogin(){
    this.autorizacionService.facebookLogin();
  }
}