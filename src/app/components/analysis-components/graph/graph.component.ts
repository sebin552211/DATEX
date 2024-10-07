import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { VocAnalysisService } from '../../../service/voc-analysis.service';
import { VocAnalysis } from '../../../interface/voc-analysis';

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
  satisfactory_score: number = 0;
  constructor(private vocAnalysisService: VocAnalysisService) {}

  ngOnInit() {
    // Fetch the VOC analysis data
    this.vocAnalysisService.getVocAnalyses().subscribe(
      (data: VocAnalysis[]) => {
        // Process the data to update your charts
        this.updateBarData1(data);
        this.updateBarData2(data);
        this.updateDonutData(data);
        this.calculateSatisfactoryScore(data);

      },
      (error) => {
        console.error('Error fetching VOC analyses:', error);
      }
    );





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

  updateBarData1(vocAnalyses: VocAnalysis[]) {
    // Initialize the count object for each feedback category
    const counts = {
      'Very Satisfied': 0,
      'Satisfied': 0,
      'Neither Satisfied nor Dissatisfied': 0,
      'Dissatisfied': 0,
      'N/A': 0
    };

    // List of fields to check
    const fieldsToCheck: Array<keyof VocAnalysis> = [
      'customerFocus',
      'planningAndControl',
      'quality',
      'communication',
      'knowledge'
    ];

    // Iterate over each analysis entry
    vocAnalyses.forEach(voc => {
      fieldsToCheck.forEach(field => {
        const feedback = voc[field];
        if (feedback && feedback in counts) {
          counts[feedback as keyof typeof counts]++;
        }
      });
    });

    // Update the barData1 with the counts
    this.barData1 = {
      labels: ['Very Satisfied', 'Satisfied', 'Neither Satisfied nor Dissatisfied', 'Dissatisfied', 'N/A'],
      datasets: [
        {
          backgroundColor: 'rgba(225, 29, 72, 0.5)',
          data: [
            counts['Very Satisfied'],
            counts['Satisfied'],
            counts['Neither Satisfied nor Dissatisfied'],
            counts['Dissatisfied'],
            counts['N/A']
          ]
        }
      ]
    };

    // Update the pieData1 with the counts
    this.updatePieData1(counts);
  }

  updatePieData1(counts: { [key: string]: number }) {
    this.pieData1 = {
      labels: ['Very Satisfied', 'Satisfied', 'Neither Satisfied nor Dissatisfied', 'Dissatisfied', 'N/A'],
      datasets: [
        {
          data: [
            counts['Very Satisfied'],
            counts['Satisfied'],
            counts['Neither Satisfied nor Dissatisfied'],
            counts['Dissatisfied'],
            counts['N/A']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Light Pink
            'rgba(54, 162, 235, 0.5)', // Light Blue
            'rgba(255, 206, 86, 0.5)', // Light Yellow
            'rgba(249, 115, 28, 0.5)', // Light Orange
            'rgba(16, 185, 129, 0.5)'  // Light Green
          ]
        }
      ]
    };
  }

  togglePieChart() {
    this.showPieChart1 = !this.showPieChart1;
  }

  updateBarData2(vocAnalyses: VocAnalysis[]) {
    // Define the parameter counts object
    const parameterCounts: {
      'Customer Focus': number[],
      'Planning and Control': number[],
      'Quality': number[],
      'Communication': number[],
      'Knowledge': number[]
    } = {
      'Customer Focus': [0, 0, 0, 0],
      'Planning and Control': [0, 0, 0, 0],
      'Quality': [0, 0, 0, 0],
      'Communication': [0, 0, 0, 0],
      'Knowledge': [0, 0, 0, 0]
    };

    // Define the feedback categories
    const feedbackCategories: { [key: string]: number } = {
      'Very Satisfied': 0,
      'Satisfied': 1,
      'Neither Satisfied nor Dissatisfied': 2,
      'Dissatisfied': 3
    };

    // List of fields to check
    const fieldsToCheck: { [key: string]: keyof typeof parameterCounts } = {
      'customerFocus': 'Customer Focus',
      'planningAndControl': 'Planning and Control',
      'quality': 'Quality',
      'communication': 'Communication',
      'knowledge': 'Knowledge'
    };

    // Iterate over each analysis entry
    vocAnalyses.forEach(voc => {
      for (const [field, parameter] of Object.entries(fieldsToCheck)) {
        const feedback = voc[field as keyof VocAnalysis];
        if (feedback in feedbackCategories) {
          const feedbackIndex = feedbackCategories[feedback];
          parameterCounts[parameter][feedbackIndex]++;
        }
      }
    });

    // Convert parameterCounts to datasets for barData2
    this.barData2 = {
      labels: Object.keys(parameterCounts),
      datasets: [
        {
          label: 'Very Satisfied',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          data: Object.values(parameterCounts).map(counts => counts[0])
        },
        {
          label: 'Satisfied',
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
          data: Object.values(parameterCounts).map(counts => counts[1])
        },
        {
          label: 'Neither Satisfied Nor Dissatisfied',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          data: Object.values(parameterCounts).map(counts => counts[2])
        },
        {
          label: 'Dissatisfied',
          backgroundColor: 'rgba(249, 115, 28, 0.5)',
          data: Object.values(parameterCounts).map(counts => counts[3])
        }
      ]
    };
  }

  updateDonutData(vocAnalyses: VocAnalysis[]) {
    let likelyCount = 0;
    let veryLikelyCount = 0;

    // Aggregate counts from the vocAnalyses data
    vocAnalyses.forEach(voc => {
      if (voc.engageService === 'Likely') {
        likelyCount++;
      } else if (voc.engageService === 'Very Likely') {
        veryLikelyCount++;
      }
    });

    // Update the donut chart data
    this.donutData = {
      labels: ['Very Likely', 'Likely'],
      datasets: [
        {
          data: [veryLikelyCount, likelyCount],
          backgroundColor: [
            'rgba(225, 29, 72, 0.5)',  // Light Red
            'rgba(16, 185, 129, 0.5)'  // Light Green
          ]
        }
      ]
    };
  }

  calculateSatisfactoryScore(vocAnalyses: VocAnalysis[]) {
    let totalScore = 0;
    let count = 0;

    vocAnalyses.forEach(voc => {
      if (voc.score !== 0) {
        totalScore += voc.score;
        count++;
      }
    });

    if (count > 0) {
      this.satisfactory_score = Math.floor(totalScore / count); // Using Math.floor to avoid decimals
    } else {
      this.satisfactory_score = 0; // Handle case with no valid feedback
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
          display: false,
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
