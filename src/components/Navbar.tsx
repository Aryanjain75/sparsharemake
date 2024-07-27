'use client';

import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { CartContext } from "@/context/CartContext";
import { useRouter } from 'next/navigation';
import { UsernameContext } from '@/context/UserContext';
import axios from "axios";
import { DarkModeContext } from "@/context/darkModeContext";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Switch from "@mui/material/Switch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { username, setUsername, isAuth, isAdmin, signOut, loadUserData } = useContext(UsernameContext);
  const { dispatch } = useContext(DarkModeContext);

  const ref = useRef(null);
  const name = useRef(null);
  const menu = useRef(null);
  const button = useRef(null);

  console.log(isAdmin);

  const handleLoginClick = async () => {
    if (isAuth && username) {
      signOut();
      await axios.get("/api/logout");
      router.push("/");
    } else {
      console.log(username);
      if (username === "") {
        router.push("/Registration");
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(ref.current, {
      y: -100,
      duration: 1
    }).from(name.current, {
      y: -10,
      opacity: 0,
      duration: 0.2,
      ease: 'circ.in'
    }).from("span", {
      y: -30,
      stagger: 0.15,
      duration: 0.5,
      opacity: 0
    });
  });

  useEffect(() => { loadUserData(); }, []);

  return (
    <>
      <div className="w-full h-16 fixed flex justify-center text-white z-50 mt-2">
        <div ref={ref} className="flex justify-between items-center w-3/4 bg-black border-black border-2 rounded-full px-6">
          <div ref={name} className="text-3xl font-bold">Sparsha</div>
          <div ref={menu} id="menu" className="hidden lg:flex items-center space-x-8 text-lg font-medium">
            <span><Link id="l" href="/" className="hover:text-orange-400 transition ease-in-out duration-150">Home</Link></span>
            <span><Link id="l" href="/Menu" className="hover:text-orange-400 transition ease-in-out duration-150">Menu</Link></span>
            <span><Link id="l" href="/Photos" className="hover:text-orange-400 transition ease-in-out duration-150">Photos</Link></span>
            <span><Link id="l" href="/cart" className="hover:text-orange-400 transition ease-in-out duration-150">Cart({cart?.cartItems?.length || 0})</Link></span>
            <Menu setActive={setActive}>
              <span>
                <MenuItem setActive={setActive} active={active} item="Bookings">
                  <div className='flex flex-col gap-x-2.5'>
                    <HoveredLink href="/theater-booking">Private Theater Booking</HoveredLink>
                    <HoveredLink href="/restaurant">Restaurant</HoveredLink>
                    <HoveredLink href="/birthdayhallbooking">Birthday Hall Booking</HoveredLink>
                  </div>
                </MenuItem>
              </span>
            </Menu>
          </div>
          <div ref={button} className="hidden lg:flex items-center space-x-4">
            {isAuth && username && <Link href="/profile"><div className="block">{username}</div></Link>}
            {isAdmin && <Link href="/admin" className="hover:text-orange-400 transition ease-in-out duration-150">Dashboard</Link>}
            <button
              onClick={handleLoginClick}
              className="bg-white text-gray-900 py-2 px-6 rounded-full hover:bg-black hover:text-white delay-75 border-2 hover:border-white border-black transition ease-in-out duration-150"
            >
              {isAuth && username ? "Logout" : "Login/Register"}
            </button>
          </div>
          <button onClick={toggleMenu} className="block  lg:hidden text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="w-full h-screen fixed bg-gray-900 text-white z-40 flex flex-col items-center justify-center space-y-8">
          <Link href="/" className="text-xl" onClick={toggleMenu}>Home</Link>
          <Link href="/Menu" className="text-xl" onClick={toggleMenu}>Menu</Link>
          <Link href="/Photos" className="text-xl" onClick={toggleMenu}>Photos</Link>
          <Link href="/theater-booking" className="text-xl" onClick={toggleMenu}>Private Theater Booking</Link>
          <Link href="/restaurant" className="text-xl" onClick={toggleMenu}>Restaurant</Link>
          <Link href="/birthdayhallbooking" className="text-xl" onClick={toggleMenu}>Birthday Hall Booking</Link>
          {isAuth && username && <Link href="/admin" className="text-xl">{username}</Link>}
          {isAdmin && <Link href="/admin" className="hover:text-orange-400 transition ease-in-out duration-150">Dashboard</Link>}

          <button
            onClick={handleLoginClick}
            className="bg-white text-gray-900 py-2 px-6 rounded-full hover:bg-black hover:text-white delay-75 border-2 hover:border-white border-black transition ease-in-out duration-150"
          >
            {isAuth ? "Logout" : "Login/Register"}
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
