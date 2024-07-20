import LayoutNavbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { LayoutSidebar } from './Sidebar';
function PrivateLayout() {
    return (
        <div className="Layout">
            <LayoutNavbar />
            <main className='flex h-screen'>
                <LayoutSidebar />
                <div className="container mx-auto my-3">
                <Outlet />
                </div>
            </main>
        </div>
    );
}

export default PrivateLayout;