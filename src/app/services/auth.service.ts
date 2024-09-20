// سيرفس التحقق من وجود المستخدم الذي يسجل دخول
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

// دالة التحقق من وجود المستخدم وترجع : User | undefined
// حين اصل لمرحلة الربط مع (اي بي اي) سترجع هذه الدالة توكن بدلا من المستخدم(في حال وجوده)
authUser(userLogInData:any){

  let users: any[] = []; // مصفوفة لتخزين كل المستخدمين المدخلين
  let usersFromStorage = localStorage.getItem('Users'); // الحصول على البيانات من localStorage

  if(usersFromStorage){
    users = JSON.parse(usersFromStorage); // تحويل البيانات من (جيسون) إلى كائن
    // البحث عن المستخدم ضمن مصفوفة المستخدمين و ارجاعه ان وجد
    return users.find(u => u.userName === userLogInData.userName && u.password === userLogInData.password);
  }
}

}
