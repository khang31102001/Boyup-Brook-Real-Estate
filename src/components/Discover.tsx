import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';  
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { heroImages } from '../constants/images';

const places = [
  {
    name: "Blackwood River & Natural Beauty",
    img: heroImages.img_river,
    gallery: [
      heroImages.img_river,
      heroImages.img_river1,
      heroImages.img_river2,
      heroImages.img_river3
    ],
    icon: (
      <svg className="w-7 h-7 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18s3-4 9-4 9 4 9 4M4 14s1.5-2 8-2 8 2 8 2" />
      </svg>
    ),
    short: "Private Blackwood River frontage, deep pools, granite outcrops, wildflowers, kangaroos, and ancient trees.",
    detail: (
      <>
        <p className="mb-2">301 acres (121 hectares) of beautiful rural land with exclusive, private frontage to the Blackwood River. Enjoy deep pools, sandy river-beds, rock outcrops, lichen-covered granite, fields of heath plants, and mature Redgum & Jarrah trees. Kangaroos, wildflowers, and orchids abound in spring. Private walking trails along the river offer rare solitude and natural beauty.</p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Long, private, exclusive Blackwood River frontage</li>
          <li>Deep pools, sandy river-bed, rock pools & outcrops</li>
          <li>Mature Redgum & Jarrah trees, wildflowers, orchids</li>
          <li>Kangaroos, birds, and abundant wildlife</li>
        </ul>
      </>
    )
  },
  {
    name: "Family Memories & Outdoor Fun",
    img: heroImages.img_hill1,
    gallery: [
      heroImages.img_hill,
      heroImages.img_hill1,
      heroImages.img_hill2,
      heroImages.img_hill3
    ],
    icon: (
      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2-2 4 4m0 0l2-2-6-6" />
      </svg>
    ),
    short: "Unforgettable family activities: canoeing, camping, sports, bonfires, fishing, and more.",
    detail: (
      <>
        <p className="mb-2">Over 14 years, our family has enjoyed countless activities on this land:</p>
        <ul className="list-disc pl-5 text-gray-700 mb-2">
          <li>Canoeing, swimming, fishing, wildflower hunting, mushrooming</li>
          <li>Camping, bonfires, campfire meals, moonlit walks, astronomy</li>
          <li>Trail motorbikes, 4WD, learning to drive, trailblazing</li>
          <li>Golf, hockey (Sheepoo stadium!), lamb saving, bee hives</li>
          <li>Bird watching, satellite spotting, entertaining friends & neighbours</li>
          <li>Annual Blackwood Marathon, family parades, and more</li>
        </ul>
        <p>Privacy and solitude are rare to find. This property is a true retreat for family and friends, with endless room to play and explore.</p>
      </>
    )
  },
  {
    name: "Development & Rural Potential",
    img: heroImages.img_asp,
    gallery: [
      heroImages.img_asp,
      heroImages.img_asp1,
      heroImages.img_asp2,
      heroImages.img_asp3
    ],
    icon: (
      <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8M8 8h8" />
      </svg>
    ),
    short: "Prime for further development: farming, cabins, golf, infrastructure, and more.",
    detail: (
      <>
        <p className="mb-2">This property is ready for your vision:</p>
        <ul className="list-disc pl-5 text-gray-700 mb-2">
          <li>Fertile land, sheep farming, annual rental income</li>
          <li>Power runs through property (not yet connected)</li>
          <li>Small dam, potential for more, contour banks for water catchment</li>
          <li>Tested construction sand (approved by Structerre)</li>
          <li>Potential for cabins, parkland, golf course, helipad, landscaping supplies</li>
          <li>Excellent maintenance by tenant: fertilising, fire breaks, fencing</li>
        </ul>
        <p>Whether you want to develop, farm, or simply retreat, this land offers endless possibilities.</p>
      </>
    )
  }
];

