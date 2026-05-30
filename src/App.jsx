import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MainForm from './components/MainForm';
import Table from './MainPage/Table';
import InfoBlock from './MainPage/Infoblock';
import LinksBlock from './MainPage/LinksBlock';
import SearchResult from './SearchPage/SearchResult';
import PropertyDetail from './PropertyPage/PropertyDetail';
import AdminPage from './AdminPage/AdminPage';
import ProfilePage from './ProfilePage/ProfilePage';
import { LanguageProvider } from './components/LanguageContext';
import BuyPage from './BuyPage/page';
import RentPage from './RentPage/page';
import AddProperty from './AddProperty/page';
import CategoryPage from './CategoryPage/CategoryPage';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        {/* Модальное окно доступно всегда */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

        <Routes>
          <Route path="/select-category" element={<CategoryPage />} />

          {/* Передаем setIsAuthOpen в каждый PageWithNav */}
          <Route path="/" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><MainForm /><Table /><InfoBlock /><LinksBlock /></PageWithNav>} />
          <Route path="/buy" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><BuyPage /></PageWithNav>} />
          <Route path="/rent" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><RentPage /></PageWithNav>} />
          <Route path="/search" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><SearchResult isMapView={false} /></PageWithNav>} />
          <Route path="/map" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><SearchResult isMapView={true} /></PageWithNav>} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/profile" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><ProfilePage /></PageWithNav>} />
          <Route path="/add-property" element={<PageWithNav setIsAuthOpen={setIsAuthOpen}><AddProperty /></PageWithNav>} />

          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

// Теперь компонент PageWithNav корректно принимает и передает функцию дальше
const PageWithNav = ({ children, setIsAuthOpen }) => (
  <div className="flex flex-col min-h-screen pb-[70px] md:pb-0">
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
    <BottomNav setIsAuthOpen={setIsAuthOpen} />
  </div>
);

export default App;