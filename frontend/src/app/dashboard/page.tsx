"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardResume {
  id: string;
  title: string;
  template_id: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<DashboardResume[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/resumes')
      .then(res => {
        if (res.status === 401) {
          router.push('/login');
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setResumes(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [router]);

  const handleLogout = async () => {
    await fetch('http://localhost:8000/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">My Resumes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/templates" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Create New Resume
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">You haven&apos;t created any resumes yet.</h2>
            <Link href="/templates" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map(resume => (
              <div key={resume.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{resume.title || 'Untitled Resume'}</h3>
                  <p className="mt-1 text-sm text-gray-500">Template: {resume.template_id}</p>
                  <p className="mt-1 text-xs text-gray-400">Updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between">
                  <Link href={`/editor/${resume.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Edit Resume
                  </Link>
                  {/* Download functionality would hit the export endpoint */}
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Export PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
