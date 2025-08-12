import React from 'react';
import { Video, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Video className="w-8 h-8 text-indigo-600" />
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manim Video Generator
              </h1>
              <p className="text-sm text-gray-600">
                Create stunning educational videos with AI-powered Manim scripts
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">High Quality</div>
              <div className="text-xs text-gray-500">1080p • 60fps • MP4</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}