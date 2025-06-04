import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "../constants/images";
import { PropertyDetail, ScrollToTop } from "../components";
import Footer from "../components/Common/Footer";
import { useEffect, useRef, useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Title from "../components/Common/Title";
import video_river from '../public/video/video-river.mp4';
import video2 from '../public/video/video-2.mp4';
import thumbnail from '../public/img/thumb.jpg';
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

// Custom CSS for Swiper navigation
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    width: 50px !important;
    height: 50px !important;
    
    border-radius: 50% !important;
    color: white !important;
    transition: all 0.3s ease !important;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #059669 !important;
    transform: scale(1.1) !important;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none !important;
  }

  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0.2 !important;
    cursor: not-allowed !important;
  }

  .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.5 !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
    background: #059669 !important;
  }
`;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  // Reset video states when component unmounts or video changes
  useEffect(() => {
    return () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause();
        fullscreenVideoRef.current.currentTime = 0;
      }
    };
  }, [selectedImage]);

  // Handle video time updates
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
  }, [isFullscreen, selectedImage]);

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

  // Tất cả các media (videos + images)
  const allMedia = [
    {
      type: 'video',
      src: video_river,
      title: 'River Frontage',
      thumbnail: thumbnail
    },
    {
      type: 'video',
      src: video2,
      title: 'Property Overview',
      thumbnail: thumbnail
    },
    {
      type: 'image',
      src: heroImages.img_river2,
    },
    {
      type: 'image',
      src: heroImages.img_river3,
    },
    {
      type: 'image',
      src: heroImages.img_river4,
    },
    {
      type: 'image',
      src: heroImages.img_river,
    },
    {
      type: 'image',
      src: heroImages.img_river1,
    },
    {
      type: 'image',
      src: heroImages.img_hill,
    },
    {
      type: 'image',
      src: heroImages.hero1,
    },
    {
      type: 'image',
      src: heroImages.hero2,
    },
    {
      type: 'image',
      src: heroImages.hero3,
    },
    {
      type: 'image',
      src: heroImages.hero4,
    },
    {
      type: 'image',
      src: heroImages.img_asp,
    },
    {
      type: 'image',
      src: heroImages.img_asp1,
    },
    {
      type: 'image',
      src: heroImages.img_asp2,
    },
    {
      type: 'image',
      src: heroImages.img_asp3,
    },
  ];

  // 3 ảnh cho cột bên phải (không bao gồm ảnh chính)
  const thumbnailImages = [
    { src: heroImages.img_river3 },
    { src: heroImages.img_river4 },
    { src: heroImages.img_river }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsFullscreen(true);
  };

  const handleFullscreenVideo = () => {
    setIsVideoFullscreen(true);
    setIsFullscreen(true);
    setActiveIndex(selectedImage);

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
    const prevIndex = activeIndex;
    
    // Update states
    setActiveIndex(newIndex);
    setSelectedImage(newIndex);
    
    // Reset video states
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    // Handle video elements
    const currentVideo = isFullscreen ? fullscreenVideoRef.current : videoRef.current;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    // Check if we're switching between videos
    const prevMedia = allMedia[prevIndex];
    const newMedia = allMedia[newIndex];
    if (prevMedia.type === 'video' && newMedia.type === 'video') {
      // Give time for the new video element to be rendered
      requestAnimationFrame(() => {
        const newVideo = isFullscreen ? fullscreenVideoRef.current : videoRef.current;
        if (newVideo) {
          newVideo.currentTime = 0;
          setCurrentTime(0);
        }
      });
    }
  };

  const handleCloseFullscreen = () => {
    // Pause and reset fullscreen video
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
      fullscreenVideoRef.current.currentTime = 0;
    }

    // Reset states
    setIsFullscreen(false);
    setIsVideoFullscreen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // If we're on a video in the main view, reset it
    if (allMedia[selectedImage].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
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
      <style>{swiperStyles}</style>
      <div className='max-w-7xl mx-auto py-20 px-4 md:px-8'>
        <Title 
          mainTitle="Gallery" 
          subtitle="Take a look at our gallery"
          className='text-emerald-900'
        />
        {/* Main Image and Thumbnails Container */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 h-[400px] lg:h-[550px] xl:h-[650px] relative">
          {/* Main large image/video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 lg:flex-[3] relative rounded-xl overflow-hidden cursor-pointer h-full group"
          >
            {allMedia[selectedImage].type === 'video' ? (
              <div 
                ref={videoContainerRef}
                className="relative w-full h-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={allMedia[selectedImage].thumbnail}
                  onClick={togglePlay}
                >
                  <source src={allMedia[selectedImage].src} type="video/mp4" />
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
                      {allMedia[selectedImage].title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreenVideo();
                    }}
                    className="hover:text-emerald-400 transition-colors ml-2 absolute top-4 right-4"
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
                        <FaTimes className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <FaChevronRight className="w-8 h-8 text-emerald-600" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className={`p-4 space-y-2 transition-transform duration-300 ${
                    showControls ? 'translate-y-0' : 'translate-y-full'
                  }`}>
                    {/* Progress Bar */}
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
                      <div className="flex items-center gap-2">
                       
                        {/* Fullscreen Button */}
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
              </div>
            ) : (
              <img
                src={allMedia[selectedImage].src}
                className="w-full h-full object-cover"
                alt="Gallery image"
                onClick={() => {
                  setIsFullscreen(true);
                  setIsVideoFullscreen(false);
                  setActiveIndex(selectedImage);
                }}
              />
            )}
           
          </motion.div>

          {/* Right side thumbnails */}
          <div className="flex-0 hidden lg:flex-1 lg:flex flex-col gap-3 h-full">
            {thumbnailImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleImageClick(index + 2)}
                className={`relative cursor-pointer rounded-xl overflow-hidden flex-1 group ${
                  selectedImage === index + 2 ? 'ring-2 ring-emerald-500' : ''
                }`}
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
                    <span className="text-white text-4xl font-bold">+{allMedia.length - 4}</span>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 2} / {allMedia.length}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

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
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[102]"
              onClick={handleCloseFullscreen}
            >
              <FaTimes size={24} />
            </button>
            <div className="absolute top-4 left-4 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium z-[102]">
              {activeIndex + 1} / {allMedia.length}
            </div>

            <button 
              className="swiper-button-prev !z-[102] flex items-center justify-center"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={20} />
            </button>
            <button 
              className="swiper-button-next !z-[102] flex items-center justify-center"
              aria-label="Next slide"
            >
              <FaChevronRight size={20} />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              initialSlide={selectedImage}
              loop={true}
              className="w-full h-full"
              centeredSlides={true}
              onSlideChange={handleSlideChange}
            >
              {allMedia.map((media, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
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
                              className={`bg-white/80 p-6 rounded-full hover:bg-white transition-all transform hover:scale-110 ${
                                showControls || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                              }`}
                            >
                              {isPlaying ? (
                                <FaTimes className="w-10 h-10 text-emerald-600" />
                              ) : (
                                <FaChevronRight className="w-10 h-10 text-emerald-600" />
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

export default Gallery;