import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { RecipeService } from 'src/app/shared/recipe.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy{
  private userSub:Subscription
  isAuth = false
  // @Output() tabNameEmit = new EventEmitter<string>
  // onSelect(tabName:string){
  //   this.tabNameEmit.emit(tabName)
  // }
constructor(private strorgeService:StorageService , private authService:AuthService , private router:Router ){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(res=>{
      this.isAuth = !!res
      // console.log("res:"+ this.isAuth )
    })
  }

  onSendRecipes(){
    this.strorgeService.storageRecipes().subscribe((res)=>{
      // console.log(res);
    })
  }
  onFatchRecipes(){
    this.strorgeService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  onLogOut(){
    this.authService.logOut()
  }
}
