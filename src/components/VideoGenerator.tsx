import React, { useState } from 'react';
import { RequirementsForm } from './RequirementsForm';
import { ScriptPreview } from './ScriptPreview';
import { VideoRenderer } from './VideoRenderer';
import { VideoRequirements } from '../types/video';

export function VideoGenerator() {
  const [requirements, setRequirements] = useState<VideoRequirements | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'requirements' | 'preview' | 'render'>('requirements');

  const handleRequirementsSubmit = (reqs: VideoRequirements) => {
    setRequirements(reqs);
    setCurrentStep('preview');
    
    // Generate Manim script based on requirements
    const script = generateManimScript(reqs);
    setGeneratedScript(script);
  };

  const handleScriptApprove = () => {
    setCurrentStep('render');
  };

  const handleBackToRequirements = () => {
    setCurrentStep('requirements');
  };

  const handleBackToPreview = () => {
    setCurrentStep('preview');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { step: 'requirements', label: 'Requirements', number: 1 },
            { step: 'preview', label: 'Script Preview', number: 2 },
            { step: 'render', label: 'Generate Video', number: 3 }
          ].map(({ step, label, number }) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep === step
                  ? 'bg-indigo-600 text-white'
                  : step === 'requirements' || (step === 'preview' && currentStep === 'render')
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {number}
              </div>
              <span className={`ml-2 font-medium ${
                currentStep === step ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                {label}
              </span>
              {number < 3 && (
                <div className={`w-16 h-0.5 ml-4 ${
                  (step === 'requirements' && (currentStep === 'preview' || currentStep === 'render')) ||
                  (step === 'preview' && currentStep === 'render')
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'requirements' && (
        <RequirementsForm onSubmit={handleRequirementsSubmit} />
      )}

      {currentStep === 'preview' && requirements && (
        <ScriptPreview
          requirements={requirements}
          script={generatedScript}
          onApprove={handleScriptApprove}
          onBack={handleBackToRequirements}
        />
      )}

      {currentStep === 'render' && requirements && (
        <VideoRenderer
          requirements={requirements}
          script={generatedScript}
          onBack={handleBackToPreview}
        />
      )}
    </div>
  );
}

function generateManimScript(requirements: VideoRequirements): string {
  const { topic, level, duration, style, concepts } = requirements;
  
  // This is a simplified script generator - in a real app, this would be much more sophisticated
  return `"""
${topic} - Educational Video
Generated Manim script for ${level} level
Duration: ${duration} minutes
Style: ${style}

Concepts covered: ${concepts.join(', ')}
"""

from manim import *
import numpy as np

class ${topic.replace(/\s+/g, '')}Video(Scene):
    def construct(self):
        # Title Scene
        self.intro_scene()
        
        # Main Content
        ${concepts.map(concept => `self.${concept.toLowerCase().replace(/\s+/g, '_')}_scene()`).join('\n        ')}
        
        # Conclusion
        self.conclusion_scene()
    
    def intro_scene(self):
        """Introduction with title and overview"""
        title = Text("${topic}", font_size=48, color=BLUE)
        subtitle = Text("${level} Level Educational Video", font_size=24, color=WHITE)
        subtitle.next_to(title, DOWN)
        
        self.play(Write(title), run_time=2)
        self.play(Write(subtitle), run_time=1)
        self.wait(2)
        self.play(FadeOut(title), FadeOut(subtitle))
    
    ${concepts.map(concept => `
    def ${concept.toLowerCase().replace(/\s+/g, '_')}_scene(self):
        """${concept} visualization"""
        concept_title = Text("${concept}", font_size=36, color=GREEN)
        concept_title.to_edge(UP)
        
        # Add your specific visualization code here
        example_shape = Circle(radius=2, color=YELLOW, fill_opacity=0.5)
        
        self.play(Write(concept_title))
        self.play(Create(example_shape))
        self.wait(2)
        self.play(FadeOut(concept_title), FadeOut(example_shape))
    `).join('')}
    
    def conclusion_scene(self):
        """Conclusion and summary"""
        conclusion = Text("Thank you for watching!", font_size=36, color=GOLD)
        summary = Text("Key concepts: ${concepts.join(', ')}", font_size=20, color=WHITE)
        summary.next_to(conclusion, DOWN)
        
        self.play(Write(conclusion))
        self.play(Write(summary))
        self.wait(3)

if __name__ == "__main__":
    # To render: manim -pqh script.py ${topic.replace(/\s+/g, '')}Video
    pass
`;
}