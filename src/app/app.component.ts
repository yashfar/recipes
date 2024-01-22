import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  // nowTabname="recipes"

  // onChangeTab(tabName:string){
  //   this.nowTabname = tabName;
  // }


}
