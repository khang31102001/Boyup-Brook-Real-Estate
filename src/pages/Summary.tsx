import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "../constants/images";
import { PropertyDetail, ScrollToTop } from "../components";
import Footer from "../components/Common/Footer";
import { useEffect, useRef, useState } from "react";
import { FaTimes, FaPause, FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Title from "../components/Common/Title";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { videoData } from "../constants/video";

// Media type definitions
interface VideoMedia {
  type: 'video';
  src: string;
  id: string;
  title: string;
  description: string;
}

interface ImageMedia {
  type: 'image';
  src: string;
}

type Media = VideoMedia | ImageMedia;

// Combine images and videos for gallery
const allMedia: Media[] = [
  // Videos first
  ...videoData.map(video => ({
    type: 'video' as const,
    src: video.src,
    id: video.id,
    title: video.title,
    description: video.description
  })),
  // Then images
  ...Object.values(heroImages).map(src => ({ 
    type: 'image' as const, 
    src 
  }))
];

// Get first 3 images for thumbnails (excluding videos)
const thumbnailImages = allMedia
  .filter((media): media is ImageMedia => media.type === 'image')
  .slice(0, 3);

const Summary = () => {
  const [selectedImage, _setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [_isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  // Reset video states when component unmounts - only for main video
  useEffect(() => {
    return () => {
      // Only reset main video states
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause();
        fullscreenVideoRef.current.currentTime = 0;
      }
    };
  }, []); // Remove selectedImage dependency

  
  // Handle video time updates - separate main and fullscreen
  useEffect(() => {
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setCurrentTime(0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(video.duration);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isFullscreen, activeIndex]); // Use activeIndex instead of selectedImage

  // Format time for video progress
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle mouse enter/leave for video container
  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (!isPlaying) return; // Keep controls visible if video is paused
    setShowControls(false);
  };

  const handleImageClick = (index: number) => {
    setIsFullscreen(true);
    setActiveIndex(index);
  };

  const handleFullscreenVideo = () => {
    setIsVideoFullscreen(true);
    setIsFullscreen(true);
    setActiveIndex(0); // Always start from first item

    // Pause the current video
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      videoRef.current.pause();

      // Transfer video state to fullscreen video
      requestAnimationFrame(() => {
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            fullscreenVideoRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              setIsPlaying(false);
            });
          }
        }
      });
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    
    // Only update activeIndex, don't touch selectedImage
    setActiveIndex(newIndex);
    
    // Reset video states for fullscreen videos
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    // Handle fullscreen video elements only
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
      fullscreenVideoRef.current.currentTime = 0;
    }
  };

  const handleCloseFullscreen = () => {
    // Pause and reset fullscreen video
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
      fullscreenVideoRef.current.currentTime = 0;
    }

    // Reset states - don't touch selectedImage
    setIsFullscreen(false);
    setIsVideoFullscreen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Main video stays independent
  };

  const togglePlay = () => {
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    
    const video = isFullscreen ? fullscreenVideoRef.current : videoRef.current;
    if (!video) return;
    
    const newTime = parseFloat(e.target.value);
    if (isNaN(newTime)) return;

    try {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    } catch (error) {
      console.error('Error setting video time:', error);
    }
  };

  return (
    <section className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 md:py-20 xl:pt-40 xl:pb-20 px-4 md:px-8'>
        <div className="mb-12 md:mb-16">
        <Title 
            mainTitle="Summary" 
            subtitle="Discover our property through comprehensive video tours showcasing the stunning river frontage and complete property overview"
            className="text-emerald-900"
          />
         
        </div>

        {/* Main Gallery Container - Responsive */}
        <div className="mb-8 md:mb-12">
          {/* Mobile Layout - Simplified */}
          <div className="block lg:hidden">
            <div className="space-y-4">
              {/* Main Image/Video - Always first item, simplified */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 cursor-pointer"
                onClick={() => handleImageClick(0)}
              >
                {allMedia[0].type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      className="w-full h-full object-cover"
                      poster="" // Add poster if needed
                      muted
                      playsInline
                    >
                      <source src={allMedia[0].src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Simple Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-between">
                      {/* Video Title */}
                      <div className="p-4">
                        <h3 className="text-white text-lg font-semibold">
                          {allMedia[0].title}
                        </h3>
                      </div>

                      

                      {/* Bottom Label */}
                      <div className="p-4">
                        <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full w-fit">
                          Tap to view video
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={allMedia[0].src}
                      className="w-full h-full object-cover"
                      alt="Featured gallery image"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full">
                        <ArrowsPointingOutIcon className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Mobile Thumbnails Grid - Simple */}
              <div className="grid grid-cols-4 gap-2">
                {allMedia.slice(1, 9).map((media, index) => (
                  <motion.div
                    key={index + 1}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleImageClick(index + 1)}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  >
                    {media.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video className="w-full h-full object-cover">
                          <source src={media.src} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="bg-white/90 p-2 rounded-full">
                            <FaPlay className="w-3 h-3 text-emerald-600" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={`Thumbnail ${index + 2}`}
                      />
                    )}
                    
                    {/* Show more indicator */}
                    {index === 7 && allMedia.length > 9 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-lg font-bold">+{allMedia.length - 8}</div>
                          <div className="text-xs">more</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile Gallery Stats */}
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-emerald-700 text-sm">
                  <span className="font-semibold">{allMedia.length} items</span> in gallery
                  • Tap any image to explore
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-4 h-[550px] xl:h-[650px]">
            {/* Main large image/video - Fixed to first item */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-[3] relative rounded-xl overflow-hidden cursor-pointer h-full"
            >
              {allMedia[0].type === 'video' ? (
                <div 
                  ref={videoContainerRef}
                  className="relative w-full h-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={togglePlay}
                  >
                    <source src={allMedia[0].src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div 
                    className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                      showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* Video Title */}
                    <div className="p-4">
                      <h3 className="text-white text-xl font-semibold">
                        {allMedia[0].title}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFullscreenVideo();
                      }}
                      className="hover:text-emerald-400 transition-colors ml-2 absolute top-4 right-4 p-2 rounded-full bg-white/80 text-emerald-600"
                    >
                      <ArrowsPointingOutIcon className="w-5 h-5" />
                    </button>
                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        onClick={togglePlay}
                        className={`bg-white/80 p-4 rounded-full hover:bg-white transition-all transform hover:scale-110 pointer-events-auto ${
                          showControls || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                      >
                        {isPlaying ? (
                          <FaPause className="w-8 h-8 text-emerald-600" />
                        ) : (
                          <FaPlay className="w-8 h-8 text-emerald-600" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Controls */}
                    <div className={`p-4 space-y-2 transition-transform duration-300 ${
                      showControls ? 'translate-y-0' : 'translate-y-full'
                    }`}>
                      <div className="w-full flex items-center gap-2">
                        <span className="text-white text-sm min-w-[40px]">
                          {formatTime(currentTime)}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          step="0.1"
                          value={currentTime || 0}
                          onChange={handleVideoProgress}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:h-2 transition-all"
                          style={{
                            background: `linear-gradient(to right, #10b981 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
                          }}
                        />
                        <span className="text-white text-sm min-w-[40px]">
                          {formatTime(duration)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFullscreenVideo();
                          }}
                          className="hover:text-emerald-400 transition-colors ml-2"
                        >
                          <ArrowsPointingOutIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={allMedia[0].src}
                  className="w-full h-full object-cover"
                  alt="Featured gallery image"
                  onClick={() => handleImageClick(0)}
                />
              )}
            </motion.div>

            {/* Right side thumbnails */}
            <div className="flex-1 flex flex-col gap-3 h-full">
              {thumbnailImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleImageClick(index + 2)}
                  className="relative cursor-pointer rounded-xl overflow-hidden flex-1 group"
                >
                  <img
                    src={image.src}
                    className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
                      index === 2 ? 'brightness-50' : ''
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                  {index === 2 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-2xl md:text-4xl font-bold">+{allMedia.length - 4}</span>
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 3} / {allMedia.length}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white"
        >
          <PropertyDetail />
        </motion.div>
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[101]"
          >
            <button
              className="absolute top-3 right-3 md:top-4 md:right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[102]"
              onClick={handleCloseFullscreen}
            >
              <FaTimes size={20} className="md:w-6 md:h-6" />
            </button>
            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium z-[102]">
              {activeIndex + 1} / {allMedia.length}
            </div>

            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                dynamicBullets: true,
              }}
              navigation={{
                
                prevEl: '.custom-button-prev',
                nextEl: '.custom-button-next',
              }}
              initialSlide={selectedImage}
              loop={true}
              className="w-full h-full"
              centeredSlides={true}
              onSlideChange={handleSlideChange}
            >
              {allMedia.map((media, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {media.type === 'video' ? (
                      <div 
                        className="relative w-full h-full flex items-center justify-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <video
                          ref={index === activeIndex ? fullscreenVideoRef : null}
                          className="max-w-[95%] max-h-[90vh] object-contain mx-auto"
                          onClick={togglePlay}
                        >
                          <source src={media.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        {/* Fullscreen Video Controls - Only Play/Pause */}
                        {index === activeIndex && (
                          <div 
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <button
                              onClick={togglePlay}
                              className={`bg-white/80 p-4 md:p-6 rounded-full hover:bg-white transition-all transform hover:scale-110 ${
                                showControls || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                              }`}
                            >
                              {isPlaying ? (
                                <FaPlay className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                              ) : (
                                <FaPause className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        className="max-w-[95%] max-h-[90vh] object-contain mx-auto"
                        alt={`Gallery item ${index + 1}`}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
               <>
                <button
                  className="custom-button-prev absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-emerald-700 hover:text-white rounded-full p-2"
                  onClick={() => {}}
                >
                  <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  className="custom-button-next absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-emerald-700 hover:text-white rounded-full p-2"
                  onClick={() => {}}
                >
                  <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </>
              <div className="swiper-pagination"></div>
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <Footer />
    </section>
  );
};

export default Summary;