// استيراد الوحدات اللازمة من مكتبة Angular
import { Pipe, PipeTransform } from '@angular/core';
import { IPropertyBase } from '../model/iproperty-base';

// تعريف الـ Pipe باسم 'sort' والذي يمكن استخدامه بشكل مستقل
@Pipe({
    name: 'sort',
    standalone: true
})
// تصدير الكلاس SortPipe الذي ينفذ واجهة PipeTransform
export class SortPipe implements PipeTransform {

    // تعريف دالة transform التي ستستخدم لترتيب المصفوفة
    transform(value: Array<IPropertyBase>, args: any[]): any {
        // استخراج حقل الترتيب من المعاملات
        const sortField = args[0];
        // استخراج اتجاه الترتيب من المعاملات
        const sortDirection = args[1];
        // تعريف مضاعف لتحديد اتجاه الترتيب
        let multiplier = 1;

        // إذا كان اتجاه الترتيب تنازلي، نضع المضاعف -1
        if (sortDirection === 'desc') {
            multiplier = -1;
        }

        // التحقق من وجود قيمة في المصفوفة
        if (value) {
            // استخدام دالة sort لترتيب المصفوفة
            value.sort((a: any, b: any) => {
                // مقارنة العناصر بناءً على حقل الترتيب
                if (a[sortField] < b[sortField]) {
                    // إذا كان العنصر a أصغر من b، نعيد -1 مضروبة في المضاعف
                    return -1 * multiplier;
                } else if (a[sortField] > b[sortField]) {
                    // إذا كان العنصر a أكبر من b، نعيد 1 مضروبة في المضاعف
                    return 1 * multiplier;
                } else {
                    // إذا كانت العناصر متساوية، نعيد 0
                    return 0;
                }
            });
            // إعادة المصفوفة بعد الترتيب
            return value;
        }
      }
}

