import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { heroImages } from '../constants/images';

const summary = [
  {
    name: 'River Front Area',
    country: 'Western Australia',
    image: heroImages.img_river,
    gallery: [heroImages.img_river, heroImages.img_river1, heroImages.img_river2, heroImages.img_river3, heroImages.img_river4],
    description: "Long private frontage to the Blackwood River with deep pools, rock formations, and sandy river-bed. Perfect for water activities and enjoying the natural beauty.",
    icon: (
      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18s3-4 9-4 9 4 9 4M4 14s1.5-2 8-2 8 2 8 2" /></svg>
    ),
    features: ["Blackwood River", "Deep pools", "Private frontage"]
  },
  {
    name: 'Hill Views Area',
    country: 'Western Australia',
    image: heroImages.img_hill,
    gallery: [heroImages.img_hill, heroImages.img_hill1, heroImages.img_hill2, heroImages.img_hill3],
    description: "Panoramic views from elevated positions, featuring mature Redgum and Jarrah trees. Ideal for building your dream home with stunning vistas.",
    icon: (
      <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" /></svg>
    ),
    features: ["Hilltop views", "Redgum & Jarrah", "Building potential"]
  },
  {
    name: 'Farm Area',
    country: 'Western Australia',
    image: heroImages.img_asp,
    gallery: [heroImages.img_asp, heroImages.img_asp1, heroImages.img_asp2, heroImages. img_asp3],
    description: "Fertile land with established infrastructure, perfect for agricultural activities or development. Currently used for sheep farming with excellent results.",
    icon: (
      <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    ),
    features: ["Fertile soil", "Sheep farming", "Development ready"]
  }
];

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

