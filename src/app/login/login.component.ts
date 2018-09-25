import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
//import {Login} from '../login';
import { HttpClient } from '@angular/common/http';
import { NgForm} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

export class Login{
	 constructor(
	 	private username: string,
		private password: string,
		private remember: boolean){}
 
}


declare var jquery:any;
declare var $ :any;
declare var jQuery :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private loginservice: LoginService) {}

	ngOnInit() {console.log(this.loginservice.isLoged())};
	item: Login;
	submit(form: NgForm){
		alert(form.value.username);
        console.log(form.value.username);
        const body = { username: form.value.username, password: form.value.password, remember: form.value.remember };
        this.loginservice.login(body);  
	}
}