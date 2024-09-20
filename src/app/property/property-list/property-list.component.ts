import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from '../../model/iproperty-base';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortPipe } from '../../pipes/sort.pipe';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'spa-property-list',
    standalone: true,
    templateUrl: './property-list.component.html',
    styleUrl: './property-list.component.css',
    imports: [PropertyCardComponent,CommonModule,FilterPipe,SortPipe,FormsModule]
})

export class PropertyListComponent implements OnInit {
// properties: Array<IProperty> = [] <=> properties: IProperty[] = []

  properties:IPropertyBase[] = []; // قائمة العقارات (اما التي للبيع او التي للاجار) حسب اللينك الذي سنضغط عليه

  SellRent: number = 1; // العقار للبيع


  constructor(private route: ActivatedRoute,
     private housingService: HousingService
    ){}

  ngOnInit(): void {
    // this.route.snapshot.url.toString(): في حال يوجد في البراوزر راوت تحوله لنص والا فلا ترجع شيئ
    // سنستفيد منها لتغيير قيمة المتغير (سيل رينت) وبالتالي تحديد ماذا ترجع السيرفس من ال اي بي اي حيث:
    // عند الضغط على (بيع) سيكون الراوت الخاص به لاشي لاننا وضعنا عنوانه هو الجذر وبالتالي سترجع (فولس) ولن يدخل تعليمة الشرط وستبقى قيمة المتغير (سيل رينت = 1) يمرر للسيرفس التي تفلتر العقارات بناء على قيمته ثم سترجع العقارات التي للبيع فقط لتعرض ضمن الكومبوننت بروبرتي ليست
    // اما عند الضغط على (تأجير) سيكون الراوت الخاص به (رينت بروبرتي) وبالتالي سترجع (ترو) وسيدخل تعليمة الشرط ستصبح قيمة المتغير (سيل رينت = 2) يمرر للسيرفس التي تفلتر العقارات بناء على قيمته ثم سترجع العقارات التي للاجار فقط لتعرض ضمن الكومبوننت بروبرتي ليست

    if(this.route.snapshot.url.toString()){
      this.SellRent = 2; //العقار للايجار Means we are on rent-property URL, Else we are on base URL
    }

     this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data; // اسناد قيم الاوبزيرفابل لمصفوفة العقارات
       /*  // جلب المسكن الجديد و اضافته لقائمة العقارات الموجودة
        let newProperty = JSON.parse(localStorage.getItem('newProp')!);
        if(newProperty.sellRent == this.SellRent){

          this.properties = [...this.properties, newProperty];
        } */
        console.log(this.properties);
      }
    );
  }


  // خاصيات الفلترة + الترتيب
  //--------------------------------
  Today = new Date();
  city = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';



  //دوال الفلترة و الترتيب
  //------------------------
  onCityFilter() {
    this.SearchCity = this.city;
    console.log(this.city)
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.city = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
        this.SortDirection = 'asc';
    } else {
        this.SortDirection = 'desc';
  }
  }




}
