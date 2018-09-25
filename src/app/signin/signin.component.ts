import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

export class User{
    constructor(public username: string, 
                public email: string, 
                public password: string,
                public confirmpassword: string,
    			public phone: string,
          public remember: boolean,
          public role: string)
    { }
}





declare var jquery:any;
declare var $ :any;
declare var jQuery :any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

public roles = [
    { value: 'admin', display: 'Админ' },
    { value: 'doctor', display: 'Доктор' },
    { value: 'patient', display: 'Пациент' }
];


  submit(form: NgForm){
        //console.log(form);
        let body = {username: form.value.username, email: form.value.email, password: form.value.password, phone: form.value.phone, remember: form.value.remember, role: form.value.role }
        if(form.value.password == form.value.confirmpassword){
          $.post("http://localhost:3000/signup", body)
            .fail(function() {
              alert( "error" );
              console.log("signup error");
            })
            .done(function(data){
              alert(data);
              console.log(data);
            })
        }

    }
  constructor() { }

  ngOnInit() {
  }

}
