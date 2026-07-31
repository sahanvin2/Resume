"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/types/resume';
import { templateRegistry } from '@/templates/Registry';
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
  const [templateId, setTemplateId] = useState<string>('modern-1');
  const [saving, setSaving] = useState(false);

  // Debounced auto-save effect
  useEffect(() => {
    
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
  }, [data, resumeId]);



  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Panel: Form Editor */}
      <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto flex flex-col relative shadow-lg z-10">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-20">
          <h1 className="text-xl font-bold text-gray-800">Resume Editor</h1>
          <div className="flex items-center gap-4">
            <select 
              value={templateId} 
              onChange={(e) => setTemplateId(e.target.value)}
              className="text-sm border border-gray-300 rounded p-1"
            >
              <option value="modern-1">Modern Clean</option>
              <option value="classic-1">Classic Professional</option>
              <option value="creative-1">Creative Split</option>
            </select>
            <span className={`text-sm ${saving ? 'text-blue-500' : 'text-green-500'}`}>
              {saving ? 'Saving...' : 'Saved'}
            </span>
          </div>
        </div>
        <div className="p-6">
          <EditorForm data={data} onChange={setData} />
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 bg-gray-200 overflow-y-auto flex justify-center p-8">
        <div className="w-[816px] h-[1056px] shadow-2xl bg-white origin-top shrink-0" style={{ transform: 'scale(0.8)' }}>
          {(() => {
            const TemplateComponent = templateRegistry[templateId] || templateRegistry['modern-1'];
            return <TemplateComponent data={data} />;
          })()}
        </div>
      </div>
    </div>
  );
}
