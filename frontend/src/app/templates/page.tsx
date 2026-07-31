"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { templateMetadata } from '@/templates/Registry';

export default function TemplatesGallery() {
  const [filter, setFilter] = useState('All');

  // Derive categories from the metadata
  const categories = ['All', ...Array.from(new Set(templateMetadata.map(t => t.category)))];

  const filteredTemplates = filter === 'All' 
    ? templateMetadata 
    : templateMetadata.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Template Gallery
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Choose a professional template to start building your resume.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="aspect-[210/297] bg-gray-200 relative">
                {/* Simulated Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>{template.name} Preview</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.category}</p>
                  </div>
                  {template.atsFriendly && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ATS-Friendly
                    </span>
                  )}
                </div>
                <div className="mt-auto">
                  {/* Create a new resume using a dummy UUID for now, in a real app this would call the API to create the resume then redirect */}
                  <Link href={`/editor/new?template=${template.id}`} className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Use this template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
