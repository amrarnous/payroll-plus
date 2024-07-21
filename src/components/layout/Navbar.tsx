"use client";
import { HiOutlineUsers, HiCash } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { Button, Navbar, Dropdown } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";
import { HiInformationCircle } from "react-icons/hi";

function LayoutNavbar(e: any) {
    const user: any = useAuth();
    const userInfo = JSON.parse(localStorage.getItem('user')!);
    const logout = (e: any) => {
        e.preventDefault();
        user.logout();
    }
    return (
        <Navbar fluid rounded className="py-4 border-b">
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-primary text-2xl font-bold uppercase">Payroll Plus</span>
            </Navbar.Brand>
            {user.isLoggedIn && (
                <>
                    <div className="flex md:order-1">
                        <Dropdown color='gray' label={`Welcome ${userInfo.name}`} dismissOnClick={false}>
                            <Dropdown.Item>
                                <Link className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/employees">
                                    <HiOutlineUsers />
                                    Employees</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/salaries">
                                    <HiCash />
                                    Salaries</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button color="failure" onClick={logout}>Logout</Button>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    
                </>
            )}
        </Navbar>
    );
}






export default LayoutNavbar;