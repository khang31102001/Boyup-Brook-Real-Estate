import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '../styles/swiper.css';
import { useState } from 'react';

import img1 from '../public/img/img1.jpg' 

import { heroImages } from '../constants/images';


const socialLinks = [
  { name: 'facebook', icon: 'fab fa-facebook-f', link: 'https://www.facebook.com/profile.php?id=100088916504867' },
  { name: 'instagram', icon: 'fab fa-instagram', link: 'https://www.instagram.com/boyupbrook/' },
  { name: 'twitter', icon: 'fab fa-twitter', link: 'https://twitter.com/boyupbrook' },
  { name: 'phone', icon: 'fas fa-phone', link: 'tel:0457230191' }
];

interface Property {
  src: string;
  title: string;
  description: string;
  details?: {
    price?: string;
    size?: string;
    location?: string;
    features?: string[];
    amenities?: string[];
    activities?: string[];
    currentUse?: {
      status: string;
      tenant: string;
      rental: string;
      maintenance: string;
    };
  };
}

const propertyGroups = {
  hills: [
    {
      src: heroImages.img_hill,
      title: "Hill Views",
      description: "Breathtaking views from the hills",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Boyup Brook Hills",
        features: ["Panoramic views", "Natural bushland", "Wildlife sanctuary"],
        amenities: ["Water tanks", "Solar power", "Access road"]
      }
    },
    {
      src: heroImages.img_hill1,
      title: "Hill Estate",
      description: "Exclusive hilltop property",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Upper Hill Region",
        features: ["360° views", "Native forest", "Wildlife corridor"],
        amenities: ["Modern homestead", "Water supply", "Power connected"]
      }
    },
    {
      src: heroImages.img_hill2,
      title: "Hill Retreat",
      description: "Peaceful hill retreat with stunning views",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Hill Valley",
        features: ["Scenic outlook", "Natural springs", "Walking trails"],
        amenities: ["Guest house", "Water system", "Storage sheds"]
      }
    },
    {
      src: heroImages.img_hill3,
      title: "Hill Haven",
      description: "Your perfect hill sanctuary",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Hilltop Ridge",
        features: ["Mountain views", "Native bush", "Wildlife"],
        amenities: ["Luxury home", "Water supply", "Power system"]
      }
    }
  ],
  rivers: [
    {
      src: heroImages.img_river,
      title: "Boyup Brook Rural Lifestyle Property",
      description: "301 acres of beautiful rural property with exclusive Blackwood River frontage, offering diverse landscapes and activities",
      details: {
        price: "Private Sale",
        size: "301 acres (121 hectares)",
        location: "Between Boyup Brook and Bridgetown",
        features: [
          "Long private frontage to Blackwood River",
          "Deep pools and meandering sandy river-bed",
          "Rock pools and outcrops",
          "Mature Redgum and Jarrah trees",
          "Private walking trails",
          "One small dam with potential for more",
          "Power lines through property",
          "Tested construction sand",
          "Lichen covered granite boulders",
          "Fields of heath plants",
          "Spring orchids",
          "Regular kangaroo presence"
        ],
        amenities: [
          "Existing shed",
          "Fire breaks",
          "Contour banks for water catchment",
          "Potential for cabins along river",
          "Space for golf course or landing strip",
          "Helipad potential",
          "Landscaping supplies potential",
          "Sheepoo stadium (mowed field)",
          "Blackwood Marathon horse trail access"
        ],
        activities: [
          "Canoeing",
          "Walking",
          "Shooting",
          "Trail Motorbikes",
          "Golf",
          "Hockey",
          "Fishing",
          "Swimming",
          "Wildflower hunting",
          "Mushrooming",
          "Campfires",
          "Wood gathering",
          "Camping",
          "4WD driving",
          "Astronomy",
          "Bee keeping",
          "Bird watching"
        ],
        currentUse: {
          status: "Currently rented",
          tenant: "Crossbreed sheep farming",
          rental: "Paid yearly in advance",
          maintenance: "Regular fertilization and fire breaks"
        }
      }
    },
    {
      src: heroImages.img_river1,
      title: "River Estate",
      description: "Luxurious river side living",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "River Bend",
        features: ["River views", "Alluvial soil", "Natural habitat"],
        amenities: ["Modern home", "Water supply", "River access"]
      }
    },
    {
      src: heroImages.img_river2,
      title: "River View",
      description: "Stunning river views from every angle",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "River Heights",
        features: ["River frontage", "Natural bush", "Wildlife"],
        amenities: ["Water rights", "Access road", "Storage"]
      }
    },
    {
      src: heroImages.img_river3,
      title: "River Paradise",
      description: "Your own piece of river paradise",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "River Paradise",
        features: ["River frontage", "Natural beauty", "Wildlife"],
        amenities: ["Luxury home", "Water rights", "Boat access"]
      }
    },
    {
      src: heroImages.img_river4,
      title: "River Haven",
      description: "Tranquil river side retreat",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "River Haven",
        features: ["River views", "Natural bush", "Wildlife"],
        amenities: ["Modern home", "Water supply", "River access"]
      }
    }
  ],
  outdoors: [
    {
      src: heroImages.img_family,
      title: "Family Memories & Outdoor Fun",
      description: "Unforgettable family activities: canoeing, camping, sports, bonfires, fishing, and more.",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Farm Valley",
        features: [
          "Canoeing & swimming",
          "Fishing & wildflower hunting",
          "Camping & bonfires",
          "Moonlit walks & astronomy",
          "Trail motorbikes & 4WD",
          "Golf, hockey, lamb saving, bee hives",
          "Bird watching, satellite spotting",
          "Annual Blackwood Marathon, family parades"
        ],
        amenities: [
          "Campfire areas",
          "Walking & driving trails",
          "Open fields for sports",
          "Picnic & camping spots",
          "Sheepoo stadium (mowed field)",
          "Space for family gatherings"
        ],
        activities: [
          "Canoeing",
          "Walking",
          "Trail Motorbikes",
          "Golf",
          "Hockey",
          "Fishing",
          "Swimming",
          "Wildflower hunting",
          "Mushrooming",
          "Campfires",
          "Camping",
          "4WD driving",
          "Astronomy",
          "Bee keeping",
          "Bird watching",
          "Family parades"
        ],
        currentUse: {
          status: "Family retreat & outdoor fun",
          tenant: "Owner & guests",
          rental: "N/A",
          maintenance: "Regularly maintained for family activities"
        }
      }
    },
    {
      src: heroImages.img_family2,
      title: "Family Sports & Adventure",
      description: "Golf, hockey, trail motorbikes, and more for the whole family.",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Farm Ridge",
        features: [
          "Golf course potential",
          "Hockey field (Sheepoo stadium)",
          "Trail motorbike tracks",
          "Open space for sports & games"
        ],
        amenities: [
          "Sports field",
          "Picnic areas",
          "Open grassland",
          "Family event space"
        ],
        activities: [
          "Golf",
          "Hockey",
          "Trail Motorbikes",
          "Family games",
          "Picnics"
        ],
        currentUse: {
          status: "Family sports & adventure",
          tenant: "Owner & guests",
          rental: "N/A",
          maintenance: "Maintained for sports & events"
        }
      }
    },
    {
      src: heroImages.img_family3,
      title: "Camping",
      description: "Experience camping with your loved ones.",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Farm Estate",
        features: [
          "Campfire sites",
          "Open camping grounds",
          "Moonlit walks",
          "Astronomy & stargazing"
        ],
        amenities: [
          "Fire pits",
          "Tent sites",
          "Open sky views",
          "Nature trails"
        ],
        activities: [
          "Camping",
          "Campfires",
          "Moonlit walks",
          "Astronomy",
          "Stargazing"
        ],
        currentUse: {
          status: "Family camping & relaxation",
          tenant: "Owner & guests",
          rental: "N/A",
          maintenance: "Maintained for camping & bonfires"
        }
      }
    },
    {
      src: heroImages.img_family3,
      title: "Nature Exploration & Wildlife",
      description: "Discover wildflowers, bird watching, and the beauty of nature.",
      details: {
        price: "Private sale",
        size: "301 acres",
        location: "Farm Haven",
        features: [
          "Wildflower hunting",
          "Bird watching",
          "Nature walks",
          "Kangaroo & wildlife spotting"
        ],
        amenities: [
          "Nature trails",
          "Wildlife observation spots",
          "Open fields",
          "Picnic areas"
        ],
        activities: [
          "Wildflower hunting",
          "Bird watching",
          "Nature walks",
          "Kangaroo spotting",
          "Picnics"
        ],
        currentUse: {
          status: "Nature exploration & wildlife",
          tenant: "Owner & guests",
          rental: "N/A",
          maintenance: "Maintained for nature & wildlife"
        }
      }
    }
  ]
};

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeGroup, setActiveGroup] = useState<'hills' | 'rivers' | 'outdoors'>('hills');
  const [showReasons, setShowReasons] = useState(false);

  return (
    <section
      className="relative flex min-h-screen justify-center items-center overflow-hidden"
      aria-label="Explore Boyup Brook Acreage"
      id="home"
    >
      {/* Main Content - All info in one blur box, responsive */}
      <div className="flex w-full justify-center xl:justify-start items-center xl:items-start z-10 select-none px-0 xl:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`
            w-full xl:w-auto
            max-w-full md:max-w-2xl lg:max-w-3xl
            bg-transparent md:bg-black/10
            backdrop-blur-0 md:backdrop-blur-sm
            rounded-2xl
            shadow-none md:shadow-2xl
            border-none md:border border-white/10
            px-4 sm:px-8
            py-8 sm:py-10
            flex flex-col
            gap-4 sm:gap-6 md:gap-8
            mx-2 ms:mx-8 xl:mx-0
          `}
        >
          <span className="text-emerald-200 text-xs sm:text-base font-semibold tracking-wide uppercase mb-1 sm:mb-2 text-center xl:text-left">Boyup Brook Acreage</span>
          <h1 className="text-white text-4xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-center xl:text-left">
            Explore <br />
            <span className="text-emerald-200">Boyup Brook Acreage</span> <br />
            For Sale
          </h1>
          <div className="flex flex-col xl:items-start items-center gap-3 sm:gap-6 mt-2 w-full justify-center sm:justify-start">
            <a href="tel:0457230191" className="flex items-center gap-2 text-white font-medium hover:text-emerald-200 transition-colors text-base sm:text-lg justify-center sm:justify-start">
              <i className="fas fa-phone text-emerald-300"></i>
              0457 230 191
            </a>
            {/* <div className="flex items-center gap-4 text-lg sm:text-xl text-white justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                  className="hover:text-emerald-200 transition-colors"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div> */}
            <a href="mailto:eaglescreensjr@gmail.com" className="flex items-center gap-2 text-white font-medium hover:text-emerald-200 transition-colors text-base sm:text-lg justify-center sm:justify-start">
              <i className="fas fa-envelope text-emerald-300"></i>
              eaglescreensjr@gmail.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Group Navigation */}
      {/* <div className="absolute top-24  xl:top-4 left-1/2 -translate-x-1/2 z-10 md:z-50 flex gap-4">
        {Object.keys(propertyGroups).map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group as 'hills' | 'rivers' | 'outdoors')}
            className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
              activeGroup === group 
                ? 'bg-emerald-600 shadow-lg scale-105' 
                : 'bg-black/10 hover:bg-black/20'
            }`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div> */}

      {/* Content Overlay */}
      <div className="absolute inset-0 -z-1">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          grabCursor={true}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          loop={true}
          className="h-full w-full"
        >
          {propertyGroups[activeGroup as keyof typeof propertyGroups].map((property: {
            src: string;
            title: string;
            description: string;
            details: {
              price: string;
              size: string;
              location: string;
              features: string[];
              amenities: string[];
            };
          }, index: number) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
                  className="absolute inset-0 bg-black/10 z-10"
                />
                <img 
                  src={property.src} 
                  alt={property.title}
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-30 text-white">
                  <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl hidden md:block md:text-5xl font-bold mb-4 drop-shadow-lg"
                  >
                    {property.title}
                  </motion.h2>
                  <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className=" hidden md:block text-lg md:text-xl text-gray-200 drop-shadow-lg mb-6"
                  >
                    {property.description}
                  </motion.p>
                  <div className="flex justify-center md:justify-start mb-12 md:mb-0">
        <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      onClick={() => setSelectedProperty(property)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full transition-colors duration-300 "
                  >
                    View Details
        </motion.button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination !bottom-8"></div>
        </Swiper>
      </div>

      {/* Info Card - Expandable */}
      <motion.aside 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden xl:block absolute right-8 xl:right-40 bottom-12 sm:bottom-24 z-10"
      >
        <div className="flex bg-black/40 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden w-[300px] sm:w-[400px] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10 cursor-pointer"
          onClick={() => setShowReasons(!showReasons)}
        >
          <img src={img1} alt="Boyup Brook lifestyle" className="w-32 sm:w-40 object-cover" />
          <div className="p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-base sm:text-lg font-semibold">5 Reasons to Live in Boyup Brook</h2>
              <p className="text-emerald-200 text-sm mt-2">Discover the perfect lifestyle</p>
            </div>
            <span className="text-emerald-200 mt-2 sm:mt-4 flex items-center gap-1 font-medium hover:underline group cursor-pointer">
              Read more 
              <span className="transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
        {/* Expandable content */}
        {showReasons && (
          <div className="mt-2 bg-black/80 text-white rounded-lg p-4 w-full shadow-xl animate-fade-in">
            <ul className="list-disc pl-5 space-y-2">
              <li>Peaceful rural lifestyle, close to nature</li>
              <li>Friendly and welcoming community</li>
              <li>Beautiful landscapes and fresh air</li>
              <li>Affordable acreage and property options</li>
              <li>Great for families, retirees, and investors</li>
            </ul>
          </div>
        )}
      </motion.aside>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedProperty.src} 
                alt={selectedProperty.title}
                className="w-full h-[400px] object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <i className="fas fa-times text-gray-800"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h2>
                  <p className="text-gray-600 text-lg">{selectedProperty.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a 
                    href="tel:+61412345678"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2"
                  >
                    <i className="fas fa-phone"></i>
                    Contact Agent
                  </a>
                </div>
              </div>

              {selectedProperty.details && (
                <div className="space-y-8">
                  {/* Property Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
                    {selectedProperty.details.price && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-tag text-emerald-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-lg font-semibold text-gray-900">{selectedProperty.details.price}</p>
                        </div>
                      </div>
                    )}
                    {selectedProperty.details.size && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-ruler-combined text-emerald-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Size</p>
                          <p className="text-lg font-semibold text-gray-900">{selectedProperty.details.size}</p>
                        </div>
                      </div>
                    )}
                    {selectedProperty.details.location && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-map-marker-alt text-emerald-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-lg font-semibold text-gray-900">{selectedProperty.details.location}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features & Amenities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedProperty.details.features && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <i className="fas fa-star text-emerald-600"></i>
                          Key Features
                        </h3>
                        <ul className="space-y-3">
                          {selectedProperty.details.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                              <i className="fas fa-check text-emerald-600 mt-1"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProperty.details.amenities && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <i className="fas fa-home text-emerald-600"></i>
                          Amenities
                        </h3>
                        <ul className="space-y-3">
                          {selectedProperty.details.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                              <i className="fas fa-check text-emerald-600 mt-1"></i>
                              <span>{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Activities */}
                  {selectedProperty.details.activities && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-hiking text-emerald-600"></i>
                        Available Activities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedProperty.details.activities.map((activity, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-emerald-50 transition-colors">
                            <i className="fas fa-check-circle text-emerald-600"></i>
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Use */}
                  {selectedProperty.details.currentUse && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-info-circle text-emerald-600"></i>
                        Current Status
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-lg font-medium text-gray-900">{selectedProperty.details.currentUse.status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tenant</p>
                            <p className="text-lg font-medium text-gray-900">{selectedProperty.details.currentUse.tenant}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Rental</p>
                            <p className="text-lg font-medium text-gray-900">{selectedProperty.details.currentUse.rental}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Maintenance</p>
                            <p className="text-lg font-medium text-gray-900">{selectedProperty.details.currentUse.maintenance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}