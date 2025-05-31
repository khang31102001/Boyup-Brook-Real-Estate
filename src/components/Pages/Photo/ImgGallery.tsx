import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { heroImages } from '../../../constants/images';


interface Property {
  src: string;
  info: string;
  price: string;
  description: string;
  features: string[];
  gallery: string[];
}

const ImgGallery = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    {
      src: heroImages.img_river,
      info: "Boyup Brook Rural Lifestyle Property - River Front",
      price: "Private Sale",
      description: "Long private frontage to the Blackwood River with deep pools, rock formations, and sandy river-bed. Perfect for water activities and enjoying the natural beauty.",
      features: [
        "301 acres (121 hectares)",
        "Blackwood River frontage",
        "Deep pools and rock formations",
        "Mature Redgum and Jarrah trees",
        "Private walking trails",
        "Existing dam with potential for more",
        "Power lines through property",
        "Tested construction sand",
        "Natural beauty and wildlife"
      ],
      gallery: [heroImages.img_river, heroImages.img_river1, heroImages.img_river2, heroImages.img_river3, heroImages.img_river4]
    },
    {
      src: heroImages.img_hill,
      info: "Boyup Brook Rural Lifestyle Property - Hill Views",
      price: "Private Sale",
      description: "Panoramic views from elevated positions, featuring mature Redgum and Jarrah trees. Ideal for building your dream home with stunning vistas.",
      features: [
        "301 acres (121 hectares)",
        "Blackwood River frontage",
        "Deep pools and rock formations",
        "Mature Redgum and Jarrah trees",
        "Private walking trails",
        "Existing dam with potential for more",
        "Power lines through property",
        "Tested construction sand",
        "Natural beauty and wildlife"
      ],
      gallery: [heroImages.img_hill, heroImages.img_hill1, heroImages.img_hill2, heroImages.img_hill3]
    },
    {
      src: heroImages.img_asp,
      info: "Boyup Brook Rural Lifestyle Property - Farm Area",
      price: "Private Sale",
      description: "Fertile land with established infrastructure, perfect for agricultural activities or development. Currently used for sheep farming with excellent results.",
      features: [
        "301 acres (121 hectares)",
        "Blackwood River frontage",
        "Deep pools and rock formations",
        "Mature Redgum and Jarrah trees",
        "Private walking trails",
        "Existing dam with potential for more",
        "Power lines through property",
        "Tested construction sand",
        "Natural beauty and wildlife"
      ],
      gallery: [heroImages.img_asp, heroImages.img_asp1, heroImages.img_asp2, heroImages. img_asp3]
    }
  ]

  return (
    <section className="w-full px-4 py-8 md:py-16 lg:py-20 xl:py-32 bg-gradient-to-b from-white to-emerald-50">
      <div id="gallery" className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-5xl text-center font-bold text-cyan-900 mb-4"
        >
          Boyup Brook Rural Lifestyle Property
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto text-justify md:text-center mb-12 px-4"
        >
          Explore our stunning 301-acre property showcasing the natural beauty of Boyup Brook. From scenic river views to lush landscapes, these images capture the essence of this pristine Western Australian property with exclusive Blackwood River frontage.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            loop={true}
            speed={1000}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 }
            }}
            className="w-full cursor-grab px-2 md:px-4 group"
          >
            {images.map((property, idx) => (
              <SwiperSlide key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-xl group cursor-pointer"
                  onClick={() => setSelectedProperty(property)}
                >
                  <img
                    src={property.src}
                    alt={`Boyup Brook property view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-semibold text-white mb-2"
                      >
                        {property.info}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-emerald-400 mb-3"
                      >
                        {property.price}
                      </motion.p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-cyan-900 px-6 py-2 rounded-full font-medium hover:bg-emerald-500 hover:text-white transition-colors duration-300"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
                  >
                    For Sale
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
            
            {/* Navigation Buttons */}
            <div className="swiper-button-prev !text-emerald-600 !w-12 !h-12 !bg-white/90 !rounded-full !shadow-lg after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="swiper-button-next !text-emerald-600 !w-12 !h-12 !bg-white/90 !rounded-full !shadow-lg after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Pagination */}
            <div className="swiper-pagination !bottom-0"></div>
          </Swiper>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-3 shadow-lg min-w-[200px]"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-lg">Contact Us</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-cyan-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-cyan-800 transition-colors duration-300 flex items-center justify-center space-x-3 shadow-lg min-w-[200px]"
          >
            <a href="tel:0457230191" className="flex items-center gap-2 text-white font-medium  transition-colors text-base sm:text-lg justify-center sm:justify-start">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg">Buy Now</span>
            </a>
          </motion.button>
        </motion.div>

        {/* Enhanced Property Details Modal */}
        {selectedProperty && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Image Gallery Section */}
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative group"
                    >
                      <img 
                        src={selectedImage || selectedProperty.src} 
                        alt={selectedProperty.info}
                        className="w-full h-[400px] object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </motion.div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedProperty.gallery.map((img, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative group cursor-pointer"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img 
                            src={img} 
                            alt={`Gallery ${idx + 1}`}
                            className={`w-full h-24 object-cover rounded-lg transition-all duration-300 ${
                              (selectedImage || selectedProperty.src) === img 
                                ? 'ring-2 ring-emerald-500 scale-105' 
                                : 'group-hover:scale-105'
                            }`}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Property Info Section */}
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <h2 className="text-3xl font-bold text-cyan-900">{selectedProperty.info}</h2>
                      <p className="text-2xl font-bold text-emerald-600">{selectedProperty.price}</p>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {selectedProperty.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="text-xl font-semibold text-cyan-900 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {selectedProperty.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-300"
                          >
                            <svg className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4"
                    >
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                        onClick={() => {
                          setSelectedProperty(null);
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Contact</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
     
    </section>
  )
}

export default ImgGallery