export interface DashboardTable {
  technologies: any;
  type: any;
  projectId: number;
  projectCode: string;
  projectName: string;
  du: string;
  duHead: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectManager: string;
  contractType: string;
  numberOfResources: number;
  customerName: string;
  region: string;
  technology: string;
  status: string;
  sqa: string | null;
  forecastedEndDate: Date| null;
  vocEligibilityDate: Date | null;
  projectDurationInDays: number;
  projectDurationInMonths: number;
  projectType: string | null;
  domain: string | null;
  databaseUsed: string | null;
  cloudUsed: string | null;
  feedbackStatus: string | null;
  mailStatus: string | null;

}


