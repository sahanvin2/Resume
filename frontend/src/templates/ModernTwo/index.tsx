import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function ModernTwo({ data }: Props) {
  return (
    <div className="w-full min-h-full bg-white p-10 font-sans text-gray-800 flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 uppercase">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-blue-600 mt-2 font-medium tracking-wide">
          {data.personalInfo.jobTitle || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-600 w-6 h-6 inline-block mr-3"></span>
            WORK EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm font-medium text-blue-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <h4 className="text-md font-medium text-gray-600 mb-2">{exp.company} | {exp.location}</h4>
                <div className="text-gray-700 text-sm whitespace-pre-wrap">
                  {exp.bullets.map((bullet, bidx) => <div key={bidx}>• {bullet}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-8">
        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 w-6 h-6 inline-block mr-3"></span>
              EDUCATION
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 w-6 h-6 inline-block mr-3"></span>
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium border border-gray-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
