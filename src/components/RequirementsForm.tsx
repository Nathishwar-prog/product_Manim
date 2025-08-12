import React, { useState } from 'react';
import { Play, BookOpen, Clock, Palette, Plus, X } from 'lucide-react';
import { VideoRequirements } from '../types/video';

interface RequirementsFormProps {
  onSubmit: (requirements: VideoRequirements) => void;
}

export function RequirementsForm({ onSubmit }: RequirementsFormProps) {
  const [formData, setFormData] = useState<VideoRequirements>({
    topic: '',
    level: 'high-school',
    duration: 3,
    style: '2d-animated',
    concepts: [],
    description: '',
    customizations: {
      colorScheme: 'professional',
      includeNarration: false,
      includeSubtitles: true,
      backgroundMusic: false
    }
  });

  const [newConcept, setNewConcept] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic && formData.concepts.length > 0) {
      onSubmit(formData);
    }
  };

  const addConcept = () => {
    if (newConcept.trim() && !formData.concepts.includes(newConcept.trim())) {
      setFormData(prev => ({
        ...prev,
        concepts: [...prev.concepts, newConcept.trim()]
      }));
      setNewConcept('');
    }
  };

  const removeConcept = (concept: string) => {
    setFormData(prev => ({
      ...prev,
      concepts: prev.concepts.filter(c => c !== concept)
    }));
  };

  const presetTopics = [
    'Mathematical Spirals in Nature',
    'Calculus: Derivatives and Integrals',
    'Linear Algebra: Matrix Transformations',
    'Physics: Wave Mechanics',
    'Statistics: Probability Distributions',
    'Geometry: Pythagorean Theorem',
    'Number Theory: Prime Numbers',
    'Trigonometry: Unit Circle'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Requirements</h2>
        <p className="text-gray-600">Specify your educational video requirements and we'll generate a custom Manim script</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Video Topic
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="Enter your video topic..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          
          {/* Preset Topics */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Or choose from popular topics:</p>
            <div className="flex flex-wrap gap-2">
              {presetTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, topic }))}
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="elementary">Elementary School</option>
            <option value="middle-school">Middle School</option>
            <option value="high-school">High School</option>
            <option value="college">College</option>
            <option value="advanced">Advanced/Graduate</option>
          </select>
        </div>

        {/* Duration and Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 inline mr-2" />
              Animation Style
            </label>
            <select
              value={formData.style}
              onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="2d-animated">2D Animated</option>
              <option value="3d-visualization">3D Visualization</option>
              <option value="mixed-media">Mixed Media</option>
              <option value="minimalist">Minimalist</option>
              <option value="interactive">Interactive Style</option>
            </select>
          </div>
        </div>

        {/* Key Concepts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Concepts to Cover</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newConcept}
              onChange={(e) => setNewConcept(e.target.value)}
              placeholder="Add a concept..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConcept())}
            />
            <button
              type="button"
              onClick={addConcept}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {formData.concepts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.concepts.map(concept => (
                <span
                  key={concept}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {concept}
                  <button
                    type="button"
                    onClick={() => removeConcept(concept)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Provide any additional details about your video requirements..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Customizations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Customizations</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Color Scheme</label>
              <select
                value={formData.customizations.colorScheme}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customizations: { ...prev.customizations, colorScheme: e.target.value as any }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="vibrant">Vibrant</option>
                <option value="pastel">Pastel</option>
                <option value="dark">Dark Theme</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="space-y-2">
              {[
                { key: 'includeSubtitles', label: 'Include Subtitles' },
                { key: 'includeNarration', label: 'Include Narration' },
                { key: 'backgroundMusic', label: 'Background Music' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.customizations[key as keyof typeof formData.customizations] as boolean}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customizations: {
                        ...prev.customizations,
                        [key]: e.target.checked
                      }
                    }))}
                    className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!formData.topic || formData.concepts.length === 0}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Generate Manim Script
          </button>
        </div>
      </form>
    </div>
  );
}