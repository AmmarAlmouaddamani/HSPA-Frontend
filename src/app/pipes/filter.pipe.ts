import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../model/property';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  // value: العقار الممر
  // propName: خاصية العقار التي نريد عمل الفلترة بناء عليها
  // filterString : قيمة خاصية العقار الممرر
  transform(value: any[], propName: string, filterString: string): any[] {
    // انشاء مصفوفة لتخزين العقارات التي خاصيتها مطابقة لقيمة الفلترة
    let resultArray = [];
    if (value) {
        if (value.length === 0 || filterString === '' || propName === '') {
            return value;
        }


        for (const item of value) {
            if (item[propName].toLocaleLowerCase().includes(filterString.toLocaleLowerCase())) {
                resultArray.push(item);
            }
       }
    }
    // إذا كانت القيمة غير موجودة أو تمت معالجة كل العناصر، نعيد النتيجة
    return resultArray;
  }



}
