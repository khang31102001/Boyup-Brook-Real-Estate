import { Footer } from "../components";
import { motion } from "framer-motion";
import { FaTree, FaWater, FaRoad, FaSun } from "react-icons/fa";
import { useState } from "react";
import { propertyImages } from "../constants/images";

const Summary = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: FaTree,
      title: "Natural Beauty",
      description: "Pristine land with native vegetation"
    },
    {
      icon: FaWater,
      title: "Water Resources",
      description: "Natural dam & year-round soak"
    },
    {
      icon: FaRoad,
      title: "Easy Access",
      description: "Sealed road frontage"
    },
    {
      icon: FaSun,
      title: "Perfect Climate",
      description: "Ideal for year-round activities"
    }
  ];

  const images = [
    propertyImages.aerial,
    propertyImages.landscape,
    propertyImages.entrance,
    propertyImages.farm
  ];

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-b from-white to-emerald-50"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-emerald-800">
        <div className="absolute inset-0">
          <img 
            src={propertyImages.aerial} 
            alt="Property aerial view"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 to-emerald-800/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              121 Hectares of Prime Rural Land
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl leading-relaxed">
              A rare opportunity to own a magnificent piece of Western Australia's countryside, 
              just 25 minutes from Bridgetown.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-6">Property Overview</h2>
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  This exceptional 121-hectare property presents a rare opportunity in Western Australia's 
                  sought-after South West region. With its pristine natural setting and strategic location, 
                  it offers the perfect balance of rural tranquility and accessibility.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  The gently undulating terrain provides excellent natural drainage and multiple potential 
                  building sites. Natural water sources, including a dam and soak, ensure reliable water 
                  supply throughout the year.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-600">Total Area</span>
                <span className="font-semibold text-emerald-900">121 Hectares</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold text-emerald-900">25 mins to Bridgetown</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-600">Road Access</span>
                <span className="font-semibold text-emerald-900">Sealed Road Frontage</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Water Sources</span>
                <span className="font-semibold text-emerald-900">Dam & Natural Soak</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-900">{feature.title}</h3>
                    <p className="text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-emerald-900 mb-8">Property Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-block bg-emerald-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300"
          >
            Contact for Inspection
          </a>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full">
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </motion.section>
  );
};

export default Summary;