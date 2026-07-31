import React, { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function EditorForm({ data, onChange }: Props) {
  const [activeTab, setActiveTab] = useState('personal');

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    onChange({ ...data, experience: newExp });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: '', role: '', location: '', startDate: '', endDate: '', current: false, bullets: [] }
      ]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', gpa: '' }
      ]
    });
  };

  // Add simple UI for form
  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-300">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
      </div>

      {activeTab === 'personal' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={data.personalInfo.jobTitle} onChange={e => updatePersonalInfo('jobTitle', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={data.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-24" value={data.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} />
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border border-gray-200 rounded p-4 relative">
              <h4 className="font-medium text-gray-800 mb-2">Experience #{idx + 1}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs text-gray-600">Company</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={exp.company} onChange={e => updateExperience(idx, 'company', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Role</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={exp.role} onChange={e => updateExperience(idx, 'role', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Start Date</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={exp.startDate} onChange={e => updateExperience(idx, 'startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">End Date</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={exp.endDate} onChange={e => updateExperience(idx, 'endDate', e.target.value)} disabled={exp.current} />
                </div>
              </div>
              <div className="mb-3 flex items-center">
                <input type="checkbox" id={`current-${idx}`} checked={exp.current} onChange={e => updateExperience(idx, 'current', e.target.checked)} className="mr-2" />
                <label htmlFor={`current-${idx}`} className="text-sm text-gray-700">I currently work here</label>
              </div>
              <div>
                <label className="block text-xs text-gray-600">Bullets (one per line)</label>
                <textarea 
                  className="mt-1 block w-full border border-gray-300 rounded p-2 h-20 text-sm" 
                  value={exp.bullets.join('\n')} 
                  onChange={e => updateExperience(idx, 'bullets', e.target.value.split('\n'))} 
                />
              </div>
            </div>
          ))}
          <button onClick={addExperience} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded font-medium hover:bg-gray-50">
            + Add Experience
          </button>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="space-y-6">
          {data.education.map((edu, idx) => (
            <div key={idx} className="border border-gray-200 rounded p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600">School / University</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={edu.school} onChange={e => updateEducation(idx, 'school', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Degree</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={edu.degree} onChange={e => updateEducation(idx, 'degree', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Field of Study</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={edu.fieldOfStudy} onChange={e => updateEducation(idx, 'fieldOfStudy', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Graduation Date</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded p-1" value={edu.endDate} onChange={e => updateEducation(idx, 'endDate', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addEducation} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded font-medium hover:bg-gray-50">
            + Add Education
          </button>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Skills (comma separated)</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded p-2" 
              value={data.skills.map(s => s.name).join(', ')} 
              onChange={e => {
                const parts = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                onChange({ ...data, skills: parts.map(name => ({ name })) });
              }} 
            />
          </div>
        </div>
      )}

    </div>
  );
}
