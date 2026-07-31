import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function ClassicTwo({ data }: Props) {
  return (
    <div className="w-full min-h-full bg-white p-12 font-serif text-black leading-tight flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">
          {data.personalInfo.fullName}
        </h1>
        <div className="text-sm">
          {data.personalInfo.location && <span>{data.personalInfo.location} | </span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone} | </span>}
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.linkedin && <span> | {data.personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm text-justify leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.role}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="italic text-sm mb-1">{exp.company}, {exp.location}</div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {exp.bullets.map((bullet, bidx) => <div key={bidx}>• {bullet}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <div>
                  <span className="font-bold">{edu.school}</span>
                  <div>{edu.degree} in {edu.fieldOfStudy}</div>
                </div>
                <div>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2 pb-1">Skills</h2>
          <div className="text-sm">
            {data.skills.map((skill, idx) => (
              <span key={idx}>
                {skill.name}
                {idx < data.skills.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
