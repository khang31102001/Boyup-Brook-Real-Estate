import { motion } from 'framer-motion';
import Title from '../components/Common/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../components/Common/Footer';
import { ScrollToTop } from '../components';
import BounceCards from '../components/Pages/Photo/BounceCards';
import { heroImages } from '../constants/images';
import { FaTree, FaHome, FaWater, FaMountain, FaSeedling, FaMapMarker, FaShare, FaRuler } from 'react-icons/fa';
import { propertyData } from '../constants/data/propertyData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Description() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    heroImages.hero1,
    heroImages.hero2,
    heroImages.hero3,
    heroImages.hero4,
    heroImages.hero5,
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  const landInfo = [
    { value: 121, label: 'Hectares Approx', desc: 'Total land area (121 hectares approx)' },
    { value: 2, label: 'Kilometers Approx', desc: 'Blackwood River frontage' },
    { value: 5, label: 'Distinct Areas', desc: 'River Flats, River Escarment, Rolling Pastures, Native Bushland, Farming Areas' },
    { value: 3, label: 'Bay', desc: 'Modern Shed' },
  ];

  const features = [
    {
      icon: <FaWater className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Blackwood River Frontage",
      description: "2km approx of pristine river frontage offering stunning views and recreational opportunities"
    },
    {
      icon: <FaTree className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Natural Bushland",
      description: "Significant areas of natural bushland providing wildlife habitat and natural beauty"
    },
    {
      icon: <FaMountain className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Rolling Hills",
      description: "Gentle, rolling hills creating picturesque landscapes and varied terrain"
    },
    {
      icon: <FaHome className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Modern Infrastructure",
      description: "3-bay shed with concrete slab floor"
    },
    {
      icon: <FaSeedling className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Agricultural Potential",
      description: "Suitable areas for farming and agricultural development"
    }
  ];

  function useCountUp(end: number, duration = 1.5): number {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const increment = end / (duration * 60);
      let frame = 0;
      function update() {
        frame++;
        const next = Math.min(Math.round(start + increment * frame), end);
        setCount(next);
        if (next < end) requestAnimationFrame(update);
      }
      update();
      // eslint-disable-next-line
    }, [end]);
    return count;
  }

  return (
    <section className="min-h-screen relative bg-white">
      <div className="max-w-5xl mx-auto py-16 md:py-20 xl:pt-40 xl:pb-20 px-4 md:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16">
          <Title 
            mainTitle="Property Description" 
            subtitle="Discover Your Dream Rural Estate in Western Australia's Picturesque Southwest"
            className='text-emerald-900'
          />
        </div>

        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <p className='text-emerald-900 text-sm md:text-lg max-w-3xl lg:max-w-4xl mx-auto leading-relaxed text-justify'>
            Own an expansive 301-acre property between Boyup Brook and Bridgetown – the heart of Western Australia's Southwest. This remarkable property features diverse landscapes: long private frontage to the scenic Blackwood River, gentle, rolling hills, open pastures, natural bushland, and farming areas. It's an ideal setting for peaceful living, family bonding, outdoor activities agricultural or eco-tourism development, ... or all of the above.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 max-w-5xl mx-auto">
          {landInfo.map((item, idx) => {
            const count = useCountUp(item.value);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="text-center bg-white rounded-xl shadow-md p-4 md:p-6 transition-all duration-300 cursor-pointer hover:bg-emerald-50"
              >
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="text-2xl md:text-3xl font-bold text-emerald-900 mb-2"
                >
                  {count.toLocaleString()}
                </motion.div>
                <div className="text-gray-700 text-sm md:text-base font-medium px-2">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BounceCards */}
        <div className="flex justify-center mb-12 md:mb-20">
          <BounceCards
            className="custom-bounceCards"
            images={images}
            containerWidth={windowWidth < 768 ? Math.min(windowWidth - 40, 320) : 500}
            containerHeight={windowWidth < 768 ? 220 : 350}
            animationDelay={0}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={windowWidth >= 768}
          />
        </div>

        {/* Features Section */}
        <div className="space-y-12 md:space-y-16">
          {propertyData.features?.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white overflow-hidden"
            >
              {/* Feature Content */}
              <div className="p-6 md:p-8">
                <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-900 text-center mb-4 md:mb-6'>
                  {feature.title}
                </h3>
                
                <div className='text-xl md:text-2xl lg:text-3xl px-4 py-2 md:px-6 md:py-3 border-2 border-emerald-900 rounded-lg font-bold hover:bg-emerald-900 hover:text-white transition-all duration-300 text-emerald-900 w-fit mx-auto text-center mb-4 md:mb-6 cursor-pointer'>
                  {feature.offer}
                </div>

                <p className='text-emerald-900 leading-relaxed text-sm md:text-lg  max-w-4xl mx-auto mb-6 text-justify'>
                  {feature.description}
                </p>

                {/* Property Info - Mobile Responsive */}
                <div className="w-full mx-auto">
                  {/* Mobile: Stack vertically */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-6">
                    <div className="flex items-center justify-center sm:justify-start bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                      <FaRuler className="mr-3 text-base flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{propertyData.landSize}</span>
                    </div>
                  
                    <div className='flex items-center justify-center sm:justify-start bg-green-50 text-green-700 px-4 py-3 rounded-lg'>
                      <FaMapMarker className="mr-3 text-base flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{propertyData.location}</span>
                    </div>
                    
                    <Link to="/contact" target='_blank' className="flex items-center justify-center sm:justify-start bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium">
                      <FaShare className="mr-3 text-base flex-shrink-0" />
                      <span className="text-sm md:text-base">Contact Owner</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feature Image */}
              
              <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                <SwiperSlide>
                <div className="w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-lg">
                  <img src={feature.img} alt={feature.title} className='w-full h-full  object-cover' />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-lg"> 
                    <img src={feature.img2} alt={feature.title} className='w-full h-full  object-cover' />
                  </div>
                </SwiperSlide>
              </Swiper>
             
             
            </motion.div>
          ))}

          {/* Additional Features Grid */}
          <div className="bg-white rounded-xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="text-emerald-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-emerald-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ScrollToTop />
      <Footer />
    </section>
  );
}