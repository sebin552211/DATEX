import { Component } from '@angular/core';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from '../../layout/filter/filter.component';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FilterComponent, NgClass,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isLoading: boolean = true;
  constructor(private dashboardTableService:DashboardTableService) {}

  ngOnInit() {
    console.log('entered');
    this.fetchData(); // Fetch data on init
  }

  fetchData() {
    this.dashboardTableService.getProjects().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Hide loader even if there's an error
      }
    );
  }
}
