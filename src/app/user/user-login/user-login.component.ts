import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { AlertifyService } from '../../services/Alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'spa-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{

constructor(
  private authService: AuthService, // سيرفس التحقق من وجود المستخدم الذي يسجل دخول
  private alertify: AlertifyService, // سيرفس لاستخدام مكتبه (اليرتي فاي) لتحسين شكل العرض و الرسائل المنبثقة
  private router: Router

){}
  ngOnInit(): void {


  }

  onLogin(logInForm: NgForm){
    let userLogInData:User = logInForm.value; // الحصول على معلومات تسجيل الدخول(الاسم + كلمة السر)
    const token = this.authService.authUser(userLogInData); // في حال وجود المستخدم سنخزن اسمه كتوكن

    if(token){
      // تخزين (التوكن) ضمن( لوكال ستوريج)
      localStorage.setItem('token',token.userName);
      // اظهار رسالة نجاح تسجيل الدخول
      this.alertify.success('login successful');
      // تحويل المستخدم لصفحة الرئيسية في الموقع
      this.router.navigate(['/']);
    }else{
      this.alertify.error('login not successful');
    }
  }

}
