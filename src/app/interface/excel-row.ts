export interface ExcelRow {
  [key: string]: any; // Index signature for dynamic property access
  ProjectCode?: string;
  SQA?: string;
  ForecastedEndDate?: Date;
  VOCEligibilityDate?: Date;
  ProjectType?: string;
  Domain?: string;
  DatabaseUsed?: string;
  CloudUsed?: string;
  FeedbackStatus?: string;
  MailStatus?: string;
}
