import { ContactSection, Footer } from "../components";
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
import 'swiper/css';
import 'swiper/css/pagination';

const Summary = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Create an array of all images including special ones
  const allImages = useMemo(() => {
    const specialImages = [
      { key: 'special_river1', src: summaryImages.img_river },
      { key: 'special_river2', src: summaryImages.img_river }
    ];
    
    const regularImages = Object.entries(summaryImages).map(([key, src]) => ({
      key,
      src
    }));

    // Combine all images in the order they appear in the grid
    const combined = [];
    
    // First section (before first video)
    combined.push(...regularImages.slice(0, 4));
    // First special image
    combined.push(specialImages[0]);
    // Second section
    combined.push(...regularImages.slice(4, 8));
    // Second special image
    combined.push(specialImages[1]);
    // Remaining images
    combined.push(...regularImages.slice(8));

    return combined;
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <motion.section 
      className="min-h-screen relative bg-white"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* Green background section */}
      <div className="fixed top-0 left-0 w-full h-[60px] md:h-[50vh] bg-emerald-900" />
      
      {/* White title container */}
      <div className="relative z-10 py-16 md:py-20 xl:pt-40 xl:pb-20 px-4 md:px-8">
        <div className="max-w-[1400px] flex flex-col gap-4 md:gap-16 mx-auto bg-white rounded-xl xl:-mt-12 xl:py-12 px-4 md:px-8">
          <Title 
            mainTitle="Summary" 
            subtitle="Discover our property through comprehensive video tours showcasing the stunning river frontage and complete property overview"
            className="text-emerald-900"
          />

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="flex gap-2">
              <div className="flex-1 relative aspect-square">
                {Object.entries(summaryImages).slice(0, 3).map(([key, src], index) => (
                  <img
                    key={key}
                    src={src}
                    alt={key}
                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg ${index === 0 ? 'z-30' : index === 1 ? 'z-20 scale-95' : 'z-10 scale-90'}`}
                  />
                ))}
                <button
                  onClick={() => handleImageClick(0)}
                  className="absolute inset-0 z-40 flex items-center justify-center bg-black/10 rounded-lg group hover:bg-black/50 transition-colors"
                >
                  <div className="text-center text-white">
                    <ArrowsPointingOutIcon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">View ({allImages.length})</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6 place-items-center">
            {/* First section images */}
            {Object.entries(summaryImages).slice(0, 4).map(([key, src], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full aspect-square relative group overflow-hidden rounded-xl shadow-lg cursor-pointer flex items-center justify-center bg-gray-100"
                onClick={() => handleImageClick(index)}
              >
                <img 
                  src={src} 
                  alt={key}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}

            {/* First Video Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1 row-span-2 flex items-center justify-center w-full h-full relative overflow-hidden rounded-xl"
            >
              <VideoPlayer
                src={videoData[0].src}
                title={videoData[0].title}
              />
            </motion.div>

            {/* First special image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-2 row-span-2 w-full aspect-square relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => handleImageClick(4)}
            >
              <img 
                src={summaryImages.img_river} 
                alt="River"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>

            {/* Second section images */}
            {Object.entries(summaryImages).slice(4, 8).map(([key, src], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
                className="w-full aspect-square relative group overflow-hidden rounded-xl shadow-lg cursor-pointer flex items-center justify-center bg-gray-100"
                onClick={() => handleImageClick(index + 5)}
              >
                <img 
                  src={src} 
                  alt={key}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}

            {/* Second Video Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1 row-span-2 flex items-center justify-center w-full h-full relative overflow-hidden rounded-xl"
            >
              <VideoPlayer
                src={videoData[1].src}
                title={videoData[1].title}
                
              />
            </motion.div>

            {/* Second special image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1 row-span-2 w-full h-full relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => handleImageClick(9)}
            >
              <img 
                src={summaryImages.img_river} 
                alt="River"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>

            {/* Remaining images */}
            {Object.entries(summaryImages).slice(8).map(([key, src], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 10) * 0.1 }}
                className="w-full aspect-square relative group overflow-hidden rounded-xl shadow-lg cursor-pointer flex items-center justify-center bg-gray-100"
                onClick={() => handleImageClick(index + 10)}
              >
                <img 
                  src={src} 
                  alt={key}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

          <ContactSection />
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-emerald-400 transition-colors"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            <div className="w-full h-full flex items-center justify-center">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                initialSlide={selectedImageIndex}
                className="w-full h-full flex items-center justify-center"
              >
                {allImages.map(({ key, src }) => (
                  <SwiperSlide key={key} className="flex items-center justify-center p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={src}
                        alt={key}
                        className="max-w-[90%] max-h-[85vh] object-contain rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.section>
  );
};

export default Summary;