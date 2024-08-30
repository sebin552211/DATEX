import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { SharedDataService } from '../../../service/shared-data.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ChartModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  basicData1: any;
  basicData2: any;
  basicData3: any;
  basicData4: any;

  pieData1: any;
  pieData2: any;
  pieData3: any;
  pieData4: any;

  basicOptions1: any;
  basicOptions2: any;
  basicOptions3: any;
  basicOptions4: any;

  pieOptions: any;

  showPieChart1 = false;
  showPieChart2 = false;
  showPieChart3 = false;
  showPieChart4 = false;

  textColor!: string;
  textColorSecondary!: string;
  surfaceBorder!: string;
  projects: DashboardTable[] = [];
  private projectsSubscription: Subscription | undefined;

  constructor(private dashboardTableService: DashboardTableService,  private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.projectsSubscription = this.sharedDataService.projects$.subscribe(projects => {
      console.log('Projects response:', projects);
      console.log('Type of response:', typeof projects);

      if (!Array.isArray(projects)) {
        console.error('Expected projects to be an array.');
        return;
      }


  const technologyCounts = this.calculateTechnologyCounts(projects);
  const projectTypeCounts = this.calculateProjectTypeCounts(projects);
  const customerCounts = this.getCustomerCountsForProjectsStartedThisMonth(projects);
  const customerProjectCounts = this.getCustomerCountsForClosingProjects(projects);


  const labels = Object.keys(technologyCounts); // Array of technology names
  const counts = Object.values(technologyCounts); // Array of technology counts


  const projectTypeLabels = Object.keys(projectTypeCounts); // Array of project types
  const projectTypeCountsValues = Object.values(projectTypeCounts); // Array of project type counts

  const customerLabels = Object.keys(customerCounts);
  const customerCountsValues = Object.values(customerCounts);

  const customerNames = Object.keys(customerProjectCounts);
  const projectCounts = Object.values(customerProjectCounts);



      const documentStyle = getComputedStyle(document.documentElement);
      this.textColor = documentStyle.getPropertyValue('--text-color');
      this.textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      this.surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  // Predefined set of colors
const predefinedColors = [
  'rgba(59, 130, 246, 0.5)',  // Light Blue
  'rgba(168, 85, 247, 0.5)',  // Light Purple
  'rgba(34, 197, 94, 0.5)',   // Light Green
  'rgba(249, 115, 28, 0.5)',  // Light Orange
  'rgba(225, 29, 72, 0.5)',   // Light Red
  'rgba(16, 185, 129, 0.5)',  // Light Teal
  'rgba(255, 193, 7, 0.5)',   // Amber
  'rgba(103, 58, 183, 0.5)',  // Deep Purple
  'rgba(0, 188, 212, 0.5)',   // Cyan
  'rgba(255, 87, 34, 0.5)',   // Deep Orange
  'rgba(255, 105, 180, 0.5)', // Hot Pink
  'rgba(76, 175, 80, 0.5)',   // Green
  'rgba(33, 150, 243, 0.5)',  // Blue
  'rgba(255, 235, 59, 0.5)',  // Yellow
  'rgba(156, 39, 176, 0.5)',  // Purple
  'rgba(0, 150, 136, 0.5)',   // Teal
  'rgba(233, 30, 99, 0.5)',   // Pink
  'rgba(255, 87, 34, 0.5)',   // Orange
  'rgba(96, 125, 139, 0.5)',  // Blue Grey
  'rgba(205, 220, 57, 0.5)',  // Lime
  'rgba(255, 152, 0, 0.5)',   // Deep Orange
];


      // Determine colors based on the number of technologies
      const backgroundColors = predefinedColors.slice(0, labels.length);
      const borderColors = backgroundColors.map(color => this.shadeColor(color, -20)); // Darker shade for border

      // Update BarGraph1 data dynamically
      this.basicData1 = this.getBarChartData(
        labels,
        counts,
        backgroundColors,
        borderColors,
       
      );
   // Determine colors for project types
   const projectTypeBackgroundColors = predefinedColors.slice(0, projectTypeLabels.length);
   const projectTypeBorderColors = projectTypeBackgroundColors.map(color => this.shadeColor(color, -20)); // Darker shade for border

    // Update BarChart2 and PieChart2 data dynamically
    this.basicData2 = this.getBarChartData(
      projectTypeLabels,
      projectTypeCountsValues,
      projectTypeBackgroundColors,
      projectTypeBorderColors,
      
    );

    this.basicData3 = this.getBarChartData(
      customerLabels,
      customerCountsValues,
      projectTypeBackgroundColors,
      projectTypeBorderColors,
     
    );

     // Update Graph 4 (Bar chart)
     this.basicData4 = this.getBarChartData(
      customerNames,
      projectCounts,
      backgroundColors,
      borderColors,
     
    );

      // Update PieChart1 data dynamically
      this.pieData1 = this.getPieChartData(labels, counts, backgroundColors);

      this.basicOptions1 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Technology', 'Count');
      this.pieOptions = this.getPieChartOptions(this.textColor);

      this.pieData2 = this.getPieChartData(projectTypeLabels, projectTypeCountsValues, projectTypeBackgroundColors);

      this.basicOptions2 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Project Type', 'Count');

      this.pieData3 = this.getPieChartData(customerLabels, customerCountsValues, projectTypeBackgroundColors);

      this.basicOptions3 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Customer Name', 'Project Count');

            // Update Graph 4 (Pie chart)
            this.pieData4 = this.getPieChartData(
              customerNames,
              projectCounts,
              backgroundColors
            );

            this.basicOptions4 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Customer Name', 'Project Count');

    });

    // Static data for other bar graphs and pie charts






    // this.basicOptions1 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Technology', 'Count');
    // this.basicOptions2 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Project Categories', 'Count');
    // this.basicOptions3 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Client Projects', 'Count');
    // this.basicOptions4 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Client Support Projects', 'Count');




    this.pieOptions = this.getPieChartOptions(this.textColor);
  }

  // Method to calculate technology counts from project data
  private calculateTechnologyCounts(projects: any[]): { [key: string]: number } {
    const technologyCounts: { [key: string]: number } = {};

    projects.forEach(project => {
      const technology = project.technology;
      if (technologyCounts[technology]) {
        technologyCounts[technology]++;
      } else {
        technologyCounts[technology] = 1;
      }
    });

    return technologyCounts;
  }

  // Method to calculate project type counts from project data
