import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertifyService } from '../services/Alertify.service';


@Component({
  selector: 'spa-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loggedinUser!:string | null; // المستخدم المسجل دخول وله توكن

  //---------------------------
  //سنستخدم هذه الدالة من اجل التحكم في اظهار و اخفاء روابط (التسجيل - تسجيل الدخول - تسجيل الخروج)
  //---------------------------
  loggedin(){
    this.loggedinUser = localStorage.getItem('token'); // جلب التوكن من لوكال ستوريج للمستخدم المسجل دخول
    return this.loggedinUser;
  }

  //---------------
  // تسجيل الخروج
  //---------------
  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('You are loged out!');
  }

}
