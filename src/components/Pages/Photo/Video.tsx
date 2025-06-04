import { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

import thumbnail from '../../../public/img/thumb.jpg';
import video2 from '../../../public/video/video-2.mp4';
import video_river from '../../../public/video/video-river.mp4';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const videoList = [
  {
    src: video_river,
    title: 'River Frontage',
    desc: 'Explore the beautiful Blackwood River frontage',
  },
  {
    src: video2,
    title: 'Property Overview',
    desc: 'A comprehensive tour of the entire property',
  },
];

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoIndex]);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Hide overlay and play button when playing
  const showOverlay = !isPlaying;

  // Handle video switch
  const handleSwitch = (idx: number) => {
    setVideoIndex(idx);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className='relative py-10 px-4 md:px-12 bg-gradient-to-b from-white to-emerald-50' id="video-tour" aria-label="Video Tour">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-8">
        <div className="flex gap-4 mb-4">
          {videoList.map((v, idx) => (
            <button
              key={v.title}
              onClick={() => handleSwitch(idx)}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 ${videoIndex === idx ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 hover:bg-emerald-100'}`}
            >
              {v.title}
            </button>
          ))}
        </div> 

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative w-full mx-auto"
        >
          <div ref={containerRef} className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-black flex flex-col justify-end">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
              poster={thumbnail}
              onClick={togglePlay}
              controls={false}
              tabIndex={-1}
              key={videoList[videoIndex].src}
            >
              <source src={videoList[videoIndex].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay and Play Button only when paused */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none"
                >
                  <div className="bg-gradient-to-t from-black/60 to-transparent w-full h-2/3 absolute bottom-0 left-0 pointer-events-none" />
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <motion.button
                      onClick={togglePlay}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="bg-white/90 p-6 rounded-full shadow-lg hover:bg-white transition-colors pointer-events-auto"
                    >
                      <PlayIcon className="w-12 h-12 text-emerald-600" />
                    </motion.button>
                  </div>
                  <div className="absolute top-0 left-0 right-0 p-6 text-white pointer-events-none">
                    <h3 className="text-2xl font-bold mb-2">{videoList[videoIndex].title}</h3>
                    <p className="text-sm opacity-90">{videoList[videoIndex].desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Controls */}
            <div className="relative z-20 w-full flex items-center gap-4 px-6 pb-6 pointer-events-auto">
              {/* Play/Pause Button (small, bottom left) */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              >
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6 text-emerald-600" />
                ) : (
                  <PlayIcon className="w-6 h-6 text-emerald-600" />
                )}
              </button>
              {/* Seek Bar */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-emerald-600 h-2 rounded-lg bg-gray-300 cursor-pointer"
              />
              {/* Time Display */}
              <span className="text-white text-xs font-mono min-w-[60px] text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors ml-2"
              >
                <ArrowsPointingOutIcon className="w-6 h-6 text-emerald-600" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;