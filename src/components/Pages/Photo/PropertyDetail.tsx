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
      name: "John",
      phone: "0457 234 191",
      image: heroImages.ava
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        
        <div className='flex flex-col gap-4'>
          <span className="text-5xl font-bold text-emerald-900 mb-6"> $ {propertyData.price}</span>

          <h1 className="text-3xl font-bold mb-4 text-emerald-900">{propertyData.title}</h1>
          <div className="flex gap-4 flex-col justify-center w-fit">
            <div className='flex gap-4 items-center '>
            <div className="flex w-fit items-center bg-green-50 text-green-700 px-4 py-2 rounded-md">
              <FaRuler className="mr-2" />
              <span>{propertyData.landSize}</span>
            </div>
            <a href="tel:+0457234191" className="text-emerald-900 w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
              <FaShare className="mr-2" />
              Contact Agent
            </a>
            </div>
           
            <div className='flex items-center w-fit bg-green-50 text-green-700 px-4 py-2 rounded-md'>
              <FaMapMarker className="mr-2" />
              <span>{propertyData.location}</span>
            </div>
            
          </div>
        </div>
        
      </div>

      <div className='flex flex-row lg:grid lg:grid-cols-4 gap-4'>
        
        
        <div className="mb-8 col-span-3 flex flex-col gap-4">
          <div className='flex flex-col gap-4'>
            <h2 className="text-2xl font-bold text-emerald-900">Property Description</h2>
            <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
          </div>
          
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='overflow-hidden rounded-xl'>
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37475.87069984924!2d116.22987497522304!3d-33.87856870202322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a305b123a0e45ad%3A0x61012c786b9d5398!2sBridgetown-Boyup%20Brook%20Rd%2C%20Western%20Australia%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1748885861406!5m2!1svi!2s" width="100%" height="400" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold text-emerald-900">Property Features</h2>
                <p className="text-gray-700 leading-relaxed">
                  <ul>
                    <li>3 Bedroom</li>
                    <li>2 Bathroom</li>
                    <li>1 Car</li>  
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white col-span-1 rounded-lg shadow-md p-6 mb-8 w-full">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center flex-col gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={propertyData.agent.image}
                  alt={propertyData.agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-emerald-900">{propertyData.agent.name}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 w-full">
                Get in touch
              </button>

              <a href="mailto:eaglescreensjr@gmail.com" className="text-emerald-900 w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                Email: eaglescreensjr@gmail.com
              </a>
              <a href="tel:+0457234191" className="text-emerald-900 w-full flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                Phone: 0457 234 191
              </a>
            </div>
          </div>
        </div>

      </div>


     
    </div>
  );
}; 

export default PropertyDetail;