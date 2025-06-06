import { Footer } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../components/Common/Title";
import VideoPlayer from "../components/Common/VideoPlayer";
import { videoData } from "../constants/video";
import { summaryImages } from "../constants/imagesSummary";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// Type definitions
interface GridItem {
  type: 'image' | 'special' | 'video';
  key?: string;
  videoIndex?: number;
  span: string;
  isSpecial?: boolean;
}

interface ImageItem {
  key: string;
  src: string;
  isSpecial: boolean;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Định nghĩa layout grid với các hình ảnh đặc biệt
  const gridLayout = useMemo((): GridItem[] => {
    const imageKeys = Object.keys(summaryImages);
    
    return [
      // Row 1: 4 hình ảnh thường
      { type: 'image', key: imageKeys[0], span: 'col-span-2 row-span-1' },
      { type: 'video', videoIndex: 2, span: 'col-span-1 row-span-1' },
      { type: 'image', key: imageKeys[2], span: 'col-span-1 row-span-2' },
      { type: 'video', videoIndex: 0, span: 'col-span-1 row-span-2' },
      { type: 'image', key: imageKeys[3], span: 'col-span-2 row-span-2' },
      
      // Row 2: Video + Special image (2x2) + 1 hình thường
      { type: 'special', key: 'hero3', span: 'col-span-1 row-span-1' },
      { type: 'image', key: imageKeys[4], span: 'col-span-1 row-span-1' },
      
      // Row 3: Tiếp tục với hình thường
      {type: 'image', key: imageKeys[5], span: 'col-span-1 row-span-1'},
      { type: 'image', key: imageKeys[6], span: 'col-span-1 row-span-2' },
      { type: 'image', key: imageKeys[7], span: 'col-span-1 row-span-1' },
      { type: 'image', key: imageKeys[8], span: 'col-span-2 row-span-1' },
      
      // Row 4: Video + Special image (2x3) + 1 hình thường
      { type: 'video', videoIndex: 1, span: 'col-span-1 row-span-2' },
      { type: 'special', key: 'img_asp1', span: 'col-span-1 row-span-1'},
      { type: 'image', key: imageKeys[2], span: 'col-span-2 row-span-1' },
      
      // Row 5: Thêm hình ảnh đặc biệt ngang (3x1)
      { type: 'special', key: imageKeys[9], span: 'col-span-1 row-span-2' },
      { type: 'image', key: imageKeys[10], span: 'col-span-1 row-span-1' },
      
      // Row 6: Hình ảnh đặc biệt dọc (1x2) + 2 hình thường + 1 hình đặc biệt vuông (2x2)
      { type: 'special', key: imageKeys[11], span: 'col-span-2 row-span-2' },
      { type: 'image', key: imageKeys[12], span: 'col-span-1 row-span-1' },
      { type: 'special', key: imageKeys[13], span: 'col-span-2 row-span-2' },
      { type: 'video', videoIndex: 3, span: 'col-span-2 row-span-2' },
      
      // Row 7: Tiếp tục với các hình còn lại
      { type: 'image', key: imageKeys[14], span: 'col-span-1 row-span-1' },
      { type: 'video', videoIndex: 4, span: 'col-span-1 row-span-1' },
      
      // Các hình ảnh còn lại
      ...imageKeys.slice(16).map((key): GridItem => ({
        type: 'image', 
        key, 
        span: 'col-span-1 row-span-1'
      }))
    ];
  }, []);
  
  // Tạo mảng tất cả hình ảnh để hiển thị trong modal
  const allImages = useMemo((): ImageItem[] => {
    return gridLayout
      .filter((item): item is GridItem & { key: string } => 
        (item.type === 'image' || item.type === 'special') && item.key !== undefined
      )
      .map((item): ImageItem => ({
        key: item.key!,
        src: summaryImages[item.key!],
        isSpecial: item.isSpecial || false
      }));
  }, [gridLayout]);

