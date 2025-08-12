import React, { useState } from 'react';
import { VideoGenerator } from './components/VideoGenerator';
import { VideoLibrary } from './components/VideoLibrary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'library'>('generator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'generator'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Video Generator
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Video Library
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'generator' ? <VideoGenerator /> : <VideoLibrary />}
      </main>

      <Footer />
    </div>
  );
}

export default App;