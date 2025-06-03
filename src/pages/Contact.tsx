import { Footer, ScrollToTop } from "../components";
import Title from "../components/Common/Title";
import ContactSection from "../components/Pages/Contact/ContactSection";

const Contact = () => {
  return <section className='min-h-screen bg-white'>
 
  <div className='max-w-7xl mx-auto py-20 px-4 md:px-8'>
    <Title 
      mainTitle="Contact Us for Full Property Details" 
      subtitle="Request full property details now"
      className='text-emerald-900'
    />
    <ContactSection />
  </div>
  <ScrollToTop />
  <Footer />
</section>
};

export default Contact;