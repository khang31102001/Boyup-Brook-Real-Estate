import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BounceCards from './BounceCards';
import Discover from './Discover'; 

// Import images
import img1 from '../public/img/img1.jpg'
import img2 from '../public/img/img2.jpg'
import img3 from '../public/img/img3.jpg'
import img4 from '../public/img/img4.jpg'
import img5 from '../public/img/img5.jpg'

const Description = () => {
  // Actual property measurements and features
  const landInfo = [
    { value: 301, label: 'Acres', desc: 'Total land area (301 acres)' },
    { value: 1500, label: 'River Frontage', desc: 'Blackwood River frontage' },
    { value: 3, label: 'Distinct Areas', desc: 'River, Hills & Farm zones' },
    { value: 1, label: 'House', desc: 'Traditional timber house' },
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

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5
  ];
  
  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  return (
    
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-8 xl:py-16 px-4 md:px-12" //giam 1 nua py
      id="description"
      aria-label="Boyup Brook acreage for sale"
    >
     
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4 xl:gap-12">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-cyan-900 text-center"
        >
          Your Opportunity to Own Prime Land in Boyup Brook, WA
        </motion.h1>  

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-normal text-gray-700 max-w-3xl mx-auto text-justify px-0 md:px-4"
        >
          Own an expansive 301-acre property (over 1.2 million square meters) in Boyup Brook – the heart of Western Australia's Southwest. This remarkable estate features diverse landscapes: the scenic Blackwood River, gentle hills, open pastures, natural bushland, and farming areas. It's an ideal setting for peaceful living, family bonding, outdoor activities, and potential agricultural or eco-tourism development.
        </motion.p>

        <ul className="text-gray-700 text-base max-w-3xl mx-auto mt-2 mb-4 list-disc list-inside">
          <li><b>Family Heritage</b>: This land has been cherished through generations, preserving memories and traditional activities including camping, canoeing, sports, bonfires, and wildlife observation.</li>
          <li><b>Landscape & Amenities</b>: River frontage, hills, bushland, pastures, timber house, sheds, walking trails, camping areas, and fruit orchards.</li>
          <li><b>Development Potential</b>: Suitable for farming, retreat development, eco-tourism ventures, or long-term investment.</li>
        </ul>

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
                <div className="text-gray-400 text-small">{item.desc}</div>
              </motion.div>
            );
          })}
        </div>
         <Discover/>
        {/* Gallery layout
        <div 
          className="flex flex-col items-center justify-center mt-4 md:mt-12 w-full"
        >
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
         
        </div> */}
      </div>
    </motion.section>
  );
};

export default Description;