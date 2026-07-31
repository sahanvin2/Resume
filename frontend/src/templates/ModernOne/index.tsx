import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function ModernOne({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-gray-900 font-sans p-8 h-full w-full max-w-[816px] mx-auto shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-blue-600 font-medium mt-1">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.role}</h3>
                      <span className="text-sm font-medium text-blue-600 whitespace-nowrap ml-2">
                        {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 mb-2">{exp.company} {exp.location && `| ${exp.location}`}</div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
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
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{proj.name}</h3>
                      {proj.link && <span className="text-sm text-blue-600">{proj.link}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
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
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-gray-800 text-sm">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {edu.startDate} {edu.startDate || edu.endDate ? '–' : ''} {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
