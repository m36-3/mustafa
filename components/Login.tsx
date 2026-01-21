
import React, { useState } from 'react';
import { WEBSITE_LOGO_URL } from '../assets';

interface LoginProps {
  onLogin: (id: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((id === '123456' && password === '123456') || (id.length >= 4 && password.length >= 4)) {
      onLogin(id);
    } else {
      setError('يرجى التأكد من صحة رقم المختص الطبي وكلمة المرور.');
    }
  };

  return (
    <div className="flex items-center justify-center pt-12 md:pt-20 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <img 
            src={WEBSITE_LOGO_URL} 
            alt="Ministry of Health Logo" 
            className="h-32 mx-auto mb-6 object-contain"
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-medicalBlue">نظام السجل الطبي الرقمي</h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Digital Medical Registry</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-black text-gray-700 mr-1">الرقم التعريفي للمختص</label>
            <input 
              type="text" 
              required
              placeholder="مثال: 123456"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-medicalBlue focus:bg-white transition-all outline-none font-bold"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-black text-gray-700 mr-1">كلمة المرور</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-medicalBlue focus:bg-white transition-all outline-none font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-medicalBlue hover:bg-medicalBlue-dark text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] text-lg"
          >
            تسجيل الدخول للنظام
          </button>
        </form>

        <div className="mt-8 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
          <p className="text-xs text-medicalBlue font-black mb-1">بيانات تجريبية (Demo):</p>
          <div className="flex justify-between text-[11px] text-gray-600 font-bold">
            <span>الرقم: <span className="text-medicalBlue">123456</span></span>
            <span>السر: <span className="text-medicalBlue">123456</span></span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2024 Iraqi Ministry of Health</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
