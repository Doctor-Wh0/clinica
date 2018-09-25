import { CookieService } from 'ngx-cookie-service';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

declare var jquery:any;
declare var $ :any;
declare var jQuery :any;
let isloged: boolean = false;
let role: string = undefined;

@Injectable()
export class LoginService{

    
constructor(private cookieService: CookieService){}
 
    login(body){
        $.post("http://localhost:3000/login", body)
         .fail(function() {
            alert( "error from login" );
            console.log("login error");
          })
        .done(function(data){
            //alert(data);
            console.log("!"+data.user.role+"!");
            console.log("!!"+data.sessionID);
            this.cookieService.set( 'session', data.sessionID );
            if (data.role == "patient")
            {
                $.get("/profile");
            } 
            
            if (data.role == "doctor"){
                $.get("/doctor");
            }

            if (data.role == "admin"){
                $.get("/admin");
            }
        })
    }

    isLoged(){
        $.get("http://localhost:3000/isloged")
         .fail(function() {
            console.log("isnotloged");
            return false;
          })
         .done(function(data){
             console.log("isloged!");
             this.isloged = data.status;

             if(this.isloged == false){
                 return false;
             } 
             else 
                 { 
                    this.role = data.role; 
                    return true; 
                 }
         })
    }
       ngOnInit() {
           this.isLoged();
       };
    
}