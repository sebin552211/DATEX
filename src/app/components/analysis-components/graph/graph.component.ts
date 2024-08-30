import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
 
@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ChartModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent1 implements OnInit {
 
  // Data for Bar Charts
  barData1: any;
  barData2: any;
 
  // Data for Pie Chart
  pieData1: any;
 
  // Data for Donut Chart
  donutData: any;
 
  // Options for Bar Charts
  barOptions1: any;
  barOptions2: any;
 
  // Options for Pie and Donut Charts
  pieOptions: any;
  donutOptions: any;
 
  // Toggle states
  showPieChart1: boolean = false;
 
  // Custom Colors and Borders
  textColor: string = '#495057';
  textColorSecondary: string = '#6c757d';
  surfaceBorder: string = '#dee2e6';
 
  // Satisfactory Score
  satisfactory_score: number = 70;
 
  ngOnInit() {
    // Overall Feedback - Bar Chart
    this.barData1 = {
      labels: ['Very Satisfied', 'Neither Satisfied Nor Dissatisfied', 'Very Dissatisfied', 'N/A'],
      datasets: [
        {
 
          backgroundColor: 'rgba(225, 29, 72, 0.5)',
          data: [3, 2, 7, 4]
        }
      ]
    };
 
    // Feedback - Parameter Wise - Bar Chart
    this.barData2 = {
      labels: ['Customer Focus', 'Planning and Control', 'Quality', 'Communication', 'Knowledge'],
      datasets: [
        {
          label: 'Very Satisfied',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          data: [78, 58, 70, 68, 71]
        },
        {
          label: 'Satisfied',
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
          data: [9, 12, 21, 22, 25]
        },
        {
          label: 'Neither Satisfied Nor Dissatisfied',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          data: [10, 0, 0, 0, 10]
        },
        {
          label: 'Dissatisfied',
          backgroundColor: 'rgba(249, 115, 28, 0.5)',
          data: [10, 0, 0, 0, 0]
        }
      ]
    };
 
    // Donut Chart Data
    this.donutData = {
      labels: ['Very Likely', 'Likely'],
      datasets: [
        {
          data: [50, 30],
          backgroundColor: [
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)'  // Light Green
          ]
        }
      ]
    };
 
    // Pie Chart Data
    this.pieData1 = {
      labels: ['Very Satisfied', 'Neither Satisfied Nor Dissatisfied', 'Very Dissatisfied', 'N/A'],
      datasets: [
        {
          data: [3, 2, 7, 4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Light Pink
            'rgba(54, 162, 235, 0.5)', // Light Blue
            'rgba(255, 206, 86, 0.5)', // Light Yellow
            'rgba(16, 185, 129, 0.5)'  // Light Green
          ]
        }
      ]
    };
 
    // Chart Options
    this.barOptions1 = this.getBarChartOptions(
      this.textColor, this.textColorSecondary, this.surfaceBorder, 'Feedback', 'Count'
    );
    this.barOptions2 = this.getBarChartOptions(
      this.textColor, this.textColorSecondary, this.surfaceBorder, 'Parameter Wise Feedback', 'Count'
    );
 
    this.pieOptions = {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: this.textColor,
            boxWidth: 10,
            padding: 20
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    };
 
    this.donutOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      }
    };
  }
 
  togglePieChart() {
    this.showPieChart1 = !this.showPieChart1;
  }
 
  // Method to get bar chart options
  getBarChartOptions(
    textColor: string,
    textColorSecondary: string,
    surfaceBorder: string,
    xAxisTitle: string,
    yAxisTitle: string
  ) {
    return {
      plugins: {
        legend: {
         display:false,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxisTitle,
            color: textColor
          },
          ticks: {
            color: textColor,
            font: {
              size: 8
            },
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          title: {
            display: true,
            text: yAxisTitle,
            color: textColor
          },
          ticks: {
            color: textColor
          }
        }
      }
    };
  }
}
 