import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { heroImages } from '../../../constants/images';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validation
    if (!form.name.trim()) {
      showPopup('error', 'Please enter your name');
      return;
    }
    
    if (!form.email.trim()) {
      showPopup('error', 'Please enter your email');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showPopup('error', 'Please enter a valid email address');
      return;
    }
    
    if (!form.message.trim()) {
      showPopup('error', 'Please enter your message');
      return;
    }

    const currentTime = new Date().toLocaleString();

    setLoading(true)
    emailjs.send(
      'service_k52q99s',
      'template_5g34lzb',
      {
        from_name: form.name,
        from_email: form.email,
        to_name: 'Admin',
        to_email: 'leminhkhang.ms@gmail.com',
        message: form.message,
        time: currentTime,
        images: [
          {
            url: 'https://i.imgur.com/QZxUyPk.jpg',
            title: 'River Front Area'
          },
          {
            url: 'https://i.imgur.com/nZXbSbh.jpg',
            title: 'Hill Views Area'
          },
          {
            url: 'https://i.imgur.com/QZxUyPk.jpg',
            title: 'Farm Area'
          }
        ]
      },
      'a3Wq8WGDg50mE54Tg'
    )
    .then((_result) => {
      setLoading(false)
      showPopup('success', 'Your message has been sent successfully');
      setForm({
        name: '',
        email: '',
        message: ''
      })
    })
    .catch((_error) => {
      setLoading(false)
      showPopup('error', 'Failed to send message. Please try again.');
    })
  }

  const showPopup = (type: 'success' | 'error', message: string) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl z-50 animate-fade-in';
    
    const icon = type === 'success' 
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
    
    const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
    const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';
    const buttonColor = type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700';
    
    popup.innerHTML = `
      <div class="text-center min-w-[300px]">
        <div class="w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icon}
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">${type === 'success' ? 'Success!' : 'Error'}</h3>
        <p class="text-gray-600 mb-6">${message}</p>
        <button class="px-6 py-3 ${buttonColor} text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg" onclick="this.parentElement.parentElement.remove(); document.querySelector('.fixed.inset-0').remove()">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add('animate-fade-out');
      overlay.classList.add('animate-fade-out');
      setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 300);
    }, 2700);
  }

  return (
    <motion.section 
      id="contact" 
      className="w-full  py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left Column - Contact Info */}
          <div className="bg-emerald-700 rounded-2xl p-8 text-white">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-emerald-100 shadow flex-shrink-0"
            >
              <img src={heroImages.john} className="w-full h-full object-cover" alt="Agent" />
            </motion.div>
            <div className="">
              {/* Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 mt-8 mx-auto"
              >
                <div className="flex items-center space-x-4 p-4 bg-emerald-600/50 rounded-xl">
                  <div className="bg-emerald-600 p-3 rounded-full">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">John Smith</h3>
                    <p className="text-emerald-200">Property Owner</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-emerald-600/50 rounded-xl">
                  <div className="bg-emerald-600 p-3 rounded-full">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-emerald-200">+61 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-emerald-600/50 rounded-xl">
                  <div className="bg-emerald-600 p-3 rounded-full">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-emerald-200">contact@boyupbrook.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-emerald-600/50 rounded-xl">
                  <div className="bg-emerald-600 p-3 rounded-full">
                    <FaMapMarkerAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-emerald-200">Boyup Brook, Western Australia</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Owner a Message</h3>
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:text-emerald-900"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:text-emerald-900"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:text-emerald-900"
                  placeholder="Your message"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-lg transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Large Map Section */}
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
    </motion.section>
  );
}