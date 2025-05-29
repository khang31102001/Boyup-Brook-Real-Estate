import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import {
  Header,
  Summary,
  Home,
  Description,
  // Discover,
  Video,
  Footer,
  ScrollToTop,
  ContactSection,
  // ImgGallery,
  NotFound,
} from './components';


const MainPage = () => (
  <>
    <Header />
    <main className="main">
      <Home />
       <Description />
      
       {/* <ImgGallery /> */}
       <Video />
      <ContactSection />
  
      {/* <Discover /> */}
     
      <Summary />
     
    </main>
    <Footer />
    <ScrollToTop />
  </>
);

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen w-full max-w-[2050px] mx-auto">
          <Helmet>
            <title>Boyup Brook Acreage for sale</title>
            <meta
              name="description"
              content="Acreage for sale in Boyup Brook. Riverlane property, full details, gallery, and contact."
            />
          </Helmet>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
