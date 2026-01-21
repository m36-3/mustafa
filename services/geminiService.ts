
import { GoogleGenAI } from "@google/genai";
import { Patient } from "../types";

export const getAIReport = async (patient: Patient, query: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `You are a medical consultant for the Iraqi Ministry of Health.
    Analyze the following for patient ${patient.fullNameEn}:
    - Chronic: ${patient.medicalHistory.chronicDiseases.join(", ")}
    - Surgeries: ${patient.medicalHistory.detailedSurgeries.map(s => s.type).join(", ")}
    - Recent Admission: ${patient.hospitalizationLogs[0]?.clinicalSummary || "None"}
    - Allergies: ${patient.medicalHistory.allergies.drug.join(", ")}
    Based on this clinical data, answer the doctor's query.
    Rules: 
    1. Arabic response with English clinical terms.
    2. Professional and strictly medical.
    3. If query asks about risks, consider the surgical and admission history.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3, // Lower temperature for more clinical accuracy
      },
    });

    return response.text || "لا يمكن تحليل البيانات حالياً.";
  } catch (error) {
    console.error("AI Error:", error);
    return "حدث خطأ في معالجة البيانات الطبية.";
  }
};
