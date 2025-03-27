import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { VocAnalysisService } from '../../../service/voc-analysis.service';
import { VocAnalysis } from '../../../interface/voc-analysis';
import { SharedDataService } from '../../../service/shared-data.service';
import { DashboardFilterService } from '../../../service/dashboard-filter-service.service';
import { AnalysisFilterComponent } from '../analysis-filter/analysis-filter.component';


@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [CommonModule, ChartModule, AnalysisFilterComponent],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent1 implements OnInit {

  surveyId: string | null = null; 
  Du: string | null = null;
  quarter: string | null = null

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

  savedDate: string | null = null;
  // Satisfactory Score
  type: string = '';
  satisfactory_score: number = 0;
  Score: string | undefined;
  constructor(
    private vocAnalysisService: VocAnalysisService, 
              private sharedDateService: SharedDataService,
              private dashboard: DashboardFilterService ) {}

  ngOnInit() {    

    this.dashboard.filters$.subscribe((filters: { surveyId: any; DU: any; quarter: any }) => {
      this.surveyId = filters.surveyId; // Ensure it is assigned properly
      this.Du = filters.DU;
      this.quarter = filters.quarter;
      const { surveyId, DU, quarter  } = filters;
   
    if (surveyId || DU || quarter) {
      // Fetch feedback by surveyId
      this.vocAnalysisService.getFeedback(DU, surveyId, quarter).subscribe(
        (data) => {
          this.processData(data);
        },
        (error) => {
          console.error('Error fetching feedback by survey Id or DU name:', error);
        }
      );
    } else {
      
      this.vocAnalysisService.getVocAnalyses().subscribe(
        (data) => {
          this.processData(data);
        },
        (error) => {
          console.error('Error fetching VOC analyses:', error);
        }
      );
    }
  });

  this.sharedDateService.currentDate$.subscribe(date => {
    this.savedDate = date;
  });

    // Initialize chart options
    this.initializeChartOptions();
  }

  processData(data: VocAnalysis[]) {
    // Process the data to update your charts
    this.updateBarData1(data);
    this.updateBarData2(data);
    this.updateDonutData(data);
    this.onFileSelected(data);
  }

  onFileSelected(vocAnalyses: VocAnalysis[]): void {
    if (vocAnalyses) {
  
      if (this.surveyId && this.surveyId !== '' || this.quarter && this.quarter !== '' || this.Du && this.Du !== '') {  
        this.vocAnalysisService.uploadExcelAndGetScoreBysSurveyId(this.surveyId, this.quarter, this.Du).subscribe(
          (response) => {
            this.satisfactory_score = response.satisfactory_score;
            this.updateType(); 
          },
          (error) => {
            console.error('Error ho ho uploading file:', error);
          }
        );
      } else {
        this.vocAnalysisService.uploadExcelAndGetScore().subscribe(
          (response) => {
            this.satisfactory_score = response.satisfactory_score;
            this.updateType(); 
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
    }
  }
  
  updateType(): void {
    if (this.satisfactory_score >= 90) {
      this.type = 'Very Good';
    } else if (this.satisfactory_score > 80 && this.satisfactory_score < 90) {
      this.type = 'Satisfactory';
    } else {
      this.type = 'Dissatisfactory';
    }
  }
  
  getScoreColor(score: number): string {
    if (score >= 90) {
      return 'green';
    } else if (score > 80 && score <= 90) {
      return 'orange'; 
    } else {
      return 'red';
    }
  }

  initializeChartOptions() {
    this.barOptions1 = this.getBarChartOptionsPercentage(
      this.textColor, this.textColorSecondary, this.surfaceBorder, 'Feedback', 'Count'
    );
    this.barOptions2 = this.getBarChartOptionsPercentage(
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

    // Iterate over each analysis entry to count occurrences
    vocAnalyses.forEach(voc => {
      fieldsToCheck.forEach(field => {
        const feedback = voc[field];
        if (feedback && feedback in counts) {
          counts[feedback as keyof typeof counts]++;
        }
      });
    });

    vocAnalyses.forEach(voc => {
      fieldsToCheck.forEach(field => {
        const feedbackList = voc[field] as string[];
        if (Array.isArray(feedbackList)) {
          feedbackList.forEach(feedback => {
            if (feedback in counts) {
              counts[feedback as keyof typeof counts]++;
            }
          });
        }
      });
    });

    const totalFeedback = counts['Very Satisfied'] + counts['Satisfied'] + counts['Neither Satisfied nor Dissatisfied'] + counts['Dissatisfied'];
    
    // Prevent division by zero
    if (totalFeedback === 0) {
      this.barData1 = { labels: [], datasets: [] };
      return;
    }

    // Function to format percentage to 2 decimal places
    const formatPercentage = (value: number) => parseFloat(value.toFixed(2));

    // Compute percentages
    const percentages = {
      'Very Satisfied': formatPercentage((counts['Very Satisfied'] / totalFeedback) * 100),
      'Satisfied': formatPercentage((counts['Satisfied'] / totalFeedback) * 100),
      'Neither Satisfied nor Dissatisfied': formatPercentage((counts['Neither Satisfied nor Dissatisfied'] / totalFeedback) * 100),
      'Dissatisfied': formatPercentage((counts['Dissatisfied'] / totalFeedback) * 100),
      'N/A': formatPercentage((counts['N/A'] / (totalFeedback + counts['N/A'])) * 100) // Keeping N/A separately
    };

    // Update the barData1 with the percentage values
    this.barData1 = {
      labels: ['Very Satisfied', 'Satisfied', 'Neither Satisfied nor Dissatisfied', 'Dissatisfied', 'N/A'],
      datasets: [
        {
          backgroundColor: 'rgba(225, 29, 72, 0.5)',
          data: [
            percentages['Very Satisfied'],
            percentages['Satisfied'],
            percentages['Neither Satisfied nor Dissatisfied'],
            percentages['Dissatisfied'],
            percentages['N/A']
          ]
        }
      ]
    };

    // Update the pieData1 with percentages instead of counts
    this.updatePieData1(percentages);
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
      [key: string]: number[];
    } = {
      'Customer Focus': [0, 0, 0, 0],
      'Planning and Control': [0, 0, 0, 0],
      'Quality': [0, 0, 0, 0],
      'Communication': [0, 0, 0, 0],
      'Knowledge': [0, 0, 0, 0]
    };

    // Define total counts for each parameter
    const totalFeedbackCounts: { [key: string]: number } = {
      'Customer Focus': 0,
      'Planning and Control': 0,
      'Quality': 0,
      'Communication': 0,
      'Knowledge': 0
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
          totalFeedbackCounts[parameter]++;
        }
      }
    });

    vocAnalyses.forEach(voc => {
      for (const [field, parameter] of Object.entries(fieldsToCheck)) {
        const feedbackList = voc[field as keyof VocAnalysis] as string[];
        if (Array.isArray(feedbackList)) {
          feedbackList.forEach(feedback => {
            if (feedback in feedbackCategories) {
              const feedbackIndex = feedbackCategories[feedback];
              parameterCounts[parameter][feedbackIndex]++;
              totalFeedbackCounts[parameter]++;
            }
          });
        }
      }
    });

    // Function to calculate percentage with two decimal places
    const calculatePercentage = (count: number, total: number) =>
      total > 0 ? parseFloat(((count / total) * 100).toFixed(2)) : 0;

    // Convert parameterCounts to datasets for barData2
    this.barData2 = {
      labels: Object.keys(parameterCounts),
      datasets: [
        {
          label: 'Very Satisfied',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          data: Object.keys(parameterCounts).map(param =>
            calculatePercentage(parameterCounts[param][0], totalFeedbackCounts[param])
          )
        },
        {
          label: 'Satisfied',
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
          data: Object.keys(parameterCounts).map(param =>
            calculatePercentage(parameterCounts[param][1], totalFeedbackCounts[param])
          )
        },
        {
          label: 'Neither Satisfied Nor Dissatisfied',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          data: Object.keys(parameterCounts).map(param =>
            calculatePercentage(parameterCounts[param][2], totalFeedbackCounts[param])
          )
        },
        {
          label: 'Dissatisfied',
          backgroundColor: 'rgba(249, 115, 28, 0.5)',
          data: Object.keys(parameterCounts).map(param =>
            calculatePercentage(parameterCounts[param][3], totalFeedbackCounts[param])
          )
        }
      ]
    };
}

  updateDonutData(vocAnalyses: VocAnalysis[]) {
    let likelyCount = 0;
    let veryLikelyCount = 0;

    // Aggregate counts from the vocAnalyses data
    vocAnalyses.forEach(voc => {
      if (voc['engageService'] === 'Likely') {
        likelyCount++;
      } else if (voc['engageService'] === 'Very Likely') {
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

  // calculateSatisfactoryScore(vocAnalyses: VocAnalysis[]) {
  //   let totalScore = 0;
  //   let count = 0;
  //   var x = 0;
  //   vocAnalyses.forEach(voc => {
  //     if (voc['score'] !== 0) {
  //       totalScore += voc['score'];
  //       count++;
  //     }
  //     console.log("Count: "+ count);
  //   });

  //   if (count > 0) {
  //     x = Math.floor(totalScore / count);
  //     this.satisfactory_score = Math.floor(x / 0.48);
  //   } else {
  //     this.satisfactory_score = 0; 
  //   }

  //   if (this.satisfactory_score > 90) {
  //     this.type = 'Very Good';
  //   } else if (this.satisfactory_score > 80 && this.satisfactory_score <= 90) {
  //     this.type = 'Satisfactory';
  //   } else {
  //     this.type = 'Not Satisfactory';
  //   }
  // }


  // calculateSatisfactoryScore(vocAnalyses: VocAnalysis[]) {
  //   let totalScore = 0;
  //   let count = 0;
  //   let denominator = 48; // Default denominator
  //   let surveyIdNAcounts: { [key: string]: number } = {}; // To store count of "N/A" per SurveyId

  //   // Step 1: Count occurrences of "N/A" in columns 8 to 24 for each SurveyId
  //   vocAnalyses.forEach(voc => {
  //       if (!surveyIdNAcounts[voc['SurveyId']]) {
  //           surveyIdNAcounts[voc['SurveyId']] = 0;
  //       }

  //       // Checking columns 8 to 24 for "N/A"
  //       for (let i = 8; i <= 24; i+2) {
  //           if (voc[`col${i}`] === "N/A") { // Assuming columns are named as col8, col9, etc.
  //               surveyIdNAcounts[voc['SurveyId']]++;
  //           }
  //       }
  //   });

  //   // Step 2: Calculate total score and adjust denominator per SurveyId
  //   vocAnalyses.forEach(voc => {
  //       if (voc['score'] !== 0) {
  //           totalScore += voc['score'];
  //           count++;
  //       }
  //   });

  //   // Adjust the denominator based on N/A count for a specific SurveyId
  //   if (count > 0) {
  //       let surveyId = vocAnalyses[0]['SurveyId']; // Assuming all rows belong to the same SurveyId in context
  //       let naCount = surveyIdNAcounts[surveyId] || 0;
  //       denominator = 48 - naCount;

  //       let percentage = (totalScore / denominator) * 100; // Score percentage
  //       this.satisfactory_score = Math.floor(percentage);

  //       // Step 3: Determine satisfaction type
  //       if (this.satisfactory_score > 90) {
  //           this.type = 'Very Good';
  //       } else if (this.satisfactory_score > 80 && this.satisfactory_score <= 90) {
  //           this.type = 'Satisfactory';
  //       } else {
  //           this.type = 'Not Satisfactory';
  //       }
  //   } else {
  //       this.satisfactory_score = 0;
  //       this.type = 'Not Satisfactory';
  //   }
  // }

  //   getScoreColor(score: number): string {
  //     if (score > 90) {
  //       return 'green';
  //     } else if (score > 80 && score <= 90) {
  //       return 'orange'; 
  //     } else {
  //       return 'red';
  //     } 
  //   }
  
  // Method to get bar chart options
  getBarChartOptionsPercentage(
    textColor: string,
    textColorSecondary: string,
    surfaceBorder: string,
    xAxisTitle: string,
    yAxisTitle: string
  ) {
    return {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value}%`;
            }
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
            font: {
              size: 10
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
            color: textColor,
            callback: (value: number) => `${value}%` 
          }
        }
      }
    };
  }

  // getBarChartOptions( 
  //   textColor: string,
  //   textColorSecondary: string,
  //   surfaceBorder: string,
  //   xAxisTitle: string,
  //   yAxisTitle: string
  // ) {
  //   return {
  //     plugins: {
  //       legend: {
  //         display: false,
  //       }
  //     },
  //     scales: {
  //       x: {
  //         title: {
  //           display: true,
  //           text: xAxisTitle,
  //           color: textColor
  //         },
  //         ticks: {
  //           color: textColor,
  //           font: {
  //             size: 8
  //           },
  //           autoSkip: false,
  //           maxRotation: 0,
  //           minRotation: 0
  //         }
  //       },
  //       y: {
  //         title: {
  //           display: true,
  //           text: yAxisTitle,
  //           color: textColor
  //         },
  //         ticks: {
  //           color: textColor
  //         } 
  //       }
  //     }
  //   };
  // } 
  
        today(): string | null{
    const currentDate = localStorage.getItem('vocUploadDate');
    // const day = currentDate.getDate();
    // const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    // const year = currentDate.getFullYear();
    // const ordinal = this.getOrdinalSuffix(day);

    return  currentDate ;
  }

  // getOrdinalSuffix(day: number): string {
  //   if (day >= 11 && day <= 13) {
  //     return 'th';
  //   }
  //   switch (day % 10) {
  //     case 1: return 'st';
  //     case 2: return 'nd';
  //     case 3: return 'rd';
  //     default: return 'th';
  //   }
  // }
}
