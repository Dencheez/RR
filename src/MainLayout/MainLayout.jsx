import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const MainLayout = () => (
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
            <Outlet /> {/* Здесь будут отрисовываться твои страницы */}
        </div>
        <BottomNav /> {/* Нижнее меню всегда здесь */}
    </div>
);

export default MainLayout;