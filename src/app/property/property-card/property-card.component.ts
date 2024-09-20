import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProperty } from '../../model/iproperty';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IPropertyBase } from '../../model/iproperty-base';

@Component({
  selector: 'spa-property-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {

  @Input() property?: IPropertyBase; // استقبال بيانات العقار الممرر من اي كومبوننت اب لتمثيله من خلال هذا الكومبوننت

  @Input() hideIcon!: boolean; // لاخفاء زري التفاصيل و اتصل بنا من معاينة العقار اثناء تعبئة بياناته



}
