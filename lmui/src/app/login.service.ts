import {Injectable,Inject } from '@angular/core';
import {Router} from '@angular/router';


export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
var users = [
  new User('lm@lm.com','lm'),
  new User('user1@gmail.com','a23'),
  new User('Isabelle','Isabelle')
];
 
@Injectable()
export class LoginService  {
 
  private _userLogged:boolean;
  
  constructor(private _router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    //this._router.navigate(['Login']);
     this._userLogged=false;
  }
 
  login(user){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      this._router.navigate(['LMUI']);      
      this._userLogged=true;
      return true;
    }
    return false;
 
  }
 
   checkCredentials():boolean{
    if (localStorage.getItem("user") === null){
        this._userLogged=false;
        return false;
    }
    this._userLogged=true;
    return true;
  } 
}