
import React, { useState, useMemo } from 'react';
import { MOCK_PATIENTS } from '../data';
import { Patient } from '../types';

interface DashboardProps {
  onViewProfile: (patient: Patient) => void;
  onOpenAddPatient: () => void;
  onOpenAddFamily: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewProfile, onOpenAddPatient, onOpenAddFamily }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGov, setSelectedGov] = useState<string>('');

  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter(p => {
      const matchesSearch = p.fullName.includes(searchTerm) || p.familyId.includes(searchTerm) || p.fullNameEn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGov = selectedGov === '' || p.governorate === selectedGov;
      return matchesSearch && matchesGov;
    });
  }, [searchTerm, selectedGov]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search Bar & Quick Actions */}
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-grow relative w-full">
            <input 
              type="text" 
              placeholder="البحث باسم المريض، رقم العائلة، أو الاسم بالإنجليزية..."
              className="w-full pr-12 pl-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-medicalBlue focus:bg-white outline-none transition-all text-lg font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-medicalBlue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <select 
            className="w-full md:w-64 px-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-medicalBlue outline-none cursor-pointer font-black"
            value={selectedGov}
            onChange={(e) => setSelectedGov(e.target.value)}
          >
            <option value="">جميع المحافظات</option>
            <option value="بغداد">بغداد</option>
            <option value="البصرة">البصرة</option>
            <option value="نينوى">نينوى</option>
            <option value="كربلاء">كربلاء</option>
          </select>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onOpenAddPatient}
            className="bg-medicalBlue hover:bg-medicalBlue-dark text-white px-8 py-4 rounded-2xl font-black shadow-lg transition-all flex items-center gap-3 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            تسجيل مريض جديد
          </button>
          
          <button 
            onClick={onOpenAddFamily}
            className="bg-emerald hover:bg-emerald-dark text-white px-8 py-4 rounded-2xl font-black shadow-lg transition-all flex items-center gap-3 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            فتح سجل عائلة جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredPatients.map(patient => (
          <div 
            key={patient.id} 
            className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
            onClick={() => onViewProfile(patient)}
          >
            <div className="p-1.5 bg-gradient-to-l from-medicalBlue to-emerald opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={patient.photo} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm" />
                <div>
                  <h4 className="font-black text-xl text-gray-900 group-hover:text-medicalBlue transition-colors leading-tight">{patient.fullName}</h4>
                  <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-tight">Family ID: <span className="text-medicalBlue">#{patient.familyId}</span></p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-4 bg-gray-50/50 -mx-6 px-6 pb-4">
                <div className="text-center flex-grow">
                  <p className="text-gray-400 text-[10px] font-black uppercase mb-1">فصيلة الدم</p>
                  <p className="font-black text-red-600">{patient.bloodType}</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center flex-grow">
                  <p className="text-gray-400 text-[10px] font-black uppercase mb-1">العمر</p>
                  <p className="font-black text-gray-700">{patient.age} سنة</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center flex-grow">
                  <p className="text-gray-400 text-[10px] font-black uppercase mb-1">الدور</p>
                  <p className="font-black text-emerald-dark">{patient.roleAr}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
