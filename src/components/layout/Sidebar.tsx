"use client";

import { Sidebar } from "flowbite-react";
import { HiOutlineUsers, HiCash } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export function LayoutSidebar() {
    return (
        <Sidebar aria-label="Sidebar" className="hidden md:block shadow-md bg-white separator border-r">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item>
                        <NavLink className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/employees">
                            <HiOutlineUsers className="w-6 h-6" />
                            Employees</NavLink>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item labelColor="dark">
                        <NavLink className="text-lg gap-2 w-100 flex items-center hover:text-primary" to="/salaries">
                            <HiCash  className="w-6 h-6"/>
                            Salaries</NavLink>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}