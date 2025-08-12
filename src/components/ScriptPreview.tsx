import React, { useState } from 'react';
import { Code, Download, ArrowLeft, ArrowRight, Edit3, Copy, Check } from 'lucide-react';
import { VideoRequirements } from '../types/video';

interface ScriptPreviewProps {
  requirements: VideoRequirements;
  script: string;
  onApprove: () => void;
  onBack: () => void;
}

export function ScriptPreview({ requirements, script, onApprove, onBack }: ScriptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [editedScript, setEditedScript] = useState(script);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const blob = new Blob([editedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requirements.topic.replace(/\s+/g, '_').toLowerCase()}_manim_script.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generated Manim Script</h2>
            <p className="text-indigo-100">
              {requirements.topic} • {requirements.level} • {requirements.duration} minutes
            </p>
          </div>
          <Code className="w-12 h-12 text-indigo-200" />
        </div>
      </div>

      {/* Requirements Summary */}
      <div className="p-6 bg-gray-50 border-b">
        <h3 className="font-semibold text-gray-900 mb-3">Video Requirements Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Topic:</span>
            <p className="text-gray-600">{requirements.topic}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Level:</span>
            <p className="text-gray-600 capitalize">{requirements.level.replace('-', ' ')}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Style:</span>
            <p className="text-gray-600 capitalize">{requirements.style.replace('-', ' ')}</p>
          </div>
        </div>
        
        {requirements.concepts.length > 0 && (
          <div className="mt-4">
            <span className="font-medium text-gray-700">Key Concepts:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {requirements.concepts.map(concept => (
                <span key={concept} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Script Editor */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Edit3 className="w-4 h-4 mr-2" />
            Manim Script (Editable)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownloadScript}
              className="flex items-center px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={editedScript}
            onChange={(e) => setEditedScript(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            placeholder="Your Manim script will appear here..."
          />
        </div>

        {/* Installation Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Quick Setup Instructions</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>1. Install Manim:</strong> <code className="bg-blue-100 px-2 py-1 rounded">pip install manim</code></p>
            <p><strong>2. Save script:</strong> Save the above code as <code className="bg-blue-100 px-2 py-1 rounded">{requirements.topic.replace(/\s+/g, '_').toLowerCase()}.py</code></p>
            <p><strong>3. Render video:</strong> <code className="bg-blue-100 px-2 py-1 rounded">manim -pqh your_script.py ClassName</code></p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Requirements
        </button>
        
        <button
          onClick={onApprove}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Proceed to Video Generation
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}