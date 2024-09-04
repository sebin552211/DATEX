export interface ExcelRow {
  [key: string]: any; // Add this line to allow dynamic keys
  ProjectCode: string;
  SQA: string;
  ForecastedEndDate?: Date;
  VOCEligibilityDate?: Date;
  ProjectType: string;
  Domain: string;
  DatabaseUsed: string;
  CloudUsed: string;
  FeedbackStatus: string;
  MailStatus: string;
  Technology: string;
}
