import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { userService } from '../../services/user.service';
import { User } from '../../model/user';
import { AlertifyService } from '../../services/Alertify.service';


@Component({
  selector: 'spa-user-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  constructor(
     private fb: FormBuilder, // سيرفس لانشاء فورم
     private userService: userService, // سيرفس للتعامل مع بيانات المستخدم (ارسالها ل اي بي اي)
     private alertify: AlertifyService, // سيرفس لاستخدام مكتبه (اليرتي فاي) لتحسين شكل العرض و الرسائل المنبثقة
    ){}

  regesterationForm!: FormGroup; // حقل يمثل فورم سنمرر فورم (اضافة مستخدم) اليه لتخزين قيم عناصره (عمل بايندنغ معه)


  ngOnInit(): void {

   /*  // ractive form
    // إنشاء النموذج وعناصره ومن ثم تمريره للفيو من خلال [formGroup]
    // form is valid: اذاكانت جميع عناصره صالحة + ارجاع (نل) من اي دالة تمرر ل validators
    // formControl is valid: اذا تحققت شروطه مثل: required, email, minLength, maxLength
    this.regesterationForm = new FormGroup(
      {
        // ('', [ ]) is: (elementDefaultValue, elementValidationCondition)
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', Validators.required),
        mobile: new FormControl('', [Validators.required, Validators.maxLength(10)])
      },
       {
        // استدعاء دالة التحقق من تطابق كلمتي السر
        validators: this.passwordMatchingValidatior
       }
    ); */

    // ارجاع كل تغيير يحصل على قيم الفورم
    //this.regesterationForm.valueChanges.subscribe(value => console.log(value))

    //  انشاء الفورم حسب طريقة FormBuilder
    this.regesterationForm = this.fb.group(
      {
        // ('', [ ]) is: (elementDefaultValue, elementValidationCondition)
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', Validators.required),
        mobile: new FormControl('', [Validators.required, Validators.maxLength(10)])
      },
       {
        // استدعاء دالة التحقق من تطابق كلمتي السر
        validators: this.passwordMatchingValidatior
       }
    )


  }

  //------------------------------------------------------------------------------------
  // دالة التحقق من تطابق كلمتي السر
  passwordMatchingValidatior(form: AbstractControl){
    // في حال التطابق تعيد (نل) وإلا تعيد كائن يحتوي على الأخطاء
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { notmatched: true };
  }

  //------------------------------------------------------------------------------------
  //-------------------------------------
  // Getter methods for all form controls
  // هذه الدوال سنستخدمها في الفيو لاختصار كود استدعاء العنصر + للحصول على بيانات المستخدم
  //-------------------------------------

  // دالة ارجاع العنصر (اسم المستخدم) لاستخدامه ضمن الفيو
  get userName(){
    // الوصول لعنصر ضمن النموذج
    return this.regesterationForm.get('userName') as FormControl;
  }

  // دالة ارجاع العنصر (ايميل)
  get email(){
    return this.regesterationForm.get('email') as FormControl;
  }

  // دالة ارجاع العنصر (كلمة المرور)
  get password(){
    return this.regesterationForm.get('password') as FormControl;
  }

  // دالة ارجاع العنصر (تأكيد كلمة المرور)
  get confirmPassword(){
    return this.regesterationForm.get('confirmPassword') as FormControl;
  }
  // دالة ارجاع العنصر (الموبايل)
  get mobile(){
    return this.regesterationForm.get('mobile') as FormControl;
  }

  //----------------------
  // جلب بيانات المستخدم
  //----------------------

  //user!: IUserRegister; <=> user: IUserRegister | undefined;
  // هذا يعني أن (يوزر) يجب أن يتم تعيينه (اعطائه قيمة) قبل استخدامه
  // لضمان انه لن يكون (انديفايند) عند اسناد قيم النموذج اليه, وإلا سنواجه خطأ في وقت التشغيل لذلك التعريف الصحيح هو:

  user: User = {}; // كائن لتخزين بيانات (المستخدم) من النموذج عند الضغط على حفظ

  userData(): User{
    return this.user =
    {
      userName: this.regesterationForm.get('userName')?.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

  //-------------------------
  //تخزين بيانات المستخدمين
  //-------------------------

  userSubmitted: boolean = false; // للتحكم في اظهار رسائل الخطأ للعناصر

  onSubmit(): void {
    this.userSubmitted = true;

    //اذا كان النموذج صالحا يضاف المستخدم
    if (this.regesterationForm.valid) {

      // اسناد قيم النموذج إلى اوبجيكت المستخدم(طريقة اخرى لجلب بيانات المستخدم)
      //this.user = Object.assign(this.user, this.regesterationForm.value);

      // ارسال بيانات المستخدم الى سيرفس المستخدم التي سترسله لل API
      this.userService.addUsers(this.userData());


      // افراغ النموذج من بيانات المستخدم بعد حفظها
      this.regesterationForm.reset();
      // لاخفاء رسائل الخطأ بعد اضافة مستخدم صالح
      this.userSubmitted = false;

      // استخدام مكتبه (اليرتي فاي) للرسائل المنبثقة
      this.alertify.success('Congrats, you are successfully registered');
    }else{
      this.alertify.error('Kindly provide the required fields!!');
    }


  }
  //------------------------------------------------------------------------------------


}
