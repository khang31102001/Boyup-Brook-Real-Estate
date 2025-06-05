import { FaShare, FaRuler, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { propertyData } from '../../../constants/data/propertyData';

const PropertyDetail = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <span className="text-3xl font-bold text-emerald-900">Offers invited</span>
            <span className="text-4xl font-bold text-emerald-900 mb-6">{propertyData.price}</span>
          </div>

          <div className="flex gap-4 flex-col justify-center w-fit">
            <div className='flex gap-4 items-center '>
              <div className="flex w-fit items-center bg-green-50 text-green-700 px-4 py-2 rounded-md">
                <FaRuler className="mr-2" />
                <span>{propertyData.landSize}</span>
              </div>
              <a href="tel:+0457230191" className="text-emerald-900 w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                <FaShare className="mr-2" />
                Contact Owner
              </a>

            </div>

            <div className='flex items-center w-fit bg-green-50 text-green-700 px-4 py-2 rounded-md'>
              <FaMapMarker className="mr-2" />
              <span>{propertyData.location}</span>
            </div>


          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className="col-span-3 flex flex-col gap-4">
          <div className='flex flex-col gap-4'>
            <h2 className="text-2xl font-bold text-emerald-900">{propertyData.title}</h2>
            <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full rounded-2xl overflow-hidden shadow-xl h-[600px] relative group"
              >
                <iframe
                  title="Boyup Brook Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3311.1241957041457!2d116.38427!3d-33.912203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDU0JzQzLjkiUyAxMTbCsDIzJzAzLjQiRQ!5e0!3m2!1svi!2s!4v1749030033985!5m2!1svi!2s&language=en&zoom=0&maptype=roadmap&style=feature:all|element:labels|visibility:on&style=feature:administrative|element:geometry|visibility:off&style=feature:landscape|element:geometry|color:0xf5f5f5&style=feature:poi|element:geometry|color:0xe8e8e8&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:simplified&style=feature:transit|visibility:off&style=feature:water|element:geometry"

                  
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="transition-opacity duration-300"
                />


                
                <div className="absolute top-2 left-2 bg-white backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-sm">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-2">Boyup Brook</h4>
                  <p className="text-sm text-emerald-800">
                    Located in the heart of Western Australia, Boyup Brook is a charming rural town known for its natural beauty and community spirit.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
         
        </div>
        <div className="h-fit col-span-1 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-4">
            
            {/* Agent Info Section */}
            <div className="flex flex-col gap-4">
              {/* Avatar */}
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-emerald-100 shadow flex-shrink-0">
                <img src={propertyData.agent.image} className="w-full h-full object-cover" alt="Agent" />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center gap-3">
                {/* Name */}
                <div className="font-bold text-lg text-emerald-900 text-center">
                  {propertyData.agent.name}
                </div>

                <div className='flex flex-col justify-center items-center gap-2 py-4 border-y border-emerald-100'> 
                {/* Email */}
                <div className='flex items-center gap-2'>
                  <span className='text-emerald-900'>📧</span>
                  <a
                    href="mailto:eaglescreensjr@gmail.com"
                    className="text-emerald-900 hover:text-emerald-700"
                  >
                    eaglescreensjr@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className='flex items-center gap-2'>
                  <span className='text-emerald-900'>📞</span>
                  <a
                    href="tel:+0457230191"
                    className="text-emerald-900 hover:text-emerald-700"
                  >
                    0457 230 191
                  </a>
                </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              to={'/contact'}
              className="bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition duration-300 text-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              Get in touch
            </Link>
          </div>
        </div>  
      </div>
      
    </div>
  );
};

export default PropertyDetail;