import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()
export class AutorizacionService {

	constructor (private angularFireAuth: AngularFireAuth, private router:Router) {
		this.isLogged();
	}

	public facebookLogin(){
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((result)=>{
                console.log(result);
                this.router.navigate(['/home']);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

	public login = (email, password) => {
		this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
			.then((response) => {
				// alert('Usuario Logeado');
				// console.log(response);
				//this.router.navigate(['cursos']);
			})
			.catch((error)=> {
				alert('Error');
				console.log(error);
			})
	};
	public singin = (email, password) => {
		this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				// alert('Usuario Registrado');
				// console.log(response);
				//this.router.navigate(['cursos']);
			})
			.catch((error)=> {
				alert('Error');
				console.log(error);
			})
	};

	public isLogged() {
		return this.angularFireAuth.authState;
	};

	public loggout() {
		this.angularFireAuth.auth.signOut();
		this.router.navigate(['/']);
	}

	public getUser(){
		return this.angularFireAuth.auth;
	}
}