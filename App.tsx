
import React, { useState, useEffect } from 'react';
import { PageType, Patient } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientProfileView from './components/PatientProfileView';
import FamilyRecordView from './components/FamilyRecordView';
import Header from './components/Header';
import AddPatientModal from './components/AddPatientModal';
import AddFamilyModal from './components/AddFamilyModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('LOGIN');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Modal States
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);

  const handleLogin = (id: string) => {
    setIsLoggedIn(true);
    setCurrentPage('DASHBOARD');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('LOGIN');
    setSelectedPatient(null);
  };

  const viewPatientProfile = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentPage('PROFILE');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn && (
        <Header 
          onLogout={handleLogout} 
          onNav={(page) => setCurrentPage(page)} 
          currentPage={currentPage}
        />
      )}
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {currentPage === 'LOGIN' && <Login onLogin={handleLogin} />}
        {currentPage === 'DASHBOARD' && (
          <Dashboard 
            onViewProfile={viewPatientProfile} 
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
            onOpenAddFamily={() => setIsAddFamilyOpen(true)}
          />
        )}
        {currentPage === 'PROFILE' && selectedPatient && (
          <PatientProfileView 
            patient={selectedPatient} 
            onViewFamily={() => setCurrentPage('FAMILY')}
          />
        )}
        {currentPage === 'FAMILY' && selectedPatient && (
          <FamilyRecordView 
            patient={selectedPatient}
            onBack={() => setCurrentPage('PROFILE')}
          />
        )}
      </main>

      {/* Global Modals */}
      <AddPatientModal 
        isOpen={isAddPatientOpen} 
        onClose={() => setIsAddPatientOpen(false)} 
      />
      <AddFamilyModal 
        isOpen={isAddFamilyOpen} 
        onClose={() => setIsAddFamilyOpen(false)} 
      />

      {/* Floating Action Button (FAB) - Quick Access */}
      {isLoggedIn && currentPage !== 'LOGIN' && (
        <button 
          title="إضافة مريض جديد"
          className="fixed bottom-8 right-8 w-16 h-16 bg-emerald hover:bg-emerald-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 z-40 active:scale-90"
          onClick={() => setIsAddPatientOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
