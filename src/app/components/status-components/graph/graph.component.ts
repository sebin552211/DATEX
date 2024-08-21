import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-graph3',
    standalone: true,
    imports: [ChartModule, RouterOutlet, CommonModule],
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent2 implements OnInit {
    metrics = [
        { label: 'VOC ELIGIBLE PROJECTS', value: 50 },
        { label: 'VOC INITIATED', value: 27 },
        { label: 'VOC RECEIVED', value: 18 },
        { label: 'VOC COVERAGE', value: 75 }
    ];

    barChartData: any;
    barChartOptions: any;

    pieChartData: any;
    pieChartOptions: any;

    lineChartData: any;
    lineChartOptions: any;

    showPieChart = false;

    ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.barChartData = {
          labels: ['VOC ELIGIBLE PROJECTS', 'VOC INITIATED', 'VOC RECEIVED', 'VOC COVERAGE'],
          datasets: [
              {
                  label: 'Projects',
                  data: [50, 27, 18, 75],
                  // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                  // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                  backgroundColor: [ 'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
                  ],
                  hoverBackgroundColor: [ 'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
                  ]
              }
          ]
      };

      this.barChartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Metrics',
                      color: textColor
                  },
                  ticks: {
                      color: textColorSecondary,
                      font:{
                        size:8
                      },
                      autoSkip: false,  // Prevent skipping of labels
                      maxRotation: 0    // Ensure labels are not rotated
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Value',
                      color: textColor
                  },
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };

      this.pieChartData = {
          labels: ['VOC ELIGIBLE PROJECTS', 'VOC INITIATED', 'VOC RECEIVED', 'VOC COVERAGE'],
          datasets: [
              {
                  data: [50, 27, 18, 75],
                  // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                  // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                  backgroundColor: [ 'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
            ],
                  hoverBackgroundColor: [ 'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
                  ]
              }
          ]
      };

      this.pieChartOptions = {
          plugins: {
              legend: {
                position:'right',
                  labels: {
                      usePointStyle: true,
                      color: textColor,
                      boxWidth: 10,
                      padding: 20
                  }
              }
          }
      };

      this.lineChartData = {
          labels: ['DTS', 'ESS0', 'PES'],
          datasets: [
              {
                  label: 'VOC Coverage',
                  data: [0.26, 0.67, 0.67],
                  fill: false,
                  borderColor: '#36A2EB',
                  //  borderColor: '#DC125E',
                  tension: 0.4
              }
          ]
      };

      this.lineChartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Time Period',
                      color: textColor
                  },
                  ticks: {
                      color: textColorSecondary,
                      font:{
                        size:10
                      },
                      autoSkip: false,  // Prevent skipping of labels
                      maxRotation: 0    // Ensure labels are not rotated
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Coverage',
                      color: textColor
                  },
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }


    togglePieChart() {
        this.showPieChart = !this.showPieChart;
    }
}
