import React, { useState } from 'react';
import { UserProfile, SyntheticPersona } from '../types';
import { parseDocument } from '../services/api';
import { User, Upload, Sparkles, Play, ShieldAlert } from 'lucide-react';

interface ProfilePageProps {
  personas: SyntheticPersona[];
  onAnalyze: (profile: UserProfile) => void;
  activeProfile: UserProfile;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ personas, onAnalyze, activeProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(activeProfile);
  const [sampleText, setSampleText] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'personas' | 'upload'>('personas');
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
      homeLoanInterest: 150000
    },
    null,
    2
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 px-4">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
              SYNTHETIC DEMO MODE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Financial Profile Input</h2>
          <p className="text-xs text-slate-500">Configure synthetic income and deductions for deterministic rule evaluation</p>
        </div>

        <button
          onClick={() => onAnalyze(profile)}
          className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-500/20 flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          Run Tax Analysis
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('personas')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'personas' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Quick Load Synthetic Personas
        </button>
        <button
          onClick={() => setActiveTab('form')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'form' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Edit Income & Expenses Form
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'upload' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Upload / Parse Sample Document
        </button>
      </div>

      {/* Persona Selection */}
      {activeTab === 'personas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => handlePersonaSelect(p)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-brand-500 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">Age {p.profile.age}</span>
              </div>
              <p className="text-xs text-slate-500">{p.tagline}</p>
              <div className="pt-2 text-xs font-semibold text-brand-600 flex items-center justify-between">
                <span>Annual Income: ₹{p.profile.annualIncome.toLocaleString('en-IN')}</span>
                <span className="bg-brand-50 px-2.5 py-1 rounded-lg">Load & Analyze →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Tab */}
      {activeTab === 'form' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation Type</label>
              <select
                value={profile.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
              >
                <option value="salaried">Salaried Employee</option>
                <option value="self-employed">Self-Employed / Business</option>
                <option value="freelancer">Freelancer / Consultant</option>
                <option value="retired">Retired Pensioner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gross Annual Income (₹)</label>
              <input
                type="number"
                value={profile.annualIncome}
                onChange={(e) => handleChange('annualIncome', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold text-brand-600"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Housing & Rent Expenses</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Rent Paid (₹)</label>
                <input
                  type="number"
                  value={profile.rent}
                  onChange={(e) => handleChange('rent', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">HRA Received from Employer (₹)</label>
                <input
                  type="number"
                  value={profile.hraReceived}
                  onChange={(e) => handleChange('hraReceived', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Section 80C Investments (Max ₹1.5 Lakhs)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">PPF Deposit (₹)</label>
                <input
                  type="number"
                  value={profile.ppf}
                  onChange={(e) => handleChange('ppf', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Life Insurance Premium (₹)</label>
                <input
                  type="number"
                  value={profile.lifeInsurance}
                  onChange={(e) => handleChange('lifeInsurance', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ELSS Mutual Funds (₹)</label>
                <input
                  type="number"
                  value={profile.elss}
                  onChange={(e) => handleChange('elss', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Health, Pension & Loans</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Health Insurance Self (₹)</label>
                <input
                  type="number"
                  value={profile.healthInsuranceSelf}
                  onChange={(e) => handleChange('healthInsuranceSelf', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NPS Contribution (80CCD 1B) (₹)</label>
                <input
                  type="number"
                  value={profile.nps}
                  onChange={(e) => handleChange('nps', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Home Loan Interest (24b) (₹)</label>
                <input
                  type="number"
                  value={profile.homeLoanInterest}
                  onChange={(e) => handleChange('homeLoanInterest', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => onAnalyze(profile)}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-500/20"
            >
              Analyze Updated Profile
            </button>
          </div>
        </div>
      )}

      {/* Upload Document Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Paste Clean Structured Sample Data</h3>
            <p className="text-xs text-slate-500 mt-0.5">Input JSON, CSV format, or structured text document for profile extraction</p>
          </div>

          <textarea
            rows={10}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Paste JSON profile or text document..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setSampleText(sampleJSON)}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Load Sample JSON Template
            </button>

            <button
              onClick={handleParseDoc}
              disabled={parsing || !sampleText.trim()}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Parse & Analyze Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
