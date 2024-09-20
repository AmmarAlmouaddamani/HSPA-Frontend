// هذا الكلاس سيعبر عن النوع الذي ينتمي له المسكن (حيث يعرف فيه جميع خاصيات المسكن)
import { Photo } from "./Photo";
import { IPropertyBase } from "./iproperty-base";

export class Property implements IPropertyBase {

  id?: number;
  sellRent?: number;
  name?: string;
  propertyTypeId?: number;
  propertyType?: string;
  bhk?: number;
  furnishingTypeId?: number;
  furnishingType?: string;
  price?: number;
  builtArea?: number;
  carpetArea?: number;
  address?: string;
  address2?: string;
  cityId?: number;
  city?: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove?: boolean;
  age?: string;
  mainEntrance?: string; // جهة المدخل الرئيسي
  security?: number;
  gated?: boolean; // مسور - مجتمع مغلق
  maintenance?: number;
  estPossessionOn?: Date; // التاريخ المتوقع للحيازة
  photo?: string;
  description?: string;
  photos?: Photo[];
  postedOn?: Date; // تاريخ اضافة المسكن للموقع
  image?: string;
}
