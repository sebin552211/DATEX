import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, FilterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username="ACE Team";
  isDivVisible: boolean = true;
  
  toggleFilters() {
    //  return this.isDivVisible=!this.isDivVisible;
    return true;
  }
}

