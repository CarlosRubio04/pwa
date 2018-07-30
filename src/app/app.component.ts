import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../services/auth.service';
import { MessagingService } from "../services/messaging.service";
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn = false;
  loggedUser:any = null;
  loggedUserPic:any = null;
  message: any = {};

  constructor(private autorizacionService:AutorizacionService, 
    private swUpdate:SwUpdate, 
    private messagingService: MessagingService){
    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid) {
          this.loggedIn = true;
          setTimeout(()=> {
            this.loggedUser = this.autorizacionService.getUser().currentUser.displayName;
            this.loggedUserPic = this.autorizacionService.getUser().currentUser.photoURL;
              console.log(this.loggedUserPic);
          }, 500);
        }else {
          this.loggedIn = false;
        }
      }, (error)=>{
        this.loggedIn = false;
      })
  }

  loggout() {
    this.autorizacionService.loggout();
  }

  ngOnInit(): void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe( ()=>{
        window.location.reload();
      })
    }

    this.messagingService.getPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}