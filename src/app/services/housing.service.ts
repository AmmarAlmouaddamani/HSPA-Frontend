import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProperty } from '../model/iproperty';
import { Observable, catchError, tap, throwError,map } from 'rxjs';
import { IPropertyBase } from '../model/iproperty-base';
import { Property } from '../model/property';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }


 // الحصول على العقارات التي للبيع او التي للاجار حسب قيمة الباراميتر الممرر
 getAllProperties(SellRent?:number): Observable<Property[]>{
  if(SellRent){
    return this.http.get<Property[]>('data/properties.json')
    .pipe(
      map(properties =>
        properties.filter(property => property.sellRent === SellRent)
      ),
      tap(res => console.log('pipe', res)),
      catchError(this.handelError)
    );
  }else{
    return this.http.get<Property[]>('data/properties.json')
  }

}

  // دالة هندلة الاخطاء
  private handelError(err: HttpErrorResponse){
    // err: object of type (HttpErrorResponse), that content properties: (name, message, error)
    // يمكننا ضمن هذه الدالة:
    // - ارسال الخطأ الناتج ل (اي بي اي) خاصة بتلويغ الاخطاء الناتجة لمتابعتها من خلالها
    //   ففي حال كانت الاخطاء ناتجة من الفرونت ايند ضمن المستعرض, لايمكن معرفتها من قبل المطور دون تلويغ ضمن (اي بي اي) تتعامل معه
    // - يمكننا ايضا فحص نوع الخطأ (فرونت - باك) والتعامل مع كل نوع بطريقة معينة, كإرسال رسالة للمستخدم تخبره بالخطأ
    //   حيث امكانية تحديد نوع الخطأ تتم من خلال HttpErrorResponse:

    let errorMessage = '';

    if(err.error instanceof ErrorEvent) // Client side error (EX: network error)
      errorMessage = `Something went wrong, try again later msg: ${err.error.message}`;
    else // Server side error
      errorMessage = `Server returned error code: ${err.status}, Error message: ${err.message}`

      // مرتجع هذه الدالة لابد ان يكون اوبزيرفابيل لان مرتجع الدالة (غيت بروداكت) هو اوبزيرفابيل
    // فاذا اردنا بلع الخطأ دون هندلته ولاحتى ارجاع رسالة بمضمونه, نكتفي  بارجاع اوبزيرفابيل فارغ باحدى الطريقتين التاليتين:
    // return of([]); // ارجاع اوبزيرفابيل فارغ
    // return EMPTY;  // ارجاع اوبزيرفابيل فارغ
    // وايضا اذا اردنا بلعه (عدم معالجته) ولكن نريد ارجاع للاوبزيرفر خطأ قيمته الرسالة الناتجة عن فحص نوع الخطأ الحاصل, نستخدم:
    return throwError(() => errorMessage); // ارجاع اوبزيرفابيل فيه رسالة الخطأ
  }


  // دالة اضافة مسكن جديد لقاعدة البيانات
  addProperty(property:IPropertyBase){
    localStorage.setItem('newProp',JSON.stringify(property));
  }


  // دالة الحصول على المسكن من خلال رقمه
  //baseUrl = environment.baseUrl;
  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
       // throw new Error ('some error');
        return propertiesArray.find(p => p.id == id);
      })
    );
    //return this.http.get<Property>(this.baseUrl + '/property/detail/'+id.toString());
  }


  getPropertyAge(dateofEstablishment: string): string
    {
        const today = new Date();
        const estDate = new Date(dateofEstablishment);
        let age = today.getFullYear() - estDate.getFullYear();
        const m = today.getMonth() - estDate.getMonth();

        // Current month smaller than establishment month or
        // Same month but current date smaller than establishment date
        if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
            age --;
        }

        // Establshment date is future date
        if(today < estDate) {
            return '0';
        }

        // Age is less than a year
        if(age === 0) {
            return 'Less than a year';
        }

        return age.toString();
    }


}


