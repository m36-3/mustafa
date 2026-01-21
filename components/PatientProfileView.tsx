
import React, { useState } from 'react';
import { Patient, Hospitalization } from '../types';
import AIWidget from './AIWidget';

interface PatientProfileViewProps {
  patient: Patient;
  onViewFamily: () => void;
}

const PatientProfileView: React.FC<PatientProfileViewProps> = ({ patient, onViewFamily }) => {
  const [activeTab, setActiveTab] = useState(3); // Defaulting to Admission Logs per request
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [addType, setAddType] = useState<'VISIT' | 'SURGERY' | 'HOSPITAL' | 'VACCINE'>('VISIT');
  const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(0);

  const toggleLog = (index: number) => {
    setExpandedLogIndex(expandedLogIndex === index ? null : index);
  };

  const goToNewAdmission = () => {
    setAddType('HOSPITAL');
    setActiveTab(5);
  };

  return (
    <div className="relative animate-fadeIn">
      {/* Floating AI Button */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed left-8 bottom-28 w-14 h-14 bg-medicalBlue text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        <div className="bg-gradient-to-r from-medicalBlue to-medicalBlue-dark h-32 p-8 flex justify-between items-start">
           <button 
            onClick={onViewFamily}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl backdrop-blur-md border border-white/20 transition-all font-bold flex items-center gap-2"
          >
            <span>عرض سجل العائلة</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </button>
        </div>
        <div className="px-10 pb-8 flex flex-col md:flex-row items-center gap-8 -mt-12">
          <img src={patient.photo} className="w-40 h-40 rounded-3xl border-8 border-white shadow-2xl object-cover bg-white" />
          <div className="text-center md:text-right flex-grow">
            <h2 className="text-4xl font-black text-gray-900 mb-2">{patient.fullName}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-emerald/10 text-emerald-dark px-4 py-1.5 rounded-full text-sm font-black">ID: {patient.id}</span>
              <span className="bg-medicalBlue/10 text-medicalBlue px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">{patient.bloodType}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-50 border-t border-gray-100 overflow-x-auto no-scrollbar">
          {[
            { id: 1, label: 'البيانات العامة', icon: '👤' },
            { id: 2, label: 'التاريخ السريري', icon: '📋' },
            { id: 3, label: 'سجلات التنويم', icon: '🏥' },
            { id: 4, label: 'الأدوية واللقاحات', icon: '💉' },
            { id: 5, label: 'إضافة قيد (+)', icon: '✏️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[180px] py-6 px-4 text-sm font-bold transition-all border-b-4 flex items-center justify-center gap-2 ${activeTab === tab.id ? 'border-medicalBlue text-medicalBlue bg-white shadow-inner' : 'border-transparent text-gray-400 hover:bg-gray-100'}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 min-h-[650px]">
        
        {/* Tab 1: General Info */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
             <div className="space-y-6">
              <h3 className="text-medicalBlue font-black border-r-4 border-medicalBlue pr-3">Demographics</h3>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Age</span><span className="font-bold">{patient.age} years</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Occupation</span><span className="font-bold">{patient.occupation}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Governorate</span><span className="font-bold">{patient.governorate}</span></div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-emerald font-black border-r-4 border-emerald pr-3">Socio-Economic</h3>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Financial</span><span className="font-bold">{patient.socialData.financialStatus}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Marriage</span><span className="font-bold">{patient.socialData.marriageType}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">Atmosphere</span><span className="font-bold">{patient.socialData.familyAtmosphere}</span></div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 self-start">
               <h4 className="text-medicalBlue font-black mb-3">AI Quick Insights ✨</h4>
               <p className="text-sm text-gray-700 leading-relaxed italic">"{patient.aiSummary}"</p>
            </div>
          </div>
        )}

        {/* Tab 2: Advanced Medical History */}
        {activeTab === 2 && (
          <div className="space-y-10 animate-fadeIn">
            <section className="bg-red-50/30 rounded-2xl p-6 border border-red-100">
              <h3 className="text-xl font-black text-red-600 mb-4">Chronic Diseases | الأمراض المزمنة</h3>
              <div className="flex flex-wrap gap-3">
                {patient.medicalHistory.chronicDiseases.map(d => (
                  <span key={d} className="bg-white border-2 border-red-200 text-red-700 px-5 py-2 rounded-xl font-bold shadow-sm">{d}</span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black text-medicalBlue mb-4 flex justify-between items-center">
                <span>Advanced Surgical History | العمليات الجراحية</span>
                <span className="text-xs text-gray-400">Detailed logs including surgeons & anesthesia</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patient.medicalHistory.detailedSurgeries.map((s, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border-2 ${s.complications ? 'border-orange-200 bg-orange-50/20' : 'border-gray-100 bg-gray-50/50'}`}>
                    <div className="flex justify-between mb-4">
                      <span className="font-black text-lg text-medicalBlue">{s.type}</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-black shadow-sm">{s.year}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                      <p className="text-gray-500">Surgeon: <span className="text-gray-900">{s.surgeon}</span></p>
                      <p className="text-gray-500">Anesthesia: <span className="text-gray-900">{s.anesthesia}</span></p>
                    </div>
                    {s.complications && (
                      <div className="mt-4 pt-4 border-t border-orange-200">
                        <p className="text-orange-700 text-xs italic">⚠️ Complications: {s.complicationDescription}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* General Hospitalizations Section (Non-surgical) */}
            <section className="bg-emerald/5 rounded-2xl p-6 border border-emerald/10">
              <h3 className="text-xl font-black text-emerald-dark mb-4">General Hospitalizations | سجلات التنويم العامة</h3>
              <div className="space-y-3">
                {patient.medicalHistory.nonSurgicalAdmissions.length > 0 ? (
                  patient.medicalHistory.nonSurgicalAdmissions.map((adm, idx) => (
                    <div key={idx} className="flex justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div>
                        <p className="font-black text-medicalBlue">{adm.reason}</p>
                        <p className="text-[10px] text-gray-400">Date: {adm.date}</p>
                      </div>
                      <span className="bg-emerald/10 text-emerald-dark px-3 py-1 rounded-full text-xs font-black self-center">{adm.duration}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">لا يوجد سجلات دخول عامة مسجلة.</p>
                )}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100 lg:col-span-2">
                <h3 className="text-lg font-black text-orange-700 mb-4">Categorized Allergies | تصنيفات الحساسية</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] text-orange-400 font-black uppercase mb-2">Drug Allergy</p>
                    <div className="flex flex-wrap gap-2">{patient.medicalHistory.allergies.drug.map(a => <span key={a} className="bg-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">{a}</span>)}</div>
                  </div>
                  <div>
                    <p className="text-[10px] text-orange-400 font-black uppercase mb-2">Food Allergy</p>
                    <div className="flex flex-wrap gap-2">{patient.medicalHistory.allergies.food.map(a => <span key={a} className="bg-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">{a}</span>)}</div>
                  </div>
                  <div>
                    <p className="text-[10px] text-orange-400 font-black uppercase mb-2">Chemicals</p>
                    <div className="flex flex-wrap gap-2">{patient.medicalHistory.allergies.chemical.map(a => <span key={a} className="bg-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">{a}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-black text-medicalBlue mb-4">Family History | وراثي</h3>
                <ul className="space-y-2">
                  {patient.medicalHistory.familyHistory.map(h => (
                    <li key={h} className="text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-medicalBlue rounded-full"></span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Specialized Hospitalization Logs (Admission Logs) */}
        {activeTab === 3 && (
          <div className="space-y-12 animate-fadeIn relative">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-black text-medicalBlue flex items-center gap-3">
                 <span>سجلات التنويم الرقمية</span>
                 <span className="text-sm text-gray-400 font-normal">Admission Logs Timeline</span>
               </h3>
               <button 
                 onClick={goToNewAdmission}
                 className="bg-medicalBlue hover:bg-medicalBlue-dark text-white px-6 py-3 rounded-2xl shadow-lg transition-all font-black flex items-center gap-2 text-sm"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                 </svg>
                 إضافة دخول جديد
               </button>
            </div>

            {/* Latest Admission Narrative Summary */}
            {patient.hospitalizationLogs.length > 0 && (
              <div className="bg-emerald/5 border-2 border-emerald/20 rounded-3xl p-8 mb-12 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 bg-emerald text-white px-6 py-2 text-[11px] font-black uppercase tracking-widest shadow-md">Special Focus: Latest Stay</div>
                <div className="flex items-center gap-4 mb-6 mt-6">
                  <div className="w-14 h-14 bg-emerald/10 rounded-2xl flex items-center justify-center text-emerald text-3xl">📝</div>
                  <h4 className="text-2xl font-black text-emerald-dark">Full Narrative Summary | الملخص السريري الشامل</h4>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald/10 shadow-inner">
                   <p className="text-lg text-gray-800 leading-relaxed italic font-medium">"{patient.hospitalizationLogs[0].clinicalSummary}"</p>
                </div>
              </div>
            )}

            {/* Admission History Timeline */}
            <div className="relative pr-8 md:pr-12">
              {/* Vertical Timeline Line */}
              <div className="absolute right-3 md:right-5 top-0 bottom-0 w-1 bg-gradient-to-b from-medicalBlue to-emerald/20 rounded-full"></div>

              <div className="space-y-6">
                {patient.hospitalizationLogs.map((log, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute right-0 top-6 -mr-1.5 md:-mr-2.5 w-4 h-4 md:w-6 md:h-6 rounded-full border-4 border-white bg-medicalBlue z-10 shadow-md"></div>
                    
                    {/* Expandable Accordion Card */}
                    <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${expandedLogIndex === idx ? 'ring-2 ring-medicalBlue/30 shadow-xl' : 'hover:border-medicalBlue/30'}`}>
                      {/* Header (Always Visible) */}
                      <button 
                        onClick={() => toggleLog(idx)}
                        className={`w-full text-right p-5 md:p-6 flex items-center justify-between transition-colors ${expandedLogIndex === idx ? 'bg-medicalBlue/5' : 'bg-white'}`}
                      >
                        <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-6">
                           <span className="text-xl font-black text-medicalBlue">{log.date}</span>
                           <span className="text-lg font-bold text-gray-700">{log.chiefComplaint}</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-xs font-black text-gray-400 uppercase hidden md:inline">{log.duration}</span>
                           <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-medicalBlue transition-transform ${expandedLogIndex === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                           </svg>
                        </div>
                      </button>

                      {/* Content (Conditional) */}
                      {expandedLogIndex === idx && (
                        <div className="p-6 border-t border-gray-50 bg-white animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-4">
                               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Treating Physician | الطبيب المعالج</p>
                                  <p className="font-black text-medicalBlue text-lg">{log.physician}</p>
                               </div>
                               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Logged By | مُوثق السجل</p>
                                  <p className="font-bold text-gray-700">{log.historyTakenBy}</p>
                               </div>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                               <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                                  <p className="text-[10px] text-medicalBlue font-black uppercase mb-2">Procedures & Clinical Actions | الإجراءات المتخذة</p>
                                  <div className="flex flex-wrap gap-2">
                                    {log.procedures.map(p => (
                                      <span key={p} className="bg-white border border-blue-100 px-3 py-1 rounded-lg text-xs font-black text-medicalBlue shadow-sm">
                                        • {p}
                                      </span>
                                    ))}
                                  </div>
                               </div>
                               <div className="p-4 rounded-xl border border-dashed border-gray-200">
                                  <p className="text-[10px] text-gray-400 font-black uppercase mb-2">Narrative Context | السياق السريري</p>
                                  <p className="text-sm text-gray-600 leading-relaxed italic">"{log.clinicalSummary}"</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Advanced Vaccines & Meds */}
        {activeTab === 4 && (
          <div className="space-y-12 animate-fadeIn">
            <section className="bg-blue-50/30 p-8 rounded-3xl border border-blue-100">
               <h3 className="text-xl font-black text-medicalBlue mb-6">Administered Vaccines | اللقاحات المكتملة</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {patient.vaccines.completed.map((v, i) => (
                   <div key={i} className="bg-white p-5 rounded-2xl flex justify-between items-center shadow-sm border border-emerald/10">
                     <div>
                       <p className="font-black text-gray-900">{v.name}</p>
                       <p className="text-[10px] text-gray-400">Date Taken: {v.date}</p>
                     </div>
                     <span className="w-8 h-8 bg-emerald/10 text-emerald rounded-full flex items-center justify-center font-black">✓</span>
                   </div>
                 ))}
               </div>
            </section>

            <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
               <h3 className="text-xl font-black text-red-600 mb-6 flex items-center gap-2">
                 <span>Missing / Overdue Vaccines (Alert List)</span>
                 <span className="text-xs font-normal">| اللقاحات المطلوبة</span>
               </h3>
               <div className="flex flex-wrap gap-4">
                 {patient.vaccines.missing.map((v, i) => (
                   <div key={i} className="bg-white px-6 py-4 rounded-2xl border-2 border-red-200 border-dashed flex items-center gap-4">
                     <span className="text-2xl animate-pulse">⚠️</span>
                     <div>
                       <p className="font-black text-red-800">{v}</p>
                       <p className="text-[9px] text-red-400 uppercase font-black">Missing According to Iraqi National Schedule</p>
                     </div>
                   </div>
                 ))}
               </div>
            </section>
          </div>
        )}

        {/* Tab 5: Dynamic Add Record */}
        {activeTab === 5 && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">إضافة قيد طبي جديد</h3>
            
            {/* Type Selector */}
            <div className="flex gap-2 mb-10 bg-gray-100 p-2 rounded-2xl">
              {[
                { id: 'VISIT', label: 'كشف دوري' },
                { id: 'SURGERY', label: 'عملية جراحية' },
                { id: 'HOSPITAL', label: 'دخول مستشفى' },
                { id: 'VACCINE', label: 'لقاح جديد' },
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setAddType(t.id as any)}
                  className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${addType === t.id ? 'bg-white text-medicalBlue shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('تم حفظ البيانات بنجاح في سجل المريض!'); setActiveTab(3); }}>
              {addType === 'VISIT' && (
                <>
                  <input type="text" placeholder="Department / القسم" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
                  <textarea placeholder="Symptoms & Findings | الأعراض والملاحظات" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none h-32" required></textarea>
                </>
              )}

              {addType === 'SURGERY' && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Surgery Type | اسم العملية" className="col-span-2 w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
                  <input type="text" placeholder="Surgeon | الطبيب الجراح" className="p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
                  <select className="p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold">
                    <option>General Anesthesia</option>
                    <option>Spinal Anesthesia</option>
                    <option>Local Anesthesia</option>
                  </select>
                </div>
              )}

              {addType === 'HOSPITAL' && (
                <>
                  <input type="text" placeholder="Chief Complaint | الشكوى الرئيسية" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
                  <input type="text" placeholder="Treating Physician | الطبيب المعالج" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
                  <textarea placeholder="Clinical Summary & Procedures | الملخص السريري والإجراءات" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none h-32" required></textarea>
                </>
              )}

              {addType === 'VACCINE' && (
                <input type="text" placeholder="Vaccine Name | اسم اللقاح" className="w-full p-4 rounded-xl border-2 focus:border-medicalBlue outline-none font-bold" required />
              )}

              <div className="flex gap-4">
                <input type="date" className="flex-1 p-4 rounded-xl border-2 outline-none font-bold" required />
                <button className="flex-[2] bg-emerald hover:bg-emerald-dark text-white font-black py-4 rounded-xl shadow-xl transition-all">
                   تأكيد الإضافة للسجل
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* AI Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-full md:w-[450px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[60] transform transition-transform duration-500 ease-in-out ${isAiOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-8 bg-medicalBlue text-white flex justify-between items-center">
            <h4 className="text-xl font-black">المساعد الذكي (MOH AI)</h4>
            <button onClick={() => setIsAiOpen(false)} className="hover:rotate-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-grow p-0 overflow-hidden">
             <AIWidget patient={patient} />
          </div>
        </div>
      </div>
      {isAiOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setIsAiOpen(false)}></div>}
    </div>
  );
};

export default PatientProfileView;
