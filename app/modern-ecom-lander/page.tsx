'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'

// Navbar Component
function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navActive = isScrolled || isHovered;

  const handleDropdownEnter = (dropdown: string) => setActiveDropdown(dropdown);
  const handleDropdownLeave = () => setActiveDropdown(null);

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
        <Link href="/" className="flex items-center gap-3">
          <img 
            src={navActive ? "/X logo white background.png" : "/X logo.png"}
            alt="Dealbase Logo"
            className="h-6 w-6"
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
          <Link href="/sellers" className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
            Sellers
          </Link>
          <Link href="/buyers" className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}>
            Buyers
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
            <HiMenu className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
            <FaUserCircle className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function ModernEcomLanderPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="w-full transition-all duration-300 flex flex-col items-center justify-center pt-32 pb-20 px-4"
        style={{
          backgroundImage: "url('/dark_background_option_5.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh',
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Know What Your eCommerce Business Is Really Worth — and How to Increase It.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                Get an instant, data-backed valuation based on real eCommerce sales — plus a report showing exactly what's helping or hurting your brand's value.
              </p>
              <p className="text-lg text-gray-300 mb-8 font-semibold">
                Normally $497 — free for a limited time.
              </p>
              <button className="bg-[#FFA736] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors">
                Get My Free eCommerce Valuation →
              </button>
            </motion.div>

            {/* Right: Shopify Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <h3 className="font-bold text-[#23235B]">Analytics Dashboard</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Widgets */}
                <div className="space-y-4">
                  <div className="bg-[#F5F7FB] rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Estimated Business Value</p>
                    <p className="text-2xl font-bold text-[#23235B]">$320K</p>
                  </div>
                  <div className="bg-[#F5F7FB] rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                    <p className="text-lg font-semibold text-[#4F5DFF]">3.2%</p>
                  </div>
                  <div className="bg-[#F5F7FB] rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Average Order Value</p>
                    <p className="text-lg font-semibold text-[#4F5DFF]">$89</p>
                  </div>
                </div>

                {/* Chat Bubble */}
                <div className="mt-6 bg-[#E6E9F8] rounded-lg p-3 flex items-start gap-2">
                  <div className="w-8 h-8 bg-[#4F5DFF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm text-[#23235B]">Your valuation report is ready!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: The Problem */}
      <section className="w-full bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="flex gap-4 items-end">
                {/* Sold Card */}
                <div className="bg-gray-200 rounded-xl p-6 opacity-60 flex-1">
                  <p className="text-sm text-gray-600 mb-2">Sold for</p>
                  <p className="text-2xl font-bold text-gray-500">$180K</p>
                  <div className="mt-2 h-1 bg-gray-300 rounded"></div>
                </div>
                {/* True Value Card */}
                <div className="bg-[#4F5DFF] rounded-xl p-6 flex-1 shadow-lg">
                  <p className="text-sm text-white mb-2">True Market Value</p>
                  <p className="text-2xl font-bold text-white">$260K</p>
                  <div className="mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-xs text-white">+44%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-10">
                Most eCommerce Brands Sell for Less Than They Should.
              </h2>
              <p className="text-lg text-[#23235B] mb-4">
                Many eCom owners underestimate what their store is worth — or don't know what's quietly dragging its value down.
              </p>
              <p className="text-lg text-[#23235B] font-semibold">
                DealBase gives you the data big buyers use, so you can sell (or scale) with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: How DealBase Works */}
      <section className="w-full bg-[#F5F7FB] py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-8">
              Your Brand's True Value, in Three Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-[#4F5DFF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <div className="bg-[#F5F7FB] rounded-lg p-6 mb-4 h-32 flex items-center justify-center">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#23235B] mb-2">Connect your eCom data</h3>
              <p className="text-sm text-gray-600">Shopify, WooCommerce, or custom</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-[#4F5DFF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <div className="bg-[#F5F7FB] rounded-lg p-6 mb-4 h-32 flex items-center justify-center">
                <div className="w-full">
                  <div className="bg-[#4F5DFF] rounded-lg p-3 mb-2">
                    <div className="text-white text-sm font-semibold">Generating...</div>
                  </div>
                  <div className="flex gap-1 justify-center">
                    <div className="w-2 h-2 bg-[#4F5DFF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-[#4F5DFF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#4F5DFF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#23235B] mb-2">Get your instant valuation</h3>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-[#4F5DFF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <div className="bg-[#F5F7FB] rounded-lg p-6 mb-4 h-32 flex items-center justify-center">
                <div className="w-full space-y-2 text-left">
                  <div className="bg-white rounded p-2 text-xs text-[#23235B]">↑ AOV</div>
                  <div className="bg-white rounded p-2 text-xs text-[#23235B]">↑ LTV</div>
                  <div className="bg-white rounded p-2 text-xs text-[#23235B]">↓ CAC</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#23235B] mb-2">See the 3 biggest levers</h3>
              <p className="text-sm text-gray-600">to increase your sale price</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Why It's Different */}
      <section className="w-full bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-10">
                Built by Brokers. Powered by Real eCommerce Data.
              </h2>
              <p className="text-lg text-[#23235B] mb-4">
                Unlike generic valuation tools, DealBase analyses live benchmarks from real Australian store sales and DTC exits.
              </p>
              <p className="text-lg text-[#23235B] font-semibold">
                It reveals what serious buyers are looking for — and how your metrics compare.
              </p>
            </motion.div>

            {/* Right: Split Screen Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Simple Calculator */}
                <div className="bg-gray-200 rounded-xl p-4 opacity-60">
                  <p className="text-xs text-gray-600 mb-2">Calculator</p>
                  <div className="bg-gray-300 rounded h-24 mb-2"></div>
                  <p className="text-xs text-gray-500">$???</p>
                </div>

                {/* DealBase Dashboard */}
                <div className="bg-white border-2 border-[#4F5DFF] rounded-xl p-4 shadow-lg">
                  <p className="text-xs font-semibold text-[#23235B] mb-2">DealBase Analytics</p>
                  <div className="space-y-2 mb-2">
                    <div className="bg-green-100 rounded p-1 text-xs text-green-700">AOV ↑</div>
                    <div className="bg-blue-100 rounded p-1 text-xs text-blue-700">ROAS ↑</div>
                    <div className="bg-purple-100 rounded p-1 text-xs text-purple-700">Repeat Customers ↑</div>
                  </div>
                  <div className="bg-[#F5F7FB] rounded p-2">
                    <p className="text-sm font-bold text-[#23235B]">$320K</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Even If You're Not Ready to Sell */}
      <section className="w-full bg-[#F5F7FB] py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto">
                <h3 className="font-bold text-[#23235B] mb-4">Store Health Score: 84/100</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#23235B]">Revenue Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#23235B]">Customer Retention</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#23235B]">Profit Margin</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-10">
                Your Free eCom Health Check.
              </h2>
              <p className="text-lg text-[#23235B]">
                Use DealBase to understand your store's current worth, track performance, and make smarter growth decisions — even if you never plan to sell.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Privacy Promise */}
      <section className="w-full bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-10">
                Private. Secure. 100% in Your Control.
              </h2>
              <p className="text-lg text-[#23235B] mb-4">
                Your data is encrypted and never shared.
              </p>
              <p className="text-lg text-[#23235B]">
                Only verified buyers under NDA can view your listing — and only when you choose to go public.
              </p>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="bg-[#F5F7FB] rounded-2xl p-8 shadow-lg border-2 border-[#4F5DFF]">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      </div>
                      <svg className="w-16 h-16 text-[#4F5DFF] absolute -top-2 -right-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center text-[#23235B] font-semibold">Protected</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Social Proof */}
      <section className="w-full bg-[#F5F7FB] py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-4">
              Trusted by eCom Founders Across Australia.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#23235B] mb-4 italic">
                "DealBase showed me exactly where my margins were hurting value."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E6E9F8] rounded-full flex items-center justify-center">
                  <span className="text-[#4F5DFF] font-bold">F</span>
                </div>
                <div>
                  <p className="font-semibold text-[#23235B]">Fashion Brand</p>
                  <p className="text-sm text-gray-600">eCom Founder</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#23235B] mb-4 italic">
                "I discovered my Shopify brand was worth double what I expected."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E6E9F8] rounded-full flex items-center justify-center">
                  <span className="text-[#4F5DFF] font-bold">N</span>
                </div>
                <div>
                  <p className="font-semibold text-[#23235B]">Nutrition Brand</p>
                  <p className="text-sm text-gray-600">eCom Founder</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#23235B] mb-4 italic">
                "The insights helped me improve before even listing."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E6E9F8] rounded-full flex items-center justify-center">
                  <span className="text-[#4F5DFF] font-bold">T</span>
                </div>
                <div>
                  <p className="font-semibold text-[#23235B]">Tech Accessories</p>
                  <p className="text-sm text-gray-600">eCom Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Comparison */}
      <section className="w-full bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-8">
              DealBase vs Brokers (for eCommerce)
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#23235B] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold"></th>
                    <th className="px-6 py-4 text-center font-semibold">DealBase</th>
                    <th className="px-6 py-4 text-center font-semibold">Traditional Broker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#23235B]">Cost</td>
                    <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">Free</td>
                    <td className="px-6 py-4 text-center text-[#23235B]">8–12% of sale</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#23235B]">Speed</td>
                    <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">Instant</td>
                    <td className="px-6 py-4 text-center text-[#23235B]">3–6 weeks</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#23235B]">Data Source</td>
                    <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">Real eCom metrics</td>
                    <td className="px-6 py-4 text-center text-[#23235B]">Estimates</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#23235B]">Insights</td>
                    <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">Detailed growth levers</td>
                    <td className="px-6 py-4 text-center text-[#23235B]">Minimal</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#23235B]">Privacy</td>
                    <td className="px-6 py-4 text-center text-[#4F5DFF] font-bold">100% confidential</td>
                    <td className="px-6 py-4 text-center text-[#23235B]">Public listings</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Future Features */}
      <section className="w-full bg-[#F5F7FB] py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto">
                <div className="mb-4">
                  <h3 className="font-bold text-[#23235B] mb-2">Live Store Valuation</h3>
                  <div className="bg-[#F5F7FB] rounded-lg p-4 h-32 flex items-center justify-center">
                    <div className="w-full">
                      <div className="flex items-end gap-1 h-20">
                        <div className="flex-1 bg-[#4F5DFF] rounded-t" style={{ height: '40%' }}></div>
                        <div className="flex-1 bg-[#4F5DFF] rounded-t" style={{ height: '60%' }}></div>
                        <div className="flex-1 bg-[#4F5DFF] rounded-t" style={{ height: '80%' }}></div>
                        <div className="flex-1 bg-[#4F5DFF] rounded-t" style={{ height: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">S</div>
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">X</div>
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">GA</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-10">
                Soon: Live Valuations Linked to Your Store Metrics.
              </h2>
              <p className="text-lg text-[#23235B]">
                We're building a live "business value tracker" that integrates with Shopify, Xero, and Google Analytics — so you can see your valuation update in real time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="w-full bg-[#18194A] py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              You Might Be Sitting on a Six-Figure Asset.
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Find out your brand's true worth — and what's holding it back.
            </p>
            <p className="text-lg text-gray-300 mb-8 font-semibold">
              Normally $497 — free for a limited time.
            </p>
            <button className="bg-[#FFA736] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors mb-6">
              Get My eCommerce Valuation →
            </button>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% confidential
              </span>
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                No obligation
              </span>
              <span className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#4F5DFF"/><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Built by licensed brokers
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#23235B] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 DealBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
