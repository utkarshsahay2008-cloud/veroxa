import React, { useState } from 'react';
import { UserProfile, SyntheticPersona } from '../types';
import { parseDocument } from '../services/api';
import { Play, Upload } from 'lucide-react';

interface ProfilePageProps {
  personas: SyntheticPersona[];
  onAnalyze: (profile: UserProfile) => void;
  activeProfile: UserProfile;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ personas, onAnalyze, activeProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(activeProfile);
  const [sampleText, setSampleText] = useState('');
  const [activeTab, setActiveTab] = useState<'personas' | 'form' | 'upload'>('personas');
  const [parsing, setParsing] = useState(false);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonaSelect = (p: SyntheticPersona) => {
    setProfile(p.profile);
    onAnalyze(p.profile);
  };

  const handleParseDoc = async () => {
    if (!sampleText.trim()) return;
    setParsing(true);
    try {
      const { parsedProfile, analysis } = await parseDocument(sampleText);
      setProfile(parsedProfile);
      onAnalyze(parsedProfile);
    } catch (err) {
      alert('Failed to parse document content. Please enter valid JSON or key-value text.');
    } finally {
      setParsing(false);
    }
  };

  const sampleJSON = JSON.stringify(
    {
      name: "Aarav Mehta",
      age: 35,
      occupation: "salaried",
      annualIncome: 1500000,
      rent: 240000,
      hraReceived: 180000,
      lifeInsurance: 50000,
      ppf: 70000,
      healthInsuranceSelf: 25000,
      healthInsuranceParents: 25000,
      parentsAge: 62,
      nps: 50000,
      homeLoanInterest: 150000,
      evLoanInterest: 45000
    },
    null,
    2
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            SYNTHETIC DEMO DATA ONLY
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Your Household Tax Profile</h2>
          <p className="text-xs text-slate-500">Provide household details to evaluate against configured tax rules</p>
        </div>

        <button
          onClick={() => onAnalyze(profile)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          Run Tax Checkup
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('personas')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'personas' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Synthetic Household Personas
        </button>

        <button
          onClick={() => setActiveTab('form')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'form' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Edit Income & Expenses
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'upload' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Parse Sample Document
        </button>
      </div>

      {/* Personas Tab */}
      {activeTab === 'personas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => handlePersonaSelect(p)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-400 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <span className="text-xs text-slate-500">Age {p.profile.age}</span>
              </div>
              <p className="text-xs text-slate-500">{p.tagline}</p>
              <div className="pt-2 text-xs font-semibold text-slate-900 flex items-center justify-between border-t border-slate-100">
                <span>Annual Income: ₹{p.profile.annualIncome.toLocaleString('en-IN')}</span>
                <span className="text-slate-600 font-medium">Select & Check →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Tab */}
      {activeTab === 'form' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Age (Years)</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Employment Type</label>
              <select
                value={profile.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
              >
                <option value="salaried">Salaried Employee</option>
                <option value="self-employed">Self-Employed / Business</option>
                <option value="freelancer">Freelancer / Consultant</option>
                <option value="retired">Retired Pensioner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Gross Annual Income (₹)</label>
              <input
                type="number"
                value={profile.annualIncome}
                onChange={(e) => handleChange('annualIncome', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Housing & Rent</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Annual Rent Paid (₹)</label>
                <input
                  type="number"
                  value={profile.rent}
                  onChange={(e) => handleChange('rent', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">HRA Received from Employer (₹)</label>
                <input
                  type="number"
                  value={profile.hraReceived}
                  onChange={(e) => handleChange('hraReceived', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Section 80C Investments (Max ₹1,50,000)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">PPF Deposit (₹)</label>
                <input
                  type="number"
                  value={profile.ppf}
                  onChange={(e) => handleChange('ppf', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Life Insurance Premium (₹)</label>
                <input
                  type="number"
                  value={profile.lifeInsurance}
                  onChange={(e) => handleChange('lifeInsurance', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ELSS Mutual Funds (₹)</label>
                <input
                  type="number"
                  value={profile.elss}
                  onChange={(e) => handleChange('elss', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Loans & Vehicle Expenses</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Home Loan Interest (24b) (₹)</label>
                <input
                  type="number"
                  value={profile.homeLoanInterest}
                  onChange={(e) => handleChange('homeLoanInterest', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">EV Loan Interest (80EEB) (₹)</label>
                <input
                  type="number"
                  value={profile.evLoanInterest || 0}
                  onChange={(e) => handleChange('evLoanInterest', parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 45000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Business Vehicle Expenses (₹)</label>
                <input
                  type="number"
                  value={profile.vehicleExpenses || 0}
                  onChange={(e) => handleChange('vehicleExpenses', parseFloat(e.target.value) || 0)}
                  placeholder="Fuel/Maintenance/Depreciation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Health & Retirement</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Health Insurance Self/Family (₹)</label>
                <input
                  type="number"
                  value={profile.healthInsuranceSelf}
                  onChange={(e) => handleChange('healthInsuranceSelf', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">NPS (80CCD 1B) (₹)</label>
                <input
                  type="number"
                  value={profile.nps}
                  onChange={(e) => handleChange('nps', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => onAnalyze(profile)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
            >
              Analyze Profile
            </button>
          </div>
        </div>
      )}

      {/* Parse Document Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Parse Sample Document</h3>
            <p className="text-xs text-slate-500">Provide JSON or key-value text profile for normalization</p>
          </div>

          <textarea
            rows={8}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Paste JSON or structured profile text..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setSampleText(sampleJSON)}
              className="text-xs font-medium text-slate-700 hover:underline"
            >
              Load Sample JSON Template
            </button>

            <button
              onClick={handleParseDoc}
              disabled={parsing || !sampleText.trim()}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" />
              Parse & Analyze Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
