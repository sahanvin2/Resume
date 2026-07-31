import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function CreativeTwo({ data }: Props) {
  return (
    <div className="w-full min-h-full bg-slate-900 text-slate-300 font-sans flex flex-col p-8">
      {/* Header Container */}
      <div className="bg-emerald-500 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <h1 className="text-5xl font-black tracking-tight mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-2xl font-light tracking-widest text-emerald-100 uppercase">
          {data.personalInfo.jobTitle || 'Creative Professional'}
        </h2>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          {data.personalInfo.email && <span className="bg-emerald-600/50 px-3 py-1 rounded-full">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="bg-emerald-600/50 px-3 py-1 rounded-full">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="bg-emerald-600/50 px-3 py-1 rounded-full">{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span className="bg-emerald-600/50 px-3 py-1 rounded-full">{data.personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="flex gap-8 flex-grow">
        {/* Main Column */}
        <div className="w-2/3 flex flex-col gap-8">
          {/* Summary */}
      {data.personalInfo.summary && (
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-emerald-500 rounded"></span>
            ABOUT ME
          </h3>
          <p className="leading-relaxed text-slate-400">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-emerald-500 rounded"></span>
                EXPERIENCE
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-emerald-500/30">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-emerald-400">{exp.role}</h4>
                      <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 font-medium mb-2">{exp.company} | {exp.location}</div>
                    <div className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">
                      {exp.bullets.map((bullet, bidx) => <div key={bidx}>• {bullet}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side Column */}
        <div className="w-1/3 flex flex-col gap-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-emerald-500 rounded"></span>
                SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-800 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-emerald-500 rounded"></span>
                EDUCATION
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white text-sm mb-1">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <p className="text-xs text-emerald-400 mb-2">{edu.school}</p>
                    <p className="text-xs text-slate-500 font-mono">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
