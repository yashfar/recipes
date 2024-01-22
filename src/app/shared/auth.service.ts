import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDataInterface } from '../auth/auth/authData.interface';
import { catchError, tap} from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../auth/auth/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient , private router:Router) { }

  autoLogin(){
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email , userData.id , userData._token , new Date(userData._tokenExpirationDate));
    
    if(loadedUser.token){
        this.user.next(loadedUser)
    }

  }

  logOut(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
  }

  signUp(email:string,password:string){
    return this.http.post<AuthDataInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiyjnBul5wCK3Fz2MgRcnwiuL6bu6d_90' , {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handeleError), tap(resData =>{
      this.handleAuth(resData.email , resData.localId , resData.idToken , resData.expiresIn)
    }))
  }

  signIn(email:string,password:string){
    return this.http.post<AuthDataInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiyjnBul5wCK3Fz2MgRcnwiuL6bu6d_90' , {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handeleError) , tap(resData =>{
      this.handleAuth(resData.email , resData.localId , resData.idToken , resData.expiresIn)
    }))
  }


  
  private handeleError(errorRes:HttpErrorResponse){
    let Errormessage = "An error Occured "
    if(!errorRes.error || !errorRes.error.error){
      return throwError(Errormessage)
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        Errormessage = 'This Email Exist Already'
        break;
      case 'OPERATION_NOT_ALLOWED':
        Errormessage = 'Password sign-in is disabled for this project'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        Errormessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;
      case 'EMAIL_NOT_FOUND':
        Errormessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'INVALID_PASSWORD':
        Errormessage = 'The password is invalid or the user does not have a password.'
        break;
      case 'USER_DISABLED':
        Errormessage = 'The user account has been disabled by an administrator.'
        break;
    }
    return throwError(Errormessage)
  }


  private handleAuth(email:string , id:string , token:string , expire:string){
    const expirationDate = new Date(new Date().getTime() + +expire*1000)
    const user= new User(email, id , token , expirationDate );
    //emit form authservice to use in otherwhere
    this.user.next(user);
    //store in local storage
    localStorage.setItem('userData' , JSON.stringify(user));
  }



}


