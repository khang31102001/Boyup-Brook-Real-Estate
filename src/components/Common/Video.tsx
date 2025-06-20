import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface VideoProps {
  src: string;
  title?: string;
  description?: string;
  poster?: string;
  className?: string;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Video = ({ src, title, description, poster, className = '' }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      <div className="relative aspect-video bg-black">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay khi video đang pause */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col justify-between bg-black/30">
            {/* Title & Description */}
            {(title || description) && (
              <div className="p-6 bg-gradient-to-b from-black/60 to-transparent">
                {title && <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>}
                {description && <p className="text-white/90 text-sm">{description}</p>}
              </div>
            )}
            
            {/* Play Button */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-white/90 p-6 rounded-full hover:bg-white transition-colors transform hover:scale-105"
              >
                <PlayIcon className="w-8 h-8 text-emerald-600" />
              </button>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5 text-emerald-600" />
              ) : (
                <PlayIcon className="w-5 h-5 text-emerald-600" />
              )}
            </button>
            
            {/* Progress Bar */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-3 
                [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white"
            />
            
            {/* Time Display */}
            <span className="text-white text-sm font-mono min-w-[80px] text-right">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video; 