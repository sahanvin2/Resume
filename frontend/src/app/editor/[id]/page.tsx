"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/types/resume';
import ModernOne from '@/templates/ModernOne';
import EditorForm from '@/components/EditorForm';

// Initial empty state matching the schema
const defaultData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
  sectionOrder: [
    "personalInfo",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "customSections"
  ]
};

export default function EditorPage() {
  const params = useParams();
  const resumeId = params.id;
  const [data, setData] = useState<ResumeData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch initial data
  useEffect(() => {
    // In a real implementation, fetch from backend:
    // fetch(`/api/resumes/${resumeId}`).then(res => res.json()).then(json => { setData(json.data); setLoading(false); });
    
    // For now, just set loading false to show the editor immediately
    setLoading(false);
  }, [resumeId]);

  // Debounced auto-save effect
  useEffect(() => {
    if (loading) return;
    
    const handler = setTimeout(() => {
      setSaving(true);
      // Mock save delay
      setTimeout(() => setSaving(false), 500);
      
      // Real implementation:
      /*
      fetch(`http://localhost:8000/api/resumes/${resumeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      }).then(() => setSaving(false));
      */
    }, 1000);

    return () => clearTimeout(handler);
  }, [data, loading, resumeId]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Panel: Form Editor */}
      <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto flex flex-col relative shadow-lg z-10">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-20">
          <h1 className="text-xl font-bold text-gray-800">Resume Editor</h1>
          <span className={`text-sm ${saving ? 'text-blue-500' : 'text-green-500'}`}>
            {saving ? 'Saving...' : 'Saved'}
          </span>
        </div>
        <div className="p-6">
          <EditorForm data={data} onChange={setData} />
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 bg-gray-200 overflow-y-auto flex justify-center p-8">
        <div className="w-[816px] h-[1056px] shadow-2xl bg-white origin-top shrink-0" style={{ transform: 'scale(0.8)' }}>
          {/* We will implement template switching later. Hardcoding ModernOne for now */}
          <ModernOne data={data} />
        </div>
      </div>
    </div>
  );
}
