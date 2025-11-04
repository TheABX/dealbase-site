'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { HiOutlineDocument, HiOutlineUserGroup } from 'react-icons/hi'

// Define the types for our data structures
interface Listing {
  id: string;
  businessName: string;
  location: string;
  price: string;
  revenue?: string;
  teaserDescription: string;
  isAiGenerated?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  listings?: Listing[];
}

const ADVISOR_IMG = 'https://randomuser.me/api/portraits/men/32.jpg'

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
        <div className="flex items-center gap-3">
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
        </div>
        {/* Menu */}
        <div className="flex items-center gap-8">
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
          {/* Buyers: Single Link, No Dropdown */}
          <Link
            href="/buyers"
            className={`font-medium hover:text-blue-700 transition-colors ${navActive ? 'text-[#18194A]' : 'text-white'}`}
          >
            Buyers
          </Link>
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
          <button className={`p-2 rounded transition-colors ${navActive ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
            <FaUserCircle className={`w-6 h-6 ${navActive ? 'text-[#18194A]' : 'text-white'}`} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function SellersPage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  // AI Chatbot states
  const [messages, setMessages] = useState<Message[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Email capture states
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailName, setEmailName] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  // Multi-step form state
  const [showMultiStep, setShowMultiStep] = useState(false);
  const [step, setStep] = useState(0);
  const [multiStepData, setMultiStepData] = useState<Record<number, string | string[]>>({});

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Multi-step form questions and options
  const multiStepQuestions = [
    {
      question: 'Have you owned or operated a business before?',
      options: [
        'First time',
        'Owned 1-2 before',
        'Owned 3-5',
        'Owned 6+ (Serial Entrepreneur)',
        'I currently own a business',
        'I invest professionally (e.g. PE or VC)'
      ],
      multi: false
    },
    {
      question: 'Which industries have you worked in?',
      options: [
        'Tech', 'Healthcare', 'Retail', 'Food & Beverage', 'Services',
        'Construction', 'Real Estate', 'Finance', 'Marketing', 'Other'
      ],
      multi: true
    },
    {
      question: 'What is your professional background?',
      options: [
        'Finance & Accounting', 'Corporate/Exec', 'Marketing & Sales',
        'Tech & Engineering', 'Healthcare', 'Legal / Consulting',
        'Construction / Real Estate', 'Retail / Hospitality', 'Other'
      ],
      multi: true
    },
    {
      question: 'How much are you looking to invest?',
      options: [
        'Under $250k', '$250k-$500k', '$500k-$1M', '$1M-$2M', '$2M-$5M', '$5M+', 'Not sure yet'
      ],
      multi: false
    },
    {
      question: 'How do you plan to fund your purchase?',
      options: [
        'Cash', 'Bank loan', 'Equity from home', 'Investors', 'Seller finance', 'Other', 'Not sure yet'
      ],
      multi: true
    },
    {
      question: 'Are your finances ready to move quickly if you find the right business?',
      options: [
        'Yes, ready to go', 'Need a few weeks', 'Need a few months', 'Not sure yet'
      ],
      multi: false
    },
    {
      question: 'Which types of businesses are you interested in?',
      options: [
        'E-commerce', 'Services', 'Wholesale/Trade', 'Manufacturing', 'Healthcare', 'Tech', 'Retail', 'Food & Beverage', 'Other'
      ],
      multi: true
    },
    {
      question: 'What is your ideal business size (annual revenue)?',
      options: [
        'Under $500k', '$500k-$1M', '$1M-$2M', '$2M-$5M', '$5M+', 'No preference'
      ],
      multi: false
    },
    {
      question: 'How many employees would you prefer?',
      options: [
        'Solo/Owner-operator', '2-5', '6-20', '21-50', '51+', 'No preference'
      ],
      multi: false
    },
    {
      question: 'What are your main goals for buying a business?',
      options: [
        'Financial freedom', 'Lifestyle change', 'Build & grow', 'Passive income', 'Family legacy', 'Community impact', 'Other'
      ],
      multi: true
    },
    {
      question: 'When are you hoping to buy?',
      options: [
        'ASAP', 'Within 3 months', '3-6 months', '6-12 months', 'Just exploring'
      ],
      multi: false
    },
    {
      question: 'Which best describes you?',
      options: [
        'Just starting out', 'Actively searching', 'In conversations with sellers', 'Made offers before', 'Ready to buy now'
      ],
      multi: false
    },
    {
      question: 'Are you working with any advisors or brokers?',
      options: [
        'No', 'Yes, a broker', 'Yes, an accountant', 'Yes, a lawyer', 'Yes, other advisor(s)'
      ],
      multi: true
    },
    {
      question: 'Would you like to receive updates with new listings and insights?',
      options: [
        'Yes', 'No'
      ],
      multi: false
    }
  ];

  const totalSteps = multiStepQuestions.length;

  const searchExamples = [
    "I'm looking for a plumbing business in Sydney for under 500k",
    "Nail Salon in Perth for under 200k",
    "Cafe in Melbourne for under 300k",
    "Bakery in Brisbane for under 150k",
    "Restaurant in Adelaide for under 400k"
  ]

  useEffect(() => {
    // Initial delay before starting the animation
    if (!hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true)
      }, 4000) // 4 second delay before starting
      return () => clearTimeout(timeout)
    }

    const currentExample = searchExamples[currentTextIndex]
    
    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentExample.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentExample.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        // Move to next example
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % searchExamples.length)
      }
    }
  }, [displayText, currentTextIndex, isDeleting, searchExamples, hasStarted])

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setIsLoading(true)
    setShowResults(true)
    setShowEmailCapture(true)

    const userMessage: Message = { role: 'user', content: searchInput }
    setMessages(prev => [...prev, userMessage])
    setSearchInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }
      
      const data = await res.json()
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.reply || '',
        listings: data.listings 
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (err: unknown) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: err instanceof Error ? err.message : 'An error occurred' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMessage("");
    let success = false;
    try {
      const { error } = await supabase
        .from('lead_signups')
        .insert([{ name: emailName, email: emailContact }])
      if (error) {
        throw new Error(error.message)
      }
      success = true;
      setEmailMessage('Success! You can now continue.');
    } catch (err: unknown) {
      setEmailMessage(`Error: ${err instanceof Error ? err.message : 'An error occurred'}`)
    } finally {
      setEmailLoading(false);
      setEmailSubmitted(true);
      setEmailName("");
      setEmailContact("");
      setShowMultiStep(true);
      setStep(0);
    }
  };

  // Handle multi-step form option selection
  const handleMultiStepSelect = (option: string) => {
    const q = multiStepQuestions[step];
    setMultiStepData(prev => {
      if (q.multi) {
        const prevArr = Array.isArray(prev[step]) ? prev[step] : [];
        if (prevArr.includes(option)) {
          return { ...prev, [step]: prevArr.filter(o => o !== option) };
        } else {
          return { ...prev, [step]: [...prevArr, option] };
        }
      } else {
        return { ...prev, [step]: option };
      }
    });
  };

  const handleMultiStepNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };
  const handleMultiStepBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="relative min-h-screen bg-[#18194A] flex flex-col items-center justify-start">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with AI Search Bar */}
      <section className="w-full bg-[#18194A] pt-32 pb-20 px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Australia's marketplace to buy and sell profitable businesses
          </h1>
          <p className="text-lg md:text-xl text-[#B3B8E0] mb-8 max-w-2xl mx-auto">
            Join thousands using Australia's most trusted platform to access off-market deals and sell faster with AI
          </p>
          
          {/* AI Search Bar with Typing Effect */}
          <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col mb-8">
            <form onSubmit={handleSearchSubmit} className="flex items-center shadow-lg gap-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={hasStarted ? displayText : "plumbing business in sydney for 500k"}
                className="flex-grow px-4 py-3 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base border-0"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2 font-semibold text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                Search
              </button>
            </form>
          </div>

          {/* Chat Results */}
          {messages.length > 0 && (
            <div className="w-full max-w-xl mx-auto mt-4">
              <div 
                ref={chatContainerRef}
                className="max-h-96 overflow-y-auto space-y-2 p-4 bg-black/10 backdrop-blur-md rounded-lg border border-white/20"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4B5563 transparent'
                }}
              >
                {messages
                  .filter(
                    (msg) =>
                      !(
                        msg.role === 'assistant' &&
                        msg.content === "Hi! I'm your expert business broker assistant. What kind of business are you looking for today?"
                      )
                  )
                  .map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-lg px-3 py-2 text-sm max-w-xs ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-900 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                
                {/* Display listings within the chat container */}
                {messages
                  .filter(msg => msg.listings && msg.listings.length > 0)
                  .map((msg, index) => (
                    <div key={`listings-${index}`} className="mt-4">
                      {msg.listings && (
                        <div className="space-y-3">
                          {msg.listings.map(listing => (
                            <div key={listing.id} className="bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-white/30 shadow-sm">
                              <h3 className="text-sm font-bold text-gray-900 mb-1">{listing.businessName}</h3>
                              <p className="text-xs text-gray-600 mb-1">{listing.location}</p>
                              <p className="text-sm font-semibold mb-1 text-gray-800">{listing.price}</p>
                              {listing.revenue && (
                                 <p className="text-sm font-semibold mb-1 text-gray-800">Revenue: {listing.revenue}</p>
                              )}
                              <p className="text-xs whitespace-pre-wrap text-gray-700 leading-relaxed">{listing.teaserDescription}</p>
                              {listing.isAiGenerated && (
                                <p className="text-xs text-blue-500 mt-1 font-semibold">✨ AI-Generated Example</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 rounded-lg px-3 py-2 text-sm shadow-sm">
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Capture Form */}
          {showResults && showEmailCapture && !emailSubmitted && (
            <div className="w-full max-w-xl mx-auto mt-10">
              <div className="border border-gray-300/40 rounded-3xl flex flex-col items-center py-8 px-4 md:px-8" style={{ background: 'transparent' }}>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 text-center leading-tight">
                  Want to see matching businesses<br />as soon as they're listed?
                </h3>
                <p className="text-base md:text-lg text-[#B3B8E0] mb-5 text-center font-normal">
                  Enter your details below and we'll notify you.
                </p>
                <form onSubmit={handleEmailCapture} className="flex flex-row gap-3 w-full justify-center items-center">
                  <input
                    type="text"
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="flex-1 px-4 py-2 md:py-3 bg-[#F5F7FB] rounded-lg text-base text-[#18194A] placeholder-[#7B849B] focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[80px] border-0 shadow-none transition-all"
                  />
                  <input
                    type="email"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="flex-1 px-4 py-2 md:py-3 bg-[#F5F7FB] rounded-lg text-base text-[#18194A] placeholder-[#7B849B] focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[80px] border-0 shadow-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="px-6 py-2 md:py-3 bg-[#2563eb] text-white rounded-lg font-bold text-base min-w-[100px] transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-0 shadow-none"
                  >
                    {emailLoading ? 'Submitting...' : 'Notify Me'}
                  </button>
                </form>
                {emailMessage && (
                  <p className={`text-base mt-4 text-center ${emailMessage.startsWith('Success') ? 'text-green-600' : 'text-red-600'}`}>
                    {emailMessage}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Multi-Step Form */}
          {showMultiStep && emailSubmitted && (
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/30 shadow-xl flex flex-col items-center">
                <div className="mb-6 w-full">
                  {step === 0 && (
                    <div className="text-center text-gray-500 font-medium mb-6 text-base md:text-lg">
                      Great! Let's fine-tune your recommendations... <span className="italic">(takes 30 seconds)</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">{/* Progress bar */}</span>
                    <span className="text-sm text-gray-600">{/* Progress percent */}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#18194A] text-center mb-8">{multiStepQuestions[step].question}</h3>
                </div>
                <div className="flex flex-wrap gap-6 justify-center mb-10 w-full">
                  {multiStepQuestions[step].options.map((option, index) => {
                    const isSelected = multiStepQuestions[step].multi
                      ? Array.isArray(multiStepData[step]) && multiStepData[step].includes(option)
                      : multiStepData[step] === option;
                    return (
                      <button
                        key={index}
                        onClick={() => handleMultiStepSelect(option)}
                        className={`px-8 py-4 rounded-full border text-xl font-medium transition-colors focus:outline-none
                          ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-[#18194A] border-gray-300 hover:bg-blue-50'}
                        `}
                        style={{ minWidth: 'fit-content' }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between w-full mt-4 mb-2">
                  <button
                    onClick={handleMultiStepBack}
                    disabled={step === 0}
                    className="px-10 py-4 bg-gray-100 text-[#18194A] border-2 border-blue-400 rounded-2xl font-bold text-xl shadow focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleMultiStepNext}
                    disabled={step === totalSteps - 1}
                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xl flex items-center gap-2 shadow focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-white font-semibold">4.7</span>
              <span className="text-[#B3B8E0] text-sm">average rating based on 500+ reviews</span>
            </div>
            <div className="flex gap-1">
              <span className="bg-[#fff] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-[#18194A]">G</span>
              <span className="bg-[#fff] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-[#18194A]">C</span>
              <span className="bg-[#fff] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-[#18194A]">P</span>
            </div>
          </div>
        </div>
        {/* Trust metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 max-w-4xl w-full text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">$500M+</div>
            <div className="text-[#B3B8E0] text-sm">closed deal volume</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">2,000+</div>
            <div className="text-[#B3B8E0] text-sm">startups sold</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">500k+</div>
            <div className="text-[#B3B8E0] text-sm">entrepreneurs trust us</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">$2B+</div>
            <div className="text-[#B3B8E0] text-sm">in verified buyer funds</div>
          </div>
        </div>
      </section>

      {/* Existing sellers connection section */}
      <div className="flex flex-col items-center w-full px-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center mt-8">How Sellers Connect with Buyers</h1>
        <div className="relative w-full flex flex-col items-center" style={{ minHeight: 320 }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 -top-14 z-20"
          >
            <img
              src={ADVISOR_IMG}
              alt="Advisor"
              className="w-16 h-16 rounded-full border-4 border-[#23235B] shadow-lg object-cover"
            />
            <span className="mt-2 text-xs font-semibold text-white bg-[#23235B] px-3 py-1 rounded-full shadow text-center leading-tight">
              M&A Advisor<br/>Christian S.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-row items-stretch justify-center bg-[#23235B] rounded-2xl w-full max-w-2xl mt-16 shadow-xl"
            style={{ minHeight: 180 }}
          >
            <div className="flex-1 p-8 flex flex-col justify-center rounded-l-2xl">
              <div className="text-white text-lg font-semibold mb-1">SaaS Startup</div>
              <div className="text-2xl font-bold text-white mb-3">$1.5M</div>
              <ul className="text-sm text-gray-200 space-y-1">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" className="inline-block"><path d="M8 2v12M2 8h12" stroke="#7B8BFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  Recurring revenue
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" className="inline-block"><path d="M8 2v12M2 8h12" stroke="#7B8BFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  Profit charts
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" className="inline-block"><path d="M8 2v12M2 8h12" stroke="#7B8BFF" strokeWidth="2" strokeLinecap="round"/></svg>
                  Strong growth
                </li>
              </ul>
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center rounded-r-2xl bg-[#23235B] border-l border-[#23235B]/60">
              <div className="text-white text-lg font-semibold mb-1">Gabriel Smith</div>
              <div className="text-sm text-gray-200 mb-1">Verified funds: $2.3M</div>
              <div className="text-sm text-gray-200 mb-1">Profile: SaaS buyer</div>
              <div className="text-sm text-gray-200 mb-4">7 acquisitions closed</div>
              <div className="flex gap-2 mt-auto">
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-1.5 rounded transition-colors font-medium">Reject</button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded transition-colors font-medium">Approve</button>
              </div>
            </div>
          </motion.div>
          <svg className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+32px)]" width="340" height="60" viewBox="0 0 340 60" fill="none">
            <path d="M40 40 Q170 0 300 40" stroke="#A3A8F7" strokeWidth="3" strokeDasharray="8,8" fill="none" />
          </svg>
        </div>
      </div>

      {/* Acquire.com Process Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center mb-16">We make business acquisitions fast, secure, and effortless</h2>
        <div className="relative flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-6xl mx-auto">
          {/* Left Card: Chat/Support */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[300px] max-w-sm mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Manager" className="w-8 h-8 rounded-full object-cover border-2 border-[#4F5DFF]" />
              <span className="font-semibold text-[#23235B] text-sm">Customer success manager</span>
              <span className="ml-2 text-xs text-green-500">Online</span>
            </div>
            <div className="bg-[#F5F7FB] rounded-lg p-3 mb-2 w-full text-sm text-[#23235B]">Your startup listing is almost ready to go live! Last step is asking price</div>
            <div className="flex flex-col gap-1 w-full mb-4">
              <div className="flex items-center gap-2">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="w-6 h-6 rounded-full object-cover" />
                <span className="bg-[#E6E9F8] rounded-full px-3 py-1 text-xs text-[#23235B]">Thanks!</span>
              </div>
              <div className="flex items-center gap-2 self-end">
                <span className="bg-[#4F5DFF] text-white rounded-full px-3 py-1 text-xs">You're welcome!</span>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Manager" className="w-6 h-6 rounded-full object-cover" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="font-bold text-[#23235B] text-lg mb-1">Sellers</div>
              <div className="text-[#6B7280] text-sm">Maximize your exit with expert help from our team.</div>
            </div>
          </div>

          {/* Connector SVG (left to center) */}
          <svg className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2" width="120" height="40" fill="none">
            <circle cx="8" cy="20" r="6" fill="#E6E9F8" />
            <path d="M14 20 Q60 0 112 20" stroke="#C7CBF6" strokeWidth="2" strokeDasharray="6,6" fill="none" />
            <circle cx="112" cy="20" r="6" fill="#E6E9F8" />
          </svg>

          {/* Center Card: Features */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[300px] max-w-sm mx-auto relative z-10">
            <img src="/logo1.png" alt="Platform Logo" className="h-10 mb-6" />
            <div className="w-full flex flex-col gap-4">
              <div className="bg-[#F5F7FB] rounded-lg py-3 px-4 text-[#23235B] font-semibold text-base text-center">Expert tooling</div>
              <div className="bg-[#F5F7FB] rounded-lg py-3 px-4 text-[#23235B] font-semibold text-base text-center">World-class support</div>
              <div className="bg-[#F5F7FB] rounded-lg py-3 px-4 text-[#23235B] font-semibold text-base text-center">Escrow and financing</div>
            </div>
          </div>

          {/* Connector SVG (center to right) */}
          <svg className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2" width="120" height="40" fill="none">
            <circle cx="8" cy="20" r="6" fill="#E6E9F8" />
            <path d="M14 20 Q60 40 112 20" stroke="#C7CBF6" strokeWidth="2" strokeDasharray="6,6" fill="none" />
            <circle cx="112" cy="20" r="6" fill="#E6E9F8" />
          </svg>

          {/* Right Card: Deals/Buyers */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[300px] max-w-sm mx-auto">
            <div className="w-full mb-4">
              <div className="font-semibold text-[#23235B] text-sm mb-2">My deals</div>
              <div className="flex flex-col gap-2">
                <div className="bg-[#F5F7FB] rounded-lg px-4 py-2 text-[#23235B] text-xs flex items-center justify-between">
                  <span>Startup type: Shopify App</span>
                  <span className="opacity-40">•••</span>
                </div>
                <div className="bg-[#F5F7FB] rounded-lg px-4 py-2 text-[#23235B] text-xs flex items-center justify-between">
                  <span>Startup type: SaaS</span>
                  <span className="opacity-40">•••</span>
                </div>
                <div className="bg-[#F5F7FB] rounded-lg px-4 py-2 text-[#23235B] text-xs flex items-center justify-between">
                  <span>Startup type: Mobile</span>
                  <span className="opacity-40">•••</span>
                </div>
              </div>
              <button className="mt-3 bg-[#4F5DFF] hover:bg-[#3B47CC] text-white font-semibold px-4 py-2 rounded-lg text-xs shadow transition-colors w-full">Send offer</button>
            </div>
            <div className="mt-6 text-center">
              <div className="font-bold text-[#23235B] text-lg mb-1">Buyers</div>
              <div className="text-[#6B7280] text-sm">Find your ideal startup and make an offer in minutes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Dream Startup Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Text and Features */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-4">Discover your dream startup</h2>
            <p className="text-lg text-[#23235B] mb-6">Browse 1,000s of vetted <a href="#" className="text-[#4F5DFF] underline">online businesses</a> for sale or enter your criteria to find matches. Project returns with live metrics, and make offers in minutes</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Evaluate web, customer, and financial metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Build and send LOIs and APAs in minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Get help to acquire with acquisition financing</span>
              </li>
            </ul>
            <button className="bg-[#23235B] hover:bg-[#18194A] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-colors flex items-center gap-2">
              Tell me more <span className="inline-block"><svg width="18" height="18" fill="none"><path d="M5 9h8m0 0l-3-3m3 3l-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
          </div>
          {/* Right: Chart Card */}
          <div className="flex-1 flex justify-center w-full">
            <div className="bg-[#E6E9F8] rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
              <div className="w-full h-64 bg-[#F5F7FB] rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Chart illustration */}
                <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
                  <rect x="0" y="0" width="320" height="180" rx="16" fill="#F5F7FB" />
                  {/* Grid lines */}
                  <g stroke="#D1D5DB" strokeWidth="1">
                    <line x1="40" y1="30" x2="40" y2="150" />
                    <line x1="100" y1="30" x2="100" y2="150" />
                    <line x1="160" y1="30" x2="160" y2="150" />
                    <line x1="220" y1="30" x2="220" y2="150" />
                    <line x1="280" y1="30" x2="280" y2="150" />
                    <line x1="40" y1="150" x2="280" y2="150" />
                  </g>
                  {/* Chart line */}
                  <polyline points="40,140 100,120 160,100 220,80 280,60" fill="none" stroke="#4F5DFF" strokeWidth="3" />
                  {/* Dots */}
                  <circle cx="40" cy="140" r="5" fill="#4F5DFF" />
                  <circle cx="100" cy="120" r="5" fill="#4F5DFF" />
                  <circle cx="160" cy="100" r="5" fill="#4F5DFF" />
                  <circle cx="220" cy="80" r="5" fill="#4F5DFF" />
                  <circle cx="280" cy="60" r="5" fill="#4F5DFF" />
                  {/* Speech bubble */}
                  <rect x="200" y="30" width="70" height="28" rx="8" fill="#fff" />
                  <text x="235" y="48" fill="#23235B" fontSize="12" fontWeight="bold" textAnchor="middle">+ARR</text>
                </svg>
                <span className="absolute top-4 left-6 text-xs font-semibold text-[#23235B]">Annual Recurring Revenue</span>
                <span className="absolute bottom-4 right-6 text-xs text-[#B3B8E0] font-semibold">stripe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Quickly, Easily, and for the Highest Price Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Blue Support Card Illustration */}
          <div className="flex-1 flex justify-center w-full">
            <div className="bg-[#23235B] rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md min-h-[380px] relative">
              {/* Simulated support UI */}
              <div className="bg-[#4F5DFF] rounded-t-2xl w-full h-32 flex items-center px-6">
                <div className="flex items-center gap-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M10 20v-8a2 2 0 012-2h8a2 2 0 012 2v8" stroke="#4F5DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div>
                    <div className="text-white font-semibold text-sm">Acquire.com customer support</div>
                    <div className="text-xs text-[#B3B8E0]">Always online</div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white rounded-b-2xl p-6 flex flex-col gap-3 mt-[-1px]">
                <div className="bg-[#E6E9F8] rounded-lg h-6 w-2/3 mb-2" />
                <div className="bg-[#E6E9F8] rounded-lg h-4 w-1/2 mb-1" />
                <div className="bg-[#E6E9F8] rounded-lg h-4 w-1/3" />
              </div>
            </div>
          </div>
          {/* Right: Text and Features */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] mb-4">Sell your business quickly, confidently, and for the best possible price</h2>
            <p className="text-lg text-[#23235B] mb-6">
              List your business on <a href="#" className="text-[#4F5DFF] underline">Dealbase</a> and get in front of serious, qualified buyers actively searching for opportunities. Our platform helps you attract the right attention, manage offers, and close deals securely — all in one place.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Get expert guidance to craft a standout listing that sells your story</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Receive genuine offers from verified, ready-to-buy investors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#4F5DFF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <span className="text-[#23235B] font-semibold">Close securely through trusted transaction partners — at no extra cost</span>
              </li>
            </ul>
            <button className="bg-[#23235B] hover:bg-[#18194A] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-colors flex items-center gap-2">
              Tell me more <span className="inline-block"><svg width="18" height="18" fill="none"><path d="M5 9h8m0 0l-3-3m3 3l-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center mb-16">What business owners and investors say about Dealbase</h2>
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
            <div className="text-xl font-bold text-[#23235B] mb-4">"A seamless experience from listing to sale"</div>
            <div className="text-[#23235B] text-base mb-8 flex-1">I listed my business on Dealbase hoping to test the waters, and within days I had multiple genuine enquiries. The process was straightforward and transparent — from creating my listing to finalising the deal. Couldn't have asked for an easier way to sell.</div>
            <div className="flex items-center gap-3 mt-auto">
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="James T." className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold text-[#23235B] text-base">— James T.</span>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
            <div className="text-xl font-bold text-[#23235B] mb-4">"Access to serious buyers without the hassle"</div>
            <div className="text-[#23235B] text-base mb-8 flex-1">As an investor, I'm always searching for opportunities that align with our acquisition goals. Dealbase connects us directly with motivated sellers and quality listings, saving us time and unnecessary back-and-forth.</div>
            <div className="flex items-center gap-3 mt-auto">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah L." className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold text-[#23235B] text-base">— Sarah L.</span>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-[#E6E9F8] rounded-2xl shadow p-8 flex flex-col">
            <div className="text-xl font-bold text-[#23235B] mb-4">"Finally, a platform built for real business transactions"</div>
            <div className="text-[#23235B] text-base mb-8 flex-1">Dealbase makes buying and selling businesses feel professional and safe. Every step — from verified buyers to secure closings — is handled smoothly. It's become my go-to platform for exploring new opportunities.</div>
            <div className="flex items-center gap-3 mt-auto">
              <img src="https://randomuser.me/api/portraits/men/48.jpg" alt="Michael R." className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold text-[#23235B] text-base">— Michael R.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center mb-4">Top Picks</h2>
        <p className="text-[#23235B] text-lg text-center mb-12 max-w-2xl">A few of our favourite Australian businesses live and under expert guidance from our M&A team.</p>
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="bg-[#23235B] text-white px-6 py-3 text-sm font-semibold">SaaS startup in Sydney</div>
            <div className="flex-1 px-6 py-6 flex flex-col justify-between">
              <div className="text-xl font-bold text-[#23235B] mb-4">Profitable workflow automation platform serving 600+ paying customers</div>
              <div className="bg-[#F5F7FB] rounded-lg px-4 py-3 text-[#23235B] text-base font-semibold mt-4">Asking price: <span className="font-bold">$320k (2.1× profit)</span></div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="bg-[#23235B] text-white px-6 py-3 text-sm font-semibold">E-commerce business in Melbourne</div>
            <div className="flex-1 px-6 py-6 flex flex-col justify-between">
              <div className="text-xl font-bold text-[#23235B] mb-4">Online store specialising in premium home fitness equipment with strong repeat sales</div>
              <div className="bg-[#F5F7FB] rounded-lg px-4 py-3 text-[#23235B] text-base font-semibold mt-4">Asking price: <span className="font-bold">$480k (2.9× profit)</span></div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="bg-[#23235B] text-white px-6 py-3 text-sm font-semibold">Service business in Brisbane</div>
            <div className="flex-1 px-6 py-6 flex flex-col justify-between">
              <div className="text-xl font-bold text-[#23235B] mb-4">Subscription-based bookkeeping platform supporting small businesses nationwide</div>
              <div className="bg-[#F5F7FB] rounded-lg px-4 py-3 text-[#23235B] text-base font-semibold mt-4">Asking price: <span className="font-bold">$1.1M (3.4× profit)</span></div>
            </div>
          </div>
        </div>
        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-3 h-3 rounded-full bg-[#23235B] opacity-60"></span>
          <span className="w-3 h-3 rounded-full bg-[#23235B] opacity-30"></span>
          <span className="w-3 h-3 rounded-full bg-[#23235B] opacity-30"></span>
          <span className="w-3 h-3 rounded-full bg-[#23235B] opacity-30"></span>
        </div>
        {/* See more button */}
        <button className="bg-[#23235B] hover:bg-[#18194A] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-colors flex items-center gap-2">
          See more <span className="inline-block"><svg width="18" height="18" fill="none"><path d="M5 9h8m0 0l-3-3m3 3l-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </button>
      </section>

      {/* Join Now CTA Section */}
      <section className="w-full bg-[#F5F7FB] py-20 px-2 flex flex-col items-center">
        <div className="max-w-5xl w-full mx-auto flex justify-center">
          <div className="bg-[#CFE0FF] rounded-3xl w-full flex flex-col md:flex-row items-center justify-between px-8 py-16 md:py-20">
            <div className="flex-1 flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#23235B] text-center md:text-left mb-6 md:mb-0">Join 500k+ founders and buyers already doing business on Acquire.com</h2>
            </div>
            <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
              <button className="bg-[#23235B] hover:bg-[#18194A] text-white font-semibold px-10 py-4 rounded-xl text-lg shadow transition-colors flex items-center gap-2">
                Join now <span className="inline-block"><svg width="18" height="18" fill="none"><path d="M5 9h8m0 0l-3-3m3 3l-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 