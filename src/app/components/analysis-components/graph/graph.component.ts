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
  barData3: any;

  // Data for Pie Charts
  pieData1: any;
  pieData2: any;
  pieData3: any;

  // Options for Bar and Pie Charts
  barOptions1: any;
  barOptions2: any;
  barOptions3: any;
  pieOptions: any;

  // Toggle states
  showPieChart1: boolean = false;
  showPieChart2: boolean = false;
  showPieChart3: boolean = false;

  // Custom Colors and Borders
  textColor: string = '#495057'; // Adjust these values as needed
  textColorSecondary: string = '#6c757d';
  surfaceBorder: string = '#dee2e6';

  ngOnInit() {
    // Overall Feedback - Bar Chart
    this.barData1 = {
      labels: ['Very Satisfied', 'Neither Satisfied Nor Dissatisfied', 'Very Dissatisfied', 'N/A'],
      datasets: [
        {
          label: 'Feedback',
          backgroundColor: '#42A5F5',
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
          backgroundColor: '#42A5F5',
          data: [78, 58, 70, 68, 71]
        },
        {
          label: 'Satisfied',
          backgroundColor: '#66BB6A',
          data: [9, 12, 21, 22, 25]
        },
        {
          label: 'Neither Satisfied Nor Dissatisfied',
          backgroundColor: '#FFA726',
          data: [10, 0, 0, 0, 0]
        },
        {
          label: 'Dissatisfied',
          backgroundColor: '#EF5350',
          data: [0, 0, 0, 0, 0]
        }
      ]
    };

    // Engage Experion Services in Future - Bar Chart
    this.barData3 = {
      labels: ['Very Likely', 'Likely'],
      datasets: [
        {
          label: 'Likelihood',
          backgroundColor: ['#42A5F5', '#EF5350'],
          data: [50, 30]
        }
      ]
    };

    // Pie Chart Data
    this.pieData1 = {
      labels: ['Very Satisfied', 'Neither Satisfied Nor Dissatisfied', 'Very Dissatisfied', 'N/A'],
      datasets: [
        {
          data: [63, 22, 7, 4],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
        }
      ]
    };

    this.pieData2 = {
      labels: ['Customer Focus', 'Planning and Control', 'Quality', 'Communication', 'Knowledge'],
      datasets: [
        {
          data: [78, 58, 70, 68, 71],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC']
        }
      ]
    };

    this.pieData3 = {
      labels: ['Very Likely', 'Likely'],
      datasets: [
        {
          data: [50, 30],
          backgroundColor: ['#42A5F5', '#EF5350']
        }
      ]
    };

    // Chart Options
    this.barOptions1 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Feedback', 'Count');
    this.barOptions2 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Parameter Wise Feedback', 'Count');
    this.barOptions3 = this.getBarChartOptions(this.textColor, this.textColorSecondary, this.surfaceBorder, 'Likelihood', 'Count');

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      }
    };
  }

  // Toggle Functions for Pie Charts
  togglePieChart(chartNumber: number) {
    switch (chartNumber) {
      case 1:
        this.showPieChart1 = !this.showPieChart1;
        break;
      case 2:
        this.showPieChart2 = !this.showPieChart2;
        break;
      case 3:
        this.showPieChart3 = !this.showPieChart3;
        break;
    }
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
          labels: {
            color: textColorSecondary
          }
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
            font:{
              size:8
            },
            autoSkip: false,  // Prevent skipping of labels
            maxRotation: 0
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
