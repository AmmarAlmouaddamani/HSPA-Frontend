import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertyCardComponent } from "./property/property-card/property-card.component";
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
    selector: 'spa-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PropertyCardComponent, PropertyListComponent, NavBarComponent]
})
export class AppComponent {
  title = 'housing-spa';
}

