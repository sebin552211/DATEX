export interface Filters {
    status: { [key: string]: boolean };
    contractType: { [key: string]: boolean };
    dusAndDuHeads: { [key: string]: boolean };
    regions: { [key: string]: boolean };
    customerName: { [key: string]: boolean };
    projectManager: { [key: string]: boolean };
    date: { [key: string]: boolean };
    numberOfResources: { [key: string]: boolean };
    startDate: { [key: string]: boolean };
    endDate: { [key: string]: boolean };
    domain: { [key: string]: boolean }; 
    technologies: { [key: string]: boolean };
    cloudUsed: { [key: string]: boolean };
    feedback: { [key: string]: boolean };
    SQA: { [key: string]: boolean };
    projectType: { [key: string]: boolean };
    databaseUsed: { [key: string]: boolean };
  }