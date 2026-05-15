import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MainForm from './components/MainForm';
import Table from './MainPage/Table';
import Footer from './components/Footer';
import InfoBlock from './MainPage/Infoblock';
import LinksBlock from './MainPage/LinksBlock';
import SearchResult from './SearchPage/SearchResult';
import PropertyDetail from './PropertyPage/PropertyDetail';
import AdminPage from './AdminPage/AdminPage';
import ProfilePage from './ProfilePage/ProfilePage';
import { LanguageProvider } from './components/LanguageContext';
import Analytic from './AnalyticsPage/Analytic';
import BuyPage from './BuyPage/page';
import RentPage from './RentPage/page';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App relative">
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <MainForm />
                <Table />
                <InfoBlock />
                <LinksBlock />
                <Footer />
              </>
            } />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/search" element={<SearchResult isMapView={false} />} />
            <Route path="/map" element={<SearchResult isMapView={true} />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/analytics" element={<Analytic />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;