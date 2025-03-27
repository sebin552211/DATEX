export interface DashboardTable {
  filter(arg0: (project: any) => boolean): any;
  technologies: any;
  type: any;
  projectId: number;
  projectCode: string;
  projectName: string;
  du: string;
  duHead: string;
  projectStartDate: Date | null;
  projectEndDate: Date | null;
  projectManager: string;
  contractType: string;
  numberOfResources: number;
  customerName: string;
  region: string;
  technology: string;
  status: string;
  sqa: string | null;
  forecastedEndDate: string | null;
  vocEligibilityDate: string | null;
  projectDurationInDays: number;
  projectDurationInMonths: number;
  projectType: string | null;
  domain: string | null;
  databaseUsed: string | null;
  cloudUsed: string | null;
  feedbackStatus: string | null;
  mailStatus: string | null;
  vocFeedbackReceivedDate: Date | null;
  vocRemarks: string | null;
  pmInitiateDate: Date | null;
  pmMails: string | null;
}


