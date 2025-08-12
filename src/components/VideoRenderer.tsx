import React, { useState, useEffect } from 'react';
import { Play, Download, ArrowLeft, CheckCircle, AlertCircle, Loader, Film, Settings } from 'lucide-react';
import { VideoRequirements } from '../types/video';

interface VideoRendererProps {
  requirements: VideoRequirements;
  script: string;
  onBack: () => void;
}

type RenderStatus = 'idle' | 'preparing' | 'rendering' | 'completed' | 'error';

export function VideoRenderer({ requirements, script, onBack }: VideoRendererProps) {
  const [renderStatus, setRenderStatus] = useState<RenderStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [renderLog, setRenderLog] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [renderSettings, setRenderSettings] = useState({
    quality: 'high',
    format: 'mp4',
    fps: 60,
    resolution: '1080p'
  });

  const startRendering = () => {
    setRenderStatus('preparing');
    setProgress(0);
    setRenderLog(['Initializing Manim renderer...']);
    
    // Simulate rendering process
    simulateRendering();
  };

  const simulateRendering = () => {
    const steps = [
      'Preparing script environment...',
      'Loading Manim libraries...',
      'Parsing scene structure...',
      'Initializing animation objects...',
      'Rendering scene 1: Introduction...',
      'Rendering scene 2: Main content...',
      'Rendering scene 3: Conclusion...',
      'Compiling video frames...',
      'Encoding to MP4 format...',
      'Finalizing video output...',
      'Video generation completed!'
    ];

    let currentStep = 0;
    setRenderStatus('rendering');

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setRenderLog(prev => [...prev, steps[currentStep]]);
        setProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setRenderStatus('completed');
        // Simulate video URL (in real app, this would be the actual rendered video)
        setVideoUrl(`/videos/${requirements.topic.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.mp4`);
      }
    }, 1500);
  };

  const downloadVideo = () => {
    // In a real application, this would download the actual rendered video
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${requirements.topic.replace(/\s+/g, '_').toLowerCase()}_educational_video.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = () => {
    switch (renderStatus) {
      case 'preparing':
      case 'rendering':
        return <Loader className="w-6 h-6 animate-spin text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Film className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusText = () => {
    switch (renderStatus) {
      case 'preparing':
        return 'Preparing to render...';
      case 'rendering':
        return 'Rendering video...';
      case 'completed':
        return 'Video ready for download!';
      case 'error':
        return 'Rendering failed';
      default:
        return 'Ready to generate video';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Video Generation</h2>
            <p className="text-purple-100">
              High-quality Manim video rendering
            </p>
          </div>
          <Film className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      {/* Render Settings */}
      {renderStatus === 'idle' && (
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Render Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
              <select
                value={renderSettings.quality}
                onChange={(e) => setRenderSettings(prev => ({ ...prev, quality: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low (480p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="high">High (1080p)</option>
                <option value="ultra">Ultra (4K)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select
                value={renderSettings.format}
                onChange={(e) => setRenderSettings(prev => ({ ...prev, format: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option value="mp4">MP4</option>
                <option value="mov">MOV</option>
                <option value="avi">AVI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frame Rate</label>
              <select
                value={renderSettings.fps}
                onChange={(e) => setRenderSettings(prev => ({ ...prev, fps: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option value={30}>30 FPS</option>
                <option value={60}>60 FPS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
              <select
                value={renderSettings.resolution}
                onChange={(e) => setRenderSettings(prev => ({ ...prev, resolution: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="4k">4K</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Status Section */}
      <div className="p-6">
        <div className="flex items-center mb-4">
          {getStatusIcon()}
          <h3 className="ml-3 text-lg font-semibold text-gray-900">
            {getStatusText()}
          </h3>
        </div>

        {/* Progress Bar */}
        {(renderStatus === 'preparing' || renderStatus === 'rendering') && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Render Log */}
        {renderLog.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Render Log</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
              {renderLog.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Preview */}
        {renderStatus === 'completed' && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Video Preview</h4>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="w-full max-w-md mx-auto bg-black rounded-lg aspect-video flex items-center justify-center">
                <div className="text-white text-center">
                  <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Video Preview</p>
                  <p className="text-xs opacity-50 mt-1">{requirements.topic}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Duration:</strong> {requirements.duration} minutes</p>
                <p><strong>Quality:</strong> {renderSettings.quality} ({renderSettings.resolution})</p>
                <p><strong>Format:</strong> {renderSettings.format.toUpperCase()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Information */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">Video Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p><strong>Topic:</strong> {requirements.topic}</p>
              <p><strong>Level:</strong> {requirements.level.replace('-', ' ')}</p>
              <p><strong>Duration:</strong> {requirements.duration} minutes</p>
            </div>
            <div>
              <p><strong>Style:</strong> {requirements.style.replace('-', ' ')}</p>
              <p><strong>Concepts:</strong> {requirements.concepts.length}</p>
              <p><strong>Quality:</strong> {renderSettings.quality} ({renderSettings.resolution})</p>
            </div>
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
          Back to Script
        </button>
        
        <div className="flex gap-3">
          {renderStatus === 'idle' && (
            <button
              onClick={startRendering}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Rendering
            </button>
          )}
          
          {renderStatus === 'completed' && (
            <button
              onClick={downloadVideo}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}