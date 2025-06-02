import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img_plan from '../../../public/img/PlanView.jpg'
import img_land from '../../../public/img/LandgateAerial.jpg'

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
      className="w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-cyan-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get More Information About This Property
            </motion.h2>
            <motion.p 
              className="text-gray-700 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Leave your email and we'll send you detailed information about the Boyup Brook acreage, including pricing, features, and upcoming viewings.
            </motion.p>
            <motion.form 
              className="flex flex-col gap-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <input 
                type="text" 
                name="name" 
                placeholder="Your name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full flex-1 px-6 py-4 rounded-lg border border-gray-300 bg-white text-cyan-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-900"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={handleChange}
                className="w-full flex-1 px-6 py-4 rounded-lg border border-gray-300 bg-white text-cyan-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-900"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full flex-1 px-6 py-4 rounded-lg border border-gray-300 bg-white text-cyan-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-900"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-800 text-white font-semibold rounded-lg transition-colors hover:bg-emerald-900 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
              >
                {loading ? 'Sending...' : 'Request Info'}
              </motion.button>
            </motion.form>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 h-[600px] rounded-lg overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-emerald-600 !opacity-50',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-emerald-600 !opacity-100'
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="h-full"
            >
              <SwiperSlide>
                <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                  <img 
                    src={img_plan} 
                    alt="Property Plan View" 
                    className="max-w-full max-h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-lg font-semibold">Property Plan View</h3>
                    <p className="text-sm">Detailed layout of the 301-acre property</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                  <img 
                    src={img_land} 
                    alt="Aerial View" 
                    className="max-w-full max-h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-lg font-semibold">Aerial View</h3>
                    <p className="text-sm">Landgate aerial perspective of the property</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <iframe
                  title="Boyup Brook Location"
                  src="https://www.google.com/maps?q=Boyup+Brook+WA,+Australia&hl=en&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </SwiperSlide>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev !w-12 !h-12 !bg-white/80 hover:!bg-white !rounded-full !shadow-lg after:!text-emerald-600 after:!text-2xl"></div>
              <div className="swiper-button-next !w-12 !h-12 !bg-white/80 hover:!bg-white !rounded-full !shadow-lg after:!text-emerald-600 after:!text-2xl"></div>
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}