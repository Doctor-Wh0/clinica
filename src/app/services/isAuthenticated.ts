import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import { LoginService } from "./login.service"
import { Injectable } from '@angular/core';
let loginService: LoginService = undefined;

declare var jquery:any;
declare var $ :any;
declare var jQuery :any;

@Injectable()
export class isAuthenticated implements CanActivate{
 	constructor(loginservice: LoginService){
 		loginService = loginservice;
 	}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         
    	if(loginService.isLoged()){
    		console.log("IsAuth");
    		return true;

    	}
    	else
    	{
    		$.get("/");
    		console.log("IsnotAuth");
    	}


        //return confirm('Вы уверены, что хотите перейти?');
    }

}