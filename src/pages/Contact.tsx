import { Footer, ScrollToTop } from "../components";
import Title from "../components/Common/Title";
import ContactSection from "../components/Pages/Contact/ContactSection";

const Contact = () => {
  return <section className='min-h-screen bg-white'>
 
  <div className='max-w-7xl mx-auto py-16 md:py-20 xl:pt-40 xl:pb-20 px-4 md:px-8'>
    <Title 
      mainTitle="Contact Owner" 
      subtitle="Leave your email and we'll send you detailed information about the Boyup Brook acreage, including pricing, features, and upcoming viewings."
      className='text-emerald-900'
    />
    <ContactSection />
  </div>
  <ScrollToTop />
  <Footer />
</section>
};

export default Contact;