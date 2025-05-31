import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { MainPage, NotFound, Description, Photo, Contact, Summary } from './pages';
import { Layout, Loading } from './components';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsLoading(false);
        // Scroll to top smoothly after loading
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
  }, [progress]);

  return (
    <AnimatePresence mode="sync">
      {isLoading ? (
        <Loading progress={progress} key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HelmetProvider>
            <Router>
              <div className="min-h-screen w-full max-w-[2050px] mx-auto relative">
                <Helmet>
                  <title>Boyup Brook Acreage for sale</title>
                  <meta
                    name="description"
                    content="Acreage for sale in Boyup Brook. Riverlane property, full details, gallery, and contact."
                  />
                </Helmet>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/description" element={<Description />} />
                    <Route path="/photo" element={<Photo />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </HelmetProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
