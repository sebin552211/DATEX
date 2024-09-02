export interface Filters {
    du: {[key: string]: boolean},
    duHead: { [key: string]: boolean };
    status: { [key: string]: boolean };
    contractType: { [key: string]: boolean };
    dusAndDuHeads: { [key: string]: boolean };
    regions: { [key: string]: boolean };
    customerNames: { [key: string]: boolean };
    projectManager: { [key: string]: boolean };
    numberOfResources: { [key: string]: boolean };
    projectStartDate: { [key: string]: boolean };
    projectEndDate: { [key: string]: boolean };
    domain: { [key: string]: boolean }; 
    technologies: { [key: string]: boolean };
    vocEligibilityDate: { [key: string]: boolean };
    cloudUsed: { [key: string]: boolean };
    feedbackStatus:{ [key: string]: boolean };
    sqa: { [key: string]: boolean };
    mailStatus: { [key: string]: boolean };
    projectType: { [key: string]: boolean };
    databaseUsed: { [key: string]: boolean };
  }