
import React, { useState } from 'react';

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFamilyModal: React.FC<AddFamilyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [familyId] = useState(Math.floor(10000000 + Math.random() * 90000000).toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم تسجيل العائلة رقم ${familyId} بنجاح.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-emerald p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-black">تسجيل عائلة جديدة | Add New Family</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="bg-emerald/5 p-4 rounded-2xl border border-emerald/10 flex justify-between items-center">
             <div>
               <p className="text-[10px] text-emerald-dark font-black uppercase">Family ID Generator</p>
               <p className="text-2xl font-black text-gray-900">#{familyId}</p>
             </div>
             <span className="bg-emerald text-white px-3 py-1 rounded-lg text-xs font-black">Unique 8-Digit ID</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">الوضع المالي (Financial Status)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-emerald outline-none font-bold">
                <option>جيد جداً | Excellent</option>
                <option>متوسط | Average</option>
                <option>محدود | Limited</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">نوع الزواج (Marriage Type)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-emerald outline-none font-bold">
                <option>غير أقارب | Non-relative</option>
                <option>أقارب درجة أولى | First Cousins</option>
                <option>أقارب درجة ثانية | Relatives</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">الجو العائلي (Family Atmosphere)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-emerald outline-none font-bold">
                <option>مستقر | Stable</option>
                <option>متوتر | Tense</option>
                <option>منفصل | Separated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">العادات الغذائية (Dietary Habits)</label>
              <select className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-emerald outline-none font-bold">
                <option>تقليدية | Traditional</option>
                <option>صحية | Healthy/Balanced</option>
                <option>وجبات سريعة | High Fast Food</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-black text-gray-700 mb-2">تاريخ الأمراض الوراثية (Known Family Diseases)</label>
              <textarea rows={3} placeholder="اذكر أي أمراض وراثية معروفة في العائلة..." className="w-full p-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:border-emerald outline-none font-bold resize-none"></textarea>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button type="submit" className="flex-1 bg-emerald text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-dark transition-all">فتح سجل العائلة | Register Family</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all">إلغاء | Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFamilyModal;
