import { FaShare, FaRuler, FaMapMarker } from 'react-icons/fa';
import { heroImages } from '../../../constants/images';

 const PropertyDetail = () => {
  const propertyData = {
    title: "121 Hectares approx - Your Opportunity to oen Prime Rural Property near Boyup Brook, WA",
    location: "Boyup Brook / Bridgetown, Western Australia",
    price: "Private Sale",
    landSize: "121 hectares approx",
    description: "This property is a rare opportunity to own a large, prime rural property in the heart of Western Australia's beautiful South West region. Located just 25 kilometres east of Bridgetown, this property offers a unique blend of natural beauty, historical significance, and potential for a wide range of agricultural and lifestyle pursuits.",
    agent: {
      name: "Sunny_pnhn",
      phone: "0457 234 191",
      image: heroImages.ava
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        
        <div className='flex flex-col gap-4'>
        <span className="text-5xl font-bold text-emerald-900"> $ {propertyData.price}</span>

          <h1 className="text-3xl font-bold mb-4 text-emerald-900">{propertyData.title}</h1>
          <div className="flex gap-4 flex-col justify-center w-fit">
            <div className='flex gap-4 items-center '>
            <div className="flex w-fit items-center bg-green-50 text-green-700 px-4 py-2 rounded-md">
              <FaRuler className="mr-2" />
              <span>{propertyData.landSize}</span>
            </div>
            <button className="text-emerald-900 w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
              <FaShare className="mr-2" />
              Contact Agent
            </button>
            </div>
           
            <div className='flex items-center w-fit bg-green-50 text-green-700 px-4 py-2 rounded-md'>
              <FaMapMarker className="mr-2" />
              <span>{propertyData.location}</span>
            </div>
            
          </div>
        </div>
        
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={propertyData.agent.image}
                alt={propertyData.agent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold">{propertyData.agent.name}</div>
            
              <div className="text-gray-600">{propertyData.agent.phone}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 w-full md:w-48">
              Get in touch
            </button>
            <button className="border text-emerald-900 border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 w-full md:w-48">
              Save property
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Property Description</h2>
        <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your travel time</h2>
        {/* Add travel time component here */}
      </div>
    </div>
  );
}; 

export default PropertyDetail;