
import React, { useState } from 'react';
import { DEFAULT_PATIENT_IMAGE } from '../assets';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إضافة المريض بنجاح إلى قاعدة البيانات الوطنية.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-medicalBlue p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-black">تسجيل مريض جديد | Add New Patient</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 no-scrollbar">
          {/* Photo Upload Area */}
          <div className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
            <img src={DEFAULT_PATIENT_IMAGE} alt="Default" className="w-24 h-24 rounded-2xl object-cover bg-white shadow-sm" />
            <label className="bg-medicalBlue hover:bg-medicalBlue-dark text-white px-6 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all">
              رفع صورة المريض | Upload Photo
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-black text-gray-700 mb-2">الاسم الرباعي (Arabic Full Name)</label>
              <input required type="text" placeholder="مثال: محمد جاسم علي العامري" className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold" />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">رقم العائلة (Family ID)</label>
              <input required type="text" placeholder="مثال: 100201" className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold" />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">العمر (Age)</label>
              <input required type="number" placeholder="العمر بالسنوات" className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold" />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">الجنس (Gender)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold">
                <option value="Male">ذكر | Male</option>
                <option value="Female">أنثى | Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">فصيلة الدم (Blood Type)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-black text-gray-700 mb-2">العنوان الكامل (Address)</label>
              <input required type="text" placeholder="المحافظة - القضاء - الحي" className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-black text-gray-700 mb-2">التشخيص الأولي (Initial Diagnosis)</label>
              <textarea rows={3} placeholder="اكتب التشخيص الأولي هنا..." className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold resize-none"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-black text-gray-700 mb-2">الحساسية المعروفة (Known Allergies)</label>
              <input type="text" placeholder="مثل: البنسلين، أطعمة معينة..." className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-medicalBlue outline-none font-bold" />
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button type="submit" className="flex-1 bg-emerald text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-dark transition-all">تأكيد التسجيل | Submit</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all">إلغاء | Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
