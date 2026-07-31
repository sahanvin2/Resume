import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function CreativeOne({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-orange-50 text-gray-800 font-sans h-full w-full max-w-[816px] mx-auto flex shadow-sm">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-orange-600 text-white p-8 flex flex-col">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-none">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-orange-200 text-lg font-medium mb-8">
          {personalInfo.jobTitle || 'Job Title'}
        </p>

        <div className="space-y-4 text-sm mt-auto mb-10 text-orange-100">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-orange-400 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-orange-700 text-white text-xs px-2 py-1 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-orange-400 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-white text-sm">{edu.degree}</h3>
                  <div className="text-sm text-orange-200">{edu.school}</div>
                  <div className="text-xs text-orange-300 mt-1">
                    {edu.startDate} {edu.startDate || edu.endDate ? '–' : ''} {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-10 bg-white">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-orange-600 mb-3 uppercase tracking-wider">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-orange-600 mb-4 uppercase tracking-wider">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-orange-200">
                  <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{exp.role}</h3>
                    <span className="text-xs font-bold text-orange-600 ml-2">
                      {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company} {exp.location && `| ${exp.location}`}</div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
          <section className="mb-8">
            <h2 className="text-xl font-bold text-orange-600 mb-4 uppercase tracking-wider">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-orange-200">
                  <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-orange-600">{proj.link}</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{proj.description}</p>
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
    </div>
  );
}
