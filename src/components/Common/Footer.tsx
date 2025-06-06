import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', text: 'Boyup Brook, Western Australia' },
    { icon: 'fas fa-phone', text: '0457 230 191' },
    { icon: 'fas fa-envelope', text: 'eaglescreensjr@gmail.com' }
  ]
  return (
    <footer className="bg-emerald-800 text-white pt-16 pb-8 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col justify-between md:flex-row gap-8 mb-12 w-full">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='w-full max-w-md'>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Boyup Brook / Bridgetown</h3>
              <p className=" block text-gray-300 mb-4">
              Riverlane property, full details, gallery, and contact.
            </p>
            <p className='text-gray-300 mb-4'>
              Discover the perfect blend of rural tranquility and modern convenience in Boyup Brook.
            </p>
          </div>
          </motion.div>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-h3 font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300">
                  <i className={`${info.icon} text-emerald-400`}></i>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex justify-center items-center'
        >
          <p className='text-gray-300'>
            &copy; {currentYear} Boyup Brook. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer; 