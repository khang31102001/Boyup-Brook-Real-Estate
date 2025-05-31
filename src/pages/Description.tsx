import { motion } from 'framer-motion';
import Title from '../components/Common/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../components/Common/Footer';
import { ScrollToTop } from '../components';
import BounceCards from '../components/Pages/Photo/BounceCards';
import { heroImages } from '../constants/images';
import { FaTree, FaHome, FaWater, FaMountain, FaRoad, FaSeedling } from 'react-icons/fa';

export default function Description() {

  const images = [
    heroImages.hero1,
    heroImages.hero2,
    heroImages.hero3,
    heroImages.hero4,
    heroImages.hero5,
  ]

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
      icon: <FaWater className="w-8 h-8" />,
      title: "Blackwood River Frontage",
      description: "2km of pristine river frontage offering stunning views and recreational opportunities"
    },
    {
      icon: <FaTree className="w-8 h-8" />,
      title: "Natural Bushland",
      description: "Significant areas of natural bushland providing wildlife habitat and natural beauty"
    },
    {
      icon: <FaMountain className="w-8 h-8" />,
      title: "Rolling Hills",
      description: "Gentle, rolling hills creating picturesque landscapes and varied terrain"
    },
    {
      icon: <FaHome className="w-8 h-8" />,
      title: "Modern Infrastructure",
      description: "3-bay shed with concrete floor and power connection ready for immediate use"
    },
    {
      icon: <FaRoad className="w-8 h-8" />,
      title: "Excellent Access",
      description: "Well-maintained internal roads and strategic location between Boyup Brook and Bridgetown"
    },
    {
      icon: <FaSeedling className="w-8 h-8" />,
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
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 flex flex-col gap-4 xl:gap-12 justify-center items-center">
        {/* Title Section */}
        
        <Title 
          mainTitle="Property Description" 
          subtitle="Discover Your Dream Rural Estate in Western Australia's Picturesque Southwest"
          className='text-emerald-900'
        />
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className='text-emerald-900 text-sm sm:text-lg max-w-4xl mx-auto leading-relaxed text-justify mb-12'>
            Own an expansive 301-acre property between Boyup Brook and Bridgetown – the heart of Western Australia's Southwest. This remarkable property features diverse landscapes: long private frontage to the scenic Blackwood River, gentle, rolling hills, open pastures, natural bushland, and farming areas. It's an ideal setting for peaceful living, family bonding, outdoor activities agricultural or eco-tourism development, ... or all of the above.
          </p>
        </motion.div>
        <div className="md:flex md:flex-wrap grid grid-cols-2 items-center justify-center gap-4 md:gap-8">
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
                  scale: 1.05,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="text-center bg-white rounded-xl shadow-md p-6 transition-all duration-300 cursor-pointer hover:bg-emerald-50 min-w-20 md:min-w-40"
              >
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="text-h2 font-bold text-emerald-900 mb-1"
                >
                  {count.toLocaleString()}
                </motion.div>
                <div className="text-gray-700 text-normal font-medium">{item.label}</div>
               
              </motion.div>
            );
          })}
        </div>
        <BounceCards
          className="custom-bounceCards"
          images={images}
          containerWidth={window.innerWidth < 768 ? 300 : 500}
          containerHeight={window.innerWidth < 768 ? 250 : 350}
          animationDelay={0}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={false}
        />

        {/* Features Section */}
        <div className="w-full mt-20">
          <motion.h2 
            className="text-3xl font-bold text-emerald-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Property Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-emerald-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
      <ScrollToTop />
      <Footer />
    </section>
  );
} 