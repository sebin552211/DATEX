import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ChartModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent2 implements OnInit {
  barChartData: any;
  barChartOptions: any;
  pieChartData: any;
  pieChartOptions: any;
  showPieChart = false;

  lineChartData: any = {
    labels: ['DTS', 'ESS0', 'PES'],
    datasets: [
      {
       
        data: [0.26, 0.67, 0.67],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.4,
      }
    ]
  };

  lineChartOptions: any = {
    plugins: {
      legend: {
        display:false,

      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period',
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
        },
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color-secondary'),
          font: {
            size: 10
          },
          autoSkip: false,
          maxRotation: 0
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--surface-border'),
          drawBorder: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Coverage',
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
        },
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color-secondary')
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--surface-border'),
          drawBorder: false
        }
      }
    }
  };

  constructor(private dashboardService: DashboardTableService,private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getVOCMetrics();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barChartOptions = {
      plugins: {
        legend: {
      display:false,
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
            font: {
              size: 8
            },
            autoSkip: false,
            maxRotation: 0
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

    this.pieChartOptions = {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            color: textColor,
            boxWidth: 10,
            padding: 20
          }
        }
      }
    };
  }

  getVOCMetrics() {
    this.dashboardService.getProjects().subscribe((projects) => {
      const eligible = projects.filter(p => p.vocEligibilityDate !== null).length;
      const initiated = projects.filter(p => p.mailStatus === 'Sent').length;
      const received = projects.filter(p => p.feedbackStatus === 'Received').length;
      const coverage = (received / eligible) * 100;

      this.barChartData = {
        labels: ['VOC ELIGIBLE PROJECTS', 'VOC INITIATED', 'VOC RECEIVED', 'VOC COVERAGE'],
        datasets: [
          {

            data: [eligible, initiated, received, coverage],
            backgroundColor: [
              'rgba(59, 130, 246, 0.5)', // Light Blue
              'rgba(168, 85, 247, 0.5)', // Light Purple
              'rgba(34, 197, 94, 0.5)',  // Light Green
              'rgba(249, 115, 28, 0.5)'  // Light Orange
            ],
            hoverBackgroundColor: [
              'rgba(59, 130, 246, 0.5)', // Light Blue
              'rgba(168, 85, 247, 0.5)', // Light Purple
              'rgba(34, 197, 94, 0.5)',  // Light Green
              'rgba(249, 115, 28, 0.5)'  // Light Orange
            ]
          }
        ]
      };

      this.pieChartData = {
        labels: ['VOC ELIGIBLE PROJECTS', 'VOC INITIATED', 'VOC RECEIVED', 'VOC COVERAGE'],
        datasets: [
          {
            data: [eligible, initiated, received, coverage],
            backgroundColor: [
              'rgba(59, 130, 246, 0.5)', // Light Blue
              'rgba(168, 85, 247, 0.5)', // Light Purple
              'rgba(34, 197, 94, 0.5)',  // Light Green
              'rgba(249, 115, 28, 0.5)'  // Light Orange
            ],
            hoverBackgroundColor: [
              'rgba(59, 130, 246, 0.5)', // Light Blue
              'rgba(168, 85, 247, 0.5)', // Light Purple
              'rgba(34, 197, 94, 0.5)',  // Light Green
              'rgba(249, 115, 28, 0.5)'  // Light Orange
            ]
          }
        ]
      };
    });
  }

  togglePieChart() {
    this.showPieChart = !this.showPieChart;
  }
}
