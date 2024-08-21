import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

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

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Bar chart data
    this.basicData1 = this.getBarChartData(
      ['React', '.Net', 'Angular', 'Java', 'Python', 'PHP'],
      [14, 12, 18, 11, 6, 22],
      [
     'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      [
    'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      'Programming Languages'
    );

    this.basicData2 = this.getBarChartData(
      ['Development', 'Staff Augmentation', 'R&D/Others', 'Production Support', 'Bug Fixing', 'Testing'],
      [14, 12, 10, 8, 5, 22],
      [
       'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      [  'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      'Project Categories'
    );

    this.basicData3 = this.getBarChartData(
      ['Salesboost', 'MapHabit', 'Dars', 'QuVa Pharma Support', 'Protocol', 'Deltal'],
      [14, 15, 13, 9, 4, 23],
      [
      'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      [
      'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
      ],
      'Client Projects'
    );

    this.basicData4 = this.getBarChartData(
      ['Salesboost', 'MapHabit', 'Dars', 'QuVa Pharma Support', 'Protocol', 'Deltal'],
      [14, 10, 7, 4, 3, 22],
      [
      'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal

      ],
      [
     'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal

      ],
      'Client Support Projects'
    );

    this.basicOptions1 = this.getBarChartOptions(textColor, textColorSecondary, surfaceBorder, 'Programming Languages', 'Count');
    this.basicOptions2 = this.getBarChartOptions(textColor, textColorSecondary, surfaceBorder, 'Project Categories', 'Count');
    this.basicOptions3 = this.getBarChartOptions(textColor, textColorSecondary, surfaceBorder, 'Client Name', 'Count');
    this.basicOptions4 = this.getBarChartOptions(textColor, textColorSecondary, surfaceBorder, 'Client Name', 'Count');

    this.pieData1 = this.getPieChartData(
      ['React', '.Net', 'Angular', 'Java', 'Python', 'PHP'],
      [14, 12, 18, 11, 6, 22]
    );
    this.pieData2 = this.getPieChartData(
      ['Development', 'Staff Augmentation', 'R&D/Others', 'Production Support', 'Bug Fixing', 'Testing'],
      [14, 12, 10, 8, 5, 22]
    );
    this.pieData3 = this.getPieChartData(
      ['Salesboost', 'MapHabit', 'Dars', 'QuVa Pharma Support', 'Protocol', 'Deltal'],
      [14, 15, 13, 9, 4, 23]
    );
    this.pieData4 = this.getPieChartData(
      ['Salesboost', 'MapHabit', 'Dars', 'QuVa Pharma Support', 'Protocol', 'Deltal'],
      [14, 10, 7, 4, 3, 22]
    );

    this.pieOptions = this.getPieChartOptions(textColor);
  }

  getBarChartData(labels: string[], data: number[], backgroundColor: string[], borderColor: string[], label: string) {
    return {
      labels: labels,
      datasets: [
        {
          label: label,
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
            font:{
              size:8
            },
            autoSkip: false,  // Prevent skipping of labels
            maxRotation: 0
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

  getPieChartData(labels: string[], data: number[]) {
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(59, 130, 246, 0.5)', // Light Blue
            'rgba(168, 85, 247, 0.5)', // Light Purple
            'rgba(34, 197, 94, 0.5)',  // Light Green
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)', // Light Teal
          ],
          hoverBackgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(168, 85, 247, 0.7)',
            'rgba(34, 197, 94, 0.7)',
            'rgba(249, 115, 28, 0.7)',
            'rgba(225, 29, 72, 0.7)',
            'rgba(16, 185, 129, 0.7)',
          ],
        },
      ],
    };
  }

  getPieChartOptions(textColor: string) {
    return {
      plugins: {
        legend: {
          position:'right',
          labels: {
            color: textColor,
            boxWidth: 10,
            padding: 20
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
