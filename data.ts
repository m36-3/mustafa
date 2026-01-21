
import { Patient, Surgery, Hospitalization } from './types';
import { getPatientPhoto } from './assets';

const firstNamesM = ["حيدر", "محمد", "جاسم", "مصطفى", "عباس", "علي", "كرار", "حسين", "ياسين", "سيف", "زيد", "أحمد", "عمر", "عثمان", "بكر"];
const firstNamesF = ["زينب", "مريم", "فاطمة", "سارة", "نور", "هدى", "آية", "رغد", "منى", "دعاء", "يسرى", "غادة", "تمارة", "رؤى", "ضحى"];
const midNames = ["كاظم", "جواد", "عبد الحسن", "فالح", "كريم", "لطيف", "خالد", "شاكر", "محسن", "جبار", "ستار", "حميد", "مجيد"];
const lastNames = ["العامري", "اللامي", "الزبيدي", "الجبوري", "الخفاجي", "الساعدي", "الربيعي", "التميمي", "العبيدي", "الجنابي", "المحمداوي"];
const govs = ["بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء", "كركوك", "ذي قار", "ميسان", "بابل", "الأنبار"];

const generateFamily = (familyId: string, gov: string): Patient[] => {
  const familyMembers: Patient[] = [];
  const familyLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const address = `حي ${Math.random() > 0.5 ? 'المنصور' : 'الحسين'}، ${gov}`;
  const numMembers = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numMembers; i++) {
    const isMale = i === 0 || (i > 1 && Math.random() > 0.5);
    const role: any = i === 0 ? 'Father' : i === 1 ? 'Mother' : (isMale ? 'Son' : 'Daughter');
    
    const fName = isMale ? firstNamesM[Math.floor(Math.random() * firstNamesM.length)] : firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
    const m1 = midNames[Math.floor(Math.random() * midNames.length)];
    const fullName = `${fName} ${m1} ${familyLastName}`;

    const age = role === 'Father' || role === 'Mother' ? 35 + Math.floor(Math.random() * 45) : 1 + Math.floor(Math.random() * 30);

    const patient: Patient = {
      id: `M-24-${Math.floor(10000 + Math.random() * 90000)}`,
      familyId: familyId,
      role: role,
      roleAr: role === 'Father' ? 'الأب' : role === 'Mother' ? 'الأم' : (isMale ? 'الابن' : 'الابنة'),
      fullName: fullName,
      fullNameEn: `${fName} ${familyLastName}`,
      gender: isMale ? 'Male' : 'Female',
      photo: getPatientPhoto(fullName), // استخدام الصور المركزية
      age: age,
      bloodType: ["A+", "O+", "B+", "AB-"][Math.floor(Math.random() * 4)],
      occupation: age > 22 ? "Medical Staff" : "Student",
      address: address,
      governorate: gov,
      medicalHistory: {
        chronicDiseases: ["Diabetes Type 2", "Hypertension"],
        detailedSurgeries: [
          {
            type: "Gallbladder Removal",
            year: 2018,
            surgeon: "Dr. Ali Al-Rawi",
            anesthesia: "General",
            complications: false
          }
        ],
        allergies: {
          drug: ["Penicillin"],
          food: ["Nuts"],
          chemical: ["Iodine"]
        },
        familyHistory: ["Hereditary Heart Disease", "Thalassemia"],
        nonSurgicalAdmissions: [
          { date: "2020-05-10", reason: "Severe Bronchitis", duration: "4 days" }
        ]
      },
      lastConsultation: {
        date: "2024-01-15",
        doctor: "د. حسن الهاشمي",
        department: "Internal Medicine",
        symptoms: "Fatigue and joint pain",
        diagnosis: "Vitamin D deficiency",
        recommendations: "Start Vitamin D supplements 50,000 IU weekly."
      },
      hospitalizationLogs: [
        {
          date: "2023-11-20",
          duration: "5 Days",
          chiefComplaint: "Acute Abdominal Pain",
          physician: "Dr. Ahmed Kamil",
          historyTakenBy: "Nurse Zainab",
          procedures: ["Abdominal CT", "Blood Chemistry", "IV Fluids"],
          clinicalSummary: "Patient admitted with suspected appendicitis. Managed conservatively with antibiotics as symptoms improved. Follow-up scheduled."
        }
      ],
      medications: [{ name: "Metformin", dosage: "500mg", duration: "Chronic" }],
      vaccines: {
        completed: [
          { name: "BCG", date: "Initial" },
          { name: "Polio", date: "Initial" },
          { name: "Pfizer COVID-19", date: "2021-12-05" }
        ],
        missing: ["Influenza (Seasonal)", "Meningococcal"]
      },
      socialData: {
        religion: "Islam",
        financialStatus: "Good",
        marriageType: "Non-relative",
        familyAtmosphere: "Stable",
        dietaryHabits: "Traditional"
      },
      aiSummary: "Patient exhibits stable metabolic parameters. Surgical history is clean with no recent acute episodes."
    };
    familyMembers.push(patient);
  }
  return familyMembers;
};

const allPatients: Patient[] = [];
for(let i=0; i<60; i++) {
  const gov = govs[Math.floor(Math.random() * govs.length)];
  const familyId = (100000 + i).toString();
  allPatients.push(...generateFamily(familyId, gov));
}

export const MOCK_PATIENTS = allPatients.slice(0, 300);
export const MOCK_FAMILIES = Array.from(new Set(MOCK_PATIENTS.map(p => p.familyId))).map(fid => ({
  familyId: fid,
  hereditaryDiseases: ["Thalassemia"],
  familyDisorders: ["Asthma"]
}));
