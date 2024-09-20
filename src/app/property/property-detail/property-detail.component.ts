import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertifyService } from '../../services/Alertify.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'spa-property-detail',
  standalone: true,
  imports: [RouterModule,CommonModule,TabsModule,CarouselModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number; // تخزين قيمة براميتر (الايدي) الموجود ضمن العنوان الحالي
  public mainPhotoUrl: string = "";
  property = new Property(); // لتخزين العقار الذي نجلبه من قاعدة البيانات باستخدام السيرفس
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
     private router: Router,
     private housingService: HousingService
    ){}

  ngOnInit(): void {

    //--------------------------------------
    // الحصول على (ايدي) العقار من الرابط
    //--------------------------------------

    // نحتاج معرفة (اي دي) العقار الحالي من اجل عرض تفاصيله + ومن اجل الانتقال لعرض تفاصيل العقار التالي او السابق(بزيادة او انقاص ال (اي دي))
    // الحصول على (اي دي) العقار من العنوانه الممرر:

    // 1- (اول حالة للعنوان فقط) - طريقة غير مجدية للانتقال: يحصل على العنوان الممرر ولايتابع اي تغيير لاحق عليه
    // this.propertyId = Number(this.rout.snapshot.params['id']); // Number() <=> +

    // 2- طريقة مجدية للانتقال: يحصل على العنوان الممرر + يرسل كل تغيير على باراميتراته (ايدي)
    this.route.params.subscribe(
      (params) => {
        this.propertyId = Number(params['id']);
        console.log('id:',this.propertyId )
        this.housingService.getProperty(this.propertyId).subscribe(
          (data) => {
            this.property = data!; // اسناد القيمة المرجعة من السيرفس لخاصية تخزين المسكن
          }
        )
      }
    )




        // this.route.data.subscribe(
        //     (data: Property) => {
        //         this.property = data['prp'];
        //         console.log(this.property.photos);
        //     }
        // );

        //this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);


      //   this.galleryOptions = [
      //     {
      //         width: '100%',
      //         height: '465px',
      //         thumbnailsColumns: 4,
      //         imageAnimation: NgxGalleryAnimation.Slide,
      //         preview: true
      //     }
      // ];

      //this.galleryImages = this.getPropertyPhotos();
  }

  // عرض تفاصيل (العقار التالي) عند الضغط على زر (اختر التالي) من خلال:
  // 1- زيادة القيمة المخزنة ل (اي دي) العنوان الحالي ب 1
  // 2- ثم استخدام القيمة الجديدة في الانتقال لعنوان يعبر عن العقار التالي
  // onSelectNext(){
  //   this.propertyId += 1;
  //   this.router.navigate([`property-detail/${this.propertyId}`]); //<=> (['property-detail', this.propertyId]) // يمكن وضع الشرطة المائلة او الاستغناء عنها
  // }


  changePrimaryPhoto(mainPhotoUrl: string) {
    this.mainPhotoUrl = mainPhotoUrl;
}



  // getPropertyPhotos(): NgxGalleryImage[] {
  //     const photoUrls: NgxGalleryImage[] = [];
  //     for (const photo of this.property.photos) {
  //         if(photo.isPrimary)
  //         {
  //             this.mainPhotoUrl = photo.imageUrl;
  //         }
  //         else{
  //             photoUrls.push(
  //                 {
  //                     small: photo.imageUrl,
  //                     medium: photo.imageUrl,
  //                     big: photo.imageUrl
  //                 }
  //             );}
  //     }
  //     return photoUrls;
  // }

}
