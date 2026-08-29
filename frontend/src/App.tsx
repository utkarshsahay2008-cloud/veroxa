import React, { useState, useEffect } from 'react';
import { UserProfile, CompleteAnalysisResponse, SyntheticPersona } from './types';
import { fetchPersonas, analyzeProfile } from './services/api';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { LandingPage } from './pages/LandingPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'landing' | 'profile' | 'dashboard'>('landing');
  const [personas, setPersonas] = useState<SyntheticPersona[]>([]);
  const [activePersona, setActivePersona] = useState<SyntheticPersona | null>(null);
  const [analysis, setAnalysis] = useState<CompleteAnalysisResponse | null>(null);

  const defaultProfile: UserProfile = {
    name: 'Aarav Mehta',
    age: 35,
    gender: 'Male',
    residency: 'Indian Resident',
    occupation: 'salaried',
    annualIncome: 1500000,
    rent: 240000,
    hraReceived: 180000,
    lifeInsurance: 50000,
    ppf: 70000,
    elss: 30000,
    epf: 60000,
    tuitionFees: 0,
    homeLoanPrincipal: 0,
    healthInsuranceSelf: 25000,
    healthInsuranceParents: 25000,
    parentsAge: 62,
    nps: 50000,
    homeLoanInterest: 150000,
    propertyType: 'Self-occupied',
    savingsInterest: 12000,
    hasGirlChild: false,
    girlChildAge: null,
    isTaxPayer: true
  };

  const [currentProfile, setCurrentProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    fetchPersonas()
      .then(data => {
        setPersonas(data);
        if (data.length > 0) {
          setActivePersona(data[0]);
          setCurrentProfile(data[0].profile);
        }
      })
      .catch(err => console.error('Failed to load personas:', err));
  }, []);

  const handleRunAnalysis = async (profToAnalyze: UserProfile) => {
    try {
      const res = await analyzeProfile(profToAnalyze);
      setAnalysis(res);
      setCurrentProfile(profToAnalyze);
      setCurrentTab('dashboard');
    } catch (err) {
      console.error('Analysis failed:', err);
      alert('Analysis request failed. Make sure backend engine is running.');
    }
  };

  const handleSelectPersona = (p: SyntheticPersona) => {
    setActivePersona(p);
    setCurrentProfile(p.profile);
    handleRunAnalysis(p.profile);
  };

  const handleTryDemo = () => {
    if (personas.length > 0) {
      handleSelectPersona(personas[0]);
    } else {
      handleRunAnalysis(defaultProfile);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <DisclaimerBanner />
      
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePersonaName={activePersona?.name}
        hasAnalysis={Boolean(analysis)}
      />

      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            personas={personas}
            onSelectPersona={handleSelectPersona}
            onTryDemo={handleTryDemo}
          />
        )}

        {currentTab === 'profile' && (
          <ProfilePage
            personas={personas}
            onAnalyze={handleRunAnalysis}
            activeProfile={currentProfile}
          />
        )}

        {currentTab === 'dashboard' && analysis && (
          <DashboardPage analysis={analysis} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 space-y-1">
        <p><strong>Veroxa</strong> — Explainable AI Tax Guidance & Savings Assistant</p>
        <p>Configurable Rule Engine Architecture • Synthetic Data Only • Educational Purpose</p>
      </footer>
    </div>
  );
};
