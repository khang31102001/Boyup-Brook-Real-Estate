import { FaShare, FaRuler, FaMapMarker } from 'react-icons/fa';
import { heroImages } from '../../../constants/images';
import { Link } from 'react-router-dom';


const PropertyDetail = () => {
  const propertyData = {
    title: "121 Hectares approx - Your Opportunity to own a Prime Rural Lifestyle Property near Boyup Brook and Bridgetown, WA",
    location: "Boyup Brook / Bridgetown, Western Australia",
    price: "$780,000 - $840,000",
    landSize: "121 hectares approx",
    description: "This property is a rare opportunity to own a large, prime rural property in the heart of Western Australia's beautiful South West region. Located just 25 kilometres east of Bridgetown, this property offers a unique blend of natural beauty, historical significance, and potential for a wide range of agricultural and lifestyle pursuits.",
    agent: {
      name: "John",
      phone: "0457 234 191",
      image: heroImages.john
    }
  };

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
              <div className='overflow-hidden rounded-xl'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37475.87069984924!2d116.22987497522304!3d-33.87856870202322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a305b123a0e45ad%3A0x61012c786b9d5398!2sBridgetown-Boyup%20Brook%20Rd%2C%20Western%20Australia%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1748885861406!5m2!1svi!2s" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='map' ></iframe>
              </div>
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