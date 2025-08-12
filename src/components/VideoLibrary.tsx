import React, { useState } from 'react';
import { Search, Filter, Download, Play, Clock, BookOpen, Star } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  topic: string;
  level: string;
  duration: number;
  thumbnail: string;
  downloadUrl: string;
  rating: number;
  views: number;
  createdAt: string;
  concepts: string[];
}

export function VideoLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample video data - in a real app, this would come from an API
  const sampleVideos: VideoItem[] = [
    {
      id: '1',
      title: 'Mathematical Spirals in Nature',
      topic: 'Mathematics',
      level: 'high-school',
      duration: 5,
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/spirals.mp4',
      rating: 4.8,
      views: 1250,
      createdAt: '2024-01-15',
      concepts: ['Fibonacci', 'Golden Ratio', 'Spirals']
    },
    {
      id: '2',
      title: 'Calculus: Understanding Derivatives',
      topic: 'Calculus',
      level: 'college',
      duration: 7,
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/derivatives.mp4',
      rating: 4.6,
      views: 890,
      createdAt: '2024-01-12',
      concepts: ['Derivatives', 'Limits', 'Functions']
    },
    {
      id: '3',
      title: 'Linear Algebra: Matrix Transformations',
      topic: 'Linear Algebra',
      level: 'college',
      duration: 6,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/matrices.mp4',
      rating: 4.9,
      views: 2100,
      createdAt: '2024-01-10',
      concepts: ['Matrices', 'Transformations', 'Vectors']
    },
    {
      id: '4',
      title: 'Physics: Wave Mechanics',
      topic: 'Physics',
      level: 'high-school',
      duration: 4,
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/waves.mp4',
      rating: 4.7,
      views: 1560,
      createdAt: '2024-01-08',
      concepts: ['Waves', 'Frequency', 'Amplitude']
    },
    {
      id: '5',
      title: 'Statistics: Probability Distributions',
      topic: 'Statistics',
      level: 'college',
      duration: 8,
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/probability.mp4',
      rating: 4.5,
      views: 750,
      createdAt: '2024-01-05',
      concepts: ['Probability', 'Distributions', 'Statistics']
    },
    {
      id: '6',
      title: 'Geometry: Pythagorean Theorem',
      topic: 'Geometry',
      level: 'middle-school',
      duration: 3,
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '/videos/pythagoras.mp4',
      rating: 4.8,
      views: 3200,
      createdAt: '2024-01-03',
      concepts: ['Triangles', 'Theorem', 'Geometry']
    }
  ];

  const filteredVideos = sampleVideos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.concepts.some(concept => concept.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLevel = filterLevel === 'all' || video.level === filterLevel;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  const handleDownload = (video: VideoItem) => {
    // In a real app, this would trigger the actual download
    const link = document.createElement('a');
    link.href = video.downloadUrl;
    link.download = `${video.title.replace(/\s+/g, '_').toLowerCase()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Library</h2>
        <p className="text-gray-600">Browse and download high-quality educational videos</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search videos, topics, or concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Level Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
            >
              <option value="all">All Levels</option>
              <option value="elementary">Elementary</option>
              <option value="middle-school">Middle School</option>
              <option value="high-school">High School</option>
              <option value="college">College</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white min-w-[120px]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating">Rating</option>
            <option value="views">Views</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredVideos.length} of {sampleVideos.length} videos
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {video.duration}m
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {video.title}
              </h3>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <BookOpen className="w-4 h-4 mr-1" />
                <span className="capitalize">{video.level.replace('-', ' ')}</span>
                <span className="mx-2">•</span>
                <span>{video.topic}</span>
              </div>

              {/* Concepts */}
              <div className="flex flex-wrap gap-1 mb-4">
                {video.concepts.slice(0, 3).map(concept => (
                  <span
                    key={concept}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs"
                  >
                    {concept}
                  </span>
                ))}
                {video.concepts.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{video.concepts.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{video.rating}</span>
                </div>
                <span>{video.views.toLocaleString()} views</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(video)}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}