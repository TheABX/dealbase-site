"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { supabase } from "../lib/supabase";
import { User } from '@supabase/supabase-js';

interface NavbarProps {
  alwaysWhite?: boolean;
}

const navLinks = [
  { label: "Buyers", href: "/buyers" },
  { label: "Sellers", href: "/sellers" },
  { label: "Pricing", href: "/pricing" },
  { label: "SaaS Valuation", href: "/multi-step-valuation" },
];

export default function Navbar({ alwaysWhite = false }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navActive = alwaysWhite || isScrolled || isHovered;

  const handleDropdownEnter = (dropdown: string) => setActiveDropdown(dropdown);
  const handleDropdownLeave = () => setActiveDropdown(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        navActive ? 'bg-white shadow' : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <Link href="/sellers" className="flex items-center gap-3 cursor-pointer group">
          <img 
            src={navActive ? "/X logo white background.png" : "/X logo.png"}
            alt="Dealbase Logo"
            className="h-6 w-6 group-hover:opacity-80 transition-opacity"
          />
          <span 
            className={`font-semibold text-xl md:text-2xl tracking-tight ${navActive ? 'text-[#23235B]' : 'text-white'}`}
            style={{ 
              fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              fontWeight: 600
            }}
          >
            Dealbase
          </span>
        </Link>
        {/* Menu */}
        <div className="flex items-center gap-8">
          {/* Buyers: Single Link, No Dropdown */}
          <Link
            href="/buyers"
            className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}
          >
            Buyers
          </Link>
          {/* Sellers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('sellers')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className={`flex items-center gap-1 font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
              Sellers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'sellers' && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[700px] bg-white rounded-3xl shadow-2xl z-50 p-8 flex flex-row gap-8 border-none">
                <div className="flex-1 bg-[#F5F7FB] rounded-2xl p-8 flex flex-col gap-4 items-start">
                  <div className="bg-[#E6E9F8] rounded-full p-4 mb-2 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="16" fill="#B3B8E0"/><path d="M16 10v12M10 16h12" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#18194A] mb-1">List Your Startup</div>
                    <div className="text-[#23235B] text-base mb-1">Create and publish your business listing to 500k+ buyers</div>
                    <div className="italic text-[#7B849B] text-sm">Get Acquire'd with expert tools and 24/7 customer support.</div>
                  </div>
                </div>
                <div className="flex-1 bg-[#F5F7FB] rounded-2xl p-8 flex flex-col gap-4 items-start">
                  <div className="bg-[#E6E9F8] rounded-full p-4 mb-2 flex items-center justify-center">
                    {/* Placeholder icon */}
                    <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="16" fill="#B3B8E0"/><path d="M10 16h12" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#18194A] mb-1">Get help selling</div>
                    <div className="text-[#23235B] text-base mb-1">Acquisition advisory service tailored for SaaS founders</div>
                    <div className="italic text-[#7B849B] text-sm">Work with a SaaS specialist to get Acquire'd for the highest price and friendliest terms.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Pricing Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('pricing')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className={`flex items-center gap-1 font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
              Pricing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'pricing' && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-3xl shadow-2xl z-50 p-8 flex flex-row gap-8 border-none">
                {/* Sellers Option */}
                <div className="flex-1 bg-[#F5F7FB] rounded-2xl p-8 flex flex-col gap-2 items-start justify-center">
                  <svg width="40" height="40" fill="none" className="mb-4"><circle cx="20" cy="20" r="20" fill="#4F5DFF" fillOpacity="0.10"/><path d="M13 20h10M13 16h10M13 24h10" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round"/><rect x="8" y="16" width="4" height="8" rx="2" fill="#4F5DFF"/></svg>
                  <a href="/pricingsellers" className="font-bold text-lg text-[#23235B] mb-1 hover:underline">Sellers</a>
                  <div className="text-[#23235B] text-base mb-1">Get Acquire'd with an acquisition plan tailored to your exit goals.</div>
                  <div className="italic text-[#7B849B] text-sm">List and sell your business with expert support.</div>
                </div>
                {/* Buyers Option */}
                <div className="flex-1 bg-[#F5F7FB] rounded-2xl p-8 flex flex-col gap-2 items-start justify-center">
                  <svg width="40" height="40" fill="none" className="mb-4"><circle cx="20" cy="20" r="20" fill="#4F5DFF" fillOpacity="0.10"/><path d="M20 13l-7 7h14l-7-7z" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round"/><path d="M20 17v6" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  <a href="/pricingbuyers" className="font-bold text-lg text-[#23235B] mb-1 hover:underline">Buyers</a>
                  <div className="text-[#23235B] text-base mb-1">View buyer plans that connect you with founders and their startups.</div>
                  <div className="italic text-[#7B849B] text-sm">Connect with founders to pursue an acquisition.</div>
                </div>
              </div>
            )}
          </div>
          {/* Resources (no dropdown) */}
          <Link href="/resources" className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>Resources</Link>
        </div>
        {/* Right Side: Free SaaS Valuation, Menu, User */}
        <div className="flex items-center gap-4">
          <Link href="/valuation" className={`font-medium border rounded-full px-4 py-1 transition-colors ${navActive ? 'text-[#18194A] border-[#18194A] hover:text-blue-700' : 'text-white border-white hover:text-blue-200'}`}>Free SaaS valuation</Link>
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}> 
            <HiMenu className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
          {/* User Icon with Dropdown */}
          <div className="relative">
            <button
              className={`p-2 rounded transition-colors border ${userMenuOpen ? 'bg-[#23235B]/90 border-[#B3B8E0]' : navActive ? 'hover:bg-gray-100 border-[#B3B8E0]' : 'hover:bg-white/10 border-white'}`}
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
              <FaUserCircle className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl z-50 py-2 flex flex-col text-[#23235B]" style={{ minWidth: '220px' }}>
                {user ? (
                  <>
                    <div className="px-6 py-4 border-b border-[#E6ECFA]">
                      <div className="font-bold text-lg">{user.email}</div>
                      <div className="text-[#7B849B] text-sm">Signed in</div>
                    </div>
                    <Link href="/dashboard" className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC]">Dashboard</Link>
                    <Link href="/profile" className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC]">Profile</Link>
                    <div className="border-t border-[#E6ECFA] my-1" />
                    <button 
                      onClick={handleSignOut}
                      className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC] text-left"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/signup" className="px-6 py-4 font-bold text-lg hover:bg-[#F7F8FC] rounded-t-2xl">Join now</Link>
                    <Link href="/login" className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC]">Log in</Link>
                    <div className="border-t border-[#E6ECFA] my-1" />
                    <a href="#" className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC]">Help center</a>
                    <a href="#" className="px-6 py-3 font-medium text-base hover:bg-[#F7F8FC] rounded-b-2xl">Blog</a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 