private calculateProjectTypeCounts(projects: any[]): { [key: string]: number } {
  const projectTypeCounts: { [key: string]: number } = {};

  projects.forEach(project => {
    const projectType = project.projectType;
    if (projectTypeCounts[projectType]) {
      projectTypeCounts[projectType]++;
    } else {
      projectTypeCounts[projectType] = 1;
    }
  });

  return projectTypeCounts;
}

private getCustomerCountsForProjectsStartedThisMonth(projects: any[]): { [key: string]: number } {
  const startOfMonth = new Date();
  startOfMonth.setDate(1); // Set to the first day of the current month
  startOfMonth.setHours(0, 0, 0, 0); // Reset time to start of the day

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to the next month
  endOfMonth.setDate(0); // Set to the last day of the current month
  endOfMonth.setHours(23, 59, 59, 999); // Set time to end of the day

  const filteredProjects = projects.filter(project => {
    const projectStartDate = new Date(project.projectStartDate);
    return projectStartDate >= startOfMonth && projectStartDate <= endOfMonth;
  });

  const customerCounts: { [key: string]: number } = {};

  filteredProjects.forEach(project => {
    const customerName = project.customerName;
    if (customerCounts[customerName]) {
      customerCounts[customerName]++;
    } else {
      customerCounts[customerName] = 1;
    }
  });

  return customerCounts;
}

private getCustomerCountsForClosingProjects(projects: any[]): { [key: string]: number } {
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const filteredProjects = projects.filter(project => {
    const projectClosingDate = new Date(project.projectEndDate);
    return projectClosingDate >= new Date() && projectClosingDate <= oneMonthFromNow;
  });

  const customerProjectCounts: { [key: string]: number } = {};

  filteredProjects.forEach(project => {
    const customerName = project.customerName;
    if (customerProjectCounts[customerName]) {
      customerProjectCounts[customerName]++;
    } else {
      customerProjectCounts[customerName] = 1;
    }
  });

  return customerProjectCounts;
}





  // Method to create a darker or lighter shade of a color
  private shadeColor(color: string, percent: number): string {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return `rgba(${Math.min(255, Math.max(0, r + (r * percent / 100)))},
                  ${Math.min(255, Math.max(0, g + (g * percent / 100)))},
                  ${Math.min(255, Math.max(0, b + (b * percent / 100)))}, 0.5)`;
  }

  getBarChartData(labels: string[], data: number[], backgroundColor: string[], borderColor: string[]) {
    return {
      labels: labels,
      datasets: [
        {
         
         
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    };
  }

  getBarChartOptions(textColor: string, textColorSecondary: string, surfaceBorder: string, xAxisLabel: string, yAxisLabel: string) {
    return {
      plugins: {
        legend: {
          display:false,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          title: {
            display: true,
            text: yAxisLabel,
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 10,
            },
            autoSkip: false,  // Prevent skipping of labels
            maxRotation: 0,
          },
          title: {
            display: true,
            text: xAxisLabel,
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }

  getPieChartData(labels: string[], data: number[], backgroundColor: string[]) {
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: backgroundColor.map(color => this.shadeColor(color, -20)),
        },
      ],
    };
  }

  getPieChartOptions(textColor: string) {
    return {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: textColor,
            boxWidth: 10,
            padding: 10,
          },
        },
      },
    };
  }

  togglePieChart1() {
    this.showPieChart1 = !this.showPieChart1;
  }

  togglePieChart2() {
    this.showPieChart2 = !this.showPieChart2;
  }

  togglePieChart3() {
    this.showPieChart3 = !this.showPieChart3;
  }

  togglePieChart4() {
    this.showPieChart4 = !this.showPieChart4;
  }
}
