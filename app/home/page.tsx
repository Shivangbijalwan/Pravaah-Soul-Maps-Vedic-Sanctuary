'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Edit2,
  Zap,
  Shield,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeNavbar } from '../../components';

interface BirthDetails {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface ProgressStepProps {
  number: string;
  label: string;
  completed?: boolean;
  active?: boolean;
}
const ProgressStep = ({
  number,
  label,
  completed = false,
  active = false,
}: ProgressStepProps) => {
    const isCompleted = completed;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
          isCompleted
            ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
            : active
            ? 'bg-amber-400 text-stone-900'
            : 'bg-stone-700 text-stone-400'
        }`}
      >
        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : number}
      </div>

      <span
        className={`text-xs font-medium tracking-wide uppercase ${
          isCompleted
            ? 'text-orange-500'
            : active
            ? 'text-amber-400'
            : 'text-stone-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

  const ProgressConnector = ({ active = false }: { active?: boolean }) => (
    <div
      className={`mx-2 h-0.5 flex-1 rounded-full transition-all ${
        active ? 'bg-gradient-to-r from-orange-500 to-amber-400' : 'bg-stone-700'
      }`}
    />
  );

  interface FormFieldProps {
    label: string;
    icon: LucideIcon;
    value: string;
    placeholder: string;
    type?: string;
    badge?: string;
    onChange: (value: string) => void;
  }

const FormField = ({ label, icon: Icon, value, placeholder, type = 'text', badge, onChange }: FormFieldProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
        {label}
      </label>
      {badge && (
        <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-400">
          {badge}
        </span>
      )}
    </div>
    <div className="relative flex items-center bg-stone-900 rounded-lg transition-all focus-within:bg-stone-800 focus-within:ring-1 focus-within:ring-orange-500/30 shadow-sm">
      <div className="pl-4 pr-2 text-orange-500 flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3.5 pr-4 bg-transparent text-stone-100 font-medium focus:outline-none placeholder:text-stone-500"
      />
    </div>
  </div>
);

export default function BirthDetailsForm() {
  const [details, setDetails] = useState<BirthDetails>({
    fullName: 'Aarav Sharma',
    dateOfBirth: '05 March 2007',
    timeOfBirth: '10:30 AM',
    placeOfBirth: 'Dehradun, Uttarakhand, India',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof BirthDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateReading = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <HomeNavbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Progress Indicator */}
        <div className="mb-10 sm:mb-12">
          <div className="bg-stone-900/50 border border-stone-800/50 rounded-xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <ProgressStep number="1" label="Intent" completed />
              <ProgressConnector active />
              <ProgressStep number="2" label="Birth Details" active />
              <ProgressConnector />
              <ProgressStep number="3" label="Confirm" />
              <ProgressConnector />
              <ProgressStep number="4" label="Reading" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-medium text-stone-400 uppercase tracking-widest">
                  Step 2 of 4 • Celestial Alignment
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                50% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section className="mb-10 sm:mb-12">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                Sanctuary Records
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-stone-100 mb-2">
              Where Did Your Journey Begin?
            </h1>
            <p className="text-sm text-stone-400">
              Accurate celestial coordinates and temporal origin refine your personal planetary alignment.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800/50 rounded-xl p-6 sm:p-8 space-y-6">
            <FormField
              label="Full Name"
              icon={User}
              value={details.fullName}
              placeholder="Enter full birth name"
              badge="Confirmed"
              onChange={(value) => handleInputChange('fullName', value)}
            />

            <FormField
              label="Date of Birth"
              icon={Calendar}
              value={details.dateOfBirth}
              placeholder="Enter birth date"
              badge="Solar Date"
              onChange={(value) => handleInputChange('dateOfBirth', value)}
            />

            <FormField
              label="Time of Birth"
              icon={Clock}
              value={details.timeOfBirth}
              placeholder="Enter birth time"
              badge="Exact"
              onChange={(value) => handleInputChange('timeOfBirth', value)}
            />

            <FormField
              label="Place of Birth"
              icon={MapPin}
              value={details.placeOfBirth}
              placeholder="Enter birth location"
              onChange={(value) => handleInputChange('placeOfBirth', value)}
            />

            <div className="mt-6 p-4 rounded-lg bg-stone-800/30 border border-stone-700/50 flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-stone-400">
                Time within ±2 minutes ensures exact Lagna (Ascendant) calculation. You can update this
                later from your sanctuary profile.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Card */}
        <section className="mb-10 sm:mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <h2 className="text-xl sm:text-2xl font-semibold text-stone-100">Everything Look Right?</h2>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Review</span>
            </div>
          </div>

          <div className="bg-stone-900/50 border border-stone-800/50 rounded-xl p-6 sm:p-8 overflow-hidden relative">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

            {/* Header */}
            <div className="mb-6 pb-6 border-b border-stone-800/50 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(251,146,60,0.2)]">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-stone-100">{details.fullName}</span>
                    <span className="text-xs text-stone-500">Natal Vedic Chart Generation</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/50 border border-stone-700/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-stone-300">Active Lagna</span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              {[
                { label: 'Name', value: details.fullName },
                { label: 'Date of Birth', value: details.dateOfBirth, highlight: true },
                { label: 'Birth Time', value: details.timeOfBirth },
                { label: 'Location', value: details.placeOfBirth.split(',')[0] },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-800/50 border border-stone-700/50 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-1">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      item.highlight ? 'text-amber-400' : 'text-stone-200'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

      

            {/* Action Buttons */}
            <div className="space-y-3 relative z-10">
              <button
                onClick={handleGenerateReading}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-full bg-orange-500 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(249,115,22,0.45)] hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] disabled:opacity-75 active:scale-95 transition-all"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Aligning Celestial Spheres...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Reading</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-stone-900/50 border border-stone-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Privacy First
              </span>
            </div>
            <p className="text-sm text-stone-400">Data remains sealed within your sanctuary space</p>
          </div>

          <div className="p-4 rounded-lg bg-stone-900/50 border border-stone-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Stars Precision
              </span>
            </div>
            <p className="text-sm text-stone-400">Lahiri Ayanamsha calibrated calculations</p>
          </div>
        </div>

        {/* Encouragement Badge */}
        <div className="p-4 sm:p-6 rounded-xl bg-stone-900/50 border border-stone-800/50">
          <div className="flex items-start gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-stone-800/50 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-pulse" />
              <Lightbulb className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Sanctuary Rhythm
                </span>
                <div className="w-1 h-1 rounded-full bg-amber-400" />
                <span className="text-xs text-stone-500">Conscious Mapping</span>
              </div>
              <p className="text-sm text-stone-400">
                Your personal patterns are being mapped with serene care. Take a slow, grounding breath.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}