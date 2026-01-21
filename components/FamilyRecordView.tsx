
import React, { useState } from 'react';
// Correctly import Patient from types.ts instead of data.ts
import { Patient } from '../types';
import { MOCK_PATIENTS, MOCK_FAMILIES } from '../data';

interface FamilyRecordViewProps {
  patient: Patient;
  onBack: () => void;
}

const FamilyRecordView: React.FC<FamilyRecordViewProps> = ({ patient, onBack }) => {
  const [familyTab, setFamilyTab] = useState(1);
  const relatives = MOCK_PATIENTS.filter(p => p.familyId === patient.familyId);
  const familyHealth = MOCK_FAMILIES.find(f => f.familyId === patient.familyId);

  return (
    <div className="animate-fadeIn pb-20">
      <div className="flex items-center gap-6 mb-10">
        <button onClick={onBack} className="p-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medicalBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-4xl font-black text-gray-900">سجل العائلة الرقمي <span className="text-medicalBlue">#{patient.familyId}</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Left Column: Hierarchy Tree */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-medicalBlue mb-12 flex items-center gap-3">
            <span className="w-10 h-10 bg-medicalBlue/10 flex items-center justify-center rounded-xl">🌳</span>
            الهيكل التنظيمي للعائلة
          </h3>
          
          <div className="space-y-12 relative pr-10">
            {/* Tree Line */}
            <div className="absolute right-0 top-10 bottom-10 w-1 bg-gradient-to-b from-medicalBlue/20 to-emerald/20 rounded-full"></div>

            {relatives.map((member) => (
              <div key={member.id} className="relative flex items-center gap-6 group">
                <div className="absolute right-0 top-1/2 w-10 h-1 bg-gray-100 -mr-10"></div>
                <div className={`w-24 h-24 rounded-2xl p-1 shrink-0 z-10 transition-transform group-hover:scale-105 ${member.id === patient.id ? 'ring-4 ring-emerald bg-emerald/10' : 'ring-4 ring-gray-100 bg-white'}`}>
                  <img src={member.photo} className="w-full h-full rounded-xl object-cover" />
                </div>
                <div className={`flex-grow p-6 rounded-2xl border transition-all ${member.id === patient.id ? 'bg-emerald/5 border-emerald/20' : 'bg-white border-gray-100 group-hover:border-medicalBlue shadow-sm'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-xl text-gray-900">{member.fullName}</h4>
                      <p className="text-sm font-bold text-medicalBlue uppercase">{member.roleAr} ({member.role})</p>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-gray-400 font-bold block">العمر</span>
                      <span className="font-black">{member.age} سنة</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Info Tabs */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex bg-gray-50">
              <button onClick={() => setFamilyTab(1)} className={`flex-1 py-6 font-black text-sm transition-all ${familyTab === 1 ? 'bg-white text-medicalBlue border-b-4 border-medicalBlue' : 'text-gray-400'}`}>🧬 الأمراض الوراثية</button>
              <button onClick={() => setFamilyTab(2)} className={`flex-1 py-6 font-black text-sm transition-all ${familyTab === 2 ? 'bg-white text-emerald border-b-4 border-emerald' : 'text-gray-400'}`}>📊 البيانات السوسيو-اقتصادية</button>
            </div>
            
            <div className="p-10 min-h-[400px]">
              {familyTab === 1 && (
                <div className="animate-fadeIn space-y-8">
                  <section>
                    <h4 className="text-orange-600 font-black mb-4 flex items-center gap-2">⚠️ اضطرابات عائلية مسجلة</h4>
                    <ul className="space-y-4">
                      {familyHealth?.familyDisorders.map(d => (
                        <li key={d} className="bg-orange-50 p-4 rounded-xl border border-orange-100 font-bold text-orange-800">● {d}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4 className="text-medicalBlue font-black mb-4 flex items-center gap-2">🧬 أمراض وراثية مشتركة</h4>
                    <div className="flex flex-wrap gap-3">
                      {familyHealth?.hereditaryDiseases.map(d => (
                        <span key={d} className="bg-blue-50 text-medicalBlue px-6 py-3 rounded-2xl border border-blue-100 font-black">{d}</span>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {familyTab === 2 && (
                <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: 'الديانة', val: patient.socialData.religion, icon: '🌙' },
                    { label: 'الوضع المالي', val: patient.socialData.financialStatus, icon: '💰' },
                    { label: 'نوع الزواج', val: patient.socialData.marriageType, icon: '💍' },
                    { label: 'الجو النفسي', val: patient.socialData.familyAtmosphere, icon: '😊' },
                    { label: 'العادات الغذائية', val: patient.socialData.dietaryHabits, icon: '🍽️' },
                  ].map(item => (
                    <div key={item.label} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <span>{item.icon}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">{item.label}</span>
                      </div>
                      <p className="text-xl font-black text-gray-900">{item.val}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyRecordView;
