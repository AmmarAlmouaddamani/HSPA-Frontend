import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs'; // TabsModule: for ngx-bootstrap
import { ButtonsModule } from 'ngx-bootstrap/buttons'; //for ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; //for ngx-bootstrap
import { PropertyCardComponent } from '../property-card/property-card.component';
import { IPropertyBase } from '../../model/iproperty-base';
import { AlertifyService } from '../../services/Alertify.service';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';


@Component({
  selector: 'spa-add-property',
  standalone: true,
  // TabsModule: for ngx-bootstrap
  imports: [PropertyCardComponent,CommonModule, FormsModule,ReactiveFormsModule,TabsModule,ButtonsModule, BsDatepickerModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder, // انشاء الفورم حسب طريقة FormBuilder
    private alertify: AlertifyService,
    private housingService: HousingService
  ){}

  ngOnInit(): void {

    //استدعاء دالة بناء الفورم
    this.CreateAddPropertyForm();

  }

  //----------------------------
  // مصفوفة لتخزين انواع العقارات - فيما بعد سنجلب هذه البيانات من قاعدة البيانات
  //----------------------------
  PropertyType:Array<string> = ['House', 'Apartment', 'Doplex']

  //----------------------------
  // مصفوفة لتخزين حالات فرش العقار
  //----------------------------
  furnishType:Array<string> = ['Fully', 'Semi', 'Unfurnished']


  //----------------------------------------------------------
  // Template Driven Form الحصول على الفورم الممررة من الفيو
  //----------------------------------------------------------
  // @ViewChild('Form') addPropertyForm?: NgForm; // templat driven form

  //-------------
  // ractive form
  //-------------
  addPropertyForm: FormGroup = new FormGroup({}); // ractive form
  // انشاء الفورم حسب طريقة FormBuilder
  CreateAddPropertyForm() {
      this.addPropertyForm = this.fb.group(
        {
          BasicInfo: this.fb.group({ // التبويب الاول
              // sellRent(formControlName): ('', [ ]) is: (elementDefaultValue, elementValidationCondition)
              SellRent: ['1', Validators.required], //
              BHK: [null, Validators.required],
              PType: [null, Validators.required],
              FType: [null, Validators.required],
              Name: [null, [Validators.required,Validators.minLength(5)]],
              City: [null, Validators.required]
          }),

          PriceInfo: this.fb.group({
              Price: [null, Validators.required],
              Security: [0],
              Maintenance: [0],
              BuiltArea: [null, Validators.required],
              CarpetArea: [null],
          }),

          AddressInfo: this.fb.group({
              FloorNo: [null],
              TotalFloor: [null],
              Address: [null, Validators.required],
              LandMark: [null],
          }),

          OtherInfo: this.fb.group({
              RTM: [null, Validators.required],
              PossessionOn: [null],
              AOP: [null],
              Gated: [null],
              MainEntrance: [null],
              Description: [null]
          })
      });
  }


  //---------------------------------------------
  // #region <Getter Methods - جلب عناصر الفورم(العقار)>
  //---------------------------------------------

  //  #region <BasicInfo Group>:
  //-----------------------------
  get basicInfo(){
    //return this.addPropertyForm.controls['PriceInfo'] as FormGroup; // طريقة 1
    return this.addPropertyForm.get('BasicInfo') as FormGroup; // طريقة 2
  }
  // عناصرها:
  //----------
  get SellRent(){
    return this.addPropertyForm.get('BasicInfo.SellRent') as FormControl;
  }
  get BHK() {
    return this.addPropertyForm.get('BasicInfo.BHK') as FormControl;
  }

  get PType() {
    return this.addPropertyForm.get('BasicInfo.PType') as FormControl;
  }

  get FType() {
    return this.addPropertyForm.get('BasicInfo.FType') as FormControl;
  }

  get Name() {
    return this.addPropertyForm.get('BasicInfo.Name') as FormControl;
  }

  get City() {
    return this.addPropertyForm.get('BasicInfo.City') as FormControl;
  }
  // #endregion

  //  #region <PriceInfo Group>
  //---------------------------
  get PriceInfo() {
    return this.addPropertyForm.get('PriceInfo') as FormGroup;
  }
  // عناصرها:
  //----------
  get Price() {
    return this.addPropertyForm.get('PriceInfo.Price') as FormControl;
  }

  get BuiltArea() {
    return this.addPropertyForm.get('PriceInfo.BuiltArea') as FormControl;
  }

  get CarpetArea() {
    return this.addPropertyForm.get('PriceInfo.CarpetArea') as FormControl;
  }

  get Security() {
    return this.addPropertyForm.get('PriceInfo.Security') as FormControl;
  }

  get Maintenance() {
    return this.addPropertyForm.get('PriceInfo.Maintenance') as FormControl;
  }
  // #endregion

  // #region <AddressInfo Group>
  //-----------------------------
  get AddressInfo() {
    return this.addPropertyForm.get('AddressInfo') as FormGroup;
  }
  // عناصرها:
  //----------
  get FloorNo() {
    return this.addPropertyForm.get('AddressInfo.FloorNo') as FormControl;
  }

  get TotalFloor() {
    return this.addPropertyForm.get('AddressInfo.TotalFloor') as FormControl;
  }

  get Address() {
    return this.addPropertyForm.get('AddressInfo.Address') as FormControl;
  }

  get LandMark() {
    return this.addPropertyForm.get('AddressInfo.LandMark') as FormControl;
  }
  // #endregion

  // #region <OtherInfo Group>
  //-----------------------------
  get OtherInfo() {
    return this.addPropertyForm.get('OtherInfo') as FormGroup;
  }
  // عناصرها:
  //----------
  get RTM() {
    return this.addPropertyForm.get('OtherInfo.RTM') as FormControl;
  }

  get PossessionOn() {
    return this.addPropertyForm.get('OtherInfo.PossessionOn') as FormControl;
  }

  get AOP() {
    return this.addPropertyForm.get('OtherInfo.AOP') as FormControl;
  }

  get Gated() {
    return this.addPropertyForm.get('OtherInfo.Gated') as FormControl;
  }

  get MainEntrance() {
    return this.addPropertyForm.get('OtherInfo.MainEntrance') as FormControl;
  }

  get Description() {
    return this.addPropertyForm.get('OtherInfo.Description') as FormControl;
  }
  // #endregion
  // #endregion


  //-----------------------------
  // كائن عرض العقار (الكارد), يتم تعبئته من الفورم ثم تمريره للكومبوننت (بروبرتي كارد) لعرض البيانات المدخلة عليه مباشرة [()]
  //-----------------------------
  propertyView: IPropertyBase={}; // *** Nooooo => propertyas FormGroupView!: IProperty;


  // عند النقر على زر الغاء يرجعنا للعنوان الجذر والذي ربط به الكومبوننت (بروبرتي ليست - بيع)
  onBack(){
    this.router.navigate(['/'])
  }

  onSubmit(){
    // قبل اي شيئ تأكد من صلاحية التبويبات (اكتمال بيانات العقار المشروطة (مطلوب - اكبر من - اصغر من ..))
    if(this.allTabsValid()){

      // استدعاء دالة انشاء كائن العقار
      this.mapProperty();

      // ارسال العقار للسيرفس لاصافته الى قاعدة البيانات
      this.housingService.addProperty(this.property);

      // اظهر رسالة نجاح اضافة عقارك الى الموقع
      this.alertify.success('Congrats, your property listed successfully on our website')

      // واعد توجيه المستخدم لصفحة العقارات المعروضة للاجار في حال كان العقار المدخل للاجار
      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else { // او اعد توجيه المستخدم لصفحة العقارات المعروضة للبيع في حال كان العقار المدخل للبيع
          this.router.navigate(['/']);
      }

        console.log(this.addPropertyForm)

    // اما في حال عدم اكتمال البيانات المطلوبة ارجع للتبويب الغير صالح لاكمال بياناته المطلوبة مع اظهار رسالة بعدم نجاح اضافة العقار للموقع
    }else {
      this.alertify.error('Please review the form and provide all valid entries');
    }

  }

  //----------------------------------------------------------
  // دالة التحقق من صلاحية التبويبات (اكتمال بيانات العقار)
  // في حال اي تبويب غير صالح ارجع اليه و اكمل بياناته
  //----------------------------------------------------------
  allTabsValid(): boolean{

    // في حال تبويب المعلومات الأساسية غير صالح
  if (this.basicInfo.invalid) {
    this.selectTab(0); // انتقل اليه
    this.nextClicked = true; // ثم فعل خاصية اظهار رسائل الخطأ لتظهر رسالة كل عنصر غير صالح
    return false; // اخرج من الدالة دون متابعة باقي الشروط
  }

  // تحقق من صحة تبويب المعلومات المالية
  if (this.PriceInfo.invalid) {

    this.selectTab(1);
    this.nextClicked = true;
    return false;
  }
  // تحقق من صحة تبويب معلومات العنوان
  if (this.AddressInfo.invalid) {

    this.selectTab(2);
    this.nextClicked = true;
    return false;
  }
  // تحقق من صحة تبويب المعلومات الاضافية
  if (this.OtherInfo.invalid) {

    this.selectTab(3);
    this.nextClicked = true;
    return false;
  }

  // إذا كانت جميع التبويبات صالحة
  return true;

  }


  // الحصول على مجموعة التبويبات
  //------------------------------
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  //-------------------------------------------------------------
  // دالة الانتقال للتبويب التالي تعمل مع حدث النقر على التالي
  // التابات مرقمة تسلسليا بشكا ضمني ابتداء من 0
  //-------------------------------------------------------------
  nextClicked: boolean = false; // خاصية للتحكم في عرض رسائل عدم الصحة

  selectTab(nextTabId: number, isCurrentTabValid: boolean = true ) {
    this.nextClicked = true;
     // الانتقال للتبويب التالي فقط في حال ان التبويبات موجودة والتبويب الحالي صالح
    if(this.formTabs && this.formTabs.tabs && this.formTabs.tabs[nextTabId] && isCurrentTabValid){
      this.formTabs.tabs[nextTabId].active = true; // الانتقال للتبويب التالي
      this.nextClicked = false; // اعادة تهيئة خاصية التحكم بعرض رسائل الخطأ
    }
  }

  //------------------------------------------------------------
  // دالة انشاء كائن العقار و اسناد بيانات النموذج له (كلها)
  // ثم تخزينه في قاعدة البيانات
  //-------------------------------
  property = new Property();

  mapProperty(): void {
   // this.property.id = this.housingService.newPropID();
    this.property.sellRent = +this.SellRent.value;       // Sell-Rent: (بيع - تأجير)
    this.property.bhk = this.BHK.value;                  // BHK: (Bedroom, Hall, Kitchen) - عدد الغرف
    this.property.propertyType = this.PType.value;       // PropertyType: (منزل, شقة, مزدوج) نوع العقار
    this.property.furnishingTypeId = this.FType.value;   // furnishType: (مفروش, شبه مفروش, غير مفروش) فرش العقار
    this.property.name = this.Name.value;                // Property name اسم او عنوان العقار
    this.property.city = this.City.value;                // Property city مدينة العقار

    this.property.price = this.Price.value;               // سعر البيع او الاجار (حسب الاختيار)
    this.property.security = this.Security.value;         // تأمينات ضمان: فقط في حالة التأجير
    this.property.maintenance = this.Maintenance.value;   // تأمينات صيانة: فقط في حالة التأجير
    this.property.builtArea = this.BuiltArea.value;       // ماحسة العقار
    this.property.carpetArea = this.CarpetArea.value;     // مساحة السجاد ضمن الفرش

    this.property.floorNo = this.FloorNo.value;           // رقم الطابق
    this.property.totalFloors = this.TotalFloor.value;    // عدد الطوابق
    this.property.address = this.Address.value;           // العنوان
    this.property.address2 = this.LandMark.value;         // عنوان ثاني (علامة مميزة)

    this.property.readyToMove = this.RTM.value;           // حالة الجهوزية للسكن
    this.property.estPossessionOn = this.PossessionOn.value // التاريخ المتوقع للحيازة
    this.property.age = this.AOP.value;                   // عمر المسكن
    this.property.gated = this.Gated.value;               // مسور - مجتمع مغلق
    this.property.mainEntrance = this.MainEntrance.value; // جهة المدخل الرئيسي
    this.property.description = this.Description.value;   // تفاصيل اضافية
    this.property.postedOn = new Date();                  // تاريخ اضافة المسكن للموقع
  }



}