export default function Summary() {
  const [selectedPlace, setSelectedPlace] = useState<typeof summary[0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 xl:pt-32 px-4 md:px-12 bg-gradient-to-b from-emerald-50 via-white to-cyan-50" id="summary">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center gap-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-cyan-900 text-center"
        >
          Summary
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto text-justify md:text-center px-0 md:px-4"
        >
          Discover this unique 301-acre Boyup Brook property for private sale, featuring exclusive Blackwood River frontage, panoramic hill views, and fertile farmland. Explore the diverse landscapes and development potential of this rare Western Australian opportunity.
        </motion.p>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
        >
          {summary.map((place) => (
            <motion.div
              key={place.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full md:max-w-xs rounded-xl overflow-hidden shadow-lg group bg-white cursor-pointer"
              onClick={() => setSelectedPlace(place)}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute top-0 right-0 m-3 bg-emerald-800 bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
              >
                <motion.span 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-300"
                >
                  ★
                </motion.span>
              </motion.div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-900/80 to-transparent p-4">
                <h3 className="text-h3 font-bold text-white mb-1">{place.name}</h3>
                <div className="text-emerald-100 text-small mb-2">{place.country}</div>
                <div className="flex items-center justify-between">
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#contact" 
                    className="text-white font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#contact');
                      element?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  >Contact Us</motion.a>
                  <motion.span 
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-800/80 text-white ml-2"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 z-20 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2 transition-colors"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="md:w-7/12 w-full flex items-center justify-center bg-gray-50 p-2 md:p-6">
                  {selectedPlace.gallery && (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      pagination={{ clickable: true }}
                      loop={true}
                      className="w-full h-[250px] md:h-[420px]"
                    >
                      {selectedPlace.gallery.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt={`${selectedPlace.name} view ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl shadow-lg cursor-pointer"
                            onClick={() => setSelectedImageIndex(index)}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
                <div className="md:w-5/12 w-full flex flex-col gap-4 p-4 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedPlace.icon}
                    <h2 className="text-2xl md:text-3xl font-bold text-cyan-900">{selectedPlace.name}</h2>
                  </div>
                  {selectedPlace.features && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedPlace.features.map((f, i) => (
                        <span key={i} className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-200">{f}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700 text-base md:text-lg mb-2">{selectedPlace.description}</p>
                  <button
                    className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors"
                    onClick={() => {
                      setSelectedPlace(null);
                      const element = document.querySelector('#contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact Us
                  </button>
                </div>
                {/* Modal xem ảnh lớn */}
                {selectedImageIndex !== null && selectedPlace.gallery && (
                  <div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    onClick={() => setSelectedImageIndex(null)}
                  >
                    {/* Nền trắng mờ phía sau modal ảnh */}
                    <div className="absolute inset-0 bg-white/90 z-0" />
                    <div className="relative max-w-3xl w-full flex flex-col items-center z-10" onClick={e => e.stopPropagation()}>
                      <img
                        src={selectedPlace.gallery[selectedImageIndex]}
                        alt={`Preview ${selectedImageIndex + 1}`}
                        className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
                      />
                      <button
                        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
                        onClick={() => setSelectedImageIndex(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {/* Prev/Next buttons */}
                      {selectedPlace.gallery.length > 1 && (
                        <>
                          <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
                            onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + selectedPlace.gallery.length) % selectedPlace.gallery.length)}
                          >
                            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                          </button>
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
                            onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % selectedPlace.gallery.length)}
                          >
                            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Polaroid Image Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden md:block max-w-7xl mx-auto mt-24 md:mt-32 relative px-4"
      >
        <div className="relative w-full overflow-hidden pb-8">
          <motion.div 
            className="flex gap-6 min-w-max px-4 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{
              left: -2800,
              right: 0
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileTap={{ cursor: "grabbing" }}
            animate={{
              x: [0, -1400],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            whileHover={{ 
              animationPlayState: "paused" 
            }}
          >
            {/* First Set of Polaroids */}
            {[...Array(2)].map((_, setIndex) => (
              <>
                {/* Polaroid 1 */}
                <motion.div 
                  key={`set-${setIndex}-1`}
                  initial={{ rotate: -2 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-[280px] bg-white p-4 shadow-xl rounded-sm transform rotate-[-2deg] cursor-pointer group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={heroImages.img_river} alt="River view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-gray-600 text-sm font-handwriting">Peaceful river views</p>
                </motion.div>

                {/* Polaroid 2 */}
                <motion.div 
                  key={`set-${setIndex}-2`}
                  initial={{ rotate: 2 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-[280px] bg-white p-4 shadow-xl rounded-sm transform rotate-[2deg] cursor-pointer group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={heroImages.img_hill} alt="Hill view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-gray-600 text-sm font-handwriting">Stunning hilltop vistas</p>
                </motion.div>

                {/* Polaroid 3 */}
                <motion.div 
                  key={`set-${setIndex}-3`}
                  initial={{ rotate: -1 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-[280px] bg-white p-4 shadow-xl rounded-sm transform rotate-[-1deg] cursor-pointer group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={heroImages.img_asp} alt="Farm view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-gray-600 text-sm font-handwriting">Fertile farmland</p>
                </motion.div>

                {/* Polaroid 4 */}
                <motion.div 
                  key={`set-${setIndex}-4`}
                  initial={{ rotate: 1 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-[280px] bg-white p-4 shadow-xl rounded-sm transform rotate-[1deg] cursor-pointer group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={heroImages.img_river1} alt="Additional view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-gray-600 text-sm font-handwriting">Natural beauty</p>
                </motion.div>

                {/* Polaroid 5 */}
                <motion.div 
                  key={`set-${setIndex}-5`}
                  initial={{ rotate: -2 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-[280px] bg-white p-4 shadow-xl rounded-sm transform rotate-[-2deg] cursor-pointer group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img src={heroImages.img_hill1} alt="Additional view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-gray-600 text-sm font-handwriting">Perfect serenity</p>
                </motion.div>
              </>
            ))}
          </motion.div>

          {/* Add gradient overlays to create fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </motion.div>
    </section>
  );
}