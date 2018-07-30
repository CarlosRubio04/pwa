import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { AutorizacionService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'app';
  categorias: any = ['Trabajo', 'Personal'];
  nota : any = {};
  notas : any = [];
  toggleState : boolean = false;

  loggedIn: boolean = false;
  userId: any = null;

  constructor(private autorizacionService:AutorizacionService, 
    private mainService:MainService, 
    private router:Router,
    public snackBar: MatSnackBar){

    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid) {
          this.loggedIn = true;
          setTimeout(()=> {
            this.userId = this.autorizacionService.getUser().currentUser.uid;
              console.log(this.userId);
          }, 500);
        }else {
          this.loggedIn = false;
          this.router.navigate(['/login']);
        }
      }, (error)=>{
        this.loggedIn = false;
      });

    this.mainService.getNotes().valueChanges()
      .subscribe((fbNotes)=>{
         this.notas = fbNotes;
      });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  guardarNota(): void {
    if(!this.nota.id){
       this.nota.id = Date.now();
    }
    this.nota.auth = this.userId;
    this.mainService.createNote(this.nota)
    .then(() => {
      this.nota = {};
      this.openSnackBar('Note saved', 'success');
    })
    .catch(err => {
      console.log(err);
      this.openSnackBar('Opps, Something has happened', 'error');
    });
  }

  selectNota(nota){
    this.nota = nota;
    this.toggleState = true;
  }

  eliminarNota(nota): void {
    this.mainService.deleteNote(nota)
    .then(() => {
      this.openSnackBar('Note deleted', 'success');
    })
    .catch(err => {
      console.log(err);
      this.openSnackBar('Opps, Something has happened', 'error');
    });
  }
}

