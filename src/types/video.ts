export interface VideoRequirements {
  topic: string;
  level: 'elementary' | 'middle-school' | 'high-school' | 'college' | 'advanced';
  duration: number; // in minutes
  style: '2d-animated' | '3d-visualization' | 'mixed-media' | 'minimalist' | 'interactive';
  concepts: string[];
  description: string;
  customizations: {
    colorScheme: 'professional' | 'vibrant' | 'pastel' | 'dark' | 'custom';
    includeNarration: boolean;
    includeSubtitles: boolean;
    backgroundMusic: boolean;
  };
}

export interface GeneratedVideo {
  id: string;
  requirements: VideoRequirements;
  script: string;
  status: 'generating' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  duration?: number;
  fileSize?: number;
}