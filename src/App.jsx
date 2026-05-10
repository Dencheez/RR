import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Header from './MainPage/header';
import Banner from './MainPage/banner';
import SpecialOffers from './MainPage/SpecialOffers';
import HotDeals from './MainPage/HotDeals';
import PropertyTypes from './MainPage/PropertyTypes';
import Footer from './MainPage/Footer';
import AIBot from './AI-Bot/AIBot';
import SearchResult from './SearchPage/SearchResult';
import PropertyDetail from './PropertyPage/PropertyDetail';
import AdminPage from './AdminPage/AdminPage';
import ProfilePage from './ProfilePage/ProfilePage';
import { LanguageProvider } from './components/LanguageContext';
import Analytic from './AnalyticsPage/Analytic';
import './index.css';
import './Style/animation.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Главная страница */}
        <Route path="/" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Header />
            <Banner />
            <SpecialOffers />
            <HotDeals />
            <PropertyTypes />
            <Footer />
          </motion.div>
        } />

        {/* Страница поиска */}
        <Route path="/search" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SearchResult isMapView={false} />
          </motion.div>
        } />

        {/* Страница карты */}
        <Route path="/map" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SearchResult isMapView={true} />
          </motion.div>
        } />

        {/* Страница недвижимости */}
        <Route path="/property/:id" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PropertyDetail />
          </motion.div>
        } />

        {/* Страница админа */}
        <Route path="/admin" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AdminPage />
          </motion.div>
        } />

        {/* Страница профиля */}
        <Route path="/profile" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProfilePage />
          </motion.div>
        } />

        {/* Страница аналитики */}
        <Route path="/analytics" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Analytic />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App relative transition-colors duration-300">
          <AnimatedRoutes />
          <AIBot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;