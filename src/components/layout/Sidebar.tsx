"use client";

import { Sidebar } from "flowbite-react";
import { HiOutlineUsers, HiCash } from "react-icons/hi";
import { Link } from "react-router-dom";

export function LayoutSidebar() {
    return (
        <Sidebar aria-label="Sidebar" className="hidden md:block shadow-md bg-white separator border-r">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiOutlineUsers}>
                        <Link className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/employees">
                            Employees</Link>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiCash} labelColor="dark">
                        <Link className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/salaries">
                            Salaries</Link>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}