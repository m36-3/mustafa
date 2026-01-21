
export interface Consultation {
  date: string;
  doctor: string;
  department: string;
  symptoms: string;
  diagnosis: string;
  recommendations: string;
}

export interface Surgery {
  type: string;
  year: number;
  surgeon: string;
  anesthesia: 'General' | 'Spinal' | 'Local' | 'Sedation';
  complications: boolean;
  complicationDescription?: string;
}

export interface Hospitalization {
  date: string;
  duration: string;
  chiefComplaint: string;
  physician: string;
  historyTakenBy: string;
  procedures: string[];
  clinicalSummary: string;
}

export interface Patient {
  id: string;
  familyId: string;
  role: 'Father' | 'Mother' | 'Son' | 'Daughter' | 'Husband' | 'Wife';
  roleAr: string;
  fullName: string;
  fullNameEn: string;
  gender: 'Male' | 'Female';
  photo: string;
  age: number;
  bloodType: string;
  occupation: string;
  address: string;
  governorate: string;
  medicalHistory: {
    chronicDiseases: string[];
    detailedSurgeries: Surgery[];
    allergies: {
      drug: string[];
      food: string[];
      chemical: string[];
    };
    familyHistory: string[];
    nonSurgicalAdmissions: { date: string; reason: string; duration: string }[];
  };
  lastConsultation: Consultation;
  hospitalizationLogs: Hospitalization[];
  medications: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  vaccines: {
    completed: { name: string; date: string }[];
    missing: string[];
  };
  socialData: {
    religion: string;
    financialStatus: string;
    marriageType: string;
    familyAtmosphere: string;
    dietaryHabits: string;
  };
  aiSummary: string;
}

export type PageType = 'LOGIN' | 'DASHBOARD' | 'PROFILE' | 'FAMILY';
