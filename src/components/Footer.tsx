import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Discover', href: '#discover' },
    { name: 'Places', href: '#places' },
    { name: 'Video', href: '#video' }
  ];

  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', text: 'Boyup Brook, Western Australia' },
    { icon: 'fas fa-phone', text: '0457 230 191' },
    { icon: 'fas fa-envelope', text: 'eaglescreensjr@gmail.com' }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=100088916504867' },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/boyupbrook/' },
    { icon: 'fab fa-twitter', href: 'https://twitter.com/boyupbrook' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/boyup-brook' }
  ];

  return (
    <footer className="bg-emerald-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-h2 font-bold mb-4">Boyup Brook</h3>
            <p className="text-gray-300 mb-4">
              Discover the perfect blend of rural tranquility and modern convenience in Boyup Brook.
            </p>
            {/* <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-emerald-700 transition-colors"
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h3 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <a
                  className="cursor-pointer"
                  onClick={() => {
                    const targetSection = document.getElementById(link.href.substring(1));
                    if (targetSection) {
                      targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  >{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-h3 font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300">
                  <i className={`${info.icon} text-emerald-400`}></i>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-h3 font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-emerald-400 rounded bg-emerald-900 text-white placeholder-white
                focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-emerald-400 text-emerald-900 font-semibold rounded hover:bg-emerald-300 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-800 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Boyup Brook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 