// بنية تطبيق انغولار مستمدة على طريقة بناء تطبيق MVC
// حيث ان: (class <=> controler), (template <=> view), (model <=> model(datatype as class or interface))
// لكن ليس من الضروري في بنية تطبيق انغولار وجود الموديل  وانما هو امر تنظيمي للكود لتحقيق Strongly type
// لتحقيق طريقة بناء ام في سي انشأنا هذه الانترفيس ضمن هذا الملف لتعريف موديل يمثل بيانات (المسكن) بدلا من ان يتم تعريفه من نمط any


// هذه الانترفيس لتعريف بنية كارد المسكن (اي فقط الخصائص التي يحتاجها الكارد)
// اما باقي خصاصيات المسكن ستعرف ضمن كلاس ينفذ هذه الانترفيس(اي سيأخذ خاصياتها و يضيف عليها)
export interface IPropertyBase {
  // ?: يصبح بالامكان انشاء كائن من هذا النوع, قيمه نل (بلا قيم)  property: IProperty = {} ;
  id?: number;
  sellRent?: number;
  name?: string;
  propertyType?: string;
  furnishingType?: string;
  price?: number;
  bhk?: number;
  builtArea?: number;
  city?: string;
  readyToMove?: boolean;
  estPossessionOn?: Date;
  image?: string;
}