// const cardVariants = {
//   hidden: { 
//     opacity: 0,
//     y: 20
//   },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   })
// };

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const Discover = () => {
  const [selectedPlace, setSelectedPlace] = React.useState<null | typeof places[0]>(null);
  // const [isHovered, setIsHovered] = React.useState(false);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  // Combine all gallery images
  const allImages = [
    ...places[0].gallery,
    ...places[1].gallery,
    ...places[2].gallery
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <section className="relative xl:pt-24 px-3 sm:px-4 md:px-8 lg:px-12 bg-white" id="discover" aria-label="Discover The Most Attractive Places"> {/*py-8 sm:py-12*/}

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-cyan-900 text-center"
        >
          Experience Boyup Brook Acreage
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto text-justify md:text-center px-0 md:px-4"
        >
          Comprising 301 acres (121 hectares), this beautiful rural property is located between Boyup Brook and Bridgetown. It boasts long, private, exclusive frontage to the Blackwood River, wide open fields or treed river flats offering an exceptional opportunity to develop a range of rural activities or simply to retain as your own very private retreat, far from the masses.
        </motion.p>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
          {places.map((place, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-white"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlace(place)}
            >
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-start p-4 sm:p-6 z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg">{place.name}</h3>
                <p className="text-sm sm:text-base text-white/90 mb-4 line-clamp-2">{place.short}</p>
                <button
                  className="px-4 sm:px-6 py-1.5 sm:py-2 bg-emerald-500 text-white rounded-full font-bold text-sm sm:text-base shadow hover:bg-emerald-600 transition-colors duration-300"
                >
                  Discover More
                </button>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>

      {/* New Image Showcase Box */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden sm:block max-w-6xl mx-auto mt-16 sm:mt-24 lg:mt-10 mb-8 sm:mb-16"
      >
        <div className="relative w-full bg-gradient-to-br from-cyan-500 via-emerald-500 to-blue-600 p-[2px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
          <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 overflow-hidden">
            Title
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Explore Our Beautiful Property */} Nature’s Canvas: A Visual Story
            </motion.h2>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {allImages.slice(0, 6).map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={img}
                    alt={`Property view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-xs sm:text-sm font-medium"
                      >
                        View {idx + 1}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Image Showcase */}
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden mt-12 group">
              <div className="relative w-full h-full">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeImageIndex}
                    src={allImages[activeImageIndex]}
                    alt={`Featured view ${activeImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, x: -20 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.4, 0, 0.2, 1] // custom easing
                    }}
                    style={{
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Gradient Overlays */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" /> */}
              
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-emerald-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg w-full sm:w-auto"
                  >
                    <span className="text-white font-medium text-sm sm:text-base">Featured Location</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex items-center gap-2 bg-cyan-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg w-full sm:w-auto"
                  >
                    <span className="text-white font-medium text-sm sm:text-base">View {activeImageIndex + 1}/{allImages.length}</span>
                  </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 sm:space-y-4">
                  <motion.h3 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Featured View
                  </motion.h3>

                  {/* Location Info */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-emerald-600/90 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white font-medium text-sm sm:text-base">Boyup Brook, WA</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-cyan-600/90 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-white font-medium text-sm sm:text-base">301 Acres</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-yellow-500/90 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-white font-medium text-sm sm:text-base">Private Sale</span>
                    </motion.div>
                      
                       {/* new Price */}
                      <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-lime-500/90 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5"
                    >
                      <svg className="w-8 h-8 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0-8c0-1.105.895-2 2-2m-2 10c-1.105 0-2 .895-2 2" />
                      </svg>
                      <span className="text-white font-medium text-sm sm:text-base">Asking price is $830000</span>
                    </motion.div>
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 pt-2 sm:pt-4">
                    {/* Dots on mobile will show only current and adjacent dots */}
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto justify-center sm:justify-start">
                      {allImages.map((_, idx) => {
                        // On mobile, show only current and adjacent dots
                        const isMobile = window.innerWidth < 640;
                        const shouldShow = !isMobile || 
                          idx === activeImageIndex || 
                          idx === activeImageIndex - 1 || 
                          idx === activeImageIndex + 1;
                        
                        if (!shouldShow) return null;

                        return (
                          <motion.button
                            key={idx}
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                              idx === activeImageIndex 
                                ? 'bg-emerald-500 w-6 sm:w-8' 
                                : 'bg-white/70 w-1.5 sm:w-2 hover:bg-emerald-500'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setActiveImageIndex(idx)}
                          />
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        className="p-1.5 sm:p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <motion.button
                        className="p-1.5 sm:p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPlace && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-lg md:max-w-2xl shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-1.5 sm:p-2 z-10"
                onClick={() => setSelectedPlace(null)}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}

                loop={true}
                className="w-full h-48 sm:h-64 md:h-72"
              >
                {selectedPlace.gallery.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${selectedPlace.name} ${idx + 1}`}
                      className="w-full h-48 sm:h-64 md:h-72 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="p-4 sm:p-6 bg-white">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  {selectedPlace.icon}
                  <h2 className="text-xl sm:text-2xl font-bold text-cyan-900 mb-0">{selectedPlace.name}</h2>
                </div>
                <div className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 max-h-[200px] sm:max-h-[250px] overflow-y-auto pr-2">{selectedPlace.detail}</div>
                <button 
                  className="w-full mt-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-emerald-700 transition-colors"
                  onClick={() => setSelectedPlace(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Discover;