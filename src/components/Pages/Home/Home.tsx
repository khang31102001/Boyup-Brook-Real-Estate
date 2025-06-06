import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '../../../styles/swiper.css';
import { useState, useEffect } from 'react';

import { heroImages } from '../../../constants/images';

const slides = [
  {
    image: heroImages.img_hill1,
    title: "Land & Infrastructure",
    details: [
      "301 acres freehold",
      "70% cleared land",
      "New shed with lockable bay",
      "Large water tank",
      "One dam, one soak",
      "Power through block"
    ]
  },
  {
    image: heroImages.img_river4,
    title: "River & Features",
    details: [
      "2km Blackwood River frontage",
      "Contour banks for runoff",
      "Fully fenced property",
      "Two large paddocks",
      "Sheep lease covers outgoings"
    ]
  },
  {
    image: heroImages.img_family,
    title: "Development Potential",
    details: [
      "Eco-tourism opportunities",
      "Perfect for cabins & lifestyle",
      "Ideal for equestrian & canoeing",
      "Suitable for cattle & sheep",
      "Potential for avocados & crops",
      "Space for golf course"
    ]
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContent, setShowContent] = useState(() => {
    return localStorage.getItem('homeAnimationComplete') === 'true';
  });
  const [showDetails, setShowDetails] = useState(() => {
    return localStorage.getItem('homeAnimationComplete') === 'true';
  });
  const [hasAnimated, setHasAnimated] = useState(() => {
    return localStorage.getItem('homeAnimationComplete') === 'true';
  });
  
  const currentSlide = slides[activeIndex];

  useEffect(() => {
    if (!hasAnimated) {
      const moveTimer = setTimeout(() => {
        setShowContent(true);
      }, 1000);

      const detailsTimer = setTimeout(() => {
        setShowDetails(true);
        setHasAnimated(true);
        localStorage.setItem('homeAnimationComplete', 'true');
      }, 2000);

      return () => {
        clearTimeout(moveTimer);
        clearTimeout(detailsTimer);
      };
    }
  }, [hasAnimated]);

  const mainContentVariants = {
    center: {
      x: "-50%",
      y: "-50%",
      left: "50%",
      top: "50%",
    },
    left: {
      x: 0,
      y: "-50%",
      left: "3%",
      top: "50%",
      transition: {
        duration: 0.25,
        ease: "easeOut"
      }
    },
    up: {
      x: 0,
      y: 0,
      left: "3%",
      top: "20%",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.25
      }
    }
  };

  const detailsVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  const initialPosition = hasAnimated ? "up" : "center";

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="Explore Boyup Brook Acreage"
      id="home"
    >
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: -200% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
          .shiny-emerald {
            line-height: 1.2;
            color: white;
            position: relative;
          }
          .shiny-emerald::before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: linear-gradient(
              90deg,
              transparent 0%,
              #6ee7b7 25%,
              #34d399 50%,
              #6ee7b7 75%,
              transparent 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shine 8s linear infinite;
            text-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
          }
        `}
      </style>

      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        slidesPerView={1}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        className="h-screen w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full overflow-hidden relative">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-black/20 z-10"
              />
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Content - Title and Description */}
      <motion.div 
        className="absolute z-30"
        variants={mainContentVariants}
        initial={initialPosition}
        animate={showDetails ? (window.innerWidth > 640 ? "up" : "center") : (showContent ? "left" : "center")}
      >
        <div className="w-full max-w-[800px]">
          <motion.div
            initial={{ opacity: hasAnimated ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:items-start "
          >
            <h1 
              className="text-5xl sm:text-5xl md:text-7xl font-bold text-white text-center sm:text-left" 
              style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              Boyup Brook
            </h1>
            <h2 
              className="text-6xl sm:text-5xl md:text-7xl font-bold mb-6 text-white text-center sm:text-left" 
              style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              Bridgetown
            </h2>
            <p 
              className="text-white/95 text-lg sm:text-xl w-full sm:max-w-[600px] tracking-wide text-center sm:text-left" 
              style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              301 acres freehold with 2km Blackwood River frontage. Perfect for eco-tourism, lifestyle development, and agricultural opportunities.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Details Content */}
      {showDetails && (
        <div className="hidden sm:block absolute z-30 w-full max-w-[800px]" style={{ left: "3%", top: "50%" }}>
          <motion.div
            key={activeIndex}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-white/95 text-lg md:text-xl space-y-2 tracking-wide"
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {currentSlide.details.map((detail, index) => (
              <motion.div 
                key={`${activeIndex}-${index}`}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.5 // Increased delay between items
                }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3 shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.5,
                    duration: 0.3
                  }}
                />
                {detail}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            key={`${activeIndex}-footer`}
            className="text-white/90 text-base md:text-lg mt-12 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Reliable land and development solutions for all your needs.
          </motion.p>
        </div>
      )}

      {/* Pagination */}
      <div className="swiper-pagination !bottom-8"></div>
    </section>
  );
}