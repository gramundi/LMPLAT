import {Component, ElementRef} from '@angular/core';
import {LoginService, User} from './login.service'
 
@Component({
    selector: 'login-form',
    templateUrl: './view/login.component.html',
    styleUrls:['./css/login.component.css'] 
        
})
 
export class LoginComponent {
 
    public user = new User('','');
    public errorMsg = '';
    
    userAct:boolean;
    
    constructor(
        private _service:LoginService) {
        this.userAct = this.userActive();
        }
 
    login() {
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        }
        this.userAct= this._service.checkCredentials()
        
    }
    
    userActive():boolean{
        if (this._service.checkCredentials()){
            return true;
            
        }
        return false;
    }

    ngOnInit(): void {
        this._service. logout()
    }

}