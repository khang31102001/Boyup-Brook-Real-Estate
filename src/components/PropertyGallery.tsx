import React, { useState, useRef, useEffect } from 'react';
// import { Maximize } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';  
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../public/img/img1.jpg'
import img2 from '../public/img/img2.jpg'
import img3 from '../public/img/img3.jpg'
import img4 from '../public/img/img4.jpg'
import img5 from '../public/img/img5.jpg'



// Helper function to convert image URL to WebP format
const getWebPUrl = (url: string): string => {
  // If URL already contains format parameter, replace it with webp
  if (url.includes('&auto=format')) {
    return url.replace(/&auto=format.*?(&|$)/, '&auto=format&fm=webp$1');
  }
  // Otherwise, add webp format
  return `${url}${url.includes('?') ? '&' : '?'}fm=webp&auto=format`;
};

const PropertyGallery = () => {
  const images = [
    {
      src: img1,
      webp: getWebPUrl(img1),
      alt: "Aerial view of the property"
    },
    {
      src: img2,
      webp: getWebPUrl(img2),
      alt: "Property grounds with mountain backdrop"
    },
    {
      src: img3,
      webp: getWebPUrl(img3),
      alt: "House exterior at night"
    },
    {
      src: img4,
      webp: getWebPUrl(img4),
      alt: "House exterior during daytime"
    },
    {
        src: img5,
        webp: getWebPUrl(img5),
        alt: "House exterior during daytime"
      }
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const thumbnailObserver = useRef<IntersectionObserver | null>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize intersection observer for lazy loading thumbnails
  useEffect(() => {
    thumbnailObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLDivElement;
          const index = parseInt(target.dataset.index || '0', 10);
          
          // Load the image by setting the src
          const img = target.querySelector('img');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => {
              setImagesLoaded(prev => {
                const newLoaded = [...prev];
                newLoaded[index] = true;
                return newLoaded;
              });
            };
          }
          
          // Unobserve after loading
          if (thumbnailObserver.current) {
            thumbnailObserver.current.unobserve(target);
          }
        }
      });
    }, {
      rootMargin: '100px', // Load images when they are 100px from viewport
      threshold: 0.1
    });
    
    // Observe all thumbnail elements
    thumbnailRefs.current.forEach(ref => {
      if (ref && thumbnailObserver.current) {
        thumbnailObserver.current.observe(ref);
      }
    });

    return () => {
      if (thumbnailObserver.current) {
        thumbnailObserver.current.disconnect();
      }
    };
  }, []);
  
  // Open fullscreen with the current image
  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index);
    setFullscreenOpen(true);
  };

  // Handle keyboard navigation in fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenOpen) return;
      
      if (e.key === 'Escape') {
        setFullscreenOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setFullscreenImageIndex(prev => 
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setFullscreenImageIndex(prev => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenOpen, images.length]);

  return (
    <motion.section id="gallery" className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-cyan-900 text-center"
          >
            Property Gallery
          </motion.h1>
          <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-normal text-gray-700 max-w-3xl mx-auto text-justify px-0 md:px-4"
          >
            Explore the stunning views and features of this exceptional Boyup Brook property
          </motion.p>
        </div>

        <div className="mb-8">
          <Swiper
           modules={[Pagination]}
           pagination={{ clickable: true }}
           loop={true}
           className="w-full max-w-5xl mx-auto animate-on-scroll"
           >
           
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg relative group">
                      <picture>
                        <source srcSet={image.webp} type="image/webp" />
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                          loading="lazy"
                          width="1950"
                          height="1080"
                          onClick={() => openFullscreen(index)}
                        />
                      </picture>
                      <button 
                        onClick={() => openFullscreen(index)}
                        className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                        aria-label="View fullscreen"
                      >
                        {/* <Maximize className="h-5 w-5" /> */}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
         
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              ref={el => thumbnailRefs.current[index] = el}
              data-index={index}
              className={`overflow-hidden rounded-md cursor-pointer animate-on-scroll relative group ${selectedImageIndex === index ? 'ring-2 ring-forest' : ''}`}
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => {
                setSelectedImageIndex(index);
                openFullscreen(index);
              }}
            >
              <picture>
                <source data-src={image.webp} type="image/webp" />
                <img
                  data-src={image.src}
                  alt={image.alt}
                  className={`w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110 ${!imagesLoaded[index] ? 'bg-gray-200' : ''}`}
                  loading="lazy"
                  width="300"
                  height="200"
                />
              </picture>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {/* <Maximize className="h-4 w-4 text-white" /> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Dialog */}
      {/* <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-7xl w-[95vw] p-0 bg-black/95 border-none">
          <div className="relative h-[90vh] flex items-center justify-center">
            <button 
              onClick={() => setFullscreenImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <picture className="h-full w-full flex items-center justify-center animate-fade-in">
              <source srcSet={images[fullscreenImageIndex].webp} type="image/webp" />
              <img 
                src={images[fullscreenImageIndex].src}
                alt={images[fullscreenImageIndex].alt}
                className="max-h-full max-w-full object-contain"
                loading="eager"
              />
            </picture>

            <button 
              onClick={() => setFullscreenImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white">
              {fullscreenImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </motion.section>
  );
};

export default PropertyGallery;