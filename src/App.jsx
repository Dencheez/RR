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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* 1. СТРАНИЦА КАТЕГОРИЙ: Удаляем первый пустой вариант и оставляем только правильный */}
          <Route path="/select-category" element={<CategoryPage />} />

          {/* 2. ВСЕ ОСТАЛЬНЫЕ СТРАНИЦЫ */}
          <Route path="/" element={<PageWithNav><MainForm /><Table /><InfoBlock /><LinksBlock /></PageWithNav>} />
          <Route path="/buy" element={<PageWithNav><BuyPage /></PageWithNav>} />
          <Route path="/rent" element={<PageWithNav><RentPage /></PageWithNav>} />
          <Route path="/search" element={<PageWithNav><SearchResult isMapView={false} /></PageWithNav>} />
          <Route path="/map" element={<PageWithNav><SearchResult isMapView={true} /></PageWithNav>} />
          <Route path="/property/:id" element={<PageWithNav><PropertyDetail /></PageWithNav>} />
          <Route path="/profile" element={<PageWithNav><ProfilePage /></PageWithNav>} />
          <Route path="/add-property" element={<PageWithNav><AddProperty /></PageWithNav>} />

          {/* 3. Страница без всего */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

// Вспомогательный компонент, чтобы не писать одно и то же 10 раз
const PageWithNav = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
    <BottomNav />
  </div>
);

export default App;