"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/types/resume';
import { templateRegistry } from '@/templates/Registry';

export default function RenderPage() {
  const params = useParams();
  const resumeId = params.id;
  
  const [data, setData] = useState<ResumeData | null>(null);
  const [templateId, setTemplateId] = useState<string>('modern-1');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, we would fetch the resume data from our backend:
    // fetch(`http://localhost:8000/api/resumes/${resumeId}`)
    //   .then(res => res.json())
    //   .then(json => {
    //     setData(json.data);
    //     setTemplateId(json.template_id);
    //   })
    //   .catch(err => setError(err.message));

    // For now, since we are bypassing real auth/DB in dev UI until phase 5, 
    // we'll just render a dummy or handle it if passed via state. 
    // Wait, Playwright opens a fresh browser, so it needs to fetch from the DB.
    // Let's implement the real fetch:
    fetch(`http://localhost:8000/api/resumes/${resumeId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Resume not found");
        return res.json();
      })
      .then(json => {
        setData(json.data);
        setTemplateId(json.template_id);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [resumeId]);

  if (error) return <div>Error loading resume: {error}</div>;
  if (!data) return <div id="loading">Loading...</div>;

  const TemplateComponent = templateRegistry[templateId] || templateRegistry['modern-1'];

  return (
    <div className="w-[816px] h-[1056px] mx-auto bg-white">
      {/* 
        This div is specifically sized for A4/Letter rendering. 
        Playwright will snapshot this.
      */}
      <TemplateComponent data={data} />
    </div>
  );
}
