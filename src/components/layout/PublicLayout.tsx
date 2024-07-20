import LayoutNavbar from './Navbar';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
    return (
        <div className="Layout">
            <LayoutNavbar />
            <main><Outlet /></main>
        </div>
    );
}

export default PublicLayout;