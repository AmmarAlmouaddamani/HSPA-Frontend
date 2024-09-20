import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor() { }
  //-------------------------
  //تخزين بيانات المستخدمين في لوكال ستوريج
  //-------------------------
  // localStorage: storage data as JSON object => key: {"value"}
  addUsers(user: User): void {
    let users: User[] = []; // مصفوفة لتخزين كل المستخدمين المدخلين
    let usersFromStorage = localStorage.getItem('Users'); // الحصول على البيانات من localStorage

    if (usersFromStorage) { // إذا كان هناك بيانات في localStorage
      users = JSON.parse(usersFromStorage); // تحويل البيانات من (جيسون) إلى كائن
    }
    users = [...users, user]; // إضافة المستخدم الجديد إلى المصفوفة

    // تخزين مصفوفة المستخدمين في لوكال ستوريج بعد تحويلها إلى جيسون
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