  // Handle image click - Logic từ Gallery component
  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsFullscreen(true);
    setActiveIndex(index);
  };

  // Handle slide change - Logic từ Gallery component
  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    setSelectedImage(newIndex);
  };

  // Handle close fullscreen - Logic từ Gallery component
  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    // Không reset selectedImage và activeIndex như Gallery
  };

  const renderGridItem = (item: GridItem, index: number): JSX.Element | null => {
    const baseDelay = index * 0.1;
    
    switch (item.type) {
      case 'image':
      case 'special':
        if (!item.key) return null;
        const imageIndex = allImages.findIndex(img => img.key === item.key);
        if (imageIndex === -1) return null;
        
        return (
          <motion.div
            key={`${item.type}-${item.key}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: baseDelay }}
            className={`w-full relative group overflow-hidden rounded-xl shadow-lg cursor-pointer flex items-center justify-center bg-gray-100 ${item.span}`}
            onClick={() => handleImageClick(imageIndex)}
          >
            <img 
              src={summaryImages[item.key]} 
              alt={item.key}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              draggable={false}
            />
            {item.isSpecial && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Special
              </div>
            )}
          </motion.div>
        );
        
      case 'video':
        if (item.videoIndex === undefined) return null;
        return (
          <motion.div
            key={`video-${item.videoIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: baseDelay }}
            className={`flex items-center justify-center w-full h-full relative overflow-hidden rounded-xl ${item.span}`}
          >
            <VideoPlayer
              src={videoData[item.videoIndex].src}
              title={videoData[item.videoIndex]?.title}
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.section 
      className="min-h-screen relative bg-emerald-900"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* White title container */}
      <div className="relative z-10 py-16 md:py-20 xl:pt-40 xl:pb-20 px-4 md:px-8">
        <div className="max-w-[1400px] flex flex-col gap-4 md:gap-16 mx-auto bg-white rounded-xl xl:-mt-12 xl:py-12 px-4 md:px-8">
          <Title 
            mainTitle="Gallery" 
            subtitle="Explore our stunning property through photos and videos showcasing the natural beauty, facilities, and unique features"
            className='text-emerald-900'
          />
          
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* Hero Image */}
            <div className="relative mb-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={allImages[0]?.src}
                  alt="Featured image"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* View Gallery Button */}
                <button
                  onClick={() => handleImageClick(0)}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-emerald-900 px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-lg hover:bg-white transition-all"
                >
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                  <span>View Gallery</span>
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {allImages.length} Photos
                </div>

               
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-3">
              {allImages.slice(1, 7).map((image, index) => (
                <motion.div
                  key={image.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleImageClick(index + 1)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${
                    index === 5 ? 'relative' : ''
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.key}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                      index === 5 ? 'brightness-50' : ''
                    }`}
                  />
                  
                  {/* Last image overlay */}
                  {index === 5 && allImages.length > 7 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                      <span className="text-white text-xl font-bold">+{allImages.length - 6}</span>
                      <span className="text-white text-xs mt-1">More Photos</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-emerald-50 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">Click to see more</span>
                </div>
              </div>
            
            </div>
          </div>

          {/* Desktop Layout - Enhanced Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-6 auto-rows-[300px]">
            {gridLayout.map((item, index) => renderGridItem(item, index))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal - Logic từ Gallery component */}
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
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="absolute top-4 left-4 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium z-[102]">
              {activeIndex + 1} / {allImages.length}
            </div>

            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                dynamicBullets: true,
              }}
              initialSlide={selectedImage}
              loop={true}
              className="w-full h-full"
              centeredSlides={true}
              onSlideChange={handleSlideChange}
            >
              {allImages.map(({ key, src }) => (
                <SwiperSlide key={key} className="flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={src}
                        alt={key}
                        className="max-w-[95%] max-h-[90vh] object-contain mx-auto"
                        draggable={false}
                      />
                      
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.section>
  );
};

export default Gallery;