import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "../constants/images";
import { PropertyDetail, ScrollToTop } from "../components";
import Footer from "../components/Common/Footer";
import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Title from "../components/Common/Title";

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

  // Tất cả các ảnh có sẵn
  const allImages = [
    {
      src: heroImages.img_river2, // Ảnh chính
    },
    {
      src: heroImages.img_river3, // Ảnh sông
    },
    {
      src: heroImages.img_river4, // Ảnh cảnh quan
    },
    {
      src: heroImages.img_river, // Ảnh khác
    },
    {
      src: heroImages.img_river1,
    },
    {
      src: heroImages.img_hill,
    },
    {
      src: heroImages.hero1,
    },
    {
      src: heroImages.hero2,
    },
    {
      src: heroImages.hero3,
    },
    {
      src: heroImages.hero4,
    },
    {
      src: heroImages.img_asp,    
    },
    {
      src: heroImages.img_asp1,
    },
    {
      src: heroImages.img_asp2,
    },
    {
      src: heroImages.img_asp3,
    },
  ];

  // 3 ảnh cho cột bên phải (không bao gồm ảnh chính)
  const thumbnailImages = [
    { src: heroImages.img_river3 }, // Ảnh 1 bên phải
    { src: heroImages.img_river4 }, // Ảnh 2 bên phải
    { src: heroImages.img_river }   // Ảnh 3 bên phải 
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsFullscreen(true);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className='min-h-screen bg-white'>
      <style>{swiperStyles}</style>
      <div className='max-w-7xl mx-auto py-20 px-4 md:px-8'>
        <Title 
          mainTitle="Gallery" 
          subtitle="Take a look at our gallery"
          className='text-emerald-900'
        />
        {/* Main Image and Thumbnails Container */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 h-[700px]">
          {/* Main large image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:flex-[3] relative rounded-xl overflow-hidden cursor-pointer h-full group"
            onClick={() => handleImageClick(selectedImage)}
          >
            <img
              src={allImages[selectedImage].src}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {selectedImage + 1} / {allImages.length}
            </div>
          </motion.div>

          {/* Right side thumbnails - Chỉ hiển thị 3 ảnh */}
          <div className="lg:flex-1 flex flex-col gap-3 h-full">
            {thumbnailImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleImageClick(index + 1)}
                className={`relative cursor-pointer rounded-xl overflow-hidden flex-1 group ${
                  selectedImage === index + 1 ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <img
                  src={image.src}
                  className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
                    index === 2 ? 'brightness-50' : ''
                  }`}
                />
                {index === 2 ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">+{allImages.length - 3}</span>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 2} / {allImages.length}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Property Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
         <PropertyDetail />
        </motion.div>
      </div>

      {/* Fullscreen Image Swiper */}
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
              onClick={() => setIsFullscreen(false)}
            >
              <FaTimes size={24} />
            </button>
            <div className="absolute top-4 left-4 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium z-[102]">
              {activeIndex + 1} / {allImages.length}
            </div>

            {/* Custom Navigation Buttons */}
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
              {allImages.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={image.src}
                      className="max-w-[95%] max-h-[90vh] object-contain mx-auto"
                    />
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