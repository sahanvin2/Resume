import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function ClassicOne({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-black font-serif p-10 h-full w-full max-w-[816px] mx-auto shadow-sm">
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg italic mt-1 text-gray-800">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-sm font-semibold">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm italic mb-2">
                  {exp.company} {exp.location && `– ${exp.location}`}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-sm">{proj.link}</span>}
                </div>
                <p className="text-sm italic mb-1">{proj.description}</p>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                    {proj.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.school}</h3>
                  <span className="text-sm font-semibold">
                    {edu.startDate} {edu.startDate || edu.endDate ? '–' : ''} {edu.endDate}
                  </span>
                </div>
                <div className="text-sm italic">
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="text-sm">
            {skills.map((s) => s.name).join(', ')}
          </div>
        </section>
      )}
    </div>
  );
}